/**
 * Kashi Vashi AI Platform — Core Engine Facade
 * 
 * Exports the modular foundations for the AI Business Operating System:
 * - Central Task Engine
 * - Extensible Agent Registry
 * - Category-Aware Tool Registry
 * - MCP Contracts
 * - Controlled Self-Improvement Engine
 * - Permission-Aware Memory Layer
 */

const {
    TASK_STATUS,
    ALL_TASK_STATUSES,
    TASK_PRIORITY,
    ALL_TASK_PRIORITIES,
    TASK_SOURCE,
    ALL_TASK_SOURCES,
    isValidTaskTransition
} = require('./taskTypes');

const {
    createTaskSchema,
    TaskInstance,
    createTask
} = require('./taskEngine');

const {
    AGENT_STATUS,
    AgentContract,
    AgentRegistry,
    agentRegistry
} = require('./agentRegistry');

const {
    TOOL_CATEGORY,
    ALL_TOOL_CATEGORIES,
    ToolDefinition,
    ToolRegistry,
    toolRegistry
} = require('./toolRegistry');

const {
    MCP_CAPABILITIES,
    MCP_TOOL_SCHEMAS,
    validateMcpInvocation
} = require('./mcpContracts');

const {
    IMPROVEMENT_STAGES,
    METRICS_TO_MONITOR,
    ImprovementProposal
} = require('./selfImprovementEngine');

const {
    MEMORY_LAYER_TYPES,
    ContextMemoryManager
} = require('./memoryLayer');

module.exports = {
    // Task Engine
    TASK_STATUS,
    ALL_TASK_STATUSES,
    TASK_PRIORITY,
    ALL_TASK_PRIORITIES,
    TASK_SOURCE,
    ALL_TASK_SOURCES,
    isValidTaskTransition,
    createTaskSchema,
    TaskInstance,
    createTask,

    // Agent Registry
    AGENT_STATUS,
    AgentContract,
    AgentRegistry,
    agentRegistry,

    // Tool Registry
    TOOL_CATEGORY,
    ALL_TOOL_CATEGORIES,
    ToolDefinition,
    ToolRegistry,
    toolRegistry,

    // MCP Contracts
    MCP_CAPABILITIES,
    MCP_TOOL_SCHEMAS,
    validateMcpInvocation,

    // Self-Improvement
    IMPROVEMENT_STAGES,
    METRICS_TO_MONITOR,
    ImprovementProposal,

    // Memory Layer
    MEMORY_LAYER_TYPES,
    ContextMemoryManager
};
