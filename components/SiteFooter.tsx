import Link from 'next/link';
import { event } from '@/lib/content';

const COLUMNS: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    title: 'Conference',
    links: [
      { href: '/programme/', label: 'Programme' },
      { href: '/speakers/', label: 'Speakers' },
      { href: '/registration/', label: 'Registration' },
      { href: '/sponsors/', label: 'Sponsors & partners' },
      { href: '/recordings/', label: 'Recordings' },
    ],
  },
  {
    title: 'Plan your trip',
    links: [
      { href: '/venue/', label: 'Venue' },
      { href: '/travel/', label: 'Travel & visa' },
      { href: '/hotels/', label: 'Hotels' },
      { href: '/faqs/', label: 'FAQs' },
      { href: '/gallery/', label: 'Gallery' },
    ],
  },
  {
    title: 'Community',
    links: [
      { href: 'https://dhis2.org/', label: 'DHIS2.org', external: true },
      { href: 'https://community.dhis2.org/', label: 'Community of Practice', external: true },
      { href: 'https://hispasia.org/', label: 'HISP Asia', external: true },
      { href: '/contact/', label: 'Contact us' },
    ],
  },
];

const HISP_ASIA_STRIP_COLORS = ["#ea0d2e", "#8d153a", "#eb7400", "#ffbe29", "#00746c", "#3eafe3", "#1e3765"];

export default function SiteFooter() {
  return (
    <footer className="bg-brand-950 text-brand-200">
      <div className="flex h-[3px] w-full" aria-hidden="true">
        {HISP_ASIA_STRIP_COLORS.map((color) => (
          <span key={color} className="h-full flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>
      <div className="container-site">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <h2 className="mb-4 font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white">
              {event.title}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed">
              The annual regional gathering of the DHIS2 community in Asia and the Pacific, hosted by HISP Asia and
              the HISP Centre at the University of Oslo.
            </p>
            <p className="mt-4 text-sm">
              <span className="font-semibold text-white">{event.dateLabel}</span> · {event.venue.name},{' '}
              {event.city}, {event.country}
            </p>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mb-4 font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white">
                {col.title}
              </h2>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) =>
                  link.external ? (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener" className="no-underline hover:text-white hover:underline">
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <Link href={link.href} className="no-underline hover:text-white hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-white/15 py-5 text-[0.8rem] text-brand-300">
          <span>© 2026 HISP Asia · DHIS2 Asia-Pacific Conference. All rights reserved.</span>
          <span>
            <Link href="/terms/" className="no-underline hover:text-white hover:underline">
              Terms &amp; conditions
            </Link>
            {' · '}
            <a href={`mailto:${event.contactEmail}`} className="no-underline hover:text-white hover:underline">
              {event.contactEmail}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
