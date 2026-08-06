import LogoLoop from "@/components/LogoLoop";
import type { LogoItem } from "@/components/LogoLoop";

const companies: LogoItem[] = [
  { node: <span className="font-medium text-brand-darkGray">Nairobi Facilities Ltd</span> },
  { node: <span className="font-medium text-brand-darkGray">Coastline Logistics</span> },
  { node: <span className="font-medium text-brand-darkGray">Savannah Security Co</span> },
  { node: <span className="font-medium text-brand-darkGray">Rift Valley Retail</span> },
  { node: <span className="font-medium text-brand-darkGray">Mombasa Freight Co</span> },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-y border-neutral-lightBorder">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-center text-sm text-neutral-gray3 mb-6">
          Trusted by growing teams across East Africa
        </p>
        <LogoLoop
          logos={companies}
          speed={40}
          direction="left"
          gap={48}
          pauseOnHover
          fadeOut
          fadeOutColor="#FFFFFF"
          ariaLabel="Companies using AttendPAC"
        />
      </div>
    </section>
  );
}