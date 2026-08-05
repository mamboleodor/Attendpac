const faqs = [
  ["Is AttendPAC free to try?", "Yes. Start with a free trial for your organization, no credit card required, and upgrade as your team grows."],
  ["Does it work without an internet connection?", "Yes. Clock-ins are queued on the device and synced automatically once a connection is available."],
  ["How is my organization's data kept separate from others?", "Every record is scoped to your organization at the database level, so no other organization can ever see or query your data."],
  ["Can I export attendance data to my payroll provider?", "Yes. Approved hours can be exported as CSV or pulled directly via the AttendPAC API."],
  ["What devices can my team use to clock in?", "The mobile app for iOS and Android, a shared kiosk device with QR or biometric scan, or a web browser for office-based staff."],
  ["Can staff request shift swaps?", "Yes. Staff can request a swap from the schedule screen, and their manager approves or denies it before it takes effect."],
  ["Is there a limit on how many sites or staff I can add?", "No. AttendPAC scales from a single site to a multi-site organization, with role-based access for every level of your team."],
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-[27px] md:text-[30px] font-black text-brand-darkGray mb-3">
          Got questions? We&rsquo;ve got answers
        </h2>
        <p className="text-neutral-gray4 mb-10">
          Everything you need to know before you get started
        </p>
        <div className="divide-y divide-neutral-lightBorder">
          {faqs.map(([q, a]) => (
            <details key={q} className="py-5 group">
              <summary className="cursor-pointer font-bold text-brand-darkGray list-none flex justify-between items-center">
                {q}
                <span className="text-neutral-gray2 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-neutral-gray4 mt-3">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
