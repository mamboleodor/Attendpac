const companies = [
  "Nairobi Facilities Ltd",
  "Coastline Logistics",
  "Savannah Security Co",
  "Rift Valley Retail",
  "Mombasa Freight Co",
];

export default function TrustBar() {
  return (
    <section className="bg-white border-y border-neutral-lightBorder">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-center text-sm text-neutral-gray3 mb-6">
          Trusted by growing teams across East Africa
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {companies.map((name) => (
            <span
              key={name}
              className="rounded-pill bg-neutral-beigeFill text-brand-darkGray text-sm font-medium px-4 py-2"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
