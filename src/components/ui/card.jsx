export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`mt-2 text-gray-700 ${className}`}>{children}</div>;
}