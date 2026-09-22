/**
 * Kashi Vashi AI Platform — Controlled Self-Improvement Engine
 * 
 * Implements the governance lifecycle:
 * OBSERVE -> EVALUATE -> IDENTIFY PROBLEM -> GENERATE IMPROVEMENT PROPOSAL ->
 * TEST/SANDBOX -> EVALUATE -> HUMAN APPROVAL -> VERSIONED CHANGE -> DEPLOY.
 * 
 * STRICT INVARIANT:
 * Zero autonomous code modifications or direct production deployments are permitted.
 * Every proposal requires human CEO/Manager approval and version control tracking.
 */

const IMPROVEMENT_STAGES = Object.freeze({
    OBSERVE: 'OBSERVE',
    EVALUATE: 'EVALUATE',
    IDENTIFY_PROBLEM: 'IDENTIFY_PROBLEM',
    GENERATE_PROPOSAL: 'GENERATE_PROPOSAL',
    SANDBOX_TEST: 'SANDBOX_TEST',
    HUMAN_APPROVAL: 'HUMAN_APPROVAL',
    VERSIONED_CHANGE: 'VERSIONED_CHANGE',
    DEPLOYED: 'DEPLOYED',
    REJECTED: 'REJECTED'
});

const METRICS_TO_MONITOR = Object.freeze([
    'TASK_FAILURE_RATE',
    'AGENT_ERROR_RATE',
    'TOOL_TIMEOUT_RATE',
    'REPEATED_USER_CORRECTIONS',
    'RUN_LATENCY_P95',
    'RETRY_RATE',
    'TASK_COMPLETION_RATE',
    'WORKFLOW_BOTTLENECK_COUNT',
    'PROMPT_TOKEN_EFFICIENCY',
    'EVALUATION_SCORE'
]);

class ImprovementProposal {
    constructor({
        id,
        targetModule, // e.g. "salesAssistant", "customerAssistant"
        problemSummary,
        evidenceTelemetry = {},
        suggestedChangeType, // "PROMPT_TWEAK", "TOOL_TIMEOUT_ADJUSTMENT", "ROUTING_HEURISTIC"
        proposedPatch = {},
        status = IMPROVEMENT_STAGES.GENERATE_PROPOSAL,
        approvedBy = null,
        version = '1.0.1'
    }) {
        this.id = id || `PROP-${Date.now()}`;
        this.targetModule = targetModule;
        this.problemSummary = problemSummary;
        this.evidenceTelemetry = evidenceTelemetry;
        this.suggestedChangeType = suggestedChangeType;
        this.proposedPatch = proposedPatch;
        this.status = status;
        this.approvedBy = approvedBy;
        this.version = version;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    /**
     * Advances the proposal to sandbox testing.
     */
    advanceToSandbox() {
        this.status = IMPROVEMENT_STAGES.SANDBOX_TEST;
        this.updatedAt = new Date();
        return this;
    }

    /**
     * Requires explicit authenticated human sign-off.
     */
    submitForApproval() {
        this.status = IMPROVEMENT_STAGES.HUMAN_APPROVAL;
        this.updatedAt = new Date();
        return this;
    }

    /**
     * Applies human approval.
     */
    applyApproval(userId, comments = '') {
        if (!userId) throw new Error('Human approver userId is required.');
        this.approvedBy = userId;
        this.status = IMPROVEMENT_STAGES.VERSIONED_CHANGE;
        this.approvalComments = comments;
        this.approvedAt = new Date();
        this.updatedAt = new Date();
        return this;
    }

    /**
     * Rejection by human.
     */
    reject(userId, reason) {
        this.approvedBy = userId;
        this.status = IMPROVEMENT_STAGES.REJECTED;
        this.rejectionReason = reason;
        this.updatedAt = new Date();
        return this;
    }
}

module.exports = {
    IMPROVEMENT_STAGES,
    METRICS_TO_MONITOR,
    ImprovementProposal
};
