import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import SpeakerCard from '@/components/SpeakerCard';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import { event, speakers } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Speakers',
  description: `Speakers and facilitators at the ${event.title}, from the HISP Asia hub, the HISP Centre at the University of Oslo, ministries of health, and partner organisations.`,
  alternates: { canonical: '/speakers/' },
};

export default function SpeakersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Speakers"
        title="Learn from the regional HISP network"
        lede="Speakers and facilitators come from the HISP Asia hub, the HISP Centre at the University of Oslo, ministries of health, and partner organisations across the region."
      />
      <section className="py-14">
        <div className="container-site">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-[0.85rem]">
            <span className="chip-warn">More speakers to be announced</span>
            <span>The full speaker line-up will be confirmed as the 2026 programme is finalised.</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {speakers.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <SpeakerCard speaker={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
