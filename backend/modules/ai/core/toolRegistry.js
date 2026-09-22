/**
 * Kashi Vashi AI Platform — Category-Aware Tool Registry
 * 
 * Enforces permission-gated execution, safe-mode boundaries, and categorizes
 * tools into: CRM, BOOKING, CUSTOMER, PAYMENT, DOCUMENT, EMAIL, NOTIFICATION,
 * SEARCH, ANALYTICS, and EXTERNAL.
 */

const { AI_TOOLS_REGISTRY } = require('../aiTools');
const { AI_RISK_LEVELS } = require('../aiConstants');

// Canonical Tool Categories
const TOOL_CATEGORY = Object.freeze({
    CRM: 'CRM',
    BOOKING: 'BOOKING',
    CUSTOMER: 'CUSTOMER',
    PAYMENT: 'PAYMENT',
    DOCUMENT: 'DOCUMENT',
    EMAIL: 'EMAIL',
    NOTIFICATION: 'NOTIFICATION',
    SEARCH: 'SEARCH',
    ANALYTICS: 'ANALYTICS',
    EXTERNAL: 'EXTERNAL'
});

const ALL_TOOL_CATEGORIES = Object.freeze(Object.values(TOOL_CATEGORY));

// Category heuristic mapping for legacy and new tools
function inferCategory(toolName) {
    if (toolName.startsWith('crm.getBooking') || toolName.startsWith('crm.createBooking')) return TOOL_CATEGORY.BOOKING;
    if (toolName.startsWith('crm.getCustomer')) return TOOL_CATEGORY.CUSTOMER;
    if (toolName.includes('Payment') || toolName.includes('Financial')) return TOOL_CATEGORY.PAYMENT;
    if (toolName.includes('Document') || toolName.includes('Receipt') || toolName.includes('Voucher')) return TOOL_CATEGORY.DOCUMENT;
    if (toolName.includes('Email') || toolName.includes('sendCustomerMessage')) return TOOL_CATEGORY.EMAIL;
    if (toolName.includes('Notification') || toolName.includes('WhatsApp')) return TOOL_CATEGORY.NOTIFICATION;
    if (toolName.startsWith('hunter.') || toolName.includes('search')) return TOOL_CATEGORY.SEARCH;
    if (toolName.includes('Analytics') || toolName.includes('Report')) return TOOL_CATEGORY.ANALYTICS;
    if (toolName.startsWith('crm.')) return TOOL_CATEGORY.CRM;
    return TOOL_CATEGORY.EXTERNAL;
}

class ToolDefinition {
    constructor({
        name,
        category = null,
        description,
        permission = 'AI_MANAGE',
        riskLevel = AI_RISK_LEVELS.LOW,
        safeModeAllowed = true,
        parametersSchema = {},
        execute = null,
        enabled = true,
        metadata = {}
    }) {
        if (!name) throw new Error('Tool name is required');
        this.name = name;
        this.category = category || inferCategory(name);
        this.description = description || '';
        this.permission = permission;
        this.riskLevel = riskLevel;
        this.safeModeAllowed = safeModeAllowed;
        this.parametersSchema = parametersSchema;
        this.execute = execute;
        this.enabled = enabled;
        this.metadata = metadata;
    }

    async run(input, context, models) {
        if (!this.enabled) {
            throw new Error(`Tool '${this.name}' is currently disabled.`);
        }
        if (context && context.safeMode && !this.safeModeAllowed) {
            throw new Error(`Tool '${this.name}' is blocked in Safe Mode (Risk: ${this.riskLevel}).`);
        }
        if (typeof this.execute !== 'function') {
            throw new Error(`Tool '${this.name}' has no execution handler.`);
        }
        return await this.execute(input, context, models);
    }
}

class ToolRegistry {
    constructor() {
        this._tools = new Map();
        this._importLegacyTools();
    }

    register(toolConfig) {
        const tool = toolConfig instanceof ToolDefinition ? toolConfig : new ToolDefinition(toolConfig);
        this._tools.set(tool.name, tool);
        return tool;
    }

    get(toolName) {
        return this._tools.get(toolName) || null;
    }

    has(toolName) {
        return this._tools.has(toolName);
    }

    list({ category = null, riskLevel = null, safeModeOnly = false } = {}) {
        let list = Array.from(this._tools.values()).filter(t => t.enabled);
        if (category) list = list.filter(t => t.category === category);
        if (riskLevel) list = list.filter(t => t.riskLevel === riskLevel);
        if (safeModeOnly) list = list.filter(t => t.safeModeAllowed);
        return list.map(t => ({
            name: t.name,
            category: t.category,
            description: t.description,
            permission: t.permission,
            riskLevel: t.riskLevel,
            safeModeAllowed: t.safeModeAllowed
        }));
    }

    _importLegacyTools() {
        if (!AI_TOOLS_REGISTRY) return;
        for (const [name, legacyTool] of Object.entries(AI_TOOLS_REGISTRY)) {
            this.register({
                name,
                category: inferCategory(name),
                description: legacyTool.description,
                permission: legacyTool.permission,
                riskLevel: legacyTool.riskLevel || AI_RISK_LEVELS.LOW,
                safeModeAllowed: Boolean(legacyTool.safeModeAllowed),
                enabled: legacyTool.enabled !== false,
                execute: legacyTool.execute
            });
        }
    }
}

const defaultToolRegistry = new ToolRegistry();

module.exports = {
    TOOL_CATEGORY,
    ALL_TOOL_CATEGORIES,
    ToolDefinition,
    ToolRegistry,
    toolRegistry: defaultToolRegistry
};
