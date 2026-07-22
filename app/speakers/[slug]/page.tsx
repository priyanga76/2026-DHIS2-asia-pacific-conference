import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import { SpeakerAvatar } from '@/components/SpeakerCard';
import { getSpeaker, getTrack, sessionsForSpeaker, speakers } from '@/lib/content';
import { formatDayLong } from '@/lib/utils';

export function generateStaticParams() {
  return speakers.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const speaker = getSpeaker(slug);
  if (!speaker) return {};
  return {
    title: `${speaker.name} — ${speaker.organisation}`,
    description: speaker.bio,
    alternates: { canonical: `/speakers/${speaker.slug}/` },
  };
}

export default async function SpeakerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const speaker = getSpeaker(slug);
  if (!speaker) notFound();

  const speakerSessions = sessionsForSpeaker(speaker.slug);

  return (
    <>
      <PageHeader eyebrow="Speaker" title={speaker.name} lede={`${speaker.role}, ${speaker.organisation}`} />
      <section className="py-14">
        <div className="container-site grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 text-[0.85rem] font-semibold">
              <Link href="/speakers/" className="text-brand-700 no-underline hover:underline">
                ← All speakers
              </Link>
            </nav>
            <div className="flex flex-wrap items-start gap-6">
              <SpeakerAvatar speaker={speaker} size={132} />
              <div className="min-w-[16rem] flex-1">
                <p className="prose-site">{speaker.bio}</p>
                <p className="mt-3 text-[0.85rem] text-body">
                  Profile indicative — full speaker profiles will be confirmed with the 2026 programme.
                </p>
              </div>
            </div>
          </div>

          <aside aria-label="Sessions" className="card">
            <h2 className="font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-brand-700">
              Sessions featuring {speaker.name.split(' ')[0]}
            </h2>
            {speakerSessions.length === 0 ? (
              <p className="mt-4 text-[0.92rem]">Sessions will be announced with the confirmed programme.</p>
            ) : (
              <ul className="mt-4 space-y-4">
                {speakerSessions.map((s) => (
                  <li key={s.slug}>
                    <span className="block font-mono text-[0.78rem] font-semibold text-brand-800">
                      {formatDayLong(s.day)} · {s.start}–{s.end}
                    </span>
                    <Link href={`/programme/${s.slug}/`} className="font-semibold text-ink no-underline hover:text-brand-700 hover:underline">
                      {s.title}
                    </Link>
                    <span className="mt-0.5 block text-[0.8rem] text-body">{getTrack(s.track)?.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
