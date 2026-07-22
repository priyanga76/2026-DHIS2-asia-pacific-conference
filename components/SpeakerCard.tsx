import Image from 'next/image';
import Link from 'next/link';
import type { Speaker } from '@/lib/content';
import { initials } from '@/lib/utils';

export function SpeakerAvatar({ speaker, size = 96 }: { speaker: Speaker; size?: number }) {
  if (speaker.photo) {
    return (
      <Image
        src={speaker.photo}
        alt={`Portrait of ${speaker.name}`}
        width={size}
        height={size}
        className="rounded-full border border-line object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex flex-none items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-900 font-display font-extrabold text-white"
      style={{ width: size, height: size, fontSize: size * 0.32 }}
    >
      {initials(speaker.name)}
    </span>
  );
}

export default function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <Link
      href={`/speakers/${speaker.slug}/`}
      className="card group flex items-center gap-4 no-underline transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
    >
      <SpeakerAvatar speaker={speaker} size={72} />
      <span>
        <span className="block font-display text-[1.02rem] font-bold text-ink group-hover:text-brand-700">
          {speaker.name}
        </span>
        <span className="block text-sm text-body">{speaker.role}</span>
        <span className="block text-sm font-semibold text-brand-700">{speaker.organisation}</span>
      </span>
    </Link>
  );
}
