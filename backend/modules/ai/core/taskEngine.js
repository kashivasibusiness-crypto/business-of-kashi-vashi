/**
 * Kashi Vashi AI Platform — Central Task Engine
 * 
 * Provides the unified Task model and lifecycle manager for all agents,
 * internal automations, webhooks, and MCP invocations.
 */

const crypto = require('crypto');
const {
    TASK_STATUS,
    ALL_TASK_STATUSES,
    TASK_PRIORITY,
    ALL_TASK_PRIORITIES,
    TASK_SOURCE,
    ALL_TASK_SOURCES,
    isValidTaskTransition
} = require('./taskTypes');

/**
 * Creates the Mongoose Schema for the Central Task Model (optional persistence).
 */
function createTaskSchema(mongoose) {
    const Schema = mongoose.Schema;

    const TaskStepSchema = new Schema({
        stepId: { type: String, required: true },
        tool: { type: String, required: true },
        input: { type: Schema.Types.Mixed, default: {} },
        output: { type: Schema.Types.Mixed, default: null },
        status: { type: String, enum: ALL_TASK_STATUSES, default: TASK_STATUS.PENDING },
        error: { type: String, default: null },
        startedAt: { type: Date, default: null },
        completedAt: { type: Date, default: null }
    }, { _id: false });

    const TaskSchema = new Schema({
        taskId: { type: String, required: true, unique: true, index: true },
        source: { type: String, enum: ALL_TASK_SOURCES, default: TASK_SOURCE.CRM_UI, index: true },
        requestedBy: {
            userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
            role: { type: String, default: 'ANONYMOUS' },
            identifier: { type: String, default: 'system' }
        },
        type: { type: String, required: true, index: true }, // e.g. "LEAD_QUALIFICATION", "QUOTE_GENERATION", "MCP_QUERY"
        priority: { type: String, enum: ALL_TASK_PRIORITIES, default: TASK_PRIORITY.NORMAL, index: true },
        status: { type: String, enum: ALL_TASK_STATUSES, default: TASK_STATUS.PENDING, index: true },
        assignedAgent: { type: String, default: null, index: true }, // e.g. "SALES_ASSISTANT", "CUSTOMER_ASSISTANT"
        input: { type: Schema.Types.Mixed, default: {} },
        plan: {
            goal: { type: String, default: '' },
            reasoning: { type: String, default: '' },
            estimatedSteps: { type: Number, default: 1 }
        },
        steps: [TaskStepSchema],
        result: { type: Schema.Types.Mixed, default: null },
        error: {
            code: { type: String, default: null },
            message: { type: String, default: null },
            details: { type: Schema.Types.Mixed, default: null }
        },
        metadata: { type: Schema.Types.Mixed, default: {} },
        createdAt: { type: Date, default: Date.now, index: true },
        startedAt: { type: Date, default: null },
        completedAt: { type: Date, default: null }
    }, {
        timestamps: true
    });

    TaskSchema.index({ status: 1, priority: 1, createdAt: 1 });
    TaskSchema.index({ 'requestedBy.userId': 1, createdAt: -1 });

    return TaskSchema;
}

/**
 * In-memory / stateless Task instance builder
 */
class TaskInstance {
    constructor(data = {}) {
        this.id = data.taskId || data.id || `TASK-${Date.now()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
        this.source = data.source || TASK_SOURCE.CRM_UI;
        this.requestedBy = data.requestedBy || { userId: null, role: 'SYSTEM', identifier: 'system' };
        this.type = data.type || 'GENERAL_TASK';
        this.priority = data.priority || TASK_PRIORITY.NORMAL;
        this.status = data.status || TASK_STATUS.PENDING;
        this.assignedAgent = data.assignedAgent || null;
        this.input = data.input || {};
        this.plan = data.plan || { goal: '', reasoning: '', estimatedSteps: 1 };
        this.steps = data.steps || [];
        this.result = data.result || null;
        this.error = data.error || null;
        this.metadata = data.metadata || {};
        this.createdAt = data.createdAt || new Date();
        this.startedAt = data.startedAt || null;
        this.completedAt = data.completedAt || null;
    }

    transitionTo(nextStatus, reason = '') {
        if (!isValidTaskTransition(this.status, nextStatus)) {
            throw new Error(`Invalid task state transition from ${this.status} to ${nextStatus}`);
        }
        this.status = nextStatus;
        if (nextStatus === TASK_STATUS.RUNNING && !this.startedAt) {
            this.startedAt = new Date();
        }
        if (nextStatus === TASK_STATUS.COMPLETED || nextStatus === TASK_STATUS.FAILED || nextStatus === TASK_STATUS.CANCELLED) {
            this.completedAt = new Date();
        }
        if (reason) {
            this.metadata.lastTransitionReason = reason;
        }
        return this;
    }

    addStep(tool, input) {
        const step = {
            stepId: `STEP-${this.steps.length + 1}`,
            tool,
            input,
            output: null,
            status: TASK_STATUS.PENDING,
            error: null,
            startedAt: null,
            completedAt: null
        };
        this.steps.push(step);
        return step;
    }

    completeStep(stepId, output) {
        const step = this.steps.find(s => s.stepId === stepId);
        if (step) {
            step.output = output;
            step.status = TASK_STATUS.COMPLETED;
            step.completedAt = new Date();
        }
        return step;
    }

    failStep(stepId, error) {
        const step = this.steps.find(s => s.stepId === stepId);
        if (step) {
            step.error = error.message || String(error);
            step.status = TASK_STATUS.FAILED;
            step.completedAt = new Date();
        }
        return step;
    }
}

/**
 * Task Factory Function
 */
function createTask(params) {
    return new TaskInstance(params);
}

module.exports = {
    createTaskSchema,
    TaskInstance,
    createTask,
    TASK_STATUS,
    TASK_PRIORITY,
    TASK_SOURCE
};
