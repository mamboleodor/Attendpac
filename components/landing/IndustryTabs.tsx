import CardSwap, { Card } from "@/components/CardSwap";

const industries = [
  {
    label: "Field Services",
    title: "Built for teams in the field",
    features: [
      "GPS-verified clock-in for every worker",
      "Geofences scoped to each job site",
      "Offline mode - syncs when back online",
      "Real-time visibility across every site",
    ],
  },
  {
    label: "Security & Guarding",
    title: "Built for security teams",
    features: [
      "GPS-verified clock-in at every post",
      "Geofences scoped to each site",
      "Offline mode - syncs when back online",
      "Real-time visibility across every post",
    ],
  },
  {
    label: "Retail & Warehousing",
    title: "Built for retail & warehouse teams",
    features: [
      "Kiosk clock-in for shared terminals",
      "Shift rosters per store or warehouse",
      "Overtime flagging by policy",
      "Live dashboards across locations",
    ],
  },
  {
    label: "Logistics",
    title: "Built for logistics teams",
    features: [
      "GPS-verified clock-in for depots and routes",
      "Offline mode for low-signal areas",
      "Exception alerts for no-shows",
      "Payroll export to your provider",
    ],
  },
  {
    label: "Manufacturing",
    title: "Built for manufacturing teams",
    features: [
      "Biometric clock-in on the shop floor",
      "Shift builder per line or site",
      "Overtime rules by policy",
      "Custom reports by site or role",
    ],
  },
];

export default function IndustryTabs() {
  return (
    <section id="solutions" className="bg-neutral-lightBeige">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-4xl font-black text-brand-darkGray mb-3">
          Built for how your industry actually works
        </h2>
        <p className="text-neutral-gray4 mb-10">
          One platform, tuned for every kind of team
        </p>

        <div className="flex justify-center">
          <div className="relative" style={{ width: 460, height: 520 }}>
            <CardSwap
              width={420}
              height={300}
              cardDistance={50}
              verticalDistance={55}
              delay={3500}
              pauseOnHover
              skewAmount={4}
              easing="elastic"
            >
              {industries.map((ind) => (
                <Card
                  key={ind.label}
                  customClass="!bg-brand-charcoal !border-brand-orange/40 p-6 flex flex-col justify-start text-white"
                >
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-wide mb-2">
                    {ind.label}
                  </span>
                  <h3 className="text-lg font-bold mb-3">{ind.title}</h3>
                  <ul className="space-y-2 text-sm text-neutral-secondaryText">
                    {ind.features.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}