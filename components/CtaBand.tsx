import Link from 'next/link';
import { event } from '@/lib/content';

export default function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="bg-gradient-to-br from-brand-600 to-brand-900 text-white">
      <div className="container-site py-16 sm:py-20">
        <span className="eyebrow text-accent-100">
          {event.dateLabel} · {event.venue.name}, {event.city}
        </span>
        <h2 id="cta-title" className="mt-2 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Join the DHIS2 community in Colombo
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-brand-100">
          Participant registration is open. Register early — especially if you need a visa — and be part of the
          fifth regional gathering of the DHIS2 community.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/registration/" className="btn bg-white text-brand-900 hover:bg-brand-100">
            Register now
          </Link>
          <Link href="/programme/" className="btn-ghost">
            Browse the programme
          </Link>
        </div>
      </div>
    </section>
  );
}
