# Brain Architecture Intake — Implementation Plan

## 1. Overview

Replace the existing `/contact` single-page intake with a multi-step wizard that deeply maps a business's structure, workflows, and technical posture to a recommended brain architecture (Hermes / QM / OpenClaw) and infrastructure model (cloud / on-prem / hybrid). Submissions land in a Discord channel where I (Q) thread a spec doc.

## 2. Design Principles (Axos Labs Style)

- **Serif headings + Inter body**, white minimalist palette, violet (`#7c3aed`) accent
- Flat 8px-radius cards, left-aligned editorial layout
- Progress indicator at top, step labels visible
- No stock imagery, no video heroes
- Framer Motion page transitions between steps (already in deps)
- Reduced-motion media query respected (already in globals.css)

## 3. Form Structure — 6-Step Wizard

Each step is a full-viewport card with `max-w-3xl mx-auto`. Bottom bar: Back (ghost) + Next/Submit (accent filled). Top: segmented progress bar (6 steps, labeled).

### Step 1: Business Identity
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Company Name | text | yes | |
| Industry | select + "Other" text | yes | Dropdown: Construction, Real Estate, Logistics, Healthcare, Manufacturing, Legal, Financial Services, SaaS, E-commerce, Professional Services, Education, Nonprofit, Agriculture, Energy, Other |
| Company Description | textarea (5 sentences max) | yes | Hint: "What do you do, who do you serve, and how do you make money?" |
| Company Size | select | yes | 1-10, 11-50, 51-100, 101-250, 251-500, 500+ |
| Years in Business | select | no | <1, 1-3, 3-5, 5-10, 10+ |
| Business Model | select | no | B2B, B2C, B2B2C, D2C, Marketplace, Franchise, Nonprofit |

### Step 2: People & Technical Posture
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Employee Count (detailed) | number | yes | Exact count, overrides size band |
| Employee Type Mix | sliders (2) | no | % Salaried vs % Hourly / % Office vs % Field |
| Technical Literacy | select per role tier | yes | Leadership, Operations, Field/Frontline — each rated 1-5 (zero literacy → full dev proficiency) |
| IT Staff | select | no | None, 1 person part-time, 1 person full-time, 2-5, 5+ |
| Biggest People Pain Point | textarea | no | "If you could clone one employee, who and why?" |

### Step 3: Workflow & Automation Mapping
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Critical Business Functions | multi-select | yes | Sales/CRM, Operations/Dispatch, Accounting/Finance, HR/People, Customer Support, Inventory/Warehouse, Compliance/Legal, Marketing, Product/Dev, Data/Reporting |
| Top 3-5 Workflows to Automate | repeatable textarea rows | yes | Each row: Workflow Name + Time Spent (hrs/week) + Pain Level (1-5) + "Who does this today?" |
| Bottleneck Description | textarea | no | "Where does work get stuck or duplicated?" |
| Decision-Making Speed | select | no | Real-time, Same day, 1-3 days, 1-2 weeks, Monthly+ |

### Step 4: Software Stack Inventory
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Primary Software Search | multi-select searchable | yes | Curated list of 80 common business tools (see Section 8). Search filters by category. Each selection captures: name, category, usage depth (Light/Moderate/Core). |
| Custom / Missing Software | repeatable row | no | Name + Category (dropdown) + Purpose |
| Integration Needs | textarea | no | "What systems need to talk but don't?" |
| Data Volume Estimate | select | no | <1GB/mo, 1-10GB/mo, 10-100GB/mo, 100GB+/mo, Unsure |
| Cloud vs On-Prem Preference | select | yes | Full cloud, Mostly cloud + some on-prem, Hybrid, Full on-prem, Undecided — want guidance |

