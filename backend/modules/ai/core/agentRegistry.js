/**
 * Kashi Vashi AI Platform — Extensible Agent Registry
 * 
 * Provides dynamic registration, capability discovery, and execution contracts
 * for current and future specialized agents in the Kashi Vashi OS.
 */

// Agent Lifecycle Status
const AGENT_STATUS = Object.freeze({
    ACTIVE: 'ACTIVE',         // Enabled for runtime execution
    INACTIVE: 'INACTIVE',     // Registered but turned off via configuration
    DEPRECATED: 'DEPRECATED', // Retained for backwards compatibility
    SANDBOX: 'SANDBOX'        // In staging/evaluation mode (restricted tools only)
});

// Standard Agent Definition Contract
class AgentContract {
    constructor({
        id,
        name,
        description,
        version = '1.0.0',
        capabilities = [],
        tools = [],
        permissions = [],
        executionHandler = null,
        status = AGENT_STATUS.ACTIVE,
        metadata = {}
    }) {
        if (!id || !name) throw new Error('Agent id and name are required');
        this.id = id;
        this.name = name;
        this.description = description || '';
        this.version = version;
        this.capabilities = Array.isArray(capabilities) ? capabilities : [];
        this.tools = Array.isArray(tools) ? tools : [];
        this.permissions = Array.isArray(permissions) ? permissions : [];
        this.executionHandler = executionHandler;
        this.status = status;
        this.metadata = metadata;
        this.registeredAt = new Date();
    }

    async execute(task, context, toolsRegistry) {
        if (this.status === AGENT_STATUS.INACTIVE) {
            throw new Error(`Agent '${this.id}' is currently inactive.`);
        }
        if (typeof this.executionHandler !== 'function') {
            throw new Error(`Agent '${this.id}' has no executable handler configured.`);
        }
        return await this.executionHandler(task, context, toolsRegistry);
    }
}

// Agent Registry Container
class AgentRegistry {
    constructor() {
        this._agents = new Map();
        this._initializeBuiltinAgents();
    }

    /**
     * Registers a new or updated agent definition.
     */
    register(agentConfig) {
        const agent = agentConfig instanceof AgentContract ? agentConfig : new AgentContract(agentConfig);
        this._agents.set(agent.id, agent);
        return agent;
    }

    /**
     * Retrieves an agent by its unique identifier.
     */
    get(agentId) {
        return this._agents.get(agentId) || null;
    }

    /**
     * Checks if an agent is registered.
     */
    has(agentId) {
        return this._agents.has(agentId);
    }

    /**
     * Lists all registered agents, optionally filtered by status or capability.
     */
    list({ status = null, capability = null } = {}) {
        let list = Array.from(this._agents.values());
        if (status) {
            list = list.filter(a => a.status === status);
        }
        if (capability) {
            list = list.filter(a => a.capabilities.includes(capability));
        }
        return list.map(a => ({
            id: a.id,
            name: a.name,
            description: a.description,
            version: a.version,
            capabilities: a.capabilities,
            tools: a.tools,
            permissions: a.permissions,
            status: a.status
        }));
    }

    /**
     * Bootstraps contracts for existing working modules.
     */
    _initializeBuiltinAgents() {
        // 1. Customer Support & Inquiry Assistant (Active Prompt 6 module)
        this.register({
            id: 'CUSTOMER_ASSISTANT',
            name: 'Kashi Vashi Customer Assistant',
            description: 'Assists public travelers with itinerary questions, ghat information, Aarti timings, and hotel inquiry assistance.',
            version: '1.2.0',
            capabilities: ['ITINERARY_INQUIRY', 'TRAVEL_GUIDANCE', 'FAQ_ASSISTANCE', 'TRIP_STATUS_CHECK'],
            tools: ['crm.getLead', 'crm.getCustomer', 'crm.getTrip'],
            permissions: ['LEADS_VIEW', 'CUSTOMERS_VIEW', 'TRIPS_VIEW'],
            status: AGENT_STATUS.ACTIVE,
            metadata: { moduleKey: 'customerAssistant' }
        });

        // 2. Sales & Follow-Up Assistant (Active Prompt 7 module)
        this.register({
            id: 'SALES_ASSISTANT',
            name: 'Kashi Vashi Sales Assistant',
            description: 'Analyzes leads, generates follow-up drafts, recommends package adjustments, and prepares draft quotes for sales team.',
            version: '1.1.0',
            capabilities: ['LEAD_QUALIFICATION', 'OBJECTION_HANDLING', 'FOLLOW_UP_DRAFTING', 'QUOTE_RECOMMENDATION'],
            tools: ['crm.getLead', 'crm.getQuote', 'crm.getSalesLeadContext', 'crm.generateCustomerMessage'],
            permissions: ['LEADS_VIEW', 'QUOTES_VIEW', 'COMMUNICATION_CREATE'],
            status: AGENT_STATUS.ACTIVE,
            metadata: { moduleKey: 'salesAssistant' }
        });

        // 3. Customer Hunter Intelligence (Prompt 8 & 9 module)
        this.register({
            id: 'CUSTOMER_HUNTER',
            name: 'Kashi Vashi Opportunity Hunter',
            description: 'Monitors authorized travel intent signals, classifies commercial viability, and logs qualified opportunities into review queue.',
            version: '1.0.0',
            capabilities: ['SIGNAL_INGESTION', 'INTENT_CLASSIFICATION', 'OPPORTUNITY_SCORING'],
            tools: ['hunter.fetchSignals', 'hunter.detectIntent', 'hunter.qualifySignal', 'hunter.createOpportunity'],
            permissions: ['AI_MANAGE'],
            status: AGENT_STATUS.ACTIVE,
            metadata: { moduleKey: 'customerHunter' }
        });
    }
}

// Singleton Registry Instance
const defaultAgentRegistry = new AgentRegistry();

module.exports = {
    AGENT_STATUS,
    AgentContract,
    AgentRegistry,
    agentRegistry: defaultAgentRegistry
};
