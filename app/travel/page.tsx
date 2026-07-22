import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import CtaBand from '@/components/CtaBand';
import PlaceCard from '@/components/PlaceCard';
import SectionHeading from '@/components/SectionHeading';
import { event, places } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Travel & Visa',
  description:
    'Places to explore in Colombo and across Sri Lanka, plus visa, airport transfer, weather, currency, electricity, and emergency information for conference attendees.',
  alternates: { canonical: '/travel/' },
};

const INFO_BLOCKS: { title: string; body: React.ReactNode }[] = [
  {
    title: 'Visa and entry',
    body: (
      <>
        Most visitors need an Electronic Travel Authorization (ETA) issued through Sri Lanka&apos;s official online
        portal at{' '}
        <a href="https://www.eta.gov.lk/" target="_blank" rel="noopener" className="font-semibold text-brand-700">
          eta.gov.lk
        </a>{' '}
        before travel. Requirements and fees vary by nationality, so check the portal early and apply well in
        advance. Official invitation letters are issued after delegates complete payment and email their payment
        receipt to the organising team.
      </>
    ),
  },
  {
    title: 'Airport and transfers',
    body: (
      <>
        Fly into Bandaranaike International Airport (CMB), about 32 km north of Colombo. The drive to the city
        centre takes roughly 45–75 minutes via the airport expressway. On arrival you can use prepaid airport taxi
        counters in the arrivals hall, ride-hailing apps (PickMe, Uber), or hotel transfers booked in advance.
      </>
    ),
  },
  {
    title: 'Weather in October',
    body: (
      <>
        October in Colombo is warm and humid, typically 24–31°C. It falls within the second inter-monsoon season,
        so expect sunny spells broken by afternoon or evening showers and the occasional thunderstorm — a compact
        umbrella and light, breathable clothing are recommended. Conference rooms are air-conditioned, so a light
        layer is useful indoors.
      </>
    ),
  },
  {
    title: 'Time zone',
    body: (
      <>
        Sri Lanka Standard Time is UTC+5:30 year round, with no daylight saving changes. All programme times on this
        site are given in local time.
      </>
    ),
  },
  {
    title: 'Money and payments',
    body: (
      <>
        The local currency is the Sri Lankan Rupee (LKR). Cards are widely accepted at hotels, larger restaurants,
        and supermarkets; carry some cash for taxis, small vendors, and markets. ATMs are widely available in
        Colombo.
      </>
    ),
  },
  {
    title: 'Electricity',
    body: (
      <>
        230 V, 50 Hz. Sockets are mainly Type D and Type G (UK-style), with Type M also found in some buildings.
        Bring a universal adapter to be safe.
      </>
    ),
  },
  {
    title: 'Emergency numbers',
    body: (
      <ul className="list-disc pl-5">
        <li>Police Emergency Hotline: 119</li>
        <li>Ambulance (Suwa Seriya): 1990</li>
        <li>Fire and rescue: 110</li>
      </ul>
    ),
  },
  {
    title: 'Useful links',
    body: (
      <ul className="list-disc pl-5">
        <li>
          <a href="https://www.eta.gov.lk/" target="_blank" rel="noopener" className="font-semibold text-brand-700">
            Sri Lanka ETA portal (official)
          </a>
        </li>
        <li>
          <a href="https://www.airport.lk/" target="_blank" rel="noopener" className="font-semibold text-brand-700">
            Bandaranaike International Airport
          </a>
        </li>
        <li>
          <a href="https://hispasia.org/" target="_blank" rel="noopener" className="font-semibold text-brand-700">
            HISP Asia
          </a>
        </li>
      </ul>
    ),
  },
];

export default function TravelPage() {
  const colomboPlaces = places.filter((place) => place.region === 'colombo');
  const islandPlaces = places.filter((place) => place.region === 'island');

  return (
    <>
      <PageHeader
        eyebrow="Travel & visa"
        title="Plan your trip"
        lede="Last updated: 16 July 2026. Always verify visa requirements against official government sources before booking travel."
      />
      <section id="explore-sri-lanka" aria-labelledby="explore-title" className="scroll-mt-24 py-14 sm:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Beyond the conference"
            title="Make time to explore"
            id="explore-title"
            lede="Begin with Colombo’s landmarks, markets, temples, and oceanfront, then extend your stay for Sri Lanka’s ancient cities, hill country, beaches, and wildlife."
          />

          <div>
            <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">In and around Colombo</h3>
            <p className="mt-2 max-w-3xl text-[0.95rem]">
              These stops fit naturally around a conference stay. Opening hours and access can change, especially at
              active places of worship, so check locally before visiting.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {colomboPlaces.map((place) => (
                <PlaceCard key={place.slug} place={place} headingLevel="h4" />
              ))}
            </div>
          </div>

          <div className="mt-14 border-t border-line pt-12">
            <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">Worth extending your stay for</h3>
            <p className="mt-2 max-w-3xl text-[0.95rem]">
              These destinations deserve more time than a quick outing from Colombo. Build in travel time and plan
              one or more overnight stays.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {islandPlaces.map((place) => (
                <PlaceCard key={place.slug} place={place} headingLevel="h4" />
              ))}
            </div>
          </div>

          <p className="mt-8 text-[0.78rem] text-slate-500">
            Destination photographs are displayed cropped and are linked to their source and
            licence on each card.
          </p>
        </div>
      </section>

      <section aria-labelledby="travel-essentials-title" className="border-t border-line bg-mist py-14 sm:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Practical information"
            title="Travel essentials"
            id="travel-essentials-title"
            lede="Entry requirements, airport transfers, weather, money, power, and useful contacts for your conference trip."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {INFO_BLOCKS.map((block) => (
              <div key={block.title} className="card">
                <h3 className="font-display text-[0.98rem] font-bold text-ink">{block.title}</h3>
                <div className="mt-2 text-[0.92rem]">{block.body}</div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-[0.9rem] text-body">
            After completing payment, email your payment receipt to{' '}
            <a href={`mailto:${event.contactEmail}`} className="font-semibold text-brand-700">
              {event.contactEmail}
            </a>. The organising team will send your official invitation letter once payment is verified.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
