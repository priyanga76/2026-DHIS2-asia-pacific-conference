'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { GalleryPhoto } from '@/lib/content';
import { cn } from '@/lib/utils';

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const years = useMemo(
    () => Array.from(new Set(photos.map((photo) => photo.year))).sort((a, b) => Number(b) - Number(a)),
    [photos],
  );
  const [year, setYear] = useState('All');
  const [active, setActive] = useState<number | null>(null);
  const visiblePhotos = year === 'All' ? photos : photos.filter((photo) => photo.year === year);
  const activePhoto = active === null ? null : visiblePhotos[active];

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setActive((cur) => (cur === null ? cur : (cur + dir + visiblePhotos.length) % visiblePhotos.length));
    },
    [visiblePhotos.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, step]);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter gallery by year">
        <span className="mr-1 text-sm font-semibold text-body">Show:</span>
        {['All', ...years].map((option) => {
          const selected = year === option;
          const count = option === 'All' ? photos.length : photos.filter((photo) => photo.year === option).length;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                setYear(option);
                setActive(null);
              }}
              className={cn(
                'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors',
                selected
                  ? 'border-brand-700 bg-brand-700 text-white'
                  : 'border-line bg-white text-brand-800 hover:border-brand-400 hover:bg-brand-50',
              )}
            >
              {option}
              <span className={cn('text-xs', selected ? 'text-brand-100' : 'text-body')}>{count}</span>
            </button>
          );
        })}
        <span className="sr-only" aria-live="polite">
          Showing {visiblePhotos.length} photos
        </span>
      </div>

      <ul className="grid grid-flow-dense grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePhotos.map((photo, i) => (
          <li key={photo.src} className={cn(photo.wide && 'sm:col-span-2')}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group block w-full overflow-hidden rounded-2xl border border-line bg-brand-100 text-left shadow-card transition-shadow hover:shadow-lift"
              aria-label={`View photo: ${photo.caption}`}
            >
              <span className={cn('relative block w-full overflow-hidden', photo.wide ? 'aspect-[21/10]' : 'aspect-[4/3]')}>
                <Image
                  src={photo.thumbnailSrc ?? photo.src}
                  alt={photo.alt}
                  fill
                  sizes={
                    photo.wide
                      ? '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw'
                      : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  }
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </span>
              <span className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="text-[0.85rem] font-semibold text-ink">{photo.caption}</span>
                <span className="chip-track flex-none">{photo.year}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.caption}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-brand-950/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div className="relative max-h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              className="mx-auto max-h-[76vh] w-auto max-w-full rounded-xl object-contain"
            />
            <p className="mt-3 text-center text-sm font-semibold text-brand-100">
              {activePhoto.caption}{' '}
              <span className="text-brand-300">
                · {(active ?? 0) + 1} of {visiblePhotos.length}
              </span>
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="btn-ghost min-h-11" onClick={() => step(-1)} aria-label="Previous photo">
              ← Prev
            </button>
            <button type="button" className="btn-ghost min-h-11" onClick={close}>
              Close
            </button>
            <button type="button" className="btn-ghost min-h-11" onClick={() => step(1)} aria-label="Next photo">
              Next →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
