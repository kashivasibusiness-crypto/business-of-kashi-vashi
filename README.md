# Kashi-Vashi Travel OS 🚩 (Business of Kashi-Vashi)

[![Release](https://img.shields.io/badge/Release-v1.0.0-orange.svg)](https://github.com/kashivasibusiness-crypto/business-of-kashi-vashi)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22-green.svg)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/MongoDB-Atlas-darkgreen.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](#)

> **काशी Vashi** — *Spiritual & Heritage Journeys*  
> **Tagline:** *यात्रा नहीं, अनुभव है (Spiritual Journeys, Authentic Experiences)*  
> **Motto:** *Explore • Pray • Experience*

A commercial-grade, end-to-end Travel Operations OS and Customer Experience Portal engineered for **Kashi-Vashi** (formerly Varanasi Yatra) — a luxury and spiritual travel agency specializing in bespoke pilgrimages, heritage walks, VIP temple darshans, and curated tours across **Varanasi (Kashi), Ayodhya, Prayagraj, Bodh Gaya, Chunar, Mirzapur, and Nepal**.

This repository hosts both the high-conversion, SEO-optimized customer portal and the unified, multi-role SaaS Travel CRM.

---

## 📸 Visual Showcases & Workspaces

### 🖥️ 1. Multi-Role SaaS Operations CRM
A Stripe & Linear-inspired operations control center containing real-time analytics, booking pipeline visualization, dynamic status metric filters, fast search, customer communication shortcuts, and role-based views.
![SaaS CRM Dashboard Overview](./public/screenshots/media__1784470115168.png)

### ➕ 2. Offline Manual Booking & Lead Drawer
Allows operators to record telephone inquiries, walk-ins, and WhatsApp bookings with real-time package calculations, passenger counts, and automatic balance due tracking (Package Cost − Advance Paid).
![Add Manual Lead Drawer](./public/screenshots/media__1784469488027.png)

### ✉️ 3. Premium Customer Confirmation Receipts & Vouchers
Automated HTML/PDF vouchers and receipts generated for confirmed bookings, highlighting travel dates, passenger manifests, pickup points, payment logs, and QR verification codes.
![Receipt Mockup](./public/screenshots/media__1784457761923.png)

### 🌐 4. Customer-Facing Pilgrimage & Travel Portal
Responsive and SEO-optimized customer landing page featuring curated pilgrimage packages, interactive temple itinerary builders, verified customer testimonials, and an automated enquiry booking flow.
![Customer Portal Home](./public/screenshots/media__1784474435582.png)
![Popular Destinations Nearby](./public/screenshots/media__1784474451757.png)
![Our Story / Kashi Pilgrimage Narrative](./public/screenshots/media__1784474461787.png)
![Why Choose Us / Integrity Journeys](./public/screenshots/media__1784474471644.png)
![Core Principles / Company Values](./public/screenshots/media__1784474479839.png)

---

## 🚀 Key Features & Capabilities

### 🏢 1. Role-Based Operations CRM
- **CEO Command Center:** Executive revenue dashboards, conversion velocity, monthly booking projections, partner performance analytics, and dynamic QR attribution tracking.
- **Operations Manager:** Comprehensive lead distribution, booking lifecycle stages (*New, In-Progress, Confirmed, Completed, Cancelled*), and payment audit logs.
- **Team Leader & Sales Member:** Lead queue management, call log recording, and pre-formatted WhatsApp customer follow-up actions.
- **Hotel Partner Portal:** Hotel room QR check-in logs, commission reconciliations, and guest inquiry management.

### 🤖 2. Grounded AI Sales & Customer Concierge
- **AI Customer Assistant:** Grounded knowledge base covering authentic temple rituals, Ghat boat timings, VIP Darshan rules, and dress codes.
- **Smart Sales Assistant:** Instant quote generator, objection-handling templates, and customizable itinerary drafts for sales agents.

### 📲 3. Dynamic QR Code Engine & Partner Attribution
- **In-Room Hotel QRs:** Distinct QR codes for partner hotels to capture in-room tourist inquiries with automated attribution.
- **Ghat & Kiosk QRs:** Geotagged QR codes placed across prominent Varanasi Ghats (Assi, Dashashwamedh, Manikarnika) routing tourists to localized assistance pages.

### ✉️ 4. Multi-Channel Automation & Document Generator
- **WhatsApp Cloud API Integration:** Pre-fills WhatsApp message intents and automated dispatch queues.
- **Automated Email Notifications:** NodeMailer integration on local & serverless endpoints that dispatches formatted alerts on new bookings and confirmation receipts to customers.
- **Branded Vouchers & Invoices:** Print-ready travel vouchers, booking confirmations, and customer bills with brand typography and seals.

### 🔍 5. Modern SEO & Web Performance
- **React 19 Native SEO:** Dynamic title headers, canonical links, and Open Graph cards.
- **Structured Schema.org Data:** Injected `TouristTrip`, `BreadcrumbList`, and `Organization` JSON-LD data for high Google ranking.
- **PWA Ready:** Registered Web Manifest, service worker capabilities, and high-res Apple Touch icons.
- **Code Quality:** Fully audited with `oxlint` with zero errors.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, Vite 8, React Router v7 |
| **Styling & UI** | Tailwind CSS v4, Heroicons / Lucide Icons |
| **Backend & APIs** | Node.js (v22), Express.js (Modular Route Architecture) |
| **Serverless Deployment** | Firebase Cloud Functions (Gen 2, Node.js 22) |
| **Database & ODM** | MongoDB Atlas, Mongoose |
| **Document Generation** | PDFKit / HTML Canvas Voucher Renderers |
| **Email & Messaging** | Nodemailer (SMTP), Meta WhatsApp Cloud API / Direct WA Deep Links |
| **Hosting Targets** | Vercel (Frontend), Render / Cloud Run / Firebase (Backend) |
| **Code Quality** | oxlint, ESLint, Prettier |

---

## 📂 Project Architecture

```bash
├── backend/
│   ├── automation/            # Email & WhatsApp dispatchers
│   │   ├── messageTemplates.js
│   │   └── notificationService.js
│   ├── documents/             # PDF voucher & receipt generators
│   │   └── documentTemplates.js
│   ├── functions/             # Firebase Cloud Functions (Serverless backend)
│   │   ├── index.js           # Serverless API routes & rate limiters
│   │   └── package.json
│   ├── modules/ai/            # Grounded AI concierge & sales assistant
│   │   ├── aiService.js
│   │   ├── customerAssistantService.js
│   │   └── salesAssistantService.js
│   ├── server.js              # Production Express server (Render / Docker)
│   └── .env.example           # Backend environment configuration
├── public/
│   ├── screenshots/           # Application showcases
│   ├── favicon.png            # Kashi-Vashi browser favicon
│   ├── manifest.json          # PWA Web Manifest
│   ├── sitemap.xml            # SEO Search Sitemap
│   └── robots.txt             # Search crawler directives
├── scripts/                   # Production health check & validation audits
│   ├── staging-smoke-test.js
│   └── kashi-vashi-brand-audit.md
└── src/
    ├── assets/                # High-res logos, brand artwork & media
    ├── components/
    │   └── crm/               # Role-based CRM workspaces (CEO, Manager, Agent, Hotel)
    ├── public/                # Customer-facing pilgrimage portal
    │   ├── components/        # Header, Footer, Hero, QuickTripPlanner, AI Concierge
    │   ├── pages/             # Destinations, Tours, Guides, Legal pages
    │   └── seo/               # React 19 SEO & JSON-LD Schemas
    ├── shared/
    │   └── config/brand.js    # Single source of truth for branding & contacts
    ├── App.jsx                # Layout & route definitions
    └── main.jsx
```

---

## 💻 Local Development Setup

### 1. Prerequisites
- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **npm:** v9.0.0 or higher
- **MongoDB:** Local MongoDB instance or free MongoDB Atlas URI

### 2. Backend API Setup
Navigate to the `backend/` directory, install packages, and boot the server:
```bash
cd backend
npm install
node server.js
```
*Backend server will listen at `http://localhost:5001`.*

### 3. Frontend Client Setup
In a new terminal, from the root repository directory:
```bash
npm install
npm run dev
```
*Frontend client will listen at `http://localhost:5173`.*

- **Customer Travel Portal:** `http://localhost:5173/`
- **Operations CRM Dashboard:** `http://localhost:5173/?view=admin` *(or `/crm`)*

---

## 📦 Production Bundling & Validation

Enforce code quality standards, run linting checks, and compile optimized distribution assets:

```bash
# Code linter check (oxlint)
npm run lint

# Production compiler build
npm run build

# Boot local production preview
npm run preview
```
Compiled production bundles will output to `/dist`, ready for static web hosting.

---

## 📞 Official Business Contacts & Verification

| Channel | Detail |
|---|---|
| **Official Brand Name** | **Kashi-Vashi** (काशी Vashi) |
| **Official Domain** | [https://varanasiyatra.com](https://varanasiyatra.com) |
| **Customer Support Phone** | [+91 84005 54029](tel:+918400554029) |
| **Official WhatsApp Desk** | [+91 81497 83494](https://wa.me/918149783494) |
| **Official Email** | [kashivasi.business@gmail.com](mailto:kashivasi.business@gmail.com) |
| **Official Instagram** | [@info.varanasi.yatra](https://www.instagram.com/info.varanasi.yatra/) |
| **GitHub Repository** | [kashivasibusiness-crypto/business-of-kashi-vashi](https://github.com/kashivasibusiness-crypto/business-of-kashi-vashi) |

---

<div align="center">
  <sub>Designed & Developed for <b>Kashi-Vashi Travel OS</b>. All Rights Reserved © 2026.</sub>
</div>
