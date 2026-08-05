import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import OrgAdminDashboard from "@/components/dashboards/OrgAdminDashboard";
import ManagerDashboard from "@/components/dashboards/ManagerDashboard";
import SuperAdminDashboard from "@/components/dashboards/SuperAdminDashboard";

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, org_id, site_id, full_name, organizations(name), sites(name)")
    .eq("id", user!.id)
    .single();

  if (!profile) {
    // Shouldn't normally happen — the DB trigger creates a profile on sign-up.
    redirect("/login");
  }

  switch (profile.role) {
    case "super_admin":
      return <SuperAdminDashboard />;

    case "org_admin":
      if (!profile.org_id) {
        return <NoOrgAssigned />;
      }
      return (
        <OrgAdminDashboard
          orgId={profile.org_id}
          orgName={(profile as any).organizations?.name ?? "Your organization"}
        />
      );

    case "manager":
      if (!profile.org_id || !profile.site_id) {
        return <NoOrgAssigned />;
      }
      return (
        <ManagerDashboard
          orgId={profile.org_id}
          siteId={profile.site_id}
          siteName={(profile as any).sites?.name ?? "Your site"}
        />
      );

    default:
      // Staff role: no manager/admin dashboard defined yet.
      return (
        <main className="min-h-screen flex items-center justify-center px-6">
          <div className="card max-w-md text-center">
            <p className="font-bold text-brand-darkGray mb-2">
              Hi {profile.full_name ?? "there"} 👋
            </p>
            <p className="text-sm text-neutral-gray3">
              Staff clock-in happens from the AttendPAC mobile app. This web
              dashboard is for managers and organization admins.
            </p>
          </div>
        </main>
      );
  }
}

function NoOrgAssigned() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="card max-w-md text-center">
        <p className="font-bold text-brand-darkGray mb-2">
          Your account isn&rsquo;t linked to an organization yet
        </p>
        <p className="text-sm text-neutral-gray3">
          Ask your organization owner to assign your role and site in the
          admin panel.
        </p>
      </div>
    </main>
  );
}
