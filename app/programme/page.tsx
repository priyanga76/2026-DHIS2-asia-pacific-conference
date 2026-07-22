import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ProgrammeExplorer from '@/components/ProgrammeExplorer';
import CtaBand from '@/components/CtaBand';
import { conferenceDays, event, sessions, tracks } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Programme',
  description: `Full programme of the ${event.title}: plenaries, parallel sessions, and workshops across three days in Colombo. Filter by day and track.`,
  alternates: { canonical: '/programme/' },
};

export default function ProgrammePage() {
  return (
    <>
      <PageHeader
        eyebrow="Programme"
        title="Three days, one timetable"
        lede={`Filter by day and track, or search for a session. Times are in ${event.timezoneLabel}.`}
      />
      <section className="py-14">
        <div className="container-site">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-[0.85rem]">
            <span className="chip-warn">Provisional programme</span>
            <span>
              Last updated: 16 July 2026 · Sessions and times will be confirmed on this page as the programme is
              finalised.
            </span>
          </div>
          <ProgrammeExplorer sessions={sessions} tracks={tracks} days={conferenceDays} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
