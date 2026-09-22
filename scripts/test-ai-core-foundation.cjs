/**
 * Kashi Vashi AI Platform — Core Foundation Unit Test
 * Validates the Central Task Engine, Agent Registry, Tool Registry,
 * MCP Contracts, Memory Layer, and Self-Improvement Workflow.
 */

const assert = require('assert');
const {
    TASK_STATUS,
    TASK_PRIORITY,
    TASK_SOURCE,
    createTask,
    agentRegistry,
    toolRegistry,
    TOOL_CATEGORY,
    validateMcpInvocation,
    MCP_CAPABILITIES,
    ImprovementProposal,
    IMPROVEMENT_STAGES,
    ContextMemoryManager
} = require('../backend/modules/ai/core');

console.log('🧪 Running Kashi Vashi AI Core Foundation Test Suite...\n');

// 1. Task Engine Test
console.log('1. Central Task Engine Lifecycle:');
const task = createTask({
    type: 'ITINERARY_INQUIRY',
    source: TASK_SOURCE.CRM_UI,
    priority: TASK_PRIORITY.HIGH,
    requestedBy: { userId: 'usr_mock_123', role: 'CEO', identifier: 'ceo_dashboard' },
    input: { destination: 'Varanasi', days: 3 }
});

assert.strictEqual(task.status, TASK_STATUS.PENDING, 'Initial status must be PENDING');
task.transitionTo(TASK_STATUS.PLANNING, 'Agent breaking down itinerary query');
assert.strictEqual(task.status, TASK_STATUS.PLANNING, 'Transition to PLANNING succeeded');

const step1 = task.addStep('knowledge.searchTrips', { topic: 'Ganga Aarti' });
assert.strictEqual(task.steps.length, 1, 'Task should have 1 step recorded');

task.transitionTo(TASK_STATUS.RUNNING);
task.completeStep(step1.stepId, { matches: ['Evening Aarti at Dashashwamedh Ghat'] });
assert.strictEqual(task.steps[0].status, TASK_STATUS.COMPLETED, 'Step completed');

task.transitionTo(TASK_STATUS.COMPLETED);
assert.strictEqual(task.status, TASK_STATUS.COMPLETED, 'Task reached COMPLETED');
assert(task.completedAt instanceof Date, 'Task records completedAt timestamp');

// Test illegal transition
let threwError = false;
try {
    task.transitionTo(TASK_STATUS.RUNNING); // COMPLETED -> RUNNING is illegal
} catch (e) {
    threwError = true;
}
assert(threwError, 'Illegal state transition must throw error');
console.log('  ✅ Task creation, steps, and FSM transition rules passed.');

// 2. Agent Registry Test
console.log('\n2. Extensible Agent Registry:');
const agents = agentRegistry.list();
assert(agents.length >= 3, 'Must have at least 3 pre-registered operational agents');

const salesAgent = agentRegistry.get('SALES_ASSISTANT');
assert(salesAgent, 'SALES_ASSISTANT must be present');
assert(salesAgent.capabilities.includes('LEAD_QUALIFICATION'), 'Sales agent must declare LEAD_QUALIFICATION capability');

// Register a new future agent (e.g. Booking Agent)
const bookingAgent = agentRegistry.register({
    id: 'BOOKING_AGENT',
    name: 'Kashi Vashi Booking & Reservation Agent',
    description: 'Handles automated booking holds, hotel confirmations, and transport slot booking.',
    capabilities: ['BOOKING_HOLD', 'HOTEL_CONFIRMATION'],
    tools: ['crm.getBooking'],
    permissions: ['BOOKINGS_VIEW', 'BOOKINGS_CREATE']
});
assert.strictEqual(agentRegistry.get('BOOKING_AGENT').id, 'BOOKING_AGENT', 'Dynamic agent registration successful');
console.log('  ✅ Agent registry discovery, retrieval, and runtime extension passed.');

// 3. Category-Aware Tool Registry Test
console.log('\n3. Category-Aware Tool Registry:');
const allTools = toolRegistry.list();
assert(allTools.length > 5, 'Tool registry should have loaded registered tools');

const leadTool = toolRegistry.get('crm.getLead');
assert(leadTool, 'crm.getLead must exist');
assert.strictEqual(leadTool.category, TOOL_CATEGORY.CRM, 'crm.getLead should map to CRM category');

const bkgTool = toolRegistry.get('crm.getBooking');
assert.strictEqual(bkgTool.category, TOOL_CATEGORY.BOOKING, 'crm.getBooking should map to BOOKING category');

