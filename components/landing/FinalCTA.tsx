import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function FinalCTA() {
  return (
    <section className="bg-white">
      <Reveal>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="rounded-2xl border border-neutral-lightBorder overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="bg-brand-orange text-white p-10 md:p-12 flex flex-col justify-center">
                <span className="text-xs font-bold tracking-wide text-white/80 mb-4">
                  GET STARTED
                </span>
                <h2 className="text-[28px] md:text-[36px] font-black leading-tight mb-4">
                  Ready to see where your team really is?
                </h2>
                <p className="text-white/90 mb-8 max-w-sm">
                  Set up your first site in minutes. No credit card required.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/login" className="rounded-lg bg-white text-brand-darkGray font-bold px-5 py-3 text-sm hover:bg-white/90 transition-colors">
                    Start free
                  </Link>
                  <Link href="#faq" className="rounded-lg border border-white/50 text-white font-bold px-5 py-3 text-sm hover:bg-white/10 transition-colors">
                    Book a 30-min demo
                  </Link>
                </div>
              </div>

              <div className="p-10 md:p-12 border-t md:border-t-0 md:border-l border-neutral-lightBorder">
                <p className="text-xs font-bold text-neutral-gray2 mb-1">Westlands Site rollout</p>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-neutral-gray2">Improvement</span>
                  <span className="text-xs font-bold text-success-green bg-neutral-lightGray rounded-pill px-2 py-0.5">
                    18.6% up
                  </span>
                </div>
                <p className="font-bold text-brand-darkGray mb-6">GPS clock-in fully adopted</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-lg border border-neutral-lightBorder p-4">
                    <p className="text-xs text-neutral-gray2 mb-1">Before</p>
                    <p className="text-xl font-black text-brand-darkGray">76%</p>
                    <p className="text-xs text-neutral-gray2">on-time attendance</p>
                  </div>
                  <div className="rounded-lg border border-neutral-lightBorder p-4">
                    <p className="text-xs text-neutral-gray2 mb-1">After</p>
                    <p className="text-xl font-black text-brand-darkGray">94%</p>
                    <p className="text-xs text-neutral-gray2">on-time attendance</p>
                  </div>
                </div>

                <div className="flex justify-between text-xs font-bold text-brand-darkGray mb-1">
                  <span>Rollout progress</span>
                  <span>82%</span>
                </div>
                <div className="h-1.5 rounded-pill bg-neutral-lightGray overflow-hidden mb-6">
                  <div className="h-full bg-brand-orange rounded-pill" style={{ width: "82%" }} />
                </div>

                <div className="flex justify-between text-xs text-neutral-gray2">
                  <span>Staff onboarded</span>
                  <span>84 / 84</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-gray2 mt-1">
                  <span>Live since</span>
                  <span>Jan 3, 2026</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-neutral-lightBorder px-8 py-6">
              <div>
                <p className="font-bold text-brand-darkGray">Still deciding?</p>
                <p className="text-sm text-neutral-gray3">
                  14-day free trial, cancel anytime, no credit card required.
                </p>
              </div>
              <Link href="/login" className="btn-primary hover-bright text-sm">
                Start free trial
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}