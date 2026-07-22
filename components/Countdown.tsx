'use client';

import { useEffect, useState } from 'react';

const TARGET = new Date('2026-10-05T09:00:00+05:30').getTime();

function diffParts(now: number) {
  const ms = Math.max(0, TARGET - now);
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  return { days, hours, minutes, done: ms === 0 };
}

/** Live countdown to the opening plenary. Renders nothing until mounted to avoid hydration mismatch. */
export default function Countdown() {
  const [parts, setParts] = useState<ReturnType<typeof diffParts> | null>(null);

  useEffect(() => {
    const tick = () => setParts(diffParts(Date.now()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!parts || parts.done) return null;

  const cells = [
    { value: parts.days, label: 'days' },
    { value: parts.hours, label: 'hours' },
    { value: parts.minutes, label: 'min' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3" role="timer" aria-label="Countdown to the conference">
      {cells.map((c) => (
        <div
          key={c.label}
          className="min-w-[4.2rem] rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-center backdrop-blur-sm"
        >
          <span className="block font-display text-2xl font-extrabold tabular-nums text-white">{c.value}</span>
          <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-brand-100">
            {c.label}
          </span>
        </div>
      ))}
      <span className="basis-full text-sm font-semibold text-brand-100 sm:basis-auto">until we meet in Colombo</span>
    </div>
  );
}
