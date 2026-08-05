const clusters = [
  {
    title: "Clock-In & Verification",
    features: [
      ["GPS Geofencing", "Restrict clock-ins to approved site locations"],
      ["Biometric & Kiosk", "Shared terminal clock-in with fingerprint or QR"],
      ["Offline Mode", "Clock in without signal; syncs when back online"],
      ["Selfie Verification", "Optional photo capture at every clock-in"],
    ],
  },
  {
    title: "Scheduling & Leave",
    features: [
      ["Shift Builder", "Create and publish rosters per site"],
      ["Shift Swaps", "Staff request and managers approve swaps"],
      ["Leave Management", "Track types, balances, and approvals"],
      ["Overtime Rules", "Automatic overtime flagging by policy"],
    ],
  },
  {
    title: "Management",
    features: [
      ["Multi-site Oversight", "See every location from one dashboard"],
      ["Role-based Access", "Staff, manager, org admin, super admin"],
      ["Device Management", "Register and monitor biometric terminals"],
      ["Exception Alerts", "Instant flags for late, absent, no-show"],
    ],
  },
  {
    title: "Reporting & Payroll",
    features: [
      ["Live Dashboards", "Real-time attendance across your org"],
      ["Payroll Export", "CSV and API export to your payroll provider"],
      ["Audit Trail", "Org-isolated, tamper-evident records"],
      ["Custom Reports", "Filter by site, role, or date range"],
    ],
  },
];

export default function FeatureClusters() {
  return (
    <section id="product" className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-4xl font-black text-brand-darkGray mb-3">
          Everything you need to manage attendance
        </h2>
        <p className="text-neutral-gray4 mb-12 max-w-2xl">
          From clock-in to payroll export, built for teams that work on-site
          and in the field
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {clusters.map((cluster) => (
            <div key={cluster.title}>
              <h3 className="font-bold text-lg text-brand-darkGray mb-4">
                {cluster.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cluster.features.map(([title, desc]) => (
                  <div key={title} className="card">
                    <p className="text-[15px] font-bold text-brand-darkGray mb-1">
                      {title}
                    </p>
                    <p className="text-[13px] text-neutral-gray3">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
