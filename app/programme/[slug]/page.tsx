import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import SpeakerCard from '@/components/SpeakerCard';
import { event, getSession, getSpeaker, getTrack, relatedSessions, sessions } from '@/lib/content';
import { formatDayLong } from '@/lib/utils';

export function generateStaticParams() {
  return sessions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const session = getSession(slug);
  if (!session) return {};
  return {
    title: session.title,
    description: session.abstract,
    alternates: { canonical: `/programme/${session.slug}/` },
  };
}

export default async function SessionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = getSession(slug);
  if (!session) notFound();

  const track = getTrack(session.track);
  const sessionSpeakers = session.speakerSlugs
    .map((s) => getSpeaker(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const related = relatedSessions(session);

  return (
    <>
      <PageHeader eyebrow={`Programme · ${track?.name ?? session.track}`} title={session.title}>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="chip bg-white/15 text-white">{formatDayLong(session.day)}</span>
          <span className="chip bg-white/15 text-white">
            {session.start}–{session.end} · {session.room}
          </span>
          <span className="chip bg-white/15 text-white">
            {session.mode === 'in_person_streamed' ? 'In person + streamed' : 'In person'}
          </span>
          {session.status === 'confirmed' ? (
            <span className="chip-ok">Confirmed</span>
          ) : (
            <span className="chip-warn">Provisional</span>
          )}
        </div>
      </PageHeader>

      <section className="py-14">
        <div className="container-site grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 text-[0.85rem] font-semibold">
              <Link href="/programme/" className="text-brand-700 no-underline hover:underline">
                ← Back to full programme
              </Link>
            </nav>
            <h2 className="font-display text-xl font-bold text-ink">About this session</h2>
            <p className="prose-site mt-3">{session.abstract}</p>
            <p className="mt-2 text-[0.92rem] font-semibold text-brand-700">{session.presenters}</p>
            <p className="mt-6 text-[0.85rem] text-body">
              All times are in {event.timezoneLabel}. Slides, streaming links, and recordings will be added to this
              page when available.
            </p>

            {sessionSpeakers.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-4 font-display text-xl font-bold text-ink">Speakers &amp; facilitators</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {sessionSpeakers.map((s) => (
                    <SpeakerCard key={s.slug} speaker={s} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {related.length > 0 && (
            <aside aria-label="Related sessions" className="card">
              <h2 className="font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-brand-700">
                More in this track
              </h2>
              <ul className="mt-4 space-y-4">
                {related.map((r) => (
                  <li key={r.slug}>
                    <span className="block font-mono text-[0.78rem] font-semibold text-brand-800">
                      {formatDayLong(r.day)} · {r.start}–{r.end}
                    </span>
                    <Link href={`/programme/${r.slug}/`} className="font-semibold text-ink no-underline hover:text-brand-700 hover:underline">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </section>
    </>
  );
}
