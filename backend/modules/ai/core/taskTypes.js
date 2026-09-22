/**
 * Kashi Vashi AI Platform — Central Task Engine Types & Lifecycle
 * 
 * Defines the canonical task abstraction, lifecycle states, and priority tiers
 * for the multi-agent AI Business Operating System.
 */

// Canonical Task Lifecycle States
const TASK_STATUS = Object.freeze({
    PENDING: 'PENDING',       // Task received and queued
    PLANNING: 'PLANNING',     // Agent decomposing task into sub-steps
    RUNNING: 'RUNNING',       // Active tool execution in progress
    WAITING: 'WAITING',       // Waiting for external event, webhook, or human approval
    COMPLETED: 'COMPLETED',   // Successfully finished with verified output
    FAILED: 'FAILED',         // Execution halted due to unrecoverable error
    CANCELLED: 'CANCELLED'    // Explicitly cancelled by user or timeout
});

const ALL_TASK_STATUSES = Object.freeze(Object.values(TASK_STATUS));

// Valid Lifecycle Transitions (Finite State Machine)
const TASK_TRANSITIONS = Object.freeze({
    [TASK_STATUS.PENDING]: [TASK_STATUS.PLANNING, TASK_STATUS.RUNNING, TASK_STATUS.CANCELLED],
    [TASK_STATUS.PLANNING]: [TASK_STATUS.RUNNING, TASK_STATUS.WAITING, TASK_STATUS.FAILED, TASK_STATUS.CANCELLED],
    [TASK_STATUS.RUNNING]: [TASK_STATUS.WAITING, TASK_STATUS.COMPLETED, TASK_STATUS.FAILED, TASK_STATUS.CANCELLED],
    [TASK_STATUS.WAITING]: [TASK_STATUS.RUNNING, TASK_STATUS.COMPLETED, TASK_STATUS.FAILED, TASK_STATUS.CANCELLED],
    [TASK_STATUS.COMPLETED]: [], // Terminal state
    [TASK_STATUS.FAILED]: [TASK_STATUS.PENDING], // Retryable transition
    [TASK_STATUS.CANCELLED]: []  // Terminal state
});

// Task Priorities
const TASK_PRIORITY = Object.freeze({
    CRITICAL: 'CRITICAL',   // P0: Immediate dispatch (e.g. payment reconciliation, urgent inquiry)
    HIGH: 'HIGH',           // P1: Priority processing (e.g. live quote generation, booking hold)
    NORMAL: 'NORMAL',       // P2: Standard customer and lead operations
    LOW: 'LOW'              // P3: Background intelligence, enrichment, report compilation
});

const ALL_TASK_PRIORITIES = Object.freeze(Object.values(TASK_PRIORITY));

// Standard Task Sources
const TASK_SOURCE = Object.freeze({
    CRM_UI: 'CRM_UI',
    PUBLIC_WEB: 'PUBLIC_WEB',
    WHATSAPP: 'WHATSAPP',
    MCP_SERVER: 'MCP_SERVER',
    API_WEBHOOK: 'API_WEBHOOK',
    AUTOMATION_CRON: 'AUTOMATION_CRON',
    AGENT_INTERNAL: 'AGENT_INTERNAL'
});

const ALL_TASK_SOURCES = Object.freeze(Object.values(TASK_SOURCE));

/**
 * Validates whether a state transition is legal according to the FSM.
 */
function isValidTaskTransition(currentStatus, nextStatus) {
    if (!currentStatus || !nextStatus) return false;
    if (currentStatus === nextStatus) return true;
    const allowed = TASK_TRANSITIONS[currentStatus] || [];
    return allowed.includes(nextStatus);
}

module.exports = {
    TASK_STATUS,
    ALL_TASK_STATUSES,
    TASK_TRANSITIONS,
    TASK_PRIORITY,
    ALL_TASK_PRIORITIES,
    TASK_SOURCE,
    ALL_TASK_SOURCES,
    isValidTaskTransition
};
