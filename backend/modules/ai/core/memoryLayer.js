/**
 * Kashi Vashi AI Platform — Memory & Context Architecture
 * 
 * Defines the 5 distinct memory layers with strict permission-aware boundaries
 * and automatic redaction of proprietary margins and sensitive customer data.
 */

const MEMORY_LAYER_TYPES = Object.freeze({
    TASK_MEMORY: 'TASK_MEMORY',           // Ephemeral, scratchpad for single task run
    CUSTOMER_CONTEXT: 'CUSTOMER_CONTEXT', // Verified customer profile and preferences
    BUSINESS_KNOWLEDGE: 'BUSINESS_KNOWLEDGE', // Canonical packages, ghat guides, operational rules
    AGENT_CONTEXT: 'AGENT_CONTEXT',       // Working turn-by-turn conversational state
    LONG_TERM_MEMORY: 'LONG_TERM_MEMORY'  // Anonymized historical interaction patterns
});

class ContextMemoryManager {
    /**
     * Sanitizes customer context before injection into an agent's prompt or context window.
     * Prevents internal margins, vendor payments, and unhashed auth tokens from leaking.
     */
    static sanitizeCustomerContext(rawCustomerData, callerRole) {
        if (!rawCustomerData) return null;
        const sanitized = typeof rawCustomerData.toObject === 'function'
            ? rawCustomerData.toObject()
            : { ...rawCustomerData };

        // Privacy Redactions for all AI agents & Non-CEO roles
        if (callerRole !== 'CEO') {
            delete sanitized.vendorCost;
            delete sanitized.companyMargin;
            delete sanitized.expectedProfit;
            delete sanitized.realizedProfit;
            delete sanitized.ceoNotes;
            delete sanitized.netProfit;
        }

        // Strip sensitive credentials unconditionally
        delete sanitized.password;
        delete sanitized.passwordHash;
        delete sanitized.jwtToken;
        delete sanitized.authTokens;

        return sanitized;
    }

    /**
     * Retrieves canonical business knowledge (itineraries, Aarti timings, ghat details)
     */
    static getBusinessKnowledge(topic) {
        const { TRAVEL_KNOWLEDGE_BASE } = require('../knowledgeBase');
        if (!TRAVEL_KNOWLEDGE_BASE) return [];
        if (!topic) return TRAVEL_KNOWLEDGE_BASE;
        return TRAVEL_KNOWLEDGE_BASE.filter(item => 
            (item.topic && item.topic.toLowerCase().includes(topic.toLowerCase())) ||
            (item.title && item.title.toLowerCase().includes(topic.toLowerCase()))
        );
    }
}

module.exports = {
    MEMORY_LAYER_TYPES,
    ContextMemoryManager
};
