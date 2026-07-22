import type { ReactNode } from 'react';

/** Compact hero band used at the top of every inner page. */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(156,196,221,.35) 1px, transparent 1.5px)',
          backgroundSize: '26px 26px',
        }}
      />
      <div className="container-site relative py-14 sm:py-16">
        <span className="eyebrow text-accent-100">{eyebrow}</span>
        <h1 className="mt-2 max-w-3xl font-display text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {lede ? <p className="mt-4 max-w-2xl text-lg text-brand-100">{lede}</p> : null}
        {children}
      </div>
    </section>
  );
}
