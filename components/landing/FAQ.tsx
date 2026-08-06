const faqs = [
  ["Is AttendPAC free to try?", "Yes. Start with a free trial for your organization, no credit card required, and upgrade as your team grows."],
  ["Does it work without an internet connection?", "Yes. Clock-ins are queued on the device and synced automatically once a connection is available."],
  ["How is my organization's data kept separate from others?", "Every record is scoped to your organization at the database level, so no other organization can ever see or query your data."],
  
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-[27px] md:text-[30px] font-black text-brand-darkGray mb-3">
          Your questions, answered
        </h2>
        <p className="text-neutral-gray4 mb-12">
          Answers to the most frequently asked questions.
        </p>

        <div className="flex flex-col gap-2 text-left">
          {faqs.map(([q, a]) => (
            <details
              key={q}
              className="group rounded-2xl px-6 py-5 transition-colors [&[open]]:bg-neutral-lightGray"
            >
              <summary className="cursor-pointer list-none flex justify-between items-center gap-4">
                <span className="font-bold text-brand-darkGray">{q}</span>
                <svg
                  className="shrink-0 w-4 h-4 text-neutral-gray2 transition-transform group-open:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <p className="text-neutral-gray4 mt-3 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}