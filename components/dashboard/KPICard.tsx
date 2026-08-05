export default function KPICard({
  label,
  value,
  change,
  positive = true,
}: {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}) {
  return (
    <div className="card flex flex-col gap-2">
      <p className="text-xs text-neutral-gray2">{label}</p>
      <p className="text-2xl font-black text-brand-darkGray">{value}</p>
      {change && (
        <span
          className={`self-start rounded-pill px-2 py-1 text-xs font-bold ${
            positive ? "text-success-green" : "text-red-600"
          } bg-neutral-lightGray`}
        >
          {change}
        </span>
      )}
    </div>
  );
}
