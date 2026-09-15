import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import { event } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Registration',
  description: `Registration for the ${event.title}: fees, what is included, how registration works, invitation letters, and the cancellation policy.`,
  alternates: { canonical: '/registration/' },
};

const registrationEventLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.title,
  startDate: event.startDate,
  endDate: event.endDate,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: event.venue.name,
    address: { '@type': 'PostalAddress', addressLocality: event.city, addressCountry: 'LK' },
  },
  offers: event.registration.feeTiers.map((tier) => ({
    '@type': 'Offer',
    name: `${tier.name} registration`,
    price: String(tier.price),
    priceCurrency: tier.currency,
    availability:
      event.registration.status === 'open' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
    url: `${event.siteUrl}/registration/`,
  })),
};

export default function RegistrationPage() {
  const { registration } = event;
  return (
    <>
      <PageHeader eyebrow="Fees & registration" title="Register for the conference" lede={registration.note}>
        <div className="mt-5">
          <span className="chip bg-accent-400 text-brand-950">{registration.statusLabel}</span>
        </div>
      </PageHeader>

      <section className="py-14">
        <div className="container-site">
          <div className="mb-12 grid gap-5 md:grid-cols-2">
            {registration.feeTiers.map((tier, i) => (
              <Reveal
                key={tier.id}
                delay={i * 100}
                className={`relative rounded-2xl border bg-white p-8 ${
                  tier.featured ? 'border-brand-600 shadow-lift' : 'border-line shadow-card'
                }`}
              >
                {tier.featured && <span className="chip-ok absolute right-6 top-6">Available</span>}
                <span className="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-brand-700">
                  {tier.name}
                  {registration.provisional && ' · provisional'}
                </span>
                <p className="mt-1 font-display text-4xl font-extrabold tracking-tight text-ink">
                  ${tier.price}{' '}
                  <small className="text-[0.95rem] font-semibold tracking-normal text-body">
                    {tier.currency} per person
                  </small>
                </p>
                <p className="mt-1 text-[0.88rem] font-semibold text-accent-700">{tier.deadlineLabel}</p>
                <ul className="mt-4 mb-6">
                  {tier.includes.map((inc) => (
                    <li key={inc} className="relative border-b border-dashed border-line py-2 pl-6 text-[0.92rem] last:border-0">
                      <span aria-hidden="true" className="absolute left-0 top-[0.85rem] h-2 w-2 rounded-sm bg-brand-600" />
                      {inc}
                    </li>
                  ))}
                </ul>
                <a href="#registration-form" className={tier.featured ? 'btn-primary' : 'btn-outline'}>
                  Register now
                </a>
              </Reveal>
            ))}
          </div>

          <div id="registration-form" className="mb-12 scroll-mt-24">
            <div className="mx-auto max-w-4xl rounded-2xl border border-line bg-mist p-4 shadow-card sm:p-6">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="eyebrow">Participant registration</span>
                  <h2 className="mt-1 font-display text-2xl font-bold text-ink">Complete the registration form</h2>
                  <p className="mt-2 max-w-2xl text-[0.93rem]">
                    Submit one form per participant. After reviewing your submission, the organising team will email
                    the payment details. Once you have paid, email your payment receipt to{' '}
                    <a href={`mailto:${event.contactEmail}`} className="font-semibold text-brand-700">
                      {event.contactEmail}
                    </a>. Your official invitation letter will be sent after payment is verified.
                  </p>
                </div>
                <a
                  href={registration.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline shrink-0"
                >
                  Open form in a new tab ↗
                </a>
              </div>

              <div className="overflow-hidden rounded-xl border border-line bg-white">
                <iframe
                  src={registration.formEmbedUrl}
                  title="Participant registration form for the DHIS2 Asia-Pacific Conference 2026"
                  width="640"
                  height="2331"
                  loading="lazy"
                  className="block w-full"
                />
              </div>

              <p className="mt-4 text-[0.82rem] text-body">
                Registration details are submitted to the organisers through Google Forms. Google&apos;s{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-700"
                >
                  Privacy Policy
                </a>{' '}
                applies to the embedded service. If the form does not load, use the new-tab link above.
              </p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <div className="card">
              <h2 className="font-display text-[1.05rem] font-bold text-ink">How registration works</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-[0.93rem]">
                <li>
                  <span className="font-semibold text-ink">Register:</span> Complete the participant registration form.
                </li>
                <li>
                  <span className="font-semibold text-ink">Receive payment details:</span> The organising team reviews
                  your registration and emails the payment details.
                </li>
                <li>
                  <span className="font-semibold text-ink">Pay and send the receipt:</span> Complete the payment, then
                  email your payment receipt to{' '}
                  <a href={`mailto:${event.contactEmail}`} className="font-semibold text-brand-700">
                    {event.contactEmail}
                  </a>.
                </li>
                <li>
                  <span className="font-semibold text-ink">Receive your invitation:</span> The organising team verifies
                  the payment and sends your official invitation letter.
                </li>
              </ol>
            </div>
            <div className="card">
              <h2 className="font-display text-[1.05rem] font-bold text-ink">Payment receipt &amp; invitation letter</h2>
              <p className="mt-2 text-[0.93rem]">
                Your official invitation letter will be sent after the organising team receives and verifies your
                payment receipt. Complete the payment, then email the receipt to{' '}
                <a href={`mailto:${event.contactEmail}`} className="font-semibold text-brand-700">
                  {event.contactEmail}
                </a>.
              </p>
            </div>
            <div className="card">
              <h2 className="font-display text-[1.05rem] font-bold text-ink">Cancellations</h2>
              <p className="mt-2 text-[0.93rem]">
                Written cancellations before {registration.cancellationDeadlineLabel} are refunded minus an
                administrative fee. After that date fees are non-refundable, though registrations may be transferred
                to a colleague from the same organisation. See the{' '}
                <Link href="/terms/" className="font-semibold text-brand-700">
                  full terms
                </Link>
                .
              </p>
            </div>
          </div>

          <p className="mt-10 max-w-2xl text-[0.9rem] text-body">
            Group registrations or questions about fees? Contact the organising team at{' '}
            <a href={`mailto:${event.contactEmail}`} className="font-semibold text-brand-700">
              {event.contactEmail}
            </a>{' '}
            or via the <Link href="/contact/" className="font-semibold text-brand-700">contact page</Link>.
          </p>
        </div>
      </section>
      <JsonLd data={registrationEventLd} />
    </>
  );
}
