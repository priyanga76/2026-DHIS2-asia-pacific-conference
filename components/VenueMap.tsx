import type { EventInfo } from '@/lib/content';

interface VenueMapProps {
  venue: EventInfo['venue'];
}

export default function VenueMap({ venue }: VenueMapProps) {
  return (
    <section
      aria-labelledby="venue-map-title"
      className="mt-10 overflow-hidden rounded-2xl border border-line bg-white shadow-card"
    >
      <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <span className="eyebrow">Location &amp; directions</span>
          <h2 id="venue-map-title" className="mt-2 font-display text-2xl font-bold text-ink">
            Explore the area around the venue
          </h2>
          <p className="mt-4 leading-relaxed">
            See the hotel beside Galle Face Green and the Indian Ocean, then open Google Maps to explore nearby
            streets, plan your journey, or request turn-by-turn directions.
          </p>

          <address className="mt-5 flex items-start gap-3 rounded-xl bg-mist p-4 not-italic text-[0.92rem] text-ink">
            <svg
              className="mt-0.5 flex-none text-brand-700"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
              <circle cx="12" cy="10" r="2.6" />
            </svg>
            <span>
              <strong className="block font-display">{venue.name}</strong>
              {venue.address}
            </span>
          </address>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={venue.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Get directions
              <span aria-hidden="true">↗</span>
            </a>
            <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              Open Google Maps
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="relative min-h-[22rem] overflow-hidden bg-brand-100 lg:min-h-[28rem]">
          <iframe
            src={venue.mapEmbedUrl}
            title={`Map preview showing ${venue.name} and the surrounding area`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full border-0"
          />
          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${venue.name} in Google Maps in a new tab`}
            className="group absolute inset-0 z-10 flex items-end justify-end p-4 no-underline focus-visible:outline-white focus-visible:ring-2 focus-visible:ring-brand-950 sm:p-5"
          >
            <span className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 text-[0.88rem] font-bold text-brand-800 shadow-lift transition-colors group-hover:bg-brand-100">
              Open interactive map
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14 5h5v5M10 14 19 5M19 14v5H5V5h5" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