### Step 5: AI Posture & Goals
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Current AI Usage | multi-select | no | None, ChatGPT/Claude for drafting, AI coding assistants, Automated data processing, Customer-facing AI, AI analytics/BI, Custom LLM pipelines, Other |
| AI Successes | textarea | no | "What has already worked?" |
| AI Failures / Concerns | textarea | no | "What has failed or what worries you about AI?" |
| Desired Brain Personality | select | no | Silent operator (background automation), Collaborative teammate (suggests, asks), Front-facing agent (talks to customers), Executive assistant (manages calendar/comms), Hybrid — varies by workflow |
| Compliance / Sensitivity | multi-select | no | HIPAA, SOC2, GDPR, CCPA, ITAR, FINRA, State licensing, None, Other |
| Budget Mindset | select | no | <$2K/mo, $2-5K/mo, $5-15K/mo, $15-50K/mo, $50K+/mo, Need ROI case first |

### Step 6: Contact & Submit
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Name | text | yes | Primary contact |
| Role | text | yes | |
| Email | email | yes | |
| Phone | tel | no | |
| Preferred Contact Method | select | no | Email, Phone, Video call, Async (Discord/Slack) |
| Urgency | select | no | Just exploring, 30-90 days, ASAP |
| How did you hear about us? | select + other | no | Referral, LinkedIn, Search, Podcast, Event, Other |
| Anything else? | textarea | no | Freeform |
| Consent checkbox | checkbox | yes | "I agree to be contacted about my brain architecture assessment" |

## 4. Data Model (PostgreSQL)

New table: `brain_intakes`

```sql
CREATE TABLE brain_intakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),

  -- Step 1: Identity
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  industry_other TEXT,
  company_description TEXT NOT NULL,
  company_size_band TEXT NOT NULL,
  years_in_business TEXT,
  business_model TEXT,

  -- Step 2: People
  employee_count INTEGER,
  pct_salaried INTEGER CHECK (pct_salaried BETWEEN 0 AND 100),
  pct_office INTEGER CHECK (pct_office BETWEEN 0 AND 100),
  tech_literacy_leadership INTEGER CHECK (tech_literacy_leadership BETWEEN 1 AND 5),
  tech_literacy_operations INTEGER CHECK (tech_literacy_operations BETWEEN 1 AND 5),
  tech_literacy_field INTEGER CHECK (tech_literacy_field BETWEEN 1 AND 5),
  it_staff TEXT,
  people_pain_point TEXT,

  -- Step 3: Workflows
  critical_functions TEXT[],
  workflows_json JSONB NOT NULL DEFAULT '[]',
  bottleneck_description TEXT,
  decision_speed TEXT,

  -- Step 4: Software
  software_json JSONB NOT NULL DEFAULT '[]',
  custom_software_json JSONB NOT NULL DEFAULT '[]',
  integration_needs TEXT,
  data_volume TEXT,
  infra_preference TEXT NOT NULL,

  -- Step 5: AI
  current_ai_usage TEXT[],
  ai_successes TEXT,
  ai_failures TEXT,
  desired_personality TEXT,
  compliance_reqs TEXT[],
  budget_mindset TEXT,

  -- Step 6: Contact
  contact_name TEXT NOT NULL,
  contact_role TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  preferred_contact TEXT,
  urgency TEXT,
  referral_source TEXT,
  referral_other TEXT,
  freeform_notes TEXT,
  consent_given BOOLEAN NOT NULL DEFAULT FALSE,

  -- Derived
  discord_thread_id TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'spec_drafted', 'approved', 'archived')),
  estimated_tier TEXT  -- populated by Q after review
);

CREATE INDEX idx_brain_intakes_status ON brain_intakes(status, submitted_at DESC);
CREATE INDEX idx_brain_intakes_email ON brain_intakes(contact_email);
```

## 5. Software Database (Curated + Growable)

### Initial Seed (80 tools across 12 categories)

**CRM & Sales:** Salesforce, HubSpot, Pipedrive, Zoho CRM, Microsoft Dynamics, Freshsales, Close, Copper, Insightly, Nimble

**Accounting & Finance:** QuickBooks, Xero, FreshBooks, Sage, NetSuite, Wave, Bill.com, Stripe, Square, Expensify

**Operations & ERP:** SAP, Oracle NetSuite, Odoo, Fishbowl, Katana, JobBOSS, Procore (construction), Buildertrend, ServiceTitan, Housecall Pro

**HR & People:** Gusto, BambooHR, Workday, ADP, Paylocity, Rippling, Deel, 15Five, Lattice, Greenhouse

