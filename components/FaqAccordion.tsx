'use client';

import { useState } from 'react';
import type { Faq } from '@/lib/content';
import { cn } from '@/lib/utils';

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="border-t border-line">
      {faqs.map((faq) => {
        const open = openId === faq.id;
        return (
          <div key={faq.id} className="border-b border-line">
            <h3 className="m-0">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`faq-panel-${faq.id}`}
                id={`faq-button-${faq.id}`}
                onClick={() => setOpenId(open ? null : faq.id)}
                className="flex min-h-12 w-full items-center justify-between gap-4 py-5 text-left font-display text-[1rem] font-bold text-ink hover:text-brand-700"
              >
                {faq.question}
                <svg
                  className={cn('flex-none transition-transform', open && 'rotate-45')}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </h3>
            <div
              id={`faq-panel-${faq.id}`}
              role="region"
              aria-labelledby={`faq-button-${faq.id}`}
              className={cn('grid transition-[grid-template-rows] duration-200', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-6 text-[0.94rem]">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
