import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import GalleryGrid from '@/components/GalleryGrid';
import CtaBand from '@/components/CtaBand';
import { gallery } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photos from the DHIS2 Asia-Pacific Conferences in Colombo in 2023 and Da Nang in 2024.',
  alternates: { canonical: '/gallery/' },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="The community in pictures"
        lede="Relive the conversations, connections, and celebrations that brought the regional DHIS2 community together in Colombo and Da Nang."
      />
      <section className="py-14">
        <div className="container-site">
          <GalleryGrid photos={gallery.photos} />
          <p className="mt-8 text-[0.85rem] text-body">
            Photos courtesy of the HISP Asia network. If you appear in a photo and would like it removed, please
            contact the organising team.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
