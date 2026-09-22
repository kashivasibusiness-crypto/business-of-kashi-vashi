# KASHI VASHI AI CORE ARCHITECTURE SPECIFICATION
**Version:** 2.0.0-Draft  
**Canonical Brand:** Kashi Vashi  
**Scope:** Modular AI Business Operating System & Multi-Agent Architecture

---

## 1. Executive Summary & Architectural Goals

The **Kashi Vashi Platform** is evolving from a travel CRM with ad-hoc AI prompts into a **Modular AI Business Operating System**. The core architectural goal is to support future autonomous and semi-autonomous specialized agents, external workflow automation, and Model Context Protocol (MCP) integrations **without rewriting the stable CRM, booking, document, payment, or database layer**.

### Primary Design Invariants:
1. **Zero Destabilization:** Working production CRM, bookings, payments, and document rendering pipelines are preserved with 100% backward compatibility.
2. **Permission-Aware Isolation:** LLMs and agents never receive unrestricted database or raw query access. All operations are dispatched through validated, category-aware tools.
3. **Defense-in-Depth Privacy:** Non-CEO roles and external agents never view internal cost margins, vendor payments, or credentials.
4. **Controlled Self-Improvement:** The system can observe, evaluate, and propose improvements, but **every production change strictly requires human review and approval**.

---

## 2. The 10 Core Architectural Layers

```
+-------------------------------------------------------------------------------------------------+
|                                 1. CLIENT & INTEGRATION INGESTION                               |
|   Admin CRM  |  Public Web  |  WhatsApp Bot  |  Partner QR  |  MCP Clients  |  REST Webhooks    |
+-------------------------------------------------------------------------------------------------+
                                                 │
                                                 ▼
+-------------------------------------------------------------------------------------------------+
|                                 10. PERMISSION & AUDIT GATEWAY                                  |
| • Role-Based Access Control (CEO, Manager, Team Leader, Team Member)                            |
| • Safe Mode Enforcer (Blocks automated writes & financial mutations)                           |
| • Immutable Audit Trail (runId, actorRole, tool, decision, riskLevel, timestamp)               |
+-------------------------------------------------------------------------------------------------+
                                                 │
                                                 ▼
+-------------------------------------------------------------------------------------------------+
|                                     2. CENTRAL TASK ENGINE                                      |
| • Canonical Task Model (id, source, requestedBy, type, priority, plan, steps, status, result)   |
| • FSM Lifecycle: PENDING ──► PLANNING ──► RUNNING ──► WAITING ──► COMPLETED / FAILED / CANCELLED|
+-------------------------------------------------------------------------------------------------+
                                                 │
                       ┌─────────────────────────┴─────────────────────────┐
                       ▼                                                   ▼
+---------------------------------------------+   +-----------------------------------------------+
|      1 & 4. AGENT ENGINE & AGENT REGISTRY   |   |            5. MEMORY & CONTEXT LAYER          |
| Contract: id, name, version, capabilities,  |   | 1. Task Memory: Ephemeral execution state     |
| tools, permissions, status, handler         |   | 2. Customer Context: Privacy-sanitized CRM    |
| Operational Agents:                         |   | 3. Business Knowledge: Verified tour guide    |
| • Customer Assistant                        |   | 4. Agent Context: Conversational session turn |
| • Sales Assistant                           |   | 5. Long-term Memory: Historical patterns      |
| • Opportunity Hunter                        |   +-----------------------------------------------+
+---------------------------------------------+
                       │
                       ▼
+-------------------------------------------------------------------------------------------------+
|                                  3. CATEGORY-AWARE TOOL REGISTRY                                |
| Categories: CRM | BOOKING | CUSTOMER | PAYMENT | DOCUMENT | EMAIL | NOTIFICATION | SEARCH |     |
|             ANALYTICS | EXTERNAL                                                                |
| • Permission Check  • Risk Rating (LOW, MED, HIGH, CRITICAL)  • Safe Mode Guard                |
+-------------------------------------------------------------------------------------------------+
                                                 │
                       ┌─────────────────────────┴─────────────────────────┐
                       ▼                                                   ▼
+---------------------------------------------+   +-----------------------------------------------+
|        8. MCP INTEGRATION LAYER             |   |        9. API / WEBHOOK INTEGRATION           |
| JSON-RPC 2.0 / MCP standard capabilities:   |   | REST endpoints and webhook listeners with     |
| create_task, get_task_status, list_agents   |   | HMAC signature verification & payload schema  |
+---------------------------------------------+   +-----------------------------------------------+
                                                 │
                                                 ▼
+-------------------------------------------------------------------------------------------------+
|                                 6 & 7. EVALUATION & SELF-IMPROVEMENT                            |
| Telemetry: Failure Rate, Retry Rate, Latency P95, User Corrections, Token Efficiency            |
| Governance Loop:                                                                                |
|   OBSERVE ──► EVALUATE ──► IDENTIFY ──► PROPOSE ──► SANDBOX TEST ──► HUMAN APPROVAL ──► DEPLOY  |
+-------------------------------------------------------------------------------------------------+
```

