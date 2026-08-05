import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/dashboard/Sidebar";
import KPICard from "@/components/dashboard/KPICard";
import ListPanel from "@/components/dashboard/ListPanel";
import { TrendChartCard, BarChartCard } from "@/components/dashboard/ChartCard";

export default async function OrgAdminDashboard({
  orgId,
  orgName,
}: {
  orgId: string;
  orgName: string;
}) {
  const supabase = createClient();

  const [{ count: totalStaff }, { data: sites }, { data: pendingLeave }, { data: notifications }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("org_id", orgId),
      supabase.from("sites").select("id, name").eq("org_id", orgId),
      supabase
        .from("leave_requests")
        .select("id")
        .eq("org_id", orgId)
        .eq("status", "pending"),
      supabase
        .from("notifications")
        .select("message, created_at")
        .eq("org_id", orgId)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { count: clockedInToday } = await supabase
    .from("attendance_records")
    .select("id", { count: "exact", head: true })
    .eq("org_id", orgId)
    .gte("clock_in", todayStart.toISOString());

  const attendanceToday =
    totalStaff && totalStaff > 0
      ? Math.round(((clockedInToday ?? 0) / totalStaff) * 100)
      : 0;

  const siteBarData = (sites ?? []).map((s) => ({ label: s.name, value: 0 }));
  const trendData = Array.from({ length: 14 }).map((_, i) => ({
    label: `D${i + 1}`,
    value: 0,
  }));

  return (
    <div className="flex min-h-screen bg-neutral-lightGray">
      <Sidebar
        orgOrSiteLabel={orgName}
        sections={[
          { label: "OVERVIEW", items: [{ name: "Overview", href: "/dashboard" }] },
          {
            label: "MANAGEMENT",
            items: [
              { name: "Sites" },
              { name: "Staff" },
              { name: "Payroll" },
              { name: "Devices" },
            ],
          },
          { label: "SETTINGS", items: [{ name: "Billing" }, { name: "Settings" }] },
        ]}
      />

      <main className="flex-1 p-8">
        <p className="text-sm text-neutral-gray2 mb-6">Dashboards / Overview</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KPICard label="Total Staff" value={String(totalStaff ?? 0)} change="↑ 4.2%" />
          <KPICard label="Active Sites" value={String((sites ?? []).length)} change="↑ 1" />
          <KPICard label="Attendance Today" value={`${attendanceToday}%`} change="↑ 2.1%" />
          <KPICard
            label="Pending Leave"
            value={String((pendingLeave ?? []).length)}
            change="↓ 3"
            positive={false}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <TrendChartCard title="Attendance Trend — Last 14 Days" data={trendData} />
          <BarChartCard title="Attendance by Site" data={siteBarData} />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="card">
              <p className="font-bold text-brand-darkGray mb-4">Sites Summary</p>
              <ul className="flex flex-col gap-3">
                {(sites ?? []).map((s) => (
                  <li key={s.id} className="flex justify-between text-sm">
                    <span className="text-brand-darkGray">{s.name}</span>
                    <span className="text-neutral-gray2">staff TBD</span>
                  </li>
                ))}
                {(sites ?? []).length === 0 && (
                  <li className="text-sm text-neutral-gray2">No sites yet.</li>
                )}
              </ul>
            </div>
          </div>
          <ListPanel
            title="Notifications"
            items={(notifications ?? []).map((n) => ({
              primary: n.message,
              secondary: new Date(n.created_at).toLocaleString(),
            }))}
          />
        </div>
      </main>
    </div>
  );
}
