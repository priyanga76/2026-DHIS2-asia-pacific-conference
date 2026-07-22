import type { TravelPlace } from '@/lib/content';

export default function PlaceCard({
  place,
  headingLevel: Heading = 'h3',
}: {
  place: TravelPlace;
  headingLevel?: 'h3' | 'h4';
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift">
      <div className="overflow-hidden bg-brand-100">
        {/* Local photo copies retain linked source and licence credits below. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={place.image.src}
          alt={place.image.alt}
          width={900}
          height={600}
          loading="lazy"
          decoding="async"
          className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-brand-700">{place.area}</span>
        <Heading className="mt-1.5 font-display text-lg font-bold leading-snug text-ink">{place.name}</Heading>
        <p className="mt-2 text-[0.88rem] leading-relaxed text-body">{place.description}</p>
        <p className="mt-auto border-t border-line pt-3 text-[0.68rem] leading-relaxed text-slate-500">
          Photo:{' '}
          <a href={place.image.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-700">
            {place.image.credit}
          </a>{' '}
          ·{' '}
          <a href={place.image.licenseUrl} target="_blank" rel="license noopener noreferrer" className="underline hover:text-brand-700">
            {place.image.license}
          </a>
        </p>
      </div>
    </article>
  );
}
