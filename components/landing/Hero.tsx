import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-neutral-lightBeige">
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-start gap-6">
        <span className="rounded-pill bg-neutral-beigeButton text-brand-orange text-xs font-bold px-4 py-2">
          Built for field teams, not just office desks
        </span>
        <h1 className="text-[25px] md:text-[44px] font-black text-brand-darkGray leading-tight max-w-3xl">
          Attendance software that works where your team actually works
        </h1>
        <p className="text-neutral-gray4 max-w-2xl text-base md:text-lg">
          GPS geofencing, biometric clock-in, and offline sync for on-site and
          field staff, with live dashboards for every manager and org admin.
        </p>
        <div className="flex gap-4">
          <Link href="/login" className="btn-primary hover-bright">
            Start free
          </Link>
          <a href="#faq" className="btn-secondary hover-dark">
            Book a demo
          </a>
        </div>
        <div className="w-full mt-8 rounded-xl bg-neutral-beigeBg h-72 flex items-center justify-center text-neutral-gray3 text-sm">
          Product screenshot: manager dashboard / mobile home screen
        </div>
      </div>
    </section>
  );
}
