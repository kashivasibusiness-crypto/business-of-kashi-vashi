# Kashi Vashi Travel OS 🚩 (Business of Kashi-Vashi)

[![Release](https://img.shields.io/badge/Release-v2.0.0-orange.svg)](https://github.com/kashivasibusiness-crypto/business-of-kashi-vashi)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22-green.svg)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/MongoDB-Atlas-darkgreen.svg)](https://www.mongodb.com/)
[![Tests](https://img.shields.io/badge/Tests-165%20Passing-brightgreen.svg)](#-automated-testing--quality-gates)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](#)

> **काशी Vashi** — *Spiritual & Heritage Journeys*  
> **Tagline:** *यात्रा नहीं, अनुभव है (Spiritual Journeys, Authentic Experiences)*  
> **Motto:** *Explore • Pray • Experience*

A high-performance, enterprise-grade Travel Operations OS and Customer Experience Portal engineered for **Kashi Vashi** — an authentic spiritual and heritage travel company specializing in bespoke pilgrimages, private Ganges boat cruises, verified local escorts, Vedic rituals, VIP temple darshans, and curated circuits across **Varanasi (Kashi), Ayodhya, Prayagraj, Bodh Gaya, Sarnath, Mirzapur, Lucknow, and Ujjain**.

This repository hosts both the high-conversion, SEO-optimized public website and the isolated, multi-role SaaS Travel CRM.

---

## 🏛️ Public Experience Portal Architecture

The customer-facing portal is organized around four clear travel pillars:

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                                KASHI VASHI PORTAL                                 │
├─────────────────────┬─────────────────────┬───────────────────┬───────────────────┤
│    DESTINATIONS     │     EXPERIENCES     │       TOURS       │      GUIDES       │
│  "कहाँ जाना है?"    │ "क्या अनुभव करना है?"│ "पूरी यात्रा कैसे?"│  "मार्गदर्शन"     │
├─────────────────────┼─────────────────────┼───────────────────┼───────────────────┤
│ • Varanasi (Kashi)  │ • Sunrise Boat Ride │ • 1-Day Express   │ 🧑‍💼 Personal Guide│
│ • Ayodhya Dham      │ • Maha Ganga Aarti  │ • 2-Day Sarnath   │   • Local Escort  │
│ • Prayagraj Sangam  │ • Heritage Walk     │ • 3-Day Yatra     │   • Verified IDs  │
│ • Bodh Gaya         │ • Banarasi Silk     │ • Triveni Circuit │   • Zero Touts    │
│ • Sarnath           │ • Street Food Trail │ • Ayodhya Tour    │ 📖 Travel Guide   │
│ • Mirzapur & Chunar │ • Buddhist Heritage │ • Bodh Gaya Tour  │   • Best Season   │
│ • Lucknow & Ujjain  │ • Vedic Rituals     │ • Mirzapur Tour   │   • How to Reach  │
│                     │                     │ • Nepal Circuit   │   • Itineraries   │
└─────────────────────┴─────────────────────┴───────────────────┴───────────────────┘
```

### 1. 🗺️ Destinations Hub (`/destinations` & `/destinations/:slug`)
- **Hub Page:** Live search, responsive destination cards, and 5 category filters:
  1. *Spiritual & Pilgrimage* (Varanasi, Ayodhya, Prayagraj, Ujjain)
  2. *Heritage & Culture* (Lucknow, Mirzapur/Chunar)
  3. *Buddhist Heritage* (Sarnath, Bodh Gaya)
  4. *Nature & Scenic Getaways* (Mirzapur waterfalls & hills)
  5. *Multi-City Circuits* (Kashi-Prayagraj-Ayodhya)
- **Detail Pages:** 8 comprehensive destination guides with verified logistics, best time to visit, how to reach (air, train, road), day-wise suggested itineraries, local transport options, FAQs, and customized quote requests.

### 2. 🕉️ Sacred Experiences (`/experiences` & `/experiences/:slug`)
- **Core Catalog:** 6 launch experiences covering Ganga boat cruises, Maha Aarti, alleyway heritage walks, generational silk handloom weaving, Buddhist archaeology, and local culinary walks.
- **Pricing Transparency:** Clear pricing units (e.g., *per person*, *per boat*, *per group*) with honest distinctions between fixed-price activities and customized on-request packages.
- **Trip Planner Integration:** Clicking *"Customize My Trip"* pre-populates the selected experience directly into the Trip Planner without losing entered traveler details.

### 3. 🚩 Curated Tour Packages (`/tours` & `/tours/:slug`)
- **Normalized Schema:** Standardized `startingPrice`, canonical `faqs`, verified duration, and accurate best-seller badges.
- **Featured Circuit:** The signature **Kashi, Prayagraj & Ayodhya Sacred Triveni Circuit (3D/2N)** covering holy snan at Triveni Sangam, Shri Ram Mandir darshan, and Kashi Vishwanath Jyotirlinga.
- **Fleet Coverage:** Complete vehicle support detailed in `fleetData.js` spanning Sedans (4-seater), Innova Crysta (7-seater), Force Urbania (10/12-seater), and Luxury Coaches (16 to 40-seater).

### 4. 🧭 Guides Architecture (`/guides`)
Two clearly differentiated pillars eliminating confusion between hiring a human escort and reading travel advice:
- **Pillar 1: Book a Personal Guide (`/guides/personal-guide`)**  
  Dedicated commercial escort service. Government-recognized or identity-verified local storytellers, multi-lingual support (Hindi, English, Bengali, Tamil, Telugu, etc.), flexible Half-Day (4h) & Full-Day (8h) slots, and a strict Zero Tout / Zero Commission policy.
- **Pillar 2: Varanasi Travel Guide (`/travel-guide`)**  
  Free, comprehensive traveler handbook compiled by locals covering weather, best months to visit, Ghat etiquette, dress codes, morning vs. evening Aarti schedules, airport transfers, and 1 to 3-day sample itineraries.
- **Desktop & Mobile Navigation:** Split-trigger link (text navigates to `/guides`, dropdown arrow/hover opens the two choices) and accessible mobile drawer with collapsible sub-options and `Escape` key listeners.

### 5. 🌿 Social Impact & Authentic Story (`/about`)
- Six structured sections: Brand Identity & Vision, Founder’s Pilgrimage Journey, Saathi Seva Sadan Community Impact, Core Values (Integrity, Transparency, Reverence), Verified Local Team, and Legal Registration credentials.

---

## 🔒 Multi-Role SaaS Operations CRM

Isolated via Vite dynamic code-splitting (`AdminCRM-*.js` chunk) to ensure public visitors never download CRM JavaScript or vendor margins.

- **CEO Command Center:** Executive revenue dashboards, conversion velocity, monthly booking projections, partner performance analytics, and dynamic QR attribution tracking.
- **Operations Manager:** Comprehensive lead distribution, booking lifecycle stages (*New, In-Progress, Confirmed, Completed, Cancelled*), and payment audit logs.
- **Team Leader & Sales Member:** Lead queue management, call log recording, and pre-formatted WhatsApp customer follow-up actions.
- **Hotel Partner Portal (`/p/:partnerId`):** In-room QR check-in flows, guest inquiry logging, and partner attribution with cold-start resilience guards.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, Vite 8, React Router v7 |
| **Styling & Design** | Tailwind CSS v4, Heroicons / Lucide Icons, Fluid Typography |
| **Backend & APIs** | Node.js (v22), Express.js (Modular Route Architecture) |
| **Serverless Deployment** | Firebase Cloud Functions (Gen 2, Node.js 22) |
| **Database & ODM** | MongoDB Atlas, Mongoose (with unique index & partial index deduplication) |
| **Document Generation** | Binary-safe PDFKit & HTML Canvas Voucher Renderers |
| **Email & Messaging** | Nodemailer (SMTP), WhatsApp Deep-Link Intent Protocol |
| **Hosting Targets** | Vercel (Frontend SPA), Render / Cloud Run (Backend API) |
| **Code Quality & Testing** | oxlint, ESLint, Prettier, Puppeteer Core (Browser QA) |

---

## 🧪 Automated Testing & Quality Gates

The codebase is protected by **165 automated tests** across backend business logic, security, and real browser QA:

### 1. Backend & Security Test Suite (`npm test`) — 126 Tests
```bash
npm test
```
- **Batch 1 API Fallback & Concurrency (18 tests):** Safe Render origin defaults, client double-click synchronous guards, rejection of HTML SPA rewrites on API routes, and 404 fallback isolation.
- **PDF Engine Binary Integrity (22 tests):** Magic byte verification (`%PDF-`), text extraction parser checks, multi-page pagination without data loss, and checksum validation.
- **Password Reset Security (41 tests):** Single-use token enforcement, expiration validation, SHA-256 hash updates, and active session revocation.
- **Booking Concurrency & Idempotency (9 tests):** Race-condition mitigation ensuring 5 concurrent booking attempts yield exactly one confirmed record.
- **CRM Auth & Session Lifecycle (19 tests):** Refresh token rotation, silent token refresh, page reload session persistence, and CEO/Manager RBAC separation.
- **Strict CORS Security & Allowlist Parity (17 tests):** Production origin allowlists, regex bypass prevention, untrusted origin rejection, and preflight `OPTIONS` handling.

### 2. Public Website Browser QA Suite — 39 Checks
```bash
node scripts/test-public-website.mjs
```
- **Branding & Semantic Heading Audit:** Verified brand text and exactly one H1 per page.
- **20 Route End-to-End Rendering:** All hubs, detail pages, hotels, about, contact, and partner QR pages tested in headless Chrome.
- **Genuine 404 Page Check:** Soft 404 prevention; invalid paths render dedicated 404 UI.
- **Responsive Viewport Audit:** Zero horizontal overflow across Desktop Large (1440px), Laptop (1280px), Tablet Landscape (1024px), Tablet Portrait (768px), and Mobile (390px).
- **Guides Navigation & Accessibility:** Desktop split link, 2-option dropdown, keyboard `Escape` closing, and mobile collapsible drawer.
- **Code-Splitting & CRM Isolation:** Public entry bundles verified free of internal CEO financial margins and CRM code.

---

## 📂 Project Structure

```bash
├── architecture.md            # Visual footer architecture & layout specifications
├── backend/
│   ├── config/                # Environment configuration & strict CORS rules
│   ├── models/                # Mongoose models (Bookings, Leads, Auth Sessions)
│   ├── routes/                # Express API routes (Auth, CRM, Quotes, Inquiries)
│   ├── server.js              # Production Express server
│   └── documents/             # PDF voucher and receipt generators
├── public/
│   ├── sitemap.xml            # 37 validated HTTPS search engine indexing URLs
│   ├── robots.txt             # Search crawler directives
│   └── manifest.json          # PWA Web Manifest
├── scripts/
│   ├── test-public-website.mjs               # Puppeteer browser QA suite (39 checks)
│   ├── test-batch1-enquiry-and-api-url.cjs   # API URL & fallback tests (18 tests)
│   ├── test-pdf-binary-integrity.cjs         # PDF engine tests (22 tests)
│   ├── test-password-reset-security.cjs      # Auth & password reset tests (41 tests)
│   ├── test-booking-concurrency-integrity.cjs# Concurrency locking tests (9 tests)
│   ├── test-auth-session.js                  # Session restoration tests (19 tests)
│   └── test-cors-security.cjs                # CORS security audit (17 tests)
└── src/
    ├── assets/                # AVIF/JPG asset packs (destinations, fleet, hero, services, stays, tours)
    ├── components/
    │   └── AdminCRM.jsx       # Isolated CRM operations workspace (Code-split chunk)
    ├── public/
    │   ├── components/        # PublicHeader, PublicFooter, TourCard, ExperienceCard, FleetSection
    │   ├── data/              # destinationsData.js, experiencesData.js, toursData.js, fleetData.js
    │   ├── pages/
    │   │   ├── DestinationsHubPage.jsx & DestinationDetailPage.jsx
    │   │   ├── ExperiencesHubPage.jsx & ExperienceDetailPage.jsx
    │   │   ├── ToursHubPage.jsx & TourDetailPage.jsx
    │   │   ├── GuidesHubPage.jsx & PersonalGuidePage.jsx
    │   │   ├── TravelGuideHubPage.jsx & TravelGuideDetailPage.jsx
    │   │   ├── HomePage.jsx, AboutPage.jsx, HotelsPage.jsx, ContactPage.jsx
    │   │   └── PlanYourTripPage.jsx & PartnerQRPage.jsx
    │   ├── seo/               # React 19 Document Metadata & Canonical URL resolver (SEO.jsx)
    │   └── utils/             # Attribution capture (UTM tags) & analytics trackers
    ├── shared/
    │   └── config/brand.js    # Single source of truth for company phone, email, and social handles
    ├── App.jsx                # Layout, routes, code-splitting fallback
    └── main.jsx
```

---

## 💻 Local Development Setup

### 1. Prerequisites
- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **npm:** v9.0.0 or higher
- **MongoDB:** Local instance or MongoDB Atlas connection string

### 2. Backend API Setup
```bash
cd backend
npm install
node server.js
```
*Backend server listens at `http://localhost:5001`.*

### 3. Frontend Client Setup
From the repository root:
```bash
npm install
npm run dev
```
*Frontend client boots at `http://localhost:5173`.*
- **Public Portal:** `http://localhost:5173/`
- **Destinations Hub:** `http://localhost:5173/destinations`
- **Experiences Hub:** `http://localhost:5173/experiences`
- **Tours Catalog:** `http://localhost:5173/tours`
- **Guides Section:** `http://localhost:5173/guides`
- **Operations CRM:** `http://localhost:5173/crm`

---

## 📦 Production Bundling & Verification

```bash
# Code linter check (oxlint)
npm run lint

# Production compiler build (Vite)
npm run build

# Run complete backend & security test suite (126 tests)
npm test

# Run browser QA test suite (39 checks)
node scripts/test-public-website.mjs
```

---

## 📞 Official Business Contacts & Verification

| Channel | Detail |
|---|---|
| **Official Brand Name** | **Kashi Vashi** (काशी Vashi) |
| **Official Website** | [https://varanasiyatra.com](https://varanasiyatra.com) |
| **Direct Customer Helpline** | [+91 84005 54029](tel:+918400554029) |
| **WhatsApp Assistance Desk** | [+91 81497 83494](https://wa.me/918149783494) |
| **Official Email** | [kashivasi.business@gmail.com](mailto:kashivasi.business@gmail.com) |
| **Instagram Handle** | [@info.varanasi.yatra](https://www.instagram.com/info.varanasi.yatra/) |
| **Travel Blog & Stories** | [kashi-vashi.blogspot.com](https://kashi-vashi.blogspot.com) |
| **GitHub Repository** | [kashivasibusiness-crypto/business-of-kashi-vashi](https://github.com/kashivasibusiness-crypto/business-of-kashi-vashi) |

---

<div align="center">
  <sub>Designed & Developed for <b>Kashi Vashi (काशी Vashi)</b>. All Rights Reserved © 2026.</sub>
</div>
