import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
  light = false,
  className,
}: {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  id?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('mb-10 max-w-2xl', className)}>
      <span className={cn('eyebrow', light && 'text-accent-300')}>{eyebrow}</span>
      <h2
        id={id}
        className={cn(
          'mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl',
          light ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {lede ? <p className={cn('mt-4 text-lg', light ? 'text-brand-100' : 'text-body')}>{lede}</p> : null}
    </div>
  );
}
