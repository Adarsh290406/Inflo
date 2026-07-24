# Inflo — Editorial Lead Intake & CRM Ledger

> Built for the **Digital Heroes Full Stack Internship Qualification Task**.
> Live Footer Attribution: *"Built for Digital Heroes Training Task"* linked to [digitalheroesco.com](https://digitalheroesco.com/)

---

## 🚀 Overview

**Inflo** is a light-footprint lead capture product and real-time administrative pipeline. It is styled with a premium **B2B Editorial Newspaper** layout, featuring serif typography (`Instrument Serif`), monospace ledger badges (`JetBrains Mono`), and high-contrast layouts.

1. **Public Intake (`/`)**: A single-column editorial manifesto detailing the offering, paired with a validated, robust intake form (Name, Email, Budget Range, Message) with responsive, interactive UI.
2. **Admin Ledger (`/admin`)**: A secure status table tracking incoming inquiries with live real-time sync, tabular status sorting, search filters, and standard CSV download exports.

---

## 🛠️ Getting Started & Local Installation

Follow these steps to run the project locally:

1. **Clone & Install Dependencies**:
   ```bash
   git clone https://github.com/Adarsh290406/Inflo.git
   cd Inflo
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-secret-service-role-key
   ```
   *(Note: The private `SUPABASE_SERVICE_ROLE_KEY` is required on the server to securely update lead records while PostgreSQL RLS is active).*

3. **Launch local dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the page.

---

## 🔑 Authentication Approach & Security

- **Real Auth Sessions**: Admin login at `/login` uses real Supabase Auth authentication client-side (`signInWithPassword`). If successful, the server writes a secure session cookie (`inflo_session`).
- **Middleware Guard**: The Next.js middleware router (`middleware.ts`) guards `/admin/*` pages, redirecting unauthenticated requests back to `/login`.
- **Zero Hardcoded Bypasses**: The application uses **no** hardcoded passkeys or bypass tokens.
- **Secure Server Actions**: Leads are retrieved and modified exclusively via secure **Next.js Server Actions** (`app/actions.ts`). The server verifies the admin's cookie session first, then queries the database using the private server-only `SUPABASE_SERVICE_ROLE_KEY` to safely bypass public RLS policies.
- **RLS Lockdown**: Public anonymous users can only insert rows, and are completely blocked from reading or updating leads directly from the browser.

> **🔒 Test Credentials for Reviewer**:
> - **Admin Email**: `admin@digitalheroes.co`
> - **Password**: '123456789'

---

## 📊 Data Model (Postgres / Supabase)

Execute the following SQL inside your Supabase SQL Editor to initialize the database:

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  budget_range text not null,
  message text,
  status text not null default 'New' check (status in ('New', 'Contacted', 'Closed')),
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS) to lock down the table
alter table public.leads enable row level security;

-- Policy 1: Allow public anonymous lead submissions (Write-Only)
create policy "Public leads insert" 
  on public.leads 
  for insert 
  to anon 
  with check (true);

-- Policy 2: Block all anonymous reads & updates (Server Actions will fetch on behalf of authorized admins)
```

---

## 📥 Features Verified

* **Optimistic Status Transitions**: When changing a lead status in `/admin`, the UI updates instantly while the Postgres update runs in the background.
* **Real-time Live Sync**: Leverages Supabase PostgreSQL changes subscription so new lead submissions slide into the ledger dashboard in real-time with **zero page reload**.
* **CSV Export Ledger**: Includes a verified CSV export engine that parses table entries into a clean UTF-8 document downloadable directly to your local file system.

---

## 🤖 AI Tool Disclosure & Attribution

> **AI Tool Usage Statement:**  
> AI tools (Antigravity AI) assisted in scaffolding the initial Next.js project structure, Tailwind configuration boundaries, and drafting the basic PostgreSQL leads table schema. 
> 
> **What I Custom-Built & Modified Afterward**:
> - Re-engineered the database updates to route through server-validated Next.js **Server Actions** using cookie inspection, replacing insecure direct browser client Supabase updates.
> - Rewrote the landing page layout to feature a custom **B2B Newspaper Editorial** style with high-craft serif layouts and a custom rotating SVG compass illustration.
> - Hand-wrote all the copywriting and microcopy on the homepage and forms to match the premium editorial paper-ink theme, replacing standard AI placeholders.
