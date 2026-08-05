export default function ListPanel({
  title,
  items,
}: {
  title: string;
  items: { primary: string; secondary?: string }[];
}) {
  return (
    <div className="card">
      <p className="font-bold text-brand-darkGray mb-4">{title}</p>
      <ul className="flex flex-col gap-4">
        {items.map((item, i) => (
          <li key={i} className="flex flex-col">
            <span className="text-sm text-brand-darkGray">{item.primary}</span>
            {item.secondary && (
              <span className="text-xs text-neutral-gray2">{item.secondary}</span>
            )}
          </li>
        ))}
        {items.length === 0 && (
          <li className="text-sm text-neutral-gray2">Nothing to show yet.</li>
        )}
      </ul>
    </div>
  );
}
