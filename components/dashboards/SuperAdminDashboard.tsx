import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/dashboard/Sidebar";
import KPICard from "@/components/dashboard/KPICard";
import ListPanel from "@/components/dashboard/ListPanel";

export default async function SuperAdminDashboard() {
  const supabase = createClient();

  const [{ data: orgs }, { count: totalOrgs }, { count: totalStaff }, { count: totalSites }] =
    await Promise.all([
      supabase.from("organizations").select("id, name, created_at").order("created_at", { ascending: false }),
      supabase.from("organizations").select("id", { count: "exact", head: true }),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("sites").select("id", { count: "exact", head: true }),
    ]);

  // Staff count per organization, for the table below.
  const orgStaffCounts: Record<string, number> = {};
  if (orgs) {
    await Promise.all(
      orgs.map(async (org) => {
        const { count } = await supabase
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .eq("org_id", org.id);
        orgStaffCounts[org.id] = count ?? 0;
      })
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-lightGray">
      <Sidebar
        orgOrSiteLabel="Platform"
        sections={[
          { label: "OVERVIEW", items: [{ name: "Overview", href: "/dashboard" }] },
          {
            label: "PLATFORM",
            items: [{ name: "Organizations" }, { name: "Billing plans" }, { name: "Support" }],
          },
        ]}
      />

      <main className="flex-1 p-8">
        <p className="text-sm text-neutral-gray2 mb-6">Dashboards / Platform overview</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KPICard label="Organizations" value={String(totalOrgs ?? 0)} />
          <KPICard label="Total Staff (all orgs)" value={String(totalStaff ?? 0)} />
          <KPICard label="Total Sites (all orgs)" value={String(totalSites ?? 0)} />
          <KPICard label="Active Today" value="—" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 card">
            <p className="font-bold text-brand-darkGray mb-4">Organizations</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-gray2 border-b border-neutral-lightBorder">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Staff</th>
                  <th className="pb-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {(orgs ?? []).map((org) => (
                  <tr key={org.id} className="border-b border-neutral-lightBorder last:border-0">
                    <td className="py-2 text-brand-darkGray font-medium">{org.name}</td>
                    <td className="py-2 text-neutral-gray3">{orgStaffCounts[org.id] ?? 0}</td>
                    <td className="py-2 text-neutral-gray3">
                      {new Date(org.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {(orgs ?? []).length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-4 text-neutral-gray2">
                      No organizations yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <ListPanel
            title="Platform Activity"
            items={[
              { primary: "Super admin dashboards read across all organizations." },
              { primary: "Use this view to onboard new organizations and manage plans." },
            ]}
          />
        </div>
      </main>
    </div>
  );
}
