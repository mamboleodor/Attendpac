const columns = [
  {
    title: "Product",
    links: ["Attendance Tracker", "Scheduling", "GPS Tracking", "Payroll Export", "Integrations"],
  },
  {
    title: "Industries",
    links: ["Field Services", "Security & Guarding", "Retail & Warehousing", "Logistics", "Manufacturing"],
  },
  {
    title: "Resources",
    links: ["Help Center", "API Documentation", "Blog", "FAQs"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Contact", "Terms", "Privacy"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-darkGray text-white border-t-4 border-brand-orange">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-6 border-b border-neutral-darkBorder pb-10 mb-10">
          <div>
            <p className="font-bold mb-1">Get product updates</p>
            <p className="text-neutral-gray1 text-sm">New features and attendance tips, once a month.</p>
          </div>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="you@company.com"
              className="rounded-sm px-3 py-2 text-brand-darkGray text-sm w-64"
            />
            <button type="submit" className="btn-primary hover-bright text-sm">
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <p className="font-black text-brand-orange text-lg mb-2">AttendPAC</p>
            <p className="text-neutral-gray1 text-sm max-w-xs">
              Attendance software for teams that work on-site and in the field.
            </p>
            <div className="flex gap-3 mt-4 text-sm text-brand-orange">
              <span>LinkedIn</span>
              <span>Instagram</span>
              <span>X</span>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-bold mb-3 text-sm">{col.title}</p>
              <ul className="space-y-2 text-sm text-neutral-gray1">
                {col.links.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-xs text-neutral-gray1 mt-12 pt-6 border-t border-neutral-darkBorder">
          <span>Copyright (c) 2026 AttendPAC. All rights reserved.</span>
          <span>Made in Nairobi</span>
        </div>
      </div>
    </footer>
  );
}