const safeTools = toolRegistry.list({ safeModeOnly: true });
const unsafeTools = toolRegistry.list().filter(t => !t.safeModeAllowed);
assert(safeTools.length > 0, 'Safe mode tools must exist');
assert(unsafeTools.length > 0, 'Mutation tools must be blocked in safe mode');
console.log(`  ✅ Tools categorized: ${allTools.length} total, ${safeTools.length} safe-mode allowed, ${unsafeTools.length} safe-mode blocked.`);

// 4. MCP Contracts Test
console.log('\n4. MCP Protocol Contracts:');
assert(validateMcpInvocation(MCP_CAPABILITIES.CREATE_TASK, { role: 'CEO' }), 'CEO authorized for MCP CREATE_TASK');
assert(validateMcpInvocation(MCP_CAPABILITIES.LIST_AGENTS, { role: 'MANAGER' }), 'Manager authorized for MCP LIST_AGENTS');

let mcpBlocked = false;
try {
    validateMcpInvocation(MCP_CAPABILITIES.CREATE_TASK, { role: 'PUBLIC_ANONYMOUS' });
} catch (e) {
    mcpBlocked = true;
}
assert(mcpBlocked, 'Anonymous caller blocked from MCP invocation');
console.log('  ✅ MCP role authorization and schema boundaries verified.');

// 5. Controlled Self-Improvement Engine Test
console.log('\n5. Controlled Self-Improvement Engine:');
const proposal = new ImprovementProposal({
    targetModule: 'salesAssistant',
    problemSummary: 'Lead qualification latency P95 exceeded 1200ms',
    suggestedChangeType: 'TOOL_TIMEOUT_ADJUSTMENT',
    proposedPatch: { toolTimeoutMs: 2500 }
});

assert.strictEqual(proposal.status, IMPROVEMENT_STAGES.GENERATE_PROPOSAL, 'Initial proposal stage');
proposal.advanceToSandbox();
assert.strictEqual(proposal.status, IMPROVEMENT_STAGES.SANDBOX_TEST, 'Sandbox test stage');
proposal.submitForApproval();
assert.strictEqual(proposal.status, IMPROVEMENT_STAGES.HUMAN_APPROVAL, 'Human approval required');
proposal.applyApproval('usr_ceo_001', 'Approved for production update');
assert.strictEqual(proposal.status, IMPROVEMENT_STAGES.VERSIONED_CHANGE, 'Versioned change approved');
assert.strictEqual(proposal.approvedBy, 'usr_ceo_001', 'Approver logged');
console.log('  ✅ Self-improvement governance loop verified with human approval gate.');

// 6. Memory Layer & Privacy Boundary Test
console.log('\n6. Memory Layer & Privacy Boundary:');
const mockCustomer = {
    name: 'Aditi Sharma',
    phone: '+91 98765 43210',
    email: 'aditi@example.com',
    vendorCost: 15000,
    companyMargin: 5000,
    expectedProfit: 5000,
    passwordHash: '$2a$10$xyzSecretHash...',
    jwtToken: 'eyJhbGci...'
};

const sanitizedForTeam = ContextMemoryManager.sanitizeCustomerContext(mockCustomer, 'TEAM_MEMBER');
assert.strictEqual(sanitizedForTeam.name, 'Aditi Sharma', 'Name preserved');
assert.strictEqual(sanitizedForTeam.vendorCost, undefined, 'vendorCost must be stripped for non-CEO');
assert.strictEqual(sanitizedForTeam.companyMargin, undefined, 'companyMargin must be stripped for non-CEO');
assert.strictEqual(sanitizedForTeam.expectedProfit, undefined, 'expectedProfit must be stripped for non-CEO');
assert.strictEqual(sanitizedForTeam.passwordHash, undefined, 'passwordHash must be unconditionally stripped');
assert.strictEqual(sanitizedForTeam.jwtToken, undefined, 'jwtToken must be unconditionally stripped');

const sanitizedForCeo = ContextMemoryManager.sanitizeCustomerContext(mockCustomer, 'CEO');
assert.strictEqual(sanitizedForCeo.vendorCost, 15000, 'CEO retains vendorCost visibility');
assert.strictEqual(sanitizedForCeo.passwordHash, undefined, 'passwordHash stripped even for CEO');
console.log('  ✅ Memory context privacy and role redaction guards verified.');

console.log('\n🎉 ALL 6 AI CORE FOUNDATION TESTS PASSED CLEANLY!\n');
