"use client";

import { useState } from "react";
import SignInForm from "@/components/auth/SignInForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const proof = [
  {
    stat: "94%",
    statColor: "text-success-green",
    label: "ATTENDANCE TODAY",
    quote: "GPS clock-in meant no more chasing timesheets across four sites.",
    initials: "AW",
    name: "Amina Wanjiru",
    role: "Ops Manager, Nairobi Facilities Ltd",
  },
  {
    stat: "+18.6%",
    statColor: "text-brand-orange",
    label: "ON-TIME RATE",
    quote: "Offline mode alone paid for the switch — our depots barely have signal.",
    initials: "JO",
    name: "James Otieno",
    role: "Site Lead, Mombasa Freight Co",
  },
  {
    stat: "76%→94%",
    statColor: "text-[#2563EB]",
    label: "SITE ROLLOUT",
    quote: "Payroll export dropped our month-end close from days to an afternoon.",
    initials: "GK",
    name: "Grace Kamau",
    role: "Finance, Rift Valley Retail",
  },
];

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "forgot">("signin");

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-sm">
        <p className="text-center text-[11px] font-bold text-brand-orange tracking-widest mb-3">
          ADMIN ACCESS &middot; SECURE SIGN-IN
        </p>

        <h1 className="text-center text-[32px] md:text-[38px] font-black leading-[1.1] mb-3">
          {mode === "signin" ? (
            <>
              <span className="text-brand-orange">See where your team is</span>{" "}
              <span className="text-brand-darkGray">right now.</span>
            </>
          ) : (
            <>
              <span className="text-brand-orange">Reset</span>{" "}
              <span className="text-brand-darkGray">your password.</span>
            </>
          )}
        </h1>

        <p className="text-center text-neutral-gray4 text-sm mb-6">
          {mode === "signin"
            ? "One dashboard. Every site, every shift, live."
            : "We'll email you a link to get back in."}
        </p>

        {mode === "signin" ? (
          <SignInForm onForgotClick={() => setMode("forgot")} />
        ) : (
          <ForgotPasswordForm onBackClick={() => setMode("signin")} />
        )}
      </div>

      <div className="w-full max-w-4xl mt-14">
        <p className="text-center text-[11px] font-bold text-neutral-gray2 tracking-widest mb-5">
          TRUSTED BY GROWING TEAMS ACROSS EAST AFRICA
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {proof.map((p) => (
            <div key={p.name} className="border border-neutral-lightBorder rounded-md p-4">
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className={`text-base font-black ${p.statColor}`}>{p.stat}</span>
                <span className="text-[10px] font-bold text-neutral-gray2 tracking-wide">{p.label}</span>
              </div>
              <p className="text-sm text-neutral-gray4 mb-3">&ldquo;{p.quote}&rdquo;</p>
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-full bg-neutral-lightGray text-brand-darkGray text-[10px] font-bold flex items-center justify-center">
                  {p.initials}
                </span>
                <div>
                  <p className="text-xs font-bold text-brand-darkGray leading-tight">{p.name}</p>
                  <p className="text-[11px] text-neutral-gray2 leading-tight">{p.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}