**Communication:** Slack, Microsoft Teams, Discord, Zoom, Google Meet, Loom, Twist

**Project Management:** Asana, Monday.com, ClickUp, Notion, Trello, Basecamp, Wrike, Smartsheet, Jira, Linear

**Marketing:** HubSpot Marketing, Mailchimp, Klaviyo, ActiveCampaign, Marketo, SEMrush, Ahrefs, Hootsuite, Buffer, Canva

**Data & BI:** Tableau, Power BI, Looker, Metabase, Mode, Snowflake, BigQuery, Redshift, Databricks, Segment

**Infrastructure & Dev:** AWS, Azure, GCP, Vercel, Railway, DigitalOcean, Linode, Cloudflare, Docker, Kubernetes

**Legal & Compliance:** DocuSign, Clio, MyCase, PracticePanther, LawPay, Ironclad, ContractWorks

**E-commerce:** Shopify, WooCommerce, BigCommerce, Magento, Stripe, Klaviyo, ShipStation, Zendesk

**Custom / Industry-Specific:** RentManager, AppFolio, Yardi, MRI Software, QuickBooks Desktop, AutoCAD, SolidWorks, Squarespace, WordPress, Custom-built

### Growth Mechanism
- When user types a tool not in the list, it appears as "Add [typed name]..." option
- On submission, any "custom" software entries are appended to a `software_suggestions` table:
  ```sql
  CREATE TABLE software_suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT,
    suggested_by_intake UUID REFERENCES brain_intakes(id),
    count INTEGER DEFAULT 1,
    added_to_curated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(name)
  );
  ```
- Admin (you) can review suggestions and promote to curated list via SQL or a future admin UI

## 6. API Layer

### `POST /api/intake` (refactor existing)
- Accept full 6-step payload
- Validate required fields per step
- Insert into `brain_intakes`
- Post rich Discord embed (see Section 7)
- Return `{ success: true, id }`

### `GET /api/software` (new)
- Return curated list as JSON: `{ categories: [{ name, tools: [{ id, name, category }] }] }`
- Support `?q=` for client-side search filtering
- No auth — public endpoint

### `POST /api/software/suggest` (new, implicit)
- Not a separate endpoint — suggestions are handled during intake submission by writing to `software_suggestions` table if any `custom_software_json` entries don't match curated names

## 7. Discord Webhook Integration

**Webhook URL:** `https://discord.com/api/webhooks/1533973021549924535/QjA3WP6kP9sjdTB9WVUdqY8GQiboMVAue9GBTvp4G_cyKcUoeYZhIF1qsuieVDFDElKl`

**Embed design per submission:**
- **Title:** `🧠 Brain Architecture Intake — {company_name}`
- **Color:** `#7c3aed` (Axos violet)
- **Fields:**
  - Industry + Size + Years
  - Employee count + IT staff level
  - Top 3 workflows (truncated)
  - Infra preference
  - AI usage summary
  - Contact email + urgency
- **Timestamp + Footer:** "Axos Labs Brain Architecture Intake"
- **Thread creation:** Webhook posts to channel → I (Q) create a thread off that message with initial assessment questions

## 8. Brain Architecture Mapping Logic (Post-Intake)

This is what I (Q) do after seeing the Discord post. The form data provides structured signals:

| Signal | Architecture Implication |
|--------|--------------------------|
| No IT staff + low tech literacy | Recommend cloud-hosted (Hermes Cloud Concierge), minimal client-side setup |
| 5+ IT staff + high literacy + compliance (HIPAA/ITAR) | Recommend on-premise (Hermes Sovereignty or QM on bare metal) |
| Hybrid infra preference | Propose split: brain runs on-prem for sensitive data, web hooks to cloud for LLM inference |
| Heavy SaaS stack (Salesforce, HubSpot, Slack) | Hermes native integrations + webhook-based skills |
| Legacy desktop stack (QuickBooks Desktop, AutoCAD, local ERP) | QM or OpenClaw for local file-system + desktop automation |
| High compliance + budget $50K+/mo | Full sovereign deployment, local LLM (Llama 3.1 70B), Hermes with no external calls |
| B2C + high customer volume | Front-facing agent personality → OpenClaw or Hermes with public API gateway |
| Decision speed "Real-time" | Async cron + webhook architecture with sub-5-min SLA loops |
| Data volume 100GB+/mo | Architecture needs message queue (Redis/RabbitMQ) + chunked processing |

