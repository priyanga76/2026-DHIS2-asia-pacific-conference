'use client';

import { useState } from 'react';
import { event } from '@/lib/content';

/**
 * Contact form that opens a pre-filled email in the visitor's mail app.
 * Nothing is stored or transmitted by the website itself, which keeps the
 * static site free of backend and PII concerns. Swap for a form endpoint
 * (e.g. Formspree or a serverless function) when one is available.
 */
export default function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });

  function update(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    const body = `${fields.message}\n\n---\nFrom: ${fields.name} <${fields.email}>`;
    window.location.href = `mailto:${event.contactEmail}?subject=${encodeURIComponent(
      `[DHIS2 APAC 2026] ${fields.subject}`,
    )}&body=${encodeURIComponent(body)}`;
  }

  const inputClass =
    'min-h-11 w-full rounded-lg border border-line bg-white px-3.5 py-2 text-[0.95rem] text-ink placeholder:text-slate-400';

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mb-4">
        <label htmlFor="cf-name" className="mb-1.5 block text-[0.85rem] font-bold text-ink">
          Full name
        </label>
        <input id="cf-name" type="text" required autoComplete="name" className={inputClass} value={fields.name} onChange={update('name')} />
      </div>
      <div className="mb-4">
        <label htmlFor="cf-email" className="mb-1.5 block text-[0.85rem] font-bold text-ink">
          Email address
        </label>
        <input id="cf-email" type="email" required autoComplete="email" className={inputClass} value={fields.email} onChange={update('email')} />
      </div>
      <div className="mb-4">
        <label htmlFor="cf-subject" className="mb-1.5 block text-[0.85rem] font-bold text-ink">
          Subject
        </label>
        <input id="cf-subject" type="text" required className={inputClass} value={fields.subject} onChange={update('subject')} />
      </div>
      <div className="mb-5">
        <label htmlFor="cf-message" className="mb-1.5 block text-[0.85rem] font-bold text-ink">
          Message
        </label>
        <textarea id="cf-message" required rows={6} className={`${inputClass} resize-y`} value={fields.message} onChange={update('message')} />
      </div>
      <button type="submit" className="btn-primary">
        Send message
      </button>
      <p className="mt-3 text-[0.82rem] text-body">
        Sending opens a pre-filled email in your mail app addressed to the organising team. Nothing is stored on
        this website.
      </p>
    </form>
  );
}
