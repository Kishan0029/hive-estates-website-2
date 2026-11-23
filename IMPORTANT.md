# ⚠️ IMPORTANT SYSTEM MANUAL & OPERATIONAL GUIDELINES
**Hive Estates Real Estate Platform — Architecture, Admin Access & Automation Care**

---

## 1. System Care & Automated Operations Principles

> [!IMPORTANT]
> **Core Operational Rule**: Every operational change to this system must be executed with extreme care, automated verification, and strict preservation of security, confidentiality, and data integrity. Never apply changes manually without automated validation.

### System Care Invariants:
1. **Automated Verification Pipeline**:
   - After any frontend, configuration, or schema modification, immediately run:
     ```bash
     npm run build
     ```
   - TypeScript compilation (`tsc -b`) and Vite production bundle generation must succeed with **0 errors**.
2. **Tracked Database Migrations**:
   - Never run ad-hoc untracked schema mutations. Every database alteration must be authored as a versioned SQL migration under `supabase/migrations/` (format: `YYYYMMDDHHMMSS_<name>.sql`) and applied with automated verification.
3. **Preserve Row-Level Security (RLS)**:
   - `public.inquiries`: Anonymous visitors must **only** have `INSERT` permission (`WITH CHECK (true)`). Reading, updating, or deleting inquiries is strictly restricted to authenticated administrators (`staff_full_access_inquiries`).
   - `public.properties`: Public visitors have read access (`SELECT`) on active properties; all write/edit operations require admin authentication.

---

## 2. Administrator Access Credentials

The Admin Panel is fully activated and integrated with Supabase Authentication.

- **Admin Login Portal**: [`/admin/login`](http://localhost:5174/admin/login)
- **Production URL**: `https://hiveestates2.gonextverse.in/admin/login`
- **Administrator Email**: `hive@admin.com`
- **Administrator Password**: `HiveAdmin@2026!`

### Admin Panel Capabilities:
- **Dashboard (`/admin`)**: Real-time KPI cards for active listings, drafts, sold/rented units, and customer inquiries.
- **Properties Management (`/admin/properties`)**: Search, filter by status (active/draft/sold/rented), sort, edit, and delete properties.
- **Create Property (`/admin/properties/new`)**: Full-featured listing creator with automatic listing number generation (`#0105`, etc.), slug generation, coordinate inputs (latitude/longitude), address line, approved banks, amenities, specifications, and brochure uploads.
- **Edit Property (`/admin/properties/:id/edit`)**: Modify any existing listing's price, title, description, location, coordinates, status, and media.
- **Lead & Inquiry Management (`/admin/inquiries`)**: View all contact submissions, tour bookings, and "Request Call" leads with client phone numbers, messages, and linked property titles.

---

## 3. Strict Confidentiality & Asset Rules

> [!CAUTION]
> **Confidential Document Policy**: The following documents are strictly confidential and must **NEVER** be published to public web routes or public Cloudflare R2 buckets:
> - Raw government survey sheets (KJP sheets, Sy No partition maps)
> - Architectural CAD blueprint files (`.dwg`, vector `.pdf` engineering schematics)
> - Documents containing surveyor seals, private revenue stamps, or owner signatures

### Permitted Public Marketing Assets:
- Customer marketing brochures and promotional pamphlets (e.g., `seven-acres-brochure.jpg`, `yashwant-enclave-brochure.jpg`, `shivneri-enclave-brochure.jpg`).
- Cleaned and cropped customer-facing layout plans without confidential revenue seals.
- Web assets must be stored in `public/properties/layouts/` or synced to the Cloudflare R2 bucket.

---

## 4. Environment & Integration Secrets

| Service | Environment Variable | Target Identifier |
| :--- | :--- | :--- |
| **Supabase Project** | `VITE_SUPABASE_URL` | `https://idiouynuwnjbjnphcpmk.supabase.co` |
| **Supabase Anon Key** | `VITE_SUPABASE_ANON_KEY` | Managed in `.env` |
| **Cloudflare R2 Bucket** | `VITE_R2_PUBLIC_BASE_URL` | `https://pub-96252747112e4905b4af6c258d44b989.r2.dev` |
| **Live Web Domain** | Cloudflare Proxied | `https://hiveestates2.gonextverse.in` |

---

## 5. Automated Property Modification Workflow

When updating or adding properties via the Admin Panel or automation:
1. Navigate to [`/admin/login`](http://localhost:5174/admin/login) and log in with the administrator credentials above.
2. Go to **Properties** -> click **Edit** on the desired listing.
3. Modify any required field:
   - **Basic Details**: Title, Price, Price on Request, City, Address Line, Approved Banks, Area SqFt.
   - **Location**: Approx Latitude and Longitude (automatically updates the Google Maps interactive embed).
   - **Media**: Add new photos or brochures.
   - **Publishing Status**: Switch between `Active`, `Draft`, or `Sold`.
4. Click **Save Changes** — Supabase will automatically sync the changes across the entire live website.