---

## 3. Central Task Engine Model

Every operational unit of work dispatched through the AI Business OS follows the canonical `TaskInstance` specification:

### Data Contract:
- **`taskId`**: Unique identifier (e.g. `TASK-1774291823-7F2A`).
- **`source`**: Originator (`CRM_UI`, `PUBLIC_WEB`, `WHATSAPP`, `MCP_SERVER`, `API_WEBHOOK`, `AUTOMATION_CRON`, `AGENT_INTERNAL`).
- **`requestedBy`**: `{ userId, role, identifier }`.
- **`type`**: Domain operation type (e.g. `LEAD_QUALIFICATION`, `QUOTE_GENERATION`, `MCP_QUERY`, `ITINERARY_INQUIRY`).
- **`priority`**: Scheduling urgency (`CRITICAL`, `HIGH`, `NORMAL`, `LOW`).
- **`status`**: FSM state (`PENDING`, `PLANNING`, `RUNNING`, `WAITING`, `COMPLETED`, `FAILED`, `CANCELLED`).
- **`assignedAgent`**: Target agent identifier (`SALES_ASSISTANT`, `CUSTOMER_ASSISTANT`, etc.).
- **`input`**: Request arguments and operational scope.
- **`plan`**: Goal decomposition, reasoning notes, estimated steps.
- **`steps`**: Array of executed tool sub-actions (`stepId`, `tool`, `input`, `output`, `status`, `error`).
- **`result`**: Final verified output payload.
- **`error`**: `{ code, message, details }` on failure.
- **`metadata`**: Audit tags, latency metrics, transition timestamps.
- **`createdAt`**, **`startedAt`**, **`completedAt`**: Execution timing timestamps.

### State Transitions:
```
           ┌────────────────┐
           │    PENDING     ├──────────────┐
           └───────┬────────┘              │
                   │                       │
                   ▼                       ▼
           ┌────────────────┐       ┌─────────────┐
           │    PLANNING    ├──────►│  CANCELLED  │
           └───────┬────────┘       └──────▲──────┘
                   │                       │
                   ▼                       │
           ┌────────────────┐              │
     ┌────►│    RUNNING     ├──────────────┤
     │     └─┬────────────┬─┘              │
     │       │            │                │
     │       ▼            ▼                │
     │ ┌───────────┐  ┌───────────┐        │
     └─┤  WAITING  │  │ COMPLETED │        │
       └─────┬─────┘  └───────────┘        │
             │                             │
             ▼                             │
       ┌───────────┐                       │
       │  FAILED   ├───────────────────────┘
       └───────────┘
```

---

## 4. Agent Registry & Future Extension Catalog

The `AgentRegistry` allows runtime discovery and registration of agents. New agents plug into the system via standard `AgentContract` specifications:

### Agent Contract Interface:
```typescript
interface AgentContract {
  id: string;               // e.g. "BOOKING_AGENT"
  name: string;             // Human readable title
  description: string;      // Operational scope
  version: string;          // Semantic versioning (e.g. "1.0.0")
  capabilities: string[];   // Capability tags
  tools: string[];          // Whitelisted tool names
  permissions: string[];    // Required system permissions
  executionHandler: Function;// Execution callback
  status: "ACTIVE" | "INACTIVE" | "SANDBOX" | "DEPRECATED";
}
```

### Future Agent Catalog:
1. **Sales Agent:** Lead qualification, objection response drafting, conversion probability scoring.
2. **Booking Agent:** Hotel slot reservation, transport fleet coordination, inventory holding timers.
3. **Customer Support Agent:** 24/7 Ghat information, itinerary Q&A, Ganga Aarti timing alerts.
4. **Finance Agent:** Advance receipt reconciliation, margin compliance alerts, vendor payment matching.
5. **Document Agent:** Instant booking voucher generation, travel itinerary PDF dispatch.
6. **Marketing Agent:** Travel trend analysis, targeted seasonal WhatsApp package drafting.
7. **Analytics Agent:** Inbound conversion funnel analytics, lead cohort ROI computation.
8. **Research Agent:** Competitor package pricing discovery, Varanasi weather/festival advisories.
9. **Operations Agent:** Ground logistics coordination, driver dispatch, emergency response monitoring.

---

## 5. Category-Aware Tool Registry

Rather than allowing LLMs or agents direct database queries, tools are cataloged into 10 explicit categories:

1. **`CRM`**: Lead retrieval, qualification tagging, customer note recording.
2. **`BOOKING`**: Booking status retrieval, itinerary schedule inspection, readiness checks.
3. **`CUSTOMER`**: Customer profile management, travel history, requirement summaries.
4. **`PAYMENT`**: Payment link generation, balance calculation, receipt logging (High/Critical risk).
5. **`DOCUMENT`**: Voucher creation, quote revision, itinerary preview rendering.
6. **`EMAIL`**: Customer email dispatch, invoice emailing.
7. **`NOTIFICATION`**: WhatsApp alerts, operational SMS, team dispatch notifications.
8. **`SEARCH`**: Travel intent signal monitoring, package search, local FAQ lookup.
9. **`ANALYTICS`**: Conversion rate reporting, operational performance metrics.
10. **`EXTERNAL`**: Payment gateways, hotel partner APIs, airline/train lookup services.

