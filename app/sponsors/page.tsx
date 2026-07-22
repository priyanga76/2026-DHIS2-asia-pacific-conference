import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import CtaBand from '@/components/CtaBand';
import { event, sponsorTiers } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Sponsors & Partners',
  description: `Hosts, partners, and sponsorship opportunities for the ${event.title}.`,
  alternates: { canonical: '/sponsors/' },
};

export default function SponsorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sponsors & partners"
        title="Hosted by the regional HISP network"
        lede="The conference is hosted by HISP Asia and the HISP Centre at the University of Oslo, with partners from the regional HISP groups."
      />
      <section className="py-14">
        <div className="container-site">
          {sponsorTiers.map((tier) => (
            <div key={tier.id} className="mb-12 last:mb-0">
              <h2 className="mb-5 font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-brand-700">
                {tier.name}
              </h2>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {tier.sponsors.map((s) => (
                  <li key={s.slug}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener"
                      className="group flex h-full flex-col rounded-2xl border border-line bg-transparent p-6 shadow-card no-underline transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
                    >
                      <span className="flex min-h-24 items-center justify-center">
                        {s.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={s.logo} alt={`${s.name} logo`} className="max-h-20 max-w-full w-auto object-contain" loading="lazy" />
                        ) : (
                          <span className="font-display text-lg font-bold text-slate-500 group-hover:text-brand-700">
                            {s.name}
                          </span>
                        )}
                      </span>
                      {s.blurb && <span className="mt-3 text-[0.88rem] text-body">{s.blurb}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="mt-4 rounded-2xl border border-brand-200 bg-brand-100/60 p-8">
            <h2 className="font-display text-xl font-bold text-ink">Become a sponsor</h2>
            <p className="mt-2 max-w-2xl text-[0.95rem]">
              Sponsoring the DHIS2 Asia-Pacific Conference puts your organisation in front of ministries of health,
              implementers, and digital health leaders from across the region. Contact the organising team for the
              sponsorship prospectus and exhibitor options.
            </p>
            <a
              href={`mailto:${event.contactEmail}?subject=${encodeURIComponent('Sponsorship enquiry - DHIS2 Asia-Pacific Conference 2026')}`}
              className="btn-primary mt-5"
            >
              Enquire about sponsorship
            </a>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
