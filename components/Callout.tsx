export function Callout({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning' | 'success';
  children: React.ReactNode;
}) {
  const styles =
    type === 'warning'
      ? 'border-amber-200 bg-amber-50 text-amber-900'
      : type === 'success'
        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
        : 'border-blue-200 bg-blue-50 text-blue-900';

  return (
    <div className={`not-prose rounded-2xl border px-4 py-3 ${styles}`}>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
