import Link from "next/link";

export interface SidebarSection {
  label: string;
  items: { name: string; href?: string }[];
}

export default function Sidebar({
  orgOrSiteLabel,
  sections,
}: {
  orgOrSiteLabel: string;
  sections: SidebarSection[];
}) {
  return (
    <aside className="w-64 shrink-0 bg-brand-charcoal text-white min-h-screen flex flex-col px-5 py-6">
      <div className="mb-8">
        <p className="font-black text-brand-orange text-lg">AttendPAC</p>
        <p className="text-neutral-gray1 text-xs mt-1">{orgOrSiteLabel}</p>
      </div>

      <nav className="flex-1 flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="text-[11px] tracking-wide text-neutral-gray1 font-bold mb-2">
              {section.label}
            </p>
            <ul className="flex flex-col gap-1">
              {section.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href ?? "#"}
                    className="block rounded-sm px-3 py-2 text-sm text-neutral-secondaryText hover:bg-white/5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <form action="/auth/sign-out" method="post">
        <button
          type="submit"
          className="text-sm text-neutral-gray1 hover:text-white text-left"
        >
          Sign out
        </button>
      </form>
    </aside>
  );
}
