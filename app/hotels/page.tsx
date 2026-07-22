import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import CtaBand from '@/components/CtaBand';
import { hotels } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Hotels',
  description:
    'Where to stay for the DHIS2 Asia-Pacific Conference 2026: the Galle Face Hotel venue and recommended hotels within walking distance, with indicative rates.',
  alternates: { canonical: '/hotels/' },
};

export default function HotelsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Accommodation"
        title="Where to stay"
        lede="The conference takes place at the Galle Face Hotel, so staying on site or within walking distance keeps you steps from the sessions. Any negotiated delegate rates will be published here."
      />
      <section className="py-14">
        <div className="container-site">
          <div className="grid gap-5 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <div key={hotel.name} className="card flex flex-col">
                {hotel.isVenue && (
                  <p className="mb-2">
                    <span className="chip-ok">Conference venue</span>
                  </p>
                )}
                <h2 className="font-display text-[1.1rem] font-bold text-ink">{hotel.name}</h2>
                <dl className="mt-3 flex-1 space-y-2 text-[0.9rem]">
                  <div>
                    <dt className="inline font-bold text-ink">Distance: </dt>
                    <dd className="inline">{hotel.distance}</dd>
                  </div>
                  <div>
                    <dt className="inline font-bold text-ink">Guest rating: </dt>
                    <dd className="inline">{hotel.rating}</dd>
                  </div>
                  <div>
                    <dt className="inline font-bold text-ink">Indicative rate: </dt>
                    <dd className="inline">{hotel.rate}</dd>
                  </div>
                  <div>
                    <dt className="inline font-bold text-ink">Character: </dt>
                    <dd className="inline">{hotel.character}</dd>
                  </div>
                </dl>
                <a href={hotel.mapUrl} target="_blank" rel="noopener" className="btn-outline mt-5 self-start">
                  Find on map
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[0.85rem] text-body">
            Rates are indicative only and change with season and availability. Guest ratings are Tripadvisor scores
            checked in July 2026 and may change. Delegates book and pay for their own accommodation unless otherwise
            advised.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
