import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import { event } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact the organising team of the ${event.title} about registration, the programme, invitation letters, or sponsorship.`,
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        lede="Questions about registration, the programme, invitation letters, or sponsorship? Send a message and the organising team will reply, usually within three working days."
      />
      <section className="py-14">
        <div className="container-site grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />
          <div className="space-y-5">
            <div className="card">
              <h2 className="font-display text-[1.05rem] font-bold text-ink">Organising team</h2>
              <p className="mt-2 text-[0.93rem]">
                HISP Asia, with the HISP Centre at the University of Oslo
                <br />
                Email:{' '}
                <a href={`mailto:${event.contactEmail}`} className="font-semibold text-brand-700">
                  {event.contactEmail}
                </a>
              </p>
            </div>
            <div className="card">
              <h2 className="font-display text-[1.05rem] font-bold text-ink">Stay updated</h2>
              <p className="mt-2 text-[0.93rem]">
                Follow the conference tag on the{' '}
                <a href={event.links.community} target="_blank" rel="noopener" className="font-semibold text-brand-700">
                  DHIS2 Community of Practice
                </a>{' '}
                for announcements. All confirmed details will always appear on this website first.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
