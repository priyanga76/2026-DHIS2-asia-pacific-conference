'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { VenueImage } from '@/lib/content';
import { cn } from '@/lib/utils';

const AUTOPLAY_DELAY_MS = 10_000;

interface VenueCarouselProps {
  images: VenueImage[];
  venueName: string;
  tone?: 'light' | 'dark';
  className?: string;
}

export default function VenueCarousel({
  images,
  venueName,
  tone = 'light',
  className,
}: VenueCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const pauseButtonPointerTarget = useRef<boolean | null>(null);
  const slideCount = images.length;
  const currentIndex = slideCount > 0 ? Math.min(activeIndex, slideCount - 1) : 0;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);
    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(!document.hidden);

    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (
      slideCount < 2 ||
      isPaused ||
      isHovered ||
      prefersReducedMotion ||
      !isDocumentVisible
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % slideCount);
    }, AUTOPLAY_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [currentIndex, isDocumentVisible, isHovered, isPaused, prefersReducedMotion, slideCount]);

  if (slideCount === 0) return null;

  const isDark = tone === 'dark';
  const showImage = (index: number) => setActiveIndex((index + slideCount) % slideCount);
  const toggleSlideshow = () => {
    const nextPaused = pauseButtonPointerTarget.current ?? !isPaused;
    pauseButtonPointerTarget.current = null;
    setIsPaused(nextPaused);
  };

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl border shadow-lift',
        isDark ? 'border-white/15 bg-brand-900' : 'border-line bg-white',
        className,
      )}
      role="region"
      aria-label={`${venueName} photo gallery`}
      aria-roledescription="carousel"
      onFocusCapture={() => setIsPaused(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {slideCount > 1 && !prefersReducedMotion && (
        <button
          type="button"
          onPointerDown={() => { pauseButtonPointerTarget.current = !isPaused; }}
          onPointerCancel={() => { pauseButtonPointerTarget.current = null; }}
          onKeyDown={() => { pauseButtonPointerTarget.current = null; }}
          onClick={toggleSlideshow}
          className="absolute right-3 top-3 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-brand-950/70 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-brand-950 focus-visible:outline-white focus-visible:ring-2 focus-visible:ring-brand-950"
          aria-label={isPaused ? 'Play hotel photo slideshow' : 'Pause hotel photo slideshow'}
        >
          {isPaused ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          )}
        </button>
      )}

      <div className="relative aspect-[16/10] overflow-hidden bg-brand-950">
        {images.map((photo, index) => {
          const isActive = index === currentIndex;
          const isContained = photo.fit === 'contain';

          return (
            <div
              key={photo.src}
              className={cn(
                'absolute inset-0 transition-opacity duration-700 ease-in-out',
                isActive ? 'z-10 opacity-100' : 'z-0 opacity-0',
              )}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slideCount}: ${photo.caption}`}
              aria-hidden={!isActive}
            >
              {isContained && (
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) calc(100vw - 40px), 46vw"
                  className="scale-110 object-cover opacity-45 blur-2xl"
                  aria-hidden="true"
                />
              )}
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 1024px) calc(100vw - 40px), 46vw"
                className={cn(isContained ? 'object-contain' : 'object-cover')}
                style={{ objectPosition: photo.objectPosition ?? 'center' }}
              />
            </div>
          );
        })}

        {slideCount > 1 && (
          <>
            <button
              type="button"
              onClick={() => showImage(currentIndex - 1)}
              className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-brand-950/70 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-brand-950 focus-visible:outline-white focus-visible:ring-2 focus-visible:ring-brand-950"
              aria-label="Previous hotel photo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => showImage(currentIndex + 1)}
              className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-brand-950/70 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-brand-950 focus-visible:outline-white focus-visible:ring-2 focus-visible:ring-brand-950"
              aria-label="Next hotel photo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div
        className={cn(
          'flex flex-col gap-3 px-4 py-3 text-[0.78rem] sm:flex-row sm:items-center sm:justify-between',
          isDark ? 'bg-brand-900 text-brand-200' : 'bg-white text-body',
        )}
      >
        <span aria-live={isPaused || prefersReducedMotion ? 'polite' : 'off'} aria-atomic="true">
          <span className={cn('font-semibold', isDark ? 'text-white' : 'text-ink')}>{venueName}, Colombo</span>
          <span aria-hidden="true"> · </span>
          {images[currentIndex].caption}
        </span>

        {slideCount > 1 && (
          <span className="flex flex-wrap items-center gap-1" role="group" aria-label="Choose a hotel photo">
            <span className={cn('mr-1 tabular-nums', isDark ? 'text-brand-200' : 'text-body')}>
              {currentIndex + 1} / {slideCount}
            </span>
            {images.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => showImage(index)}
                className="group grid h-8 w-8 place-items-center rounded-full focus-visible:outline-white focus-visible:ring-2 focus-visible:ring-brand-950"
                aria-label={`Show photo ${index + 1}: ${photo.caption}`}
                aria-current={index === currentIndex ? 'true' : undefined}
              >
                <span
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    index === currentIndex
                      ? cn('w-4', isDark ? 'bg-accent-500' : 'bg-accent-700')
                      : cn('w-1.5', isDark ? 'bg-brand-300 group-hover:bg-white' : 'bg-brand-600 group-hover:bg-brand-800'),
                  )}
                  aria-hidden="true"
                />
              </button>
            ))}
          </span>
        )}
      </div>
    </section>
  );
}
