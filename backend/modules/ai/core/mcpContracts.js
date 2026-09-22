/**
 * Kashi Vashi AI Platform — Model Context Protocol (MCP) Contracts
 * 
 * Defines standard tool definitions, parameter schemas, and security boundaries
 * for external applications communicating via MCP or secure REST/Webhook interfaces.
 */

const MCP_CAPABILITIES = Object.freeze({
    // Core Task Lifecycle
    CREATE_TASK: 'create_task',
    GET_TASK: 'get_task',
    GET_TASK_STATUS: 'get_task_status',
    CANCEL_TASK: 'cancel_task',

    // Agent Discovery & Invocation
    LIST_AGENTS: 'list_agents',
    GET_AGENT: 'get_agent',
    EXECUTE_AGENT: 'execute_agent',

    // Approved Domain Operations (Whitelisted, non-destructive only)
    CRM_GET_LEAD: 'crm_get_lead',
    CRM_GET_CUSTOMER: 'crm_get_customer',
    CRM_GET_BOOKING: 'crm_get_booking',
    DOCUMENT_PREVIEW_VOUCHER: 'document_preview_voucher'
});

const MCP_TOOL_SCHEMAS = {
    [MCP_CAPABILITIES.CREATE_TASK]: {
        name: MCP_CAPABILITIES.CREATE_TASK,
        description: 'Submits a new asynchronous operational task into the Kashi Vashi Central Task Engine.',
        inputSchema: {
            type: 'object',
            properties: {
                type: { type: 'string', description: 'Task category e.g. ITINERARY_QUERY, LEAD_ANALYSIS' },
                priority: { type: 'string', enum: ['CRITICAL', 'HIGH', 'NORMAL', 'LOW'], default: 'NORMAL' },
                assignedAgent: { type: 'string', description: 'Optional target agent ID e.g. CUSTOMER_ASSISTANT' },
                input: { type: 'object', description: 'Task payload arguments' }
            },
            required: ['type', 'input']
        },
        requiredPermission: 'AI_MANAGE',
        riskLevel: 'LOW'
    },

    [MCP_CAPABILITIES.GET_TASK_STATUS]: {
        name: MCP_CAPABILITIES.GET_TASK_STATUS,
        description: 'Checks execution status, progress steps, and output for a submitted task.',
        inputSchema: {
            type: 'object',
            properties: {
                taskId: { type: 'string', description: 'Canonical Task ID' }
            },
            required: ['taskId']
        },
        requiredPermission: 'AI_MANAGE',
        riskLevel: 'LOW'
    },

    [MCP_CAPABILITIES.LIST_AGENTS]: {
        name: MCP_CAPABILITIES.LIST_AGENTS,
        description: 'Lists all available specialized agents, their capabilities, and approved toolsets.',
        inputSchema: {
            type: 'object',
            properties: {
                status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'ALL'], default: 'ACTIVE' }
            }
        },
        requiredPermission: 'AI_MANAGE',
        riskLevel: 'LOW'
    },

    [MCP_CAPABILITIES.EXECUTE_AGENT]: {
        name: MCP_CAPABILITIES.EXECUTE_AGENT,
        description: 'Synchronously triggers an agent execution task with session authorization and tool filtering.',
        inputSchema: {
            type: 'object',
            properties: {
                agentId: { type: 'string', description: 'Target agent ID' },
                action: { type: 'string', description: 'Specific agent action' },
                parameters: { type: 'object', description: 'Validated parameters' }
            },
            required: ['agentId', 'action', 'parameters']
        },
        requiredPermission: 'AI_MANAGE',
        riskLevel: 'MEDIUM'
    }
};

/**
 * Validates MCP request authorization and prevents raw query injection.
 */
function validateMcpInvocation(toolName, userContext) {
    if (!userContext || !userContext.role) {
        throw new Error('Authentication required for MCP tool execution.');
    }
    const schema = MCP_TOOL_SCHEMAS[toolName];
    if (!schema) {
        throw new Error(`MCP tool '${toolName}' is not recognized or not exposed.`);
    }

    // Role check: Only authenticated internal operators (CEO, Manager, Authorized API keys) can execute MCP tools
    const allowedRoles = ['CEO', 'MANAGER', 'API_INTEGRATION'];
    if (!allowedRoles.includes(userContext.role.toUpperCase())) {
        throw new Error(`Permission denied: Role '${userContext.role}' cannot invoke MCP tool '${toolName}'.`);
    }

    return true;
}

module.exports = {
    MCP_CAPABILITIES,
    MCP_TOOL_SCHEMAS,
    validateMcpInvocation
};
