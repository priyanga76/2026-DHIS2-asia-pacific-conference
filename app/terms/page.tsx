import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { event } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `Registration, payment, cancellation, liability, and data protection terms for the ${event.title}.`,
  alternates: { canonical: '/terms/' },
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: 'Registration',
    body: [
      'Registration is personal and non-transferable except as described under Cancellations. The organising team reviews each registration and may decline registrations at its discretion. A registration is confirmed once the payment receipt has been received and verified by the organisers. The official invitation letter is then sent by email.',
      'The registration fees published on this website are confirmed.',
    ],
  },
  {
    title: 'Payment',
    body: [
      'After reviewing a registration, the organising team emails the payment details. The participant must complete payment and email the payment receipt to events@hispsrilanka.org. The official invitation letter is issued after the receipt has been received and the payment verified. Bank charges and transfer fees are the responsibility of the registrant. Registration fees cover conference participation as described on the registration page; they do not include travel, accommodation, insurance, or visa costs.',
    ],
  },
  {
    title: 'Cancellations and refunds',
    body: [
      `Written cancellations received before ${event.registration.cancellationDeadlineLabel} are refunded minus an administrative fee. After that date fees are non-refundable, but a registration may be transferred to a colleague from the same organisation with the organisers' agreement.`,
      'If the conference is cancelled by the organisers, registration fees will be refunded. The organisers are not liable for other costs incurred by participants, such as travel or accommodation.',
    ],
  },
  {
    title: 'Liability and insurance',
    body: [
      'Participants attend at their own risk. The organisers accept no liability for personal injury, or loss or damage to personal property, during the conference or related travel. Participants are strongly advised to arrange their own travel and health insurance covering the full duration of their trip.',
    ],
  },
  {
    title: 'Photography and recording',
    body: [
      'Sessions may be photographed, streamed, and recorded. By attending, participants consent to the reasonable use of photos and recordings that may include them in conference communications and archives. Contact the organisers if you have concerns about a specific image or recording.',
    ],
  },
  {
    title: 'Data protection',
    body: [
      'Personal data collected during registration is used solely to organise and run the conference — including participant lists, badges, catering, and communication about the event — and is not sold or shared with third parties beyond what is needed to deliver the conference. Contact the organising team to access or correct your data.',
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Terms & conditions"
        title="Registration terms"
        lede="These terms apply to registrations for the DHIS2 Asia-Pacific Conference 2026. The published registration fees are confirmed."
      />
      <section className="py-14">
        <div className="container-site max-w-3xl">
          {SECTIONS.map((s) => (
            <div key={s.title} className="mb-10 last:mb-0">
              <h2 className="font-display text-xl font-bold text-ink">{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="prose-site mt-3">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p className="mt-12 border-t border-line pt-6 text-[0.9rem] text-body">
            Questions about these terms? Contact{' '}
            <a href={`mailto:${event.contactEmail}`} className="font-semibold text-brand-700">
              {event.contactEmail}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
