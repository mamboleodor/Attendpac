import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/dashboard/Sidebar";
import KPICard from "@/components/dashboard/KPICard";
import ListPanel from "@/components/dashboard/ListPanel";
import { TrendChartCard, BarChartCard } from "@/components/dashboard/ChartCard";

export default async function ManagerDashboard({
  orgId,
  siteId,
  siteName,
}: {
  orgId: string;
  siteId: string;
  siteName: string;
}) {
  const supabase = createClient();

  const [{ count: siteStaff }, { data: pendingLeave }, { data: notifications }, { data: team }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("site_id", siteId),
      supabase
        .from("leave_requests")
        .select("id, leave_type, start_date, end_date, staff_id, profiles(full_name)")
        .eq("site_id", siteId)
        .eq("status", "pending"),
      supabase
        .from("notifications")
        .select("message, created_at")
        .eq("site_id", siteId)
        .order("created_at", { ascending: false })
        .limit(5),
      supabase.from("profiles").select("id, full_name").eq("site_id", siteId).limit(6),
    ]);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [{ count: clockedIn }, { count: late }, { count: noShow }] = await Promise.all([
    supabase
      .from("attendance_records")
      .select("id", { count: "exact", head: true })
      .eq("site_id", siteId)
      .gte("clock_in", todayStart.toISOString()),
    supabase
      .from("attendance_records")
      .select("id", { count: "exact", head: true })
      .eq("site_id", siteId)
      .eq("status", "late")
      .gte("clock_in", todayStart.toISOString()),
    supabase
      .from("attendance_records")
      .select("id", { count: "exact", head: true })
      .eq("site_id", siteId)
      .eq("status", "no_show")
      .gte("created_at", todayStart.toISOString()),
  ]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"].map((label) => ({
    label,
    value: 0,
  }));
  const trendData = Array.from({ length: 14 }).map((_, i) => ({
    label: `D${i + 1}`,
    value: 0,
  }));

  return (
    <div className="flex min-h-screen bg-neutral-lightGray">
      <Sidebar
        orgOrSiteLabel={siteName}
        sections={[
          { label: "OVERVIEW", items: [{ name: "Live attendance", href: "/dashboard" }] },
          { label: "SETTINGS", items: [{ name: "Shifts" }, { name: "Leave approvals" }] },
          { label: "REPORTS", items: [{ name: "Reports" }] },
        ]}
      />

      <main className="flex-1 p-8">
        <p className="text-sm text-neutral-gray2 mb-6">Dashboards / Live attendance</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KPICard
            label="Clocked In Today"
            value={`${clockedIn ?? 0}/${siteStaff ?? 0}`}
            change="↑ 3"
          />
          <KPICard label="Late Arrivals" value={String(late ?? 0)} change="↓ 1" />
          <KPICard label="No-shows" value={String(noShow ?? 0)} change="↑ 1" positive={false} />
          <KPICard
            label="Pending Leave"
            value={String((pendingLeave ?? []).length)}
            change="↓ 1"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <TrendChartCard title="Clock-ins — Last 14 Days" data={trendData} />
          <BarChartCard title="Clock-ins by Day" data={days} />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 card">
            <p className="font-bold text-brand-darkGray mb-4">Leave Approvals Pending</p>
            <ul className="flex flex-col gap-3">
              {(pendingLeave ?? []).map((r: any) => (
                <li key={r.id} className="flex justify-between text-sm">
                  <span className="text-brand-darkGray">
                    {r.profiles?.full_name ?? "Staff member"} — {r.leave_type}
                  </span>
                  <span className="text-neutral-gray2">
                    {r.start_date} – {r.end_date}
                  </span>
                </li>
              ))}
              {(pendingLeave ?? []).length === 0 && (
                <li className="text-sm text-neutral-gray2">No pending requests.</li>
              )}
            </ul>
          </div>
          <ListPanel
            title="Notifications"
            items={(notifications ?? []).map((n) => ({
              primary: n.message,
              secondary: new Date(n.created_at).toLocaleString(),
            }))}
          />
        </div>

        <div className="mt-6">
          <ListPanel
            title="Team"
            items={(team ?? []).map((t) => ({ primary: t.full_name ?? "Unnamed" }))}
          />
        </div>
      </main>
    </div>
  );
}
