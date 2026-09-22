# 🚀 Kashi-Vashi Travel OS — Complete Deployment Guide (Step-by-Step)

Yeh guide aapko **Frontend (Vercel)** aur **Backend (Render)** ko step-by-step deploy karne me madad karegi. Isko padhkar koi bhi naya developer ya aap khud bina kisi confusion ke 15 minute me poora project live kar sakte hain.

---

## 📑 Table of Contents
1. [Prerequisites & Accounts Checklist](#1-prerequisites--accounts-checklist)
2. [Database Setup (MongoDB Atlas)](#2-database-setup-mongodb-atlas)
3. [Backend Deployment (Render.com)](#3-backend-deployment-rendercom)
4. [Frontend Deployment (Vercel.com)](#4-frontend-deployment-vercelcom)
5. [CORS & Final Connection (Backend + Frontend Link)](#5-cors--final-connection-backend--frontend-link)
6. [Testing & Verification Checklist](#6-testing--verification-checklist)
7. [Default Admin & CRM Credentials](#7-default-admin--crm-credentials)
8. [Troubleshooting & Common Issues](#8-troubleshooting--common-issues)

---

## 1. Prerequisites & Accounts Checklist

Deploy karne se pehle in 3 platforms par aapke free accounts hone chahiye:

| Platform | Kaam | Sign Up Link |
|---|---|---|
| **GitHub** | Code Repository Host | [github.com](https://github.com) *(Repo: `kashivasibusiness-crypto/business-of-kashi-vashi`)* |
| **MongoDB Atlas** | Database (Cloud Storage) | [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) |
| **Render.com** | Backend Server (Node.js/Express) | [render.com](https://render.com) *(Login with GitHub)* |
| **Vercel.com** | Frontend Website (React 19/Vite) | [vercel.com](https://vercel.com) *(Login with GitHub)* |

> 💡 **Pro Tip:** Render aur Vercel par direct **"Continue with GitHub"** karke account banayein, jisse repository connect karna 1-click me ho jata hai.

---

## 2. Database Setup (MongoDB Atlas)

Aapke paas already working MongoDB connection hai, lekin agar naya cluster use karna ho ya settings verify karni ho:

### Step 2.1: Network Access & IP Allowlisting 🛡️
Render backend ko MongoDB Atlas se connect karne ke liye networking requirements ko samajhna zaroori hai:

1. **Render Free / Starter Plan (Dynamic Outbound IPs):**
   - Render ke standard/free tier instances dynamic cloud pools (AWS/Cloudflare) se outbound requests bhejte hain jinka IP fixed nahi hota.
   - **Practical Fallback:** MongoDB Atlas dashboard me **Security** ➔ **Network Access** me jayein aur **"Allow Access From Anywhere"** (`0.0.0.0/0`) set karein.
   - **Defense-in-Depth Security:** Jab `0.0.0.0/0` use karein, toh database security in 4 cheezon par depend karti hai:
     - High-entropy strong password (32+ characters).
     - SCRAM-SHA-256 authentication (Atlas unauthenticated requests drop kar deta hai).
     - TLS 1.2+ encrypted connection in transit (`mongodb+srv://`).
     - User privilege: Database user ko sirf apne app database par `readWrite` access dein (kabhi `atlasAdmin` na dein).

2. **Render Team / Enterprise Plan (Static Outbound IPs):**
   - Agar aap paid Team/Enterprise plan par hain jisme dedicated static egress IPs milti hain, toh sirf wahi specific outbound IP addresses Atlas me whitelist karein. (`0.0.0.0/0` ki zaroorat nahi hogi).

### Step 2.2: Connection String Copy Karein
1. Left menu me **Database** par jayein.
2. Apne cluster ke samne **"Connect"** button par click karein.
3. **"Drivers"** (Node.js) select karein.
4. Connection string copy karein, jaise:
   ```text
   mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/kashiVashiDB?retryWrites=true&w=majority
   ```
   *(Apna database username aur password replace karke note kar lein).*

---

## 3. Backend Deployment (Render.com)

Backend ke liye hum **Render** use kar rahe hain kyunki aapke repo me pehle se optimized `render.yaml` configure hai aur yeh 100% free web services provide karta hai.

### Step 3.1: New Web Service Banayein
1. [Render Dashboard](https://dashboard.render.com/) me login karein.
2. Top-right me **New +** button par click karein aur **"Web Service"** chunein.
3. **"Build and deploy from a Git repository"** select karein aur **Next** karein.
4. Apni GitHub repository search karein:  
   👉 `kashivasibusiness-crypto/business-of-kashi-vashi` (Connect par click karein).

### Step 3.2: Render Settings Fill Karein
In settings ko exact niche diye mutabiq bharein:

* **Name:** `kashivashi-backend` *(ya koi bhi manpasand naam)*
* **Region:** `Singapore` ya `Frankfurt` *(India ke paas)*
* **Branch:** `main`
* **Root Directory:** `backend`  ⚠️ *(Dhyan rahe yahan `backend` likhna zaroori hai!)*
* **Runtime:** `Node`
* **Build Command:** `npm install --omit=dev`
* **Start Command:** `node server.js`
* **Instance Type:** `Free`

### Step 3.3: Environment Variables Add Karein
Render page par niche **"Advanced"** ya **"Environment Variables"** section me jayein aur **Add Environment Variable** par click karke yeh keys dalein:

| Key | Value | Example / Note |
|---|---|---|
| `NODE_ENV` | `production` | Production mode enable karne ke liye |
| `PORT` | `10000` | Render default port |
| `MONGODB_URI` | `mongodb+srv://admin:xxxx@cluster0...` | Aapka MongoDB Atlas URI |
| `JWT_SECRET` | `[GENERATE_32_PLUS_CHARS]` | 32+ character ka cryptographically strong random secret |
| `JWT_REFRESH_SECRET` | `[GENERATE_32_PLUS_CHARS]` | 32+ character ka cryptographically strong random secret |
| `ALLOWED_ORIGINS` | `*` *(Temporary, baad me Vercel URL dalein)* | CORS allow karne ke liye |
| `CEO_EMAIL` | `ceo@banarasyatra.com` | Default CEO email |
| `CEO_INITIAL_PASSWORD` | `[GENERATE_DURING_DEPLOYMENT]` | Strong random password |
| `MANAGER_EMAIL` | `manager@banarasyatra.com` | Default Manager email |
| `MANAGER_INITIAL_PASSWORD` | `[GENERATE_DURING_DEPLOYMENT]` | Strong random password |
| `EMAIL_USER` | `kashivasi.business@gmail.com` | *(Optional) Official Gmail ID receipts ke liye* |
| `EMAIL_PASS` | `[YOUR_GMAIL_APP_PASSWORD]` | *(Optional) Gmail 16-digit App Password* |

### Step 3.4: Deploy Karein
1. Niche **"Create Web Service"** par click karein.
2. Render build start karega. 1-2 minute me logs me dikhega:
   ```text
   MongoDB Connected successfully
   Kashi-Vashi Travel OS Backend listening on port 10000
   ```
3. Top-left par aapko apna live Backend URL mil jayega, jaise:  
   👉 **`https://kashivashi-backend.onrender.com`** *(Isko copy karke rakh lein, Frontend me kaam aayega).*

---

## 4. Frontend Deployment (Vercel.com)

Frontend Vite + React 19 par bana hai. Isko Vercel par deploy karna sabse aasan aur super-fast hai.

### Step 4.1: New Project Import Karein
1. [Vercel Dashboard](https://vercel.com/dashboard) me jayein.
2. **"Add New..."** ➔ **"Project"** par click karein.
3. Apni GitHub repository search karein:  
   👉 `kashivasibusiness-crypto/business-of-kashi-vashi` aur **"Import"** par click karein.

### Step 4.2: Project Configuration (Kon Sa Folder Select Karein)
Vercel par aate hi config screen dikhegi:

* **Project Name:** `business-of-kashi-vashi` *(ya `kashivashi`)*
* **Framework Preset:** `Vite` *(Yeh auto-detect ho jayega)*
* **Root Directory:** `./`  
  ⚠️ **DHYAN RAHE:** Yahan koi subfolder select **NAHI** karna hai! Root directory ko `./` (default) hi rehne dena hai, kyunki `package.json` aur `vite.config.js` root me hi hain.
* **Build Command:** `npm run build` *(Default on)*
* **Output Directory:** `dist` *(Default on)*
* **Install Command:** `npm install` *(Default on)*

### Step 4.3: Environment Variables (Backend Connect Karna)
Vercel page par **"Environment Variables"** dropdown expand karein aur 2 variables add karein:

| Variable Name | Value |
|---|---|
| `VITE_API_URL` | `https://kashivashi-backend.onrender.com` *(Step 3.4 wala URL)* |
| `VITE_API_BASE_URL` | `https://kashivashi-backend.onrender.com` *(Step 3.4 wala URL)* |

> ⚠️ **Important:** URL ke aage koi trailing slash (`/`) na lagayein (e.g. `https://kashivashi-backend.onrender.com`).

### Step 4.4: Deploy Click Karein
1. **"Deploy"** button par click karein.
2. 30 se 45 seconds ke andar building complete ho jayegi aur screen par confetti 🎉 aayegi!
3. Vercel aapko ek live domain de dega, jaise:  
   👉 **`https://business-of-kashi-vashi.vercel.app`**

---

## 5. CORS & Final Connection (Backend + Frontend Link)

Ab jab aapka Frontend live ho chuka hai, toh Backend ko bolna hoga ki is frontend se aane wali requests ko allow kare:

1. Apne **Render Dashboard** me jayein ➔ `kashivashi-backend` par click karein.
2. Left menu me **Environment** par click karein.
3. `ALLOWED_ORIGINS` variable ko edit karein aur apna Vercel domain daal dein:
   ```text
   https://business-of-kashi-vashi.vercel.app,https://varanasiyatra.com
   ```
4. **Save Changes** par click karein. Render automatically redeploy kar dega.

---

## 6. Testing & Verification Checklist

Deploy hone ke baad yeh 4 tests zaroor perform karein:

### ✅ Test 1: Public Customer Portal
* Browser me apna Vercel URL open karein: `https://business-of-kashi-vashi.vercel.app`
* Images, Hero banner, Ghats aur Packages load ho rahe hain ya nahi dekhein.

### ✅ Test 2: Booking Form (Lead Generation)
* Homepage par ya "Plan Your Trip" page par jaakar ek test enquiry submit karein.
* Form submit hone par "Thank You / Success" popup aana chahiye.

### ✅ Test 3: Operations SaaS CRM Portal
* URL open karein: `https://business-of-kashi-vashi.vercel.app/?view=admin` *(ya `/crm`)*
* Passcode screen par PIN enter karein: `9889434368` (ya `1234`).
* CEO login credentials dalein:
  - **Email:** `ceo@banarasyatra.com`
  - **Password:** *(Step 3.3 me set kiya gaya CEO_INITIAL_PASSWORD)*
* Dashboard me check karein ki Test 2 me submit hui booking wahan "New Leads" me dikh rahi hai.

### ✅ Test 4: PDF Receipt / Voucher Download
* CRM ke andar kisi booking par click karein aur **"Generate Voucher"** ya **"View Receipt"** check karein.

---

## 7. Default Admin & CRM Credentials

| Role | Access Route | Email / PIN | Password |
|---|---|---|---|
| **Quick PIN Gate** | `/?view=admin` | `9889434368` / `1234` | — |
| **CEO Portal** | `/crm` | `ceo@banarasyatra.com` | `[RENDER me set kiya password]` |
| **Operations Manager** | `/crm` | `manager@banarasyatra.com` | `[RENDER me set kiya password]` |

---

## 8. Troubleshooting & Common Issues

### Q1: Vercel page blank dikh raha hai ya 404 de raha hai refresh karne par?
**Solution:** Repo me `vercel.json` already added hai jo routing ko handle karta hai:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
Isliye Vercel par SPA routing bina kisi error ke smoothly work karegi.

### Q2: CRM me login karne par "Network Error" ya "CORS Error" aa raha hai?
**Solution:** 
1. Check karein ki Render dashboard me backend ka status **"Live"** hai ya nahi.
2. Render me `ALLOWED_ORIGINS` me apna Vercel URL sahi se daala hai ya nahi (with `https://` and without trailing slash).

### Q3: Render Free Tier par pehla request 30-40 second leta hai?
**Solution:** Render ka free tier 15 minute inactive rehne par "Sleep" mode me chala jata hai. Pehla customer request aate hi yeh 30 second me wake-up hota hai. Production me speed ke liye aap baad me Render Starter ($7/mo) ya Railway upgrade kar sakte hain.

---

## 9. KASHI VASHI AI CORE & MODULAR BUSINESS OS ARCHITECTURE (VISION DOCUMENT)

Kashi Vashi application ko modular **AI Business Operating System** banane ke liye yeh 10 foundational core layers design ki gayi hain jo future multi-agent extensibility ko enable karti hain bina existing CRM, bookings, ya database models ko rewrite kiye.

```
+---------------------------------------------------------------------------------------+
|                             EXTERNAL INGESTION & CLIENTS                              |
|   CRM UI  |  Public Web  |  WhatsApp Bot  |  Partner Portal  |  MCP Clients / API     |
+---------------------------------------------------------------------------------------+
                                           │
                                           ▼
+---------------------------------------------------------------------------------------+
| LAYER 10: PERMISSION & AUDIT GATEWAY                                                  |
| - Role Validation (CEO, Manager, Team Leader, Team Member)                            |
| - High-Impact Mutation Protection (Safe Mode, Financial Masking, Approval Gates)     |
| - Immutable Audit Logging (runId, actorRole, tool, targetId, decision, reason)        |
+---------------------------------------------------------------------------------------+
                                           │
                                           ▼
+---------------------------------------------------------------------------------------+
| LAYER 2: CENTRAL TASK ENGINE                                                          |
| - Canonical Task Model (id, source, requestedBy, type, priority, plan, steps, status)  |
| - Lifecycle State Machine:                                                            |
|   PENDING ──► PLANNING ──► RUNNING ──► WAITING ──► COMPLETED / FAILED / CANCELLED      |
+---------------------------------------------------------------------------------------+
                                           │
                    ┌──────────────────────┴──────────────────────┐
                    ▼                                             ▼
+---------------------------------------+   +-------------------------------------------+
| LAYER 1 & 4: AGENT ENGINE & REGISTRY  |   | LAYER 5: MEMORY & CONTEXT LAYER           |
| Extensible Agent Contracts:           |   | 1. Task Memory (scratchpad per run)       |
| • id, name, version, capabilities     |   | 2. Customer Context (privacy-sanitized)   |
| • assigned tools, permissions, status |   | 3. Business Knowledge (verified packages) |
| Active Agents:                        |   | 4. Agent Context (working state)          |
| - Customer Assistant                  |   | 5. Long-term Memory (interaction patterns)|
| - Sales Assistant                     |   +-------------------------------------------+
| - Customer Hunter                     |
| Future Extensible Agents:             |
| - Booking, Finance, Document,         |
|   Marketing, Analytics, Ops, Research |
+---------------------------------------+
                    │
                    ▼
+---------------------------------------------------------------------------------------+
| LAYER 3: CATEGORY-AWARE TOOL REGISTRY                                                 |
| - Categories: CRM, BOOKING, CUSTOMER, PAYMENT, DOCUMENT, EMAIL, NOTIFICATION, SEARCH, |
|   ANALYTICS, EXTERNAL                                                                 |
| - Safe Mode Enforcement (Mutation & Payment tools require human approval)            |
| - Isolated Database Access (Zero direct MongoDB query execution by LLMs)             |
+---------------------------------------------------------------------------------------+
                    │
                    ▼
+---------------------------------------------------------------------------------------+
| LAYER 8 & 9: MCP & API/WEBHOOK INTEGRATION LAYER                                      |
| - Model Context Protocol tool endpoints (create_task, get_task_status, list_agents)   |
| - Inbound/Outbound Webhooks with cryptographic HMAC signatures                        |
+---------------------------------------------------------------------------------------+
                    │
                    ▼
+---------------------------------------------------------------------------------------+
| LAYER 6 & 7: EVALUATION & CONTROLLED SELF-IMPROVEMENT ENGINE                          |
| - Monitored Telemetry: Latency, Failure Rate, Retry Rate, User Corrections            |
| - Governance Loop:                                                                    |
|   OBSERVE ──► EVALUATE ──► IDENTIFY PROBLEM ──► GENERATE IMPROVEMENT PROPOSAL ──►      |
|   SANDBOX TEST ──► EVALUATE ──► HUMAN APPROVAL ──► VERSIONED CHANGE ──► DEPLOY        |
| - Strict Rule: Zero autonomous code rewrites or unapproved deployments.               |
+---------------------------------------------------------------------------------------+
```

### Potential Future Agents Catalog
Future development sprints can register any of these specialized agents via `agentRegistry.register({...})` without altering the core runtime:
1. **Sales Agent:** Lead qualification, objection handling, conversion rate analytics.
2. **Booking Agent:** Hotel slot reservation, transport coordination, inventory holding.
3. **Customer Support Agent:** 24/7 Ghat guides, itinerary questions, Aarti schedule guidance.
4. **Finance Agent:** Advance reconciliation, balance alerts, payment gateway verification.
5. **Document Agent:** Automated voucher generation, travel itinerary PDF dispatch.
6. **Marketing Agent:** SEO keyword intelligence, targeted seasonal campaign drafting.
7. **Analytics Agent:** Inbound inquiry cohorts, driver performance, margin optimization.
8. **Research Agent:** Competitor pricing discovery, local festival alerts, regulatory updates.
9. **Operations Agent:** Driver dispatch, airport transfer logistics, emergency helpline.

---

<div align="center">
  <b>Kashi-Vashi Travel OS</b> — Ready for Production 🚩
</div>

