"use client";

import { useState } from "react";

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
  { label: "Security & Guarding", title: "Built for security teams", features: [
      "GPS-verified clock-in at every post",
      "Geofences scoped to each site",
      "Offline mode - syncs when back online",
      "Real-time visibility across every post",
    ] },
  { label: "Retail & Warehousing", title: "Built for retail & warehouse teams", features: [
      "Kiosk clock-in for shared terminals",
      "Shift rosters per store or warehouse",
      "Overtime flagging by policy",
      "Live dashboards across locations",
    ] },
  { label: "Logistics", title: "Built for logistics teams", features: [
      "GPS-verified clock-in for depots and routes",
      "Offline mode for low-signal areas",
      "Exception alerts for no-shows",
      "Payroll export to your provider",
    ] },
  { label: "Manufacturing", title: "Built for manufacturing teams", features: [
      "Biometric clock-in on the shop floor",
      "Shift builder per line or site",
      "Overtime rules by policy",
      "Custom reports by site or role",
    ] },
];

export default function IndustryTabs() {
  const [active, setActive] = useState(0);
  const industry = industries[active];

  return (
    <section id="solutions" className="bg-neutral-lightBeige">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-4xl font-black text-brand-darkGray mb-3">
          Built for how your industry actually works
        </h2>
        <p className="text-neutral-gray4 mb-10">
          One platform, tuned for every kind of team
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {industries.map((ind, i) => (
            <button
              key={ind.label}
              onClick={() => setActive(i)}
              className={`rounded-pill px-4 py-2 text-sm font-bold border ${
                i === active
                  ? "bg-brand-orange text-white border-brand-orange"
                  : "bg-white text-brand-darkGray border-neutral-lightBorder"
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-xl font-bold text-brand-darkGray mb-4">
              {industry.title}
            </h3>
            <ul className="space-y-3 mb-6">
              {industry.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-neutral-gray4">
                  <span className="text-brand-orange font-bold">•</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#" className="font-bold text-brand-orange">
              See {industry.label} features →
            </a>
          </div>
          <div className="rounded-xl bg-neutral-beigeBg h-64 flex items-center justify-center text-neutral-gray3 text-sm">
            Field worker clock-in screenshot
          </div>
        </div>
      </div>
    </section>
  );
}
