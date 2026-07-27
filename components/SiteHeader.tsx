'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/programme/', label: 'Programme' },
  { href: '/speakers/', label: 'Speakers' },
  { href: '/registration/', label: 'Registration' },
  { href: '/venue/', label: 'Venue' },
  { href: '/travel/', label: 'Travel' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/faqs/', label: 'FAQs' },
  { href: '/contact/', label: 'Contact' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

const HISP_ASIA_STRIP_COLORS = ["#ea0d2e", "#8d153a", "#eb7400", "#ffbe29", "#00746c", "#3eafe3", "#1e3765"];


  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-line border-t-4 border-t-brand-600 bg-white/95 backdrop-blur transition-shadow',
        scrolled && 'shadow-card',
      )}
    >
      
      <div className="container-site flex min-h-16 items-center gap-3">
        <Link
          href="/"
          className="flex shrink-0 items-center no-underline"
          aria-label="DHIS2 Asia-Pacific Conference 2026 home"
        >
          <Image
            src="/images/dhis2-conference-asia-pacific-2026.png"
            alt=""
            width={3905}
            height={1029}
            priority
            sizes="(min-width: 1280px) 210px, (min-width: 1024px) 165px, 190px"
            className="h-auto w-[190px] lg:w-[165px] xl:w-[210px]"
          />
        </Link>

        <button
          type="button"
          className="ml-auto inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        <nav
          id="site-nav"
          aria-label="Main"
          className={cn(
            'lg:ml-auto lg:block',
            open
              ? 'absolute inset-x-0 top-full block border-b border-line bg-white shadow-lift'
              : 'hidden',
          )}
        >
          <ul className={cn('flex gap-0.5', open ? 'flex-col p-4' : 'items-center')}>
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname === item.href.replace(/\/$/, '');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'inline-flex min-h-11 w-full items-center rounded-md px-3 py-1.5 text-[0.92rem] font-semibold no-underline',
                      active ? 'bg-brand-100 text-brand-800' : 'text-body hover:bg-mist hover:text-brand-800',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {open && (
              <li className="pt-2">
                <Link href="/registration/" className="btn-primary w-full">
                  Register now
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <Link href="/registration/" className="btn-primary ml-2 hidden lg:inline-flex">
          Register now
        </Link>
      </div>
      {/*} <div className="flex h-[3px] w-full" aria-hidden="true">
        {HISP_ASIA_STRIP_COLORS.map((color) => (
          <span key={color} className="h-full flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>  */}

    </header>
  );
}
