"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    title: "GPS Geofencing",
    description: "Restrict clock-ins to approved site locations",
  },
  {
    title: "Live Dashboards",
    description: "Real-time attendance across every site, in one view",
  },
  {
    title: "Payroll Export",
    description: "CSV and API export straight to your payroll provider",
  },
];

export default function FeatureCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="min-h-[90px]">
        <h3 className="text-xl font-black text-white drop-shadow-sm mb-2">
          {slides[active].title}
        </h3>
        <p className="text-white/80 max-w-sm">{slides[active].description}</p>
      </div>

      <div className="flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-8 bg-white" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>

      <p className="text-xs text-white/70">
        Trusted by growing teams across East Africa
      </p>
    </div>
  );
}