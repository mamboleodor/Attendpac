import Link from "next/link";
import Threads from "@/components/Threads";

export default function Hero() {
  return (
    <section className="relative bg-neutral-lightBeige overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Threads
          color={[0.92, 0.34, 0.2]}
          amplitude={1.2}
          distance={0.2}
          enableMouseInteraction
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center gap-6">
        <h1 className="text-[32px] md:text-[52px] font-black text-brand-darkGray leading-tight">
          Attendance software that works <br className="max-lg:hidden" />
          where your team actually works
        </h1>

        <p className="text-neutral-gray4 max-w-2xl text-base md:text-lg">
          GPS geofencing, biometric clock-in, and offline sync for on-site and
          field staff, with live dashboards for every manager and org admin.
        </p>

        <div className="flex gap-4 mt-2">
          <Link href="/login" className="btn-primary hover-bright">
            Start free →
          </Link>
          <a href="#faq" className="btn-secondary hover-dark">
            Book a demo
          </a>
        </div>
      </div>
    </section>
  );
}