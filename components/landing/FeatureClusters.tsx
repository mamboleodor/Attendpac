import Reveal from "@/components/motion/Reveal";
import MagicBento from "@/components/MagicBento";
import type { BentoCardProps } from "@/components/MagicBento";

const clusters: { title: string; cards: BentoCardProps[] }[] = [
  {
    title: "Clock-In & Verification",
    cards: [
      { color: "#17171A", title: "GPS Geofencing", description: "Restrict clock-ins to approved site locations", label: "Clock-In" },
      { color: "#17171A", title: "Biometric & Kiosk", description: "Shared terminal clock-in with fingerprint or QR", label: "Clock-In" },
      { color: "#17171A", title: "Offline Mode", description: "Clock in without signal; syncs when back online", label: "Clock-In" },
      { color: "#17171A", title: "Selfie Verification", description: "Optional photo capture at every clock-in", label: "Clock-In" },
    ],
  },
  {
    title: "Scheduling & Leave",
    cards: [
      { color: "#17171A", title: "Shift Builder", description: "Create and publish rosters per site", label: "Scheduling" },
      { color: "#17171A", title: "Shift Swaps", description: "Staff request and managers approve swaps", label: "Scheduling" },
      { color: "#17171A", title: "Leave Management", description: "Track types, balances, and approvals", label: "Scheduling" },
      { color: "#17171A", title: "Overtime Rules", description: "Automatic overtime flagging by policy", label: "Scheduling" },
    ],
  },
  {
    title: "Management",
    cards: [
      { color: "#17171A", title: "Multi-site Oversight", description: "See every location from one dashboard", label: "Management" },
      { color: "#17171A", title: "Role-based Access", description: "Staff, manager, org admin, super admin", label: "Management" },
      { color: "#17171A", title: "Device Management", description: "Register and monitor biometric terminals", label: "Management" },
      { color: "#17171A", title: "Exception Alerts", description: "Instant flags for late, absent, no-show", label: "Management" },
    ],
  },
  {
    title: "Reporting & Payroll",
    cards: [
      { color: "#17171A", title: "Live Dashboards", description: "Real-time attendance across your org", label: "Reporting" },
      { color: "#17171A", title: "Payroll Export", description: "CSV and API export to your payroll provider", label: "Reporting" },
      { color: "#17171A", title: "Audit Trail", description: "Org-isolated, tamper-evident records", label: "Reporting" },
      { color: "#17171A", title: "Custom Reports", description: "Filter by site, role, or date range", label: "Reporting" },
    ],
  },
];

export default function FeatureClusters() {
  return (
    <section id="product" className="bg-brand-veryDarkGray py-12">
      <Reveal>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-3">
            Everything you need to manage attendance
          </h2>
          <p className="text-neutral-gray1 mb-12 max-w-2xl">
            From clock-in to payroll export, built for teams that work on-site
            and in the field
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {clusters.map((cluster) => (
              <div key={cluster.title}>
                <h3 className="text-white font-bold text-lg mb-4">{cluster.title}</h3>
                <MagicBento
                  cards={cluster.cards}
                  layout="four"
                  glowColor="235, 87, 51"
                  enableStars
                  enableSpotlight
                  enableBorderGlow
                  enableTilt={false}
                  clickEffect
                  enableMagnetism
                  textAutoHide
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}