import Image from 'next/image';
import Link from 'next/link';
import AddToCalendar from '@/components/AddToCalendar';
import Countdown from '@/components/Countdown';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import PlaceCard from '@/components/PlaceCard';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import SpeakerCard from '@/components/SpeakerCard';
import VenueCarousel from '@/components/VenueCarousel';
import { conferenceDays, event, faqs, gallery, places, sessionsForDay, speakers, sponsorTiers, tracks } from '@/lib/content';
import { formatDayShort } from '@/lib/utils';

const eventLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.title,
  description: event.description,
  startDate: event.startDate,
  endDate: event.endDate,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  image: [`${event.siteUrl}/images/gallery/conf-past-1.jpg`],
  location: {
    '@type': 'Place',
    name: event.venue.name,
    address: { '@type': 'PostalAddress', streetAddress: '2 Galle Road', addressLocality: event.city, postalCode: '00300', addressCountry: 'LK' },
  },
  organizer: event.organisers.map((o) => ({ '@type': 'Organization', name: o.name, url: o.url })),
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

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-800 to-brand-950 text-white">
      {/* Photo blended into the right side of the hero, next to the heading */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] md:block">
        <Image
          src="/images/gallery/conf-past-1.jpg"
          alt=""
          fill
          priority
          sizes="58vw"
          className="img-blend object-cover object-[70%_35%] opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-brand-900/30" />
      </div>

      {/* Subtle dot field for texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(156,196,221,.4) 1px, transparent 1.4px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container-site relative">
        <div className="max-w-2xl pt-8 pb-10 sm:py-10 lg:pt-6 lg:pb-10">
          <span className="eyebrow text-accent-100">Hosted by HISP Asia &amp; the HISP Centre, University of Oslo</span>
          <h1 id="hero-title" className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            DHIS2 Asia-Pacific
            <span className="block bg-gradient-to-r from-accent-100 to-accent-300 bg-clip-text text-transparent">
              Conference 2026
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-brand-100 sm:text-xl">
            <span className="block">{event.tagline}.</span>
            <span className="mt-1 block">
              Three days of experience and partnership building for the DHIS2 community across the Asia Pacific
              region and beyond.
            </span>
          </p>

          <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-2 font-semibold text-brand-50">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4M16 3v4M3 10h18" />
              </svg>
              <dt className="sr-only">Dates</dt>
              <dd>{event.dateLabel}</dd>
            </div>
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.6" />
              </svg>
              <dt className="sr-only">Venue</dt>
              <dd>
                {event.venue.name}, {event.city}, {event.country}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/registration/" className="btn-accent">
              Register Now!
            </Link>
            <Link href="/programme/" className="btn-ghost">
              View programme
            </Link>
            <AddToCalendar />
          </div>

          <div className="mt-8">
            <Countdown />
          </div>

          <p className="mt-8 max-w-lg text-[0.85rem] text-brand-100">
            Seats are limited—register early to secure your place at the conference.
          </p>
        </div>
      </div>
    </section>
  );
}

function QuickFacts() {
  const facts = [
    { label: 'Format', value: event.format, sub: event.formatNote },
    { label: 'Dates', value: event.dateLabel, sub: 'Monday to Wednesday' },
    { label: 'Venue', value: event.venue.name, sub: `${event.city}, ${event.country}` },
    { label: 'Organisers', value: 'HISP Asia', sub: 'with HISP Centre, University of Oslo' },
  ];
  return (
    <section aria-label="Key facts" className="border-b border-line bg-white">
      <ul className="container-site grid grid-cols-2 lg:grid-cols-4">
        {facts.map((f, i) => (
          <li key={f.label} className={`px-5 py-6 ${i > 0 ? 'lg:border-l lg:border-line' : ''} ${i % 2 === 1 ? 'border-l border-line lg:border-l' : ''} ${i > 1 ? 'border-t border-line lg:border-t-0' : ''}`}>
            <span className="block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand-700">{f.label}</span>
            <span className="mt-1 block font-display font-bold text-ink">{f.value}</span>
            <span className="block text-[0.85rem] text-body">{f.sub}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function About() {
  return (
    <section aria-labelledby="about-title" className="py-20">
      <div className="container-site grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <SectionHeading eyebrow="About the conference" title="The place to meet and share experiences about DHIS2" id="about-title" />
          <div className="prose-site">
            <p>
              The DHIS2 Asia-Pacific Conference is a place for the DHIS2 community to meet and share experiences,
              learn about the latest developments and innovations, and make connections that can lead to new
              partnerships and collaborations. It is the regional counterpart to the DHIS2 Annual Conference hosted
              each year in Oslo.
            </p>
            <p>
              The programme balances discussion and information sharing with hands-on technical learning through
              parallel sessions. Country teams present national implementation journeys, the DHIS2 core and regional
              teams demonstrate new platform capabilities, and workshops build practical skills that participants
              take home to their own systems.
            </p>
            <p>
              2026 marks the fifth edition of this annual regional event — and a return to Colombo, which welcomed
              the community in 2023.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h3 className="font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-brand-700">Past editions</h3>
          <ol className="mt-4 border-l-2 border-brand-200 pl-5">
            {event.pastEditions.map((e) => (
              <li key={e.year} className="relative mb-5 last:mb-0">
                <span aria-hidden="true" className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-brand-400" />
                <span className="block font-display font-bold text-ink">
                  {e.year} · {e.city}, {e.country}
                </span>
                <span className="block text-[0.85rem] text-body">{e.note}</span>
              </li>
            ))}
            <li className="relative">
              <span aria-hidden="true" className="absolute -left-[1.75rem] top-1 h-4 w-4 rounded-full border-2 border-white bg-accent-500" />
              <span className="block font-display font-bold text-brand-700">
                2026 · {event.city}, {event.country}
              </span>
              <span className="block text-[0.85rem] text-body">
                Fifth edition — {event.dateLabel}, {event.venue.name}
              </span>
            </li>
          </ol>
          <figure className="mt-8 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <div className="relative aspect-[3/2] overflow-hidden bg-brand-100">
              <Image
                src="/images/gallery/colombo-2023/thumbs/opening-ceremony.jpg"
                alt="A delegate lighting a traditional brass oil lamp at the 2023 conference opening"
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="object-cover"
              />
            </div>
            <figcaption className="px-4 py-3 text-[0.85rem] leading-relaxed text-body">
              <span className="block font-display font-bold text-ink">A warm welcome in Colombo</span>
              Opening the 2023 conference with Sri Lanka&apos;s traditional oil-lamp ceremony.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function Audience() {
  const cards = [
    {
      title: 'Government & development partners',
      body: 'Policy makers, HIS managers, and digital health leaders from national and subnational governments, plus representatives of global development organisations such as WHO, UNICEF, and other partners.',
    },
    {
      title: 'Implementers, NGOs & technical experts',
      body: 'Field implementers, M&E officers, NGO staff, system administrators, data analysts, and developers working directly with DHIS2 across health, education, nutrition, and related sectors.',
    },
    {
      title: 'Academia, innovators & DHIS2 core team',
      body: 'Researchers, faculty members, digital health innovators, and members of the DHIS2 core and regional teams from the University of Oslo and the regional HISP support hubs.',
    },
  ];
  return (
    <section aria-labelledby="audience-title" className="bg-mist py-20">
      <div className="container-site">
        <SectionHeading eyebrow="For whom" title="Who should attend" id="audience-title" />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className="card">
              <h3 className="font-display text-[1.05rem] font-bold text-ink">{c.title}</h3>
              <p className="mt-2 text-[0.93rem]">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tracks() {
  const visible = tracks.filter((t) => t.id !== 'plenary');
  return (
    <section aria-labelledby="tracks-title" className="py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Why come"
          title="Conference tracks"
          id="tracks-title"
          lede="Ten thematic topics shape this year's plenary and parallel sessions. Use them to plan your three days, or follow one topic end to end."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((t, i) => (
            <Reveal key={t.id} delay={(i % 4) * 70} className="rounded-xl border border-line border-l-4 border-l-brand-600 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card">
              <h3 className="font-display text-[0.98rem] font-bold text-ink">{t.name}</h3>
              <p className="mt-1.5 text-[0.86rem]">{t.blurb}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedSpeakers() {
  const featured = speakers.filter((s) => s.featured).slice(0, 6);
  return (
    <section aria-labelledby="speakers-title" className="bg-mist py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Featured speakers"
          title="Learn from the regional HISP network"
          id="speakers-title"
          lede="Speakers and facilitators come from the HISP Asia hub, the HISP Centre at the University of Oslo, ministries of health, and partner organisations. More speakers will be announced as the programme is confirmed."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 90}>
              <SpeakerCard speaker={s} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/speakers/" className="btn-outline">
            All speakers →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProgrammeHighlights() {
  return (
    <section aria-labelledby="programme-title" className="py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Programme"
          title="Three days, one timetable"
          id="programme-title"
          lede={`A first look at the provisional programme. Times are in ${event.timezoneLabel}.`}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {conferenceDays.map((day, i) => {
            const daySessions = sessionsForDay(day).slice(0, 3);
            return (
              <Reveal key={day} delay={i * 90} className="card">
                <h3 className="font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-brand-700">
                  Day {i + 1} · {formatDayShort(day)}
                </h3>
                <ul className="mt-4 space-y-4">
                  {daySessions.map((s) => (
                    <li key={s.slug}>
                      <span className="block font-mono text-[0.78rem] font-semibold text-brand-800">
                        {s.start}–{s.end}
                      </span>
                      <Link href={`/programme/${s.slug}/`} className="font-semibold text-ink no-underline hover:text-brand-700 hover:underline">
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/programme/" className="btn-primary">
            Full programme &amp; filters
          </Link>
          <span className="chip-warn">Provisional — sessions will be confirmed on this site</span>
        </div>
      </div>
    </section>
  );
}

function VenueTeaser() {
  return (
    <section aria-labelledby="venue-title" className="bg-brand-950 py-20 text-white">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            light
            eyebrow="Venue & travel"
            title={`${event.venue.name}, Colombo`}
            id="venue-title"
            lede={`${event.venue.blurb} Opened in 1864, its ballrooms and event spaces host the plenary and parallel sessions just steps from Galle Face Green and the Indian Ocean.`}
          />
          <div className="flex flex-wrap gap-3">
            <Link href="/venue/" className="btn bg-white text-brand-900 hover:bg-brand-100">
              Venue details
            </Link>
            <Link href="/travel/" className="btn-ghost">
              Travel &amp; visa
            </Link>
            <Link href="/hotels/" className="btn-ghost">
              Hotels
            </Link>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <VenueCarousel images={event.venue.images} venueName={event.venue.name} tone="dark" />
        </Reveal>
      </div>
    </section>
  );
}

function ExploreSriLankaTeaser() {
  const featuredPlaces = places.filter((place) => place.featured);

  return (
    <section aria-labelledby="explore-sri-lanka-title" className="bg-mist py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="Beyond the conference"
          title="Make time to explore Sri Lanka"
          id="explore-sri-lanka-title"
          lede="Colombo’s character is just outside the conference doors, while ancient cities, hill country, wildlife, and the coast reward a longer stay."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredPlaces.map((place, i) => (
            <Reveal key={place.slug} delay={(i % 4) * 70} className="h-full">
              <PlaceCard place={place} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/travel/#explore-sri-lanka" className="btn-primary">
            See all {places.length} places →
          </Link>
        </div>
      </div>
    </section>
  );
}

function GalleryTeaser() {
  const photos = gallery.photos.slice(0, 3);
  return (
    <section aria-labelledby="gallery-title" className="py-20">
      <div className="container-site">
        <SectionHeading
          eyebrow="The community"
          title="Moments from past conferences"
          id="gallery-title"
          lede="A look back at the people, ideas, and shared experiences that bring the Asia-Pacific DHIS2 community together."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {photos.map((p, i) => (
            <Reveal key={p.src} delay={i * 90}>
              <Link href="/gallery/" className="group block overflow-hidden rounded-2xl border border-line shadow-card no-underline transition-shadow hover:shadow-lift">
                <span className="relative block aspect-[4/3] overflow-hidden bg-brand-100">
                  <Image
                    src={p.thumbnailSrc ?? p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </span>
                <span className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="text-[0.85rem] font-semibold text-ink">{p.caption}</span>
                  <span className="chip-track flex-none">{p.year}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/gallery/" className="btn-outline">
            View the gallery →
          </Link>
        </div>
      </div>
    </section>
  );
}

function SponsorStrip() {
  return (
    <section aria-labelledby="sponsors-title" className="bg-mist py-16">
      <div className="container-site">
        <SectionHeading eyebrow="Sponsors & partners" title="Hosted by the regional HISP network" id="sponsors-title" />
        {sponsorTiers.map((tier) => (
          <div key={tier.id} className="mb-8 last:mb-0">
            <h3 className="mb-4 font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-brand-700">{tier.name}</h3>
            <ul className="flex flex-wrap gap-4">
              {tier.sponsors.map((s) => (
                <li key={s.slug}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener"
                    className="flex h-24 w-60 items-center justify-center rounded-xl border border-line bg-transparent px-4 py-3 text-center font-display font-bold text-slate-500 no-underline transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card"
                  >
                    {s.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.logo} alt={`${s.name} logo`} className="max-h-16 max-w-full w-auto object-contain" loading="lazy" />
                    ) : (
                      s.name
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-[0.92rem]">
          Interested in sponsoring or exhibiting?{' '}
          <Link href="/sponsors/" className="font-semibold text-brand-700">
            See sponsorship opportunities
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function FaqTeaser() {
  const top = faqs.slice(0, 3);
  return (
    <section aria-labelledby="faq-title" className="py-20">
      <div className="container-site grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Good to know"
          title="Frequently asked questions"
          id="faq-title"
          lede="Visas, invitation letters, payment, streaming — the practical answers, all in one place."
          className="mb-0"
        />
        <div>
          <ul className="divide-y divide-line border-y border-line">
            {top.map((f) => (
              <li key={f.id} className="py-5">
                <h3 className="font-display font-bold text-ink">{f.question}</h3>
                <p className="mt-1.5 max-w-[62ch] text-[0.92rem]">{f.answer}</p>
              </li>
            ))}
          </ul>
          <Link href="/faqs/" className="btn-outline mt-6">
            All FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickFacts />
      <About />
      <Audience />
      <Tracks />
      <FeaturedSpeakers />
      <ProgrammeHighlights />
      <VenueTeaser />
      <ExploreSriLankaTeaser />
      <GalleryTeaser />
      <SponsorStrip />
      <FaqTeaser />
      <CtaBand />
      <JsonLd data={eventLd} />
    </>
  );
}
