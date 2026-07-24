# Inflo — Next-Gen Lead Capture & CRM Engine

> Built as part of the **Digital Heroes Full Stack Internship Task**.
> Live Footer Attribution: *"Built for Digital Heroes Training Task"* → [digitalheroesco.com](https://digitalheroesco.com/)

---

## 🚀 Overview

**Inflo** is a high-speed lead intake and real-time sales CRM pipeline. Designed with a sleek B2B SaaS aesthetic (Electric Slate & Cyber Teal), it provides:

1. **Public Lead Intake Form (`/`)**: Dual-layer client & server validation, budget selection, instant feedback, and responsive glassmorphism UI.
2. **Protected Admin Dashboard (`/admin`)**: Authentication gate, real-time KPI metrics, search filtering, optimistic status management (`New`, `Contacted`, `Closed`), and CSV lead exports.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Next.js 14+ (App Router, Server Components & Client Actions)
- **Database & Auth**: Supabase (PostgreSQL with Row Level Security & Auth)
- **Styling**: Tailwind CSS with custom theme design system
- **Validation**: Shared validation logic (`lib/validation.ts`) for single-source-of-truth email regex and constraint checks
- **Icons & UI**: Lucide React, Glassmorphism, Responsive Grid layout

---

## 📊 Database Schema (Supabase / Postgres)

Execute the following SQL in your Supabase SQL Editor to initialize the database:

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

-- Enable Row Level Security (RLS)
alter table public.leads enable row level security;

-- Allow public anonymous lead submission
create policy "Public leads insert" 
  on public.leads 
  for insert 
  to anon 
  with check (true);

-- Allow authenticated users to view & manage leads
create policy "Authenticated leads select" 
  on public.leads 
  for select 
  to authenticated 
  using (true);

create policy "Authenticated leads update" 
  on public.leads 
  for update 
  to authenticated 
  using (true);
```

---

## 🔑 Environment Variables Setup (`.env.local`)

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🔒 Security & Route Protection

- All `/admin/*` routes are protected via Next.js `middleware.ts`.
- Requests to unauthenticated routes redirect automatically to `/login`.
- For demo purposes, a passkey fallback (`admin123`) is integrated alongside Supabase Auth for immediate reviewer access.

---

## 🤖 AI Tool Disclosure & Attribution

> **AI Tool Usage Statement:**  
> AI tools (Antigravity AI) were utilized during development to assist with initial project structure planning, Tailwind configuration design, regex pattern matching for email validation, and SQL schema generation. All code architecture, component logic, and design polish were critically reviewed, refined, and tested for quality assurance.
