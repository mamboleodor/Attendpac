# AttendPAC — Next.js + Supabase

A working scaffold of the AttendPAC attendance/workforce app: a marketing
landing page, Supabase-authenticated admin login, and a single `/dashboard`
route that automatically renders the **Org Admin**, **Manager**, or
**Super Admin** view depending on who's signed in.

## How the flow works

```
/  (landing page)
 └── "Sign in" → /login (Supabase email/password auth)
       └── on success → /dashboard
             ├── role = super_admin → SuperAdminDashboard (all orgs)
             ├── role = org_admin   → OrgAdminDashboard (their org, all sites)
             ├── role = manager     → ManagerDashboard (their one site)
             └── role = staff       → placeholder screen (staff use the mobile app)
```

Role and org/site assignment live in a `profiles` table, one row per
`auth.users` row (created automatically by a Postgres trigger on sign-up).
`/dashboard` is a single route — there's no separate URL per role, so you
never have to redirect a manager who typed in the super-admin URL: the page
itself decides what to render.

## 1. Set up Supabase

1. Create a project at https://supabase.com.
2. In the SQL editor, run `supabase/schema.sql`. This creates:
   - `organizations`, `sites`, `profiles`, `attendance_records`,
     `leave_requests`, `notifications`
   - A trigger that creates a `profiles` row for every new `auth.users` signup
   - Row Level Security so an org can only ever query its own data
     (super_admin bypasses this and sees everything)
   - One seed organization ("Nairobi Facilities Ltd") with 4 seed sites,
     matching the sample dashboard content
3. Copy your Project URL and anon key (Settings → API).

## 2. Configure the app

```bash
cp .env.local.example .env.local
# then fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm install
npm run dev
```

## 3. Create your first users

Supabase Auth handles sign-up/sign-in; this scaffold doesn't include a public
sign-up form (matching the design: "Need an account? Contact your
organization owner"). Create users either:

- In the Supabase dashboard: Authentication → Users → Add user, or
- Via `supabase.auth.signUp()` from a script/REPL.

Each new user gets a `profiles` row automatically with `role = 'staff'` and
no org. Promote them from the SQL editor, e.g.:

```sql
-- make someone an org admin of the seed org
update profiles
set role = 'org_admin', org_id = '00000000-0000-0000-0000-000000000001'
where email = 'admin@nairobifacilities.com';

-- make someone a manager of the Westlands site
update profiles
set role = 'manager',
    org_id = '00000000-0000-0000-0000-000000000001',
    site_id = '00000000-0000-0000-0000-000000000011'
where email = 'manager@nairobifacilities.com';

-- make someone a super admin (platform-wide)
update profiles set role = 'super_admin' where email = 'you@attendpac.com';
```

Then sign in at `/login` with that account — `/dashboard` will render the
matching view.

## What's implemented vs. stubbed

**Implemented:**
- Landing page content, feature clusters, industry tabs, FAQ, footer
- Supabase Auth (sign in, sign out, forgot password) with session refresh
  in middleware and route protection on `/dashboard`
- `profiles` role model with Postgres RLS enforcing org isolation
- Org Admin / Manager / Super Admin dashboards wired to real Supabase
  queries (KPI counts, sites, pending leave, notifications) — they'll show
  real numbers once you add attendance/leave data
- Design tokens (colors, radii, spacing) from the design doc, as a Tailwind theme

**Stubbed / not built (natural next steps):**
- No public "start free" self-serve org signup flow yet — orgs are created
  via SQL for now
- Attendance trend / clock-ins charts render with zeroed placeholder series
  until you're writing real `attendance_records` rows (e.g. from a mobile
  clock-in flow)
- GPS geofencing, biometric/kiosk clock-in, offline sync, payroll CSV/API
  export, and shift builder are all backend concepts described in the design
  doc but not implemented here — this scaffold covers the auth + dashboard
  shell they'd plug into
- Staff-role mobile clock-in UI isn't built (the design doc treats that as a
  separate mobile app)

## Project structure

```
app/
  page.tsx                 landing page
  login/page.tsx           admin sign-in
  dashboard/page.tsx        role router → renders the right dashboard
  auth/sign-out/route.ts    POST handler for sign out
components/
  landing/                 marketing page sections
  auth/LoginForm.tsx        sign-in / forgot-password form
  dashboard/                shared shell: Sidebar, KPICard, ListPanel, ChartCard
  dashboards/               OrgAdminDashboard, ManagerDashboard, SuperAdminDashboard
lib/supabase/               browser client, server client, middleware session refresh
supabase/schema.sql          full DB schema + RLS policies + seed data
types/database.ts             hand-written Supabase types
```
