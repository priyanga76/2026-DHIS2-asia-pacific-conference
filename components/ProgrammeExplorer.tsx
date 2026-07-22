'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import type { Session, Track } from '@/lib/content';
import { cn, formatDayShort } from '@/lib/utils';

function SessionChips({ session, trackName }: { session: Session; trackName: string }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 md:flex-col md:items-end">
      <span className="chip-track">{trackName}</span>
      <span className="chip-mode">{session.mode === 'in_person_streamed' ? 'In person + streamed' : 'In person'}</span>
      {session.status === 'confirmed' ? (
        <span className="chip-ok">Confirmed</span>
      ) : (
        <span className="chip-warn">Provisional</span>
      )}
    </div>
  );
}

export default function ProgrammeExplorer({
  sessions,
  tracks,
  days,
}: {
  sessions: Session[];
  tracks: Track[];
  days: string[];
}) {
  const [day, setDay] = useState(days[0]);
  const [track, setTrack] = useState('all');
  const [query, setQuery] = useState('');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const trackName = (id: string) => tracks.find((t) => t.id === id)?.short ?? id;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sessions
      .filter((s) => s.day === day)
      .filter((s) => track === 'all' || s.track === track)
      .filter(
        (s) =>
          !q ||
          `${s.title} ${s.abstract} ${s.presenters} ${trackName(s.track)}`.toLowerCase().includes(q),
      )
      .sort((a, b) => a.start.localeCompare(b.start));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions, day, track, query]);

  function onTabKeyDown(e: React.KeyboardEvent, index: number) {
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = (index + 1) % days.length;
    if (e.key === 'ArrowLeft') next = (index - 1 + days.length) % days.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = days.length - 1;
    if (next !== null) {
      e.preventDefault();
      setDay(days[next]);
      tabRefs.current[next]?.focus();
    }
  }

  const filterableTracks = tracks.filter((t) => sessions.some((s) => s.track === t.id));

  return (
    <div>
      <div className="mb-7 space-y-4">
        <div role="tablist" aria-label="Conference days" className="flex flex-wrap gap-2">
          {days.map((d, i) => (
            <button
              key={d}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              aria-selected={day === d}
              tabIndex={day === d ? 0 : -1}
              onClick={() => setDay(d)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={cn(
                'min-h-11 rounded-lg border px-4 py-2 text-[0.92rem] font-bold transition-colors',
                day === d
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-line bg-white text-body hover:bg-brand-100',
              )}
            >
              {formatDayShort(d)}
            </button>
          ))}
        </div>

        <div role="group" aria-label="Filter sessions by track" className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-pressed={track === 'all'}
            onClick={() => setTrack('all')}
            className={cn(
              'min-h-10 rounded-full border px-4 py-1 text-[0.83rem] font-semibold transition-colors',
              track === 'all' ? 'border-brand-600 bg-brand-600 text-white' : 'border-line bg-white text-body hover:bg-brand-100',
            )}
          >
            All tracks
          </button>
          {filterableTracks.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={track === t.id}
              onClick={() => setTrack(t.id)}
              className={cn(
                'min-h-10 rounded-full border px-4 py-1 text-[0.83rem] font-semibold transition-colors',
                track === t.id ? 'border-brand-600 bg-brand-600 text-white' : 'border-line bg-white text-body hover:bg-brand-100',
              )}
            >
              {t.short}
            </button>
          ))}
        </div>

        <div className="max-w-sm">
          <label htmlFor="session-search" className="mb-1 block text-[0.8rem] font-bold text-ink">
            Search sessions
          </label>
          <input
            id="session-search"
            type="search"
            autoComplete="off"
            placeholder="e.g. tracker, climate, data quality"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-11 w-full rounded-lg border border-line bg-white px-3.5 text-[0.95rem] text-ink placeholder:text-slate-400"
          />
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'session' : 'sessions'} shown.
      </p>

      <ul className="divide-y divide-line border-t border-line">
        {visible.map((s) => (
          <li key={s.slug} className="grid gap-3 py-5 md:grid-cols-[9.5rem_1fr_auto] md:gap-6">
            <div className="font-mono text-[0.88rem] font-semibold tabular-nums text-brand-800">
              {s.start}–{s.end}
              <small className="mt-0.5 block font-sans text-[0.75rem] font-semibold text-body">{s.room}</small>
            </div>
            <div>
              <h3 className="font-display text-[1.05rem] font-bold text-ink">
                <Link href={`/programme/${s.slug}/`} className="no-underline hover:text-brand-700 hover:underline">
                  {s.title}
                </Link>
              </h3>
              <p className="mt-1 text-[0.9rem]">{s.abstract}</p>
              <p className="mt-1.5 text-[0.82rem] font-semibold text-brand-700">{s.presenters}</p>
            </div>
            <SessionChips session={s} trackName={trackName(s.track)} />
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="py-8 text-[0.95rem]">
          No sessions match your filters on this day. Try another day, track, or search term.
        </p>
      )}
    </div>
  );
}
