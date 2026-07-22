import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import CtaBand from '@/components/CtaBand';
import VenueCarousel from '@/components/VenueCarousel';
import VenueMap from '@/components/VenueMap';
import { event } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Venue',
  description: `The ${event.title} takes place at the ${event.venue.name}, ${event.city}, ${event.country} — address, map, arrival and accessibility information.`,
  alternates: { canonical: '/venue/' },
};

export default function VenuePage() {
  return (
    <>
      <PageHeader
        eyebrow="Venue"
        title={`${event.venue.name}, Colombo`}
        lede="The Grande Dame of Galle Face Green — Colombo's historic oceanfront landmark hosts the 2026 conference."
      >
        <div className="mt-5">
          <span className="chip-ok">Confirmed venue</span>
        </div>
      </PageHeader>

      <section className="py-14">
        <div className="container-site">
          <div className="grid items-center gap-10 rounded-2xl border border-line bg-white p-6 shadow-card sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">A landmark by the Indian Ocean</h2>
              <p className="prose-site mt-4">
                The 2026 conference takes place at the {event.venue.name}, opened in 1864 and one of the oldest
                hotels east of Suez. Its ballrooms and event spaces host the plenary and parallel sessions just
                steps from Galle Face Green and the Indian Ocean.
              </p>
              <ul className="mt-5 space-y-2.5 text-[0.95rem]">
                <li>
                  <strong className="text-ink">Address:</strong> {event.venue.address}
                </li>
                <li>
                  <strong className="text-ink">From the airport:</strong> about 32 km from Bandaranaike
                  International Airport (CMB), roughly 45–75 minutes by car.
                </li>
                <li>
                  <strong className="text-ink">Accessibility:</strong> step-free access and accessible facilities
                  are available; contact the organisers with specific accessibility needs.
                </li>
                <li>
                  <strong className="text-ink">On the day:</strong> the registration desk opens 08:15 each morning;
                  name badges are required for venue access.
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={event.venue.mapUrl} target="_blank" rel="noopener" className="btn-primary">
                  View on Google Maps
                </a>
                <Link href="/hotels/" className="btn-outline">
                  Where to stay
                </Link>
              </div>
            </div>
            <VenueCarousel images={event.venue.images} venueName={event.venue.name} />
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="card">
              <h3 className="font-display font-bold text-ink">Getting there</h3>
              <p className="mt-2 text-[0.92rem]">
                The hotel sits on Galle Road at the southern end of Galle Face Green, in Kollupitiya (Colombo 3).
                Taxis and ride-hailing apps (PickMe, Uber) drop off at the main entrance.
              </p>
            </div>
            <div className="card">
              <h3 className="font-display font-bold text-ink">Around the venue</h3>
              <p className="mt-2 text-[0.92rem]">
                Galle Face Green, the seaside promenade, is directly in front of the hotel. Restaurants, cafés, and
                the Colombo city centre are within a short walk or tuk-tuk ride.
              </p>
            </div>
            <div className="card">
              <h3 className="font-display font-bold text-ink">Conference rooms</h3>
              <p className="mt-2 text-[0.92rem]">
                Plenary sessions run in the main ballroom, with parallel sessions and workshops in adjacent event
                rooms. Room assignments appear in the <Link href="/programme/" className="font-semibold text-brand-700">programme</Link>.
              </p>
            </div>
          </div>

          <VenueMap venue={event.venue} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
