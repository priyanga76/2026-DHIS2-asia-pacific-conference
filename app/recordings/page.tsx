import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import CtaBand from '@/components/CtaBand';
import { event } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Recordings',
  description:
    'Livestreams and session recordings of the DHIS2 Asia-Pacific Conference 2026 will be published here. Watch recordings from previous conferences meanwhile.',
  alternates: { canonical: '/recordings/' },
};

export default function RecordingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recordings & streaming"
        title="Watch the conference"
        lede="Selected plenary sessions are expected to be streamed, and recordings of key sessions will be published on this page after the event."
      />
      <section className="py-14">
        <div className="container-site">
          <div className="rounded-2xl border border-brand-200 bg-brand-100/60 p-8">
            <span className="chip-warn">Before the event</span>
            <h2 className="mt-3 font-display text-xl font-bold text-ink">Streaming links will appear here</h2>
            <p className="mt-2 max-w-2xl text-[0.95rem]">
              Livestream links for the 2026 plenary sessions will be published on this page — not only in community
              posts or PDFs — closer to the conference. Recordings follow on the DHIS2 YouTube channel after the
              event.
            </p>
          </div>

          <h2 className="mt-14 font-display text-2xl font-bold text-ink">While you wait: previous conferences</h2>
          <p className="mt-3 max-w-2xl">
            Catch up on sessions from earlier Asia-Pacific conferences and the global DHIS2 community.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <a href={event.links.recordings2024} target="_blank" rel="noopener" className="card block no-underline transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift">
              <span className="chip-track">YouTube playlist</span>
              <h3 className="mt-3 font-display text-[1.05rem] font-bold text-ink">Asia-Pacific Conference 2024</h3>
              <p className="mt-1.5 text-[0.9rem]">Session recordings from the 2024 conference in Da Nang, Vietnam.</p>
            </a>
            <a href={event.links.youtube} target="_blank" rel="noopener" className="card block no-underline transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift">
              <span className="chip-track">YouTube channel</span>
              <h3 className="mt-3 font-display text-[1.05rem] font-bold text-ink">DHIS2 on YouTube</h3>
              <p className="mt-1.5 text-[0.9rem]">Talks, demos, and conference recordings from the global DHIS2 community.</p>
            </a>
            <a href={event.links.previousAcademies} target="_blank" rel="noopener" className="card block no-underline transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift">
              <span className="chip-track">Archive</span>
              <h3 className="mt-3 font-display text-[1.05rem] font-bold text-ink">Previous events archive</h3>
              <p className="mt-1.5 text-[0.9rem]">The official DHIS2 archive of previous conferences and academies.</p>
            </a>
          </div>

          <p className="mt-10 text-[0.9rem]">
            Want to know which 2026 sessions will be streamed? Check the mode labels in the{' '}
            <Link href="/programme/" className="font-semibold text-brand-700">
              programme
            </Link>
            .
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