**I draft the spec doc in the thread covering:**
1. Recommended harness (Hermes / QM / OpenClaw / hybrid)
2. Infrastructure model (cloud / on-prem / hybrid + provider)
3. LLM provider recommendation (OpenAI, Anthropic, local, multi-provider fallback)
4. Skill architecture (what skills the brain needs)
5. Integration map (which systems connect how)
6. Hardware sizing (if on-prem) or cloud cost estimate
7. Implementation phases (MVP → full deployment)
8. Pricing tier alignment ($25K / $75K / $150K)

## 9. Route Structure

| Route | Purpose |
|-------|---------|
| `/brain-architecture` | Public landing page for the intake (replaces/enhances `/contact`) |
| `/brain-architecture/intake` | The wizard form itself (can be same as landing) |
| `/api/intake` | Refactored POST handler |
| `/api/software` | Public software list |

## 10. Implementation Order

1. **Database migration** — Add `brain_intakes` and `software_suggestions` tables to `lib/db.ts` init
2. **Software seed data** — JSON file with 80 tools, `/api/software` endpoint
3. **Wizard component** — `components/sections/brain-intake-wizard.tsx` with 6 steps, progress bar, form state management (React `useReducer`)
4. **Step components** (subcomponents):
   - `StepBusinessIdentity`
   - `StepPeopleTechnical`
   - `StepWorkflowMapping`
   - `StepSoftwareInventory` (searchable multi-select with custom add)
   - `StepAIPosture`
   - `StepContactSubmit`
5. **API refactor** — Update `/api/intake` for new payload shape, Discord embed, DB insert
6. **Page wiring** — New `/brain-architecture/page.tsx`
7. **Navigation update** — Link in navbar (replace "Contact" or add "Brain Architecture")
8. **Webhook test** — Verify Discord delivery
9. **Q workflow** — Document the thread-handling process for me

## 11. Decisions

1. `/contact` → redirect to `/brain-architecture`
2. `localStorage` draft save — **yes**, included
3. Discord delivery: webhook posts embed + a **markdown file attachment** with raw intake data. Discord auto-creates thread from markdown file → Q works in that thread.
4. Portal admin view — **deferred**
5. Each intake stored as individual file — intake data goes to DB + Discord markdown file. Architecture spec docs generated per-client in thread.

## 12. Discord Markdown File Format

The raw intake data is posted as a `.md` file attachment (or file content block if webhooks don't support attachments — see implementation note). The markdown uses a structured YAML frontmatter + freeform sections so Q can parse it programmatically:

```markdown
---
intake_id: {uuid}
company: {company_name}
industry: {industry}
size: {company_size}
employees: {employee_count}
contact: {contact_email}
submitted: {ISO timestamp}
infra_preference: {cloud|onprem|hybrid}
urgency: {exploring|30-90|ASAP}
---

# {company_name} — Brain Architecture Intake

## Business Identity
{company_description}

## People & Technical Posture
- Total employees: {count}
- Salaried/Hourly mix: {pct}% / {pct}%
- Technical literacy (leadership/ops/field): {1-5}/{1-5}/{1-5}
- IT staff: {level}
- People pain point: {text}

## Critical Functions
{function list}

## Top Workflows to Automate
1. {name} — {hrs}/week, pain {1-5}, owner: {role}
2. ...

## Software Stack
{list with usage depth}

## AI Posture
- Current usage: {list}
- Successes: {text}
- Failures/Concerns: {text}
- Desired personality: {type}
- Compliance: {list}
- Budget mindset: {tier}

## Integration Needs
{integration_needs}

## Freeform Notes
{anything_else}

---
*Axos Labs Brain Architecture Intake — {timestamp}*
```

This structure lets me (Q) read the frontmatter for quick signals and the sections for context when drafting the architecture spec in the thread.
