import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import FaqAccordion from '@/components/FaqAccordion';
import JsonLd from '@/components/JsonLd';
import CtaBand from '@/components/CtaBand';
import { faqs } from '@/lib/content';

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Frequently asked questions about the DHIS2 Asia-Pacific Conference 2026: registration, payment, visas, invitation letters, hotels, streaming, and cancellations.',
  alternates: { canonical: '/faqs/' },
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};

export default function FaqsPage() {
  const categories = Array.from(new Set(faqs.map((f) => f.category)));
  return (
    <>
      <PageHeader
        eyebrow="FAQs"
        title="Frequently asked questions"
        lede="Registration, travel, and programme questions — answered in one place."
      />
      <section className="py-14">
        <div className="container-site max-w-4xl">
          {categories.map((cat) => (
            <div key={cat} className="mb-12 last:mb-0">
              <h2 className="mb-4 font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-brand-700">
                {cat}
              </h2>
              <FaqAccordion faqs={faqs.filter((f) => f.category === cat)} />
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
      <JsonLd data={faqLd} />
    </>
  );
}
