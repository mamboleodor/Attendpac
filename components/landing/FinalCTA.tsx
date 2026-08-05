import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-neutral-lightBeige">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-6">
        <h2 className="text-[19px] md:text-[30px] font-black text-brand-darkGray">
          Ready to see where your team really is?
        </h2>
        <p className="text-neutral-gray4">
          Set up your first site in minutes. No credit card required.
        </p>
        <Link href="/login" className="btn-primary hover-bright">
          Start free
        </Link>
      </div>
    </section>
  );
}