### Safe Mode Policy:
- **Safe Mode Active (Default in Staging/Dev):** Read-only tools execute normally. All write/mutation tools (`createBooking`, `modifyFinancialData`, `sendCustomerMessage`) are strictly blocked or forced into human approval queues.
- **Risk Tiers:** `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`.
- **Critical Risk Tools:** Financial modifications and user credential changes are permanently prohibited from unassisted AI execution.

---

## 6. Model Context Protocol (MCP) Integration

External IDEs, AI assistants, and enterprise systems communicate through standardized MCP contracts:

```
External App / IDE
       │
       ▼ (JSON-RPC 2.0 / MCP Protocol)
[Authentication & HMAC Check]
       │
       ▼
[Role-Based Authorization Gateway]
       │
       ▼
[Central Task Engine]
       │
       ▼
[Target Agent Planner]
       │
       ▼
[Approved Gated Tool]
       │
       ▼
[Application Services / MongoDB]
       │
       ▼
Result Returned to External Caller
```

### Standard Exposed MCP Capabilities:
- `create_task`: Enqueues an operational task.
- `get_task`: Retrieves task details.
- `get_task_status`: Returns current lifecycle state and step outputs.
- `cancel_task`: Cancels a pending or waiting task.
- `list_agents`: Discovers active agents and capability manifests.
- `get_agent`: Retrieves an agent's specific contract.
- `execute_agent`: Triggers an approved synchronous task with session isolation.

---

## 7. Controlled Self-Improvement Architecture

Self-improvement is strictly governed by a 9-stage verification cycle:

```
[1. OBSERVE]
    │ Monitor task failure rates, tool latency, user corrections, token costs.
    ▼
[2. EVALUATE]
    │ Run evaluation benchmarks against test suites.
    ▼
[3. IDENTIFY PROBLEM]
    │ Isolate specific prompt ambiguity, tool timeout, or routing bottleneck.
    ▼
[4. GENERATE PROPOSAL]
    │ Create structured ImprovementProposal with telemetry evidence and proposed patch.
    ▼
[5. TEST / SANDBOX]
    │ Execute regression test suite in isolated non-production sandbox.
    ▼
[6. EVALUATE]
    │ Verify whether improvement metric improved without regressing core metrics.
    ▼
[7. HUMAN APPROVAL GATE] ⚠️
    │ CEO / Engineering lead reviews proposed change and explicitly authorizes deployment.
    ▼
[8. VERSIONED CHANGE]
    │ Tag configuration and commit to version control.
    ▼
[9. DEPLOY]
    │ Canary release with automated rollback triggers.
```

---

## 8. Memory & Context Architecture

The memory layer is partitioned into 5 isolation tiers:

1. **Task Memory:** Ephemeral scratchpad storing intermediate tool outputs during a single run. Discarded upon task completion.
2. **Customer Context:** Customer profile, travel party size, preferences, and communication history. Automatically filtered to scrub vendor costs, company margins, and passwords.
3. **Business Knowledge:** Verified package definitions, ghat details, temple rules, and Aarti timings. Read-only and strictly verified.
4. **Agent Context:** Multi-turn working memory within a user session.
5. **Long-Term Memory:** Anonymized, cross-session interaction patterns used for preference learning and prompt optimization.

---

## 9. Audit & Security Invariants

All agent actions generate immutable audit log records containing:
- `runId`: Globally unique run identifier.
- `userId`: Authoritative requesting user ID.
- `actorRole`: Role of the triggering user (`CEO`, `Manager`, etc.).
- `module`: Target AI module.
- `tool`: Invoked tool name.
- `targetType`: Entity type (`lead`, `customer`, `booking`, `system`).
- `targetId`: Entity identifier.
- `decision`: `ALLOWED` | `BLOCKED` | `APPROVAL_REQUIRED` | `FAILED`.
- `reason`: Explanation for security decision.
- `riskLevel`: Risk tier of the operation.
- `timestamp`: UTC creation timestamp.

---

## 10. Evolution Roadmap

| Phase | Milestone | Scope |
|---|---|---|
| **Phase 1 (Current)** | **Production Readiness & Foundation** | Clean frontend/backend build, sanitized secrets, Kashi Vashi branding, core architecture scaffolding. |
| **Phase 2 (Sprint 1)** | **Task Engine Storage & MCP Server** | MongoDB-backed Task persistence, MCP HTTP/SSE transport server, Booking Agent scaffolding. |
| **Phase 3 (Sprint 2)** | **Multi-Agent Coordination** | Inter-agent delegation (Sales Agent ➔ Document Agent ➔ Booking Agent), centralized telemetry dashboard. |
| **Phase 4 (Sprint 3)** | **Controlled Self-Improvement Telemetry** | Automated proposal generation for prompt adjustments, sandbox evaluation harness. |
