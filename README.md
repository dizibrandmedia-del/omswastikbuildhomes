# Om Swastik Buildhomes — Dynamic Real-Estate Platform & Sales CRM

> Upgraded digital platform for **Om Swastik Buildhomes Private Limited** (CIN: `U41000UW2026PTC256814`).
> Combines an ultra-premium public web portal with an internal Sales CRM and real-time Plot Inventory Management Engine.

---

## 🌟 Key Features

### 1. Public Real-Estate Portal
- **High-Performance SSR Architecture**: Built on Next.js 15 (App Router) with Server-Side Rendering for instant LCP and SEO dominance.
- **Brand Aesthetic**: Tailored luxury theme honoring Deep Teal (`#00464a`), Warm Gold (`#e4aa3c`), and refined typography (*Cormorant Garamond* & *Inter*).
- **Macro Dholera Showcase**: In-depth coverage of Dholera SIR, DMIC node, 250m expressway, international cargo airport, and solar park.
- **Riddhi Flagship Plotted Development**: Full project specifications, master site plan viewer, and nearby economic catalysts.
- **Interactive Plot Inventory (`/plots`)**: Live filterable grid (by size, facing, corner status, and availability) with real-time status badges.
- **Direct Conversion Triggers**: "Enquire Now" modal, "Schedule Site Visit" modal, click-to-call links, and direct WhatsApp routing.

### 2. Internal Sales CRM & Management Dashboard (`/admin/*`)
- **Role-Based Access Control (RBAC)**: Enforced across 4 distinct tiers (`SUPER_ADMIN`, `ADMIN`, `SALES_MANAGER`, `SALES_EXECUTIVE`).
- **Lead Pipeline**: Kanban/Table pipeline (`NEW` → `CONTACTED` → `INTERESTED` → `FOLLOW_UP` → `SITE_VISIT_SCHEDULED` → `NEGOTIATION` → `BOOKING` → `SOLD` / `LOST`).
- **Follow-up Call Queue**: Daily queue categorized into Today, Overdue, and Scheduled Later.
- **Site Visit Coordination**: Physical inspection scheduler with transit guidance and post-visit reports.
- **Transactional Double-Booking Prevention**: Database-level locking (`prisma.$transaction`) prevents duplicate plot allocations.
- **Business Reporting & CSV Export**: One-click export for plot inventory and customer leads.
- **Corporate Settings**: Dynamic control of phone numbers, addresses, and director contacts without modifying code.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Database & ORM**: Prisma ORM with SQLite (Development) / PostgreSQL (Production)
- **Authentication**: Secure HTTP-only cookies with JWT and bcrypt password hashing
- **Styling**: Vanilla CSS Design Tokens with CSS custom properties
- **Icons**: Lucide React

---

## 🚀 Getting Started Locally

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/dizibrandmedia-del/omswastikbuildhomes.git
cd omswastikbuildhomes
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure `DATABASE_URL="file:./dev.db"` and set a secure `JWT_SECRET`.

### 3. Initialize & Seed Database
```bash
npx prisma db push
npm run prisma:seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Staff & CRM Login Credentials
Visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login) (Auto-fill buttons available on login page):
- **Super Admin**: `admin@omswastikbuildhomes.com` / `Admin@12345`
- **Director / Admin (Rahul Bisht)**: `rahulbisht@omswastikbuildhomes.com` / `Admin@12345`
- **Sales Manager (Praful Singh)**: `prafulsingh@omswastikbuildhomes.com` / `Admin@12345`
- **Sales Executive (Santosh Gupta)**: `santoshgupta@omswastikbuildhomes.com` / `Admin@12345`

---

## 🏢 Corporate Verification
- **Legal Entity**: Om Swastik Buildhomes Private Limited
- **MCA CIN**: `U41000UW2026PTC256814`
- **Registered Office**: Shop No. 151, Gaur World Smart Street, Plot No. C-01, Sector 16B, Gautam Buddha Nagar, Greater Noida West, U.P. 201318
- **Helpline**: +91 95992 13531 / +91 98104 84742
- **Website**: [https://omswastikbuildhomes.com](https://omswastikbuildhomes.com)
