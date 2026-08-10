"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";

const leftQuestions = [
  "Is AttendPAC free to try?",
  "Does it work without an internet connection?",
  "What devices can my team use to clock in?",
  "Is there a limit on how many sites or staff I can add?",
];

const rightFaqs = [
  ["How is my organization's data kept separate from others?", "Every record is scoped to your organization at the database level, so no other organization can ever see or query your data."],
  ["Can I export attendance data to my payroll provider?", "Yes. Approved hours can be exported as CSV or pulled directly via the AttendPAC API."],
  ["Can staff request shift swaps?", "Yes. Staff can request a swap from the schedule screen, and their manager approves or denies it before it takes effect."],
  ["Does AttendPAC support GPS geofencing per site?", "Yes. Each site can have its own approved radius, and clock-ins outside it are flagged automatically."],
  ["Can managers approve leave from their phone?", "Yes. Leave approvals work from the mobile app or the web dashboard, whichever a manager has on hand."],
  ["What happens if a device goes offline mid-shift?", "Clock-ins queue on the device and sync automatically the moment it reconnects — nothing is lost."],
];

export default function FAQ() {
  const [question, setQuestion] = useState("");

  return (
    <section id="faq" className="bg-white">
      <Reveal>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <span className="inline-block text-xs font-bold text-brand-orange bg-neutral-beigeButton rounded-pill px-3 py-1 mb-4">
            FAQ
          </span>
          <h2 className="text-[27px] md:text-[34px] font-black text-brand-darkGray mb-3 max-w-xl">
            The hard ones first.
          </h2>
          <p className="text-neutral-gray4 mb-8 max-w-xl">
            If yours isn&rsquo;t one of them, just ask and get an answer now.
          </p>

          <div className="flex gap-3 mb-12">
            <a href="mailto:hello@attendpac.app" className="btn-primary hover-bright text-sm">
              Contact Us
            </a>
            <a href="#" className="text-sm font-bold text-brand-darkGray self-center hover:text-brand-orange transition-colors">
              Browse all questions →
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Left: featured card + quick questions + ask box */}
            <div className="rounded-2xl border border-neutral-lightBorder overflow-hidden">
              <div className="p-6 border-b border-neutral-lightBorder">
                <h3 className="font-bold text-brand-darkGray mb-1">Is AttendPAC right for you?</h3>
                <p className="text-sm text-neutral-gray3">
                  Ask about setup, pricing, or whether it fits your team. It
                  answers from what&rsquo;s on this page.
                </p>
              </div>

              {leftQuestions.map((q) => (
                <div
                  key={q}
                  className="px-6 py-4 border-b border-neutral-lightBorder text-sm text-neutral-gray3 hover:text-brand-darkGray hover:bg-neutral-lightGray transition-colors cursor-pointer"
                >
                  {q}
                </div>
              ))}

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2 px-4 py-3"
              >
                <span className="text-neutral-gray2 text-sm">›</span>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question"
                  className="flex-1 text-sm outline-none placeholder:text-neutral-gray2"
                />
                <button type="submit" className="text-sm font-bold text-brand-orange">
                  Ask
                </button>
              </form>
            </div>

            {/* Right: accordion list */}
            <div className="rounded-2xl border border-neutral-lightBorder overflow-hidden">
              {rightFaqs.map(([q, a]) => (
                <details key={q} className="group border-b border-neutral-lightBorder last:border-0">
                  <summary className="cursor-pointer list-none flex justify-between items-center gap-4 px-6 py-5">
                    <span className="font-bold text-brand-darkGray text-sm md:text-base">{q}</span>
                    <span className="shrink-0 text-neutral-gray2 text-xl leading-none group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="text-sm text-neutral-gray4 px-6 pb-5 -mt-2 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}