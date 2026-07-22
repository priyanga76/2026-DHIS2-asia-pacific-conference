import eventJson from '@/content/event.json';
import tracksJson from '@/content/tracks.json';
import speakersJson from '@/content/speakers.json';
import sessionsJson from '@/content/sessions.json';
import sponsorsJson from '@/content/sponsors.json';
import faqsJson from '@/content/faqs.json';
import hotelsJson from '@/content/hotels.json';
import galleryJson from '@/content/gallery.json';
import placesJson from '@/content/places.json';

export interface Organiser {
  name: string;
  url: string;
}

export interface FeeTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  deadlineLabel: string;
  featured: boolean;
  includes: string[];
}

export interface VenueImage {
  src: string;
  alt: string;
  caption: string;
  objectPosition?: string;
  fit?: 'cover' | 'contain';
}

export interface EventInfo {
  slug: string;
  title: string;
  shortTitle: string;
  brandLine: string;
  tagline: string;
  description: string;
  edition: number;
  status: string;
  format: string;
  formatNote: string;
  startDate: string;
  endDate: string;
  dateLabel: string;
  dateLabelLong: string;
  timezone: string;
  timezoneLabel: string;
  city: string;
  country: string;
  venue: {
    name: string;
    status: string;
    address: string;
    mapUrl: string;
    mapEmbedUrl: string;
    directionsUrl: string;
    blurb: string;
    images: VenueImage[];
  };
  organisers: Organiser[];
  registration: {
    status: string;
    statusLabel: string;
    note: string;
    provisional: boolean;
    formUrl: string;
    formEmbedUrl: string;
    earlyBirdDeadline: string;
    earlyBirdDeadlineLabel: string;
    cancellationDeadlineLabel: string;
    feeTiers: FeeTier[];
  };
  contactEmail: string;
  siteUrl: string;
  links: Record<string, string>;
  pastEditions: { year: number; city: string; country: string; note: string }[];
  lastUpdated: string;
}

export interface Track {
  id: string;
  name: string;
  short: string;
  blurb: string;
}

export interface Speaker {
  slug: string;
  name: string;
  role: string;
  organisation: string;
  country: string;
  photo: string | null;
  featured: boolean;
  bio: string;
}

export type SessionMode = 'in_person' | 'in_person_streamed';
export type SessionStatus = 'confirmed' | 'provisional';

export interface Session {
  slug: string;
  title: string;
  abstract: string;
  track: string;
  day: string;
  start: string;
  end: string;
  room: string;
  mode: SessionMode;
  status: SessionStatus;
  speakerSlugs: string[];
  presenters: string;
}

export interface Sponsor {
  slug: string;
  name: string;
  logo: string | null;
  url: string;
  blurb: string | null;
}

export interface SponsorTier {
  id: string;
  name: string;
  sponsors: Sponsor[];
}

export interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface Hotel {
  name: string;
  isVenue: boolean;
  distance: string;
  rating: string;
  rate: string;
  character: string;
  mapUrl: string;
}

export interface GalleryPhoto {
  src: string;
  thumbnailSrc?: string;
  alt: string;
  caption: string;
  year: string;
  wide: boolean;
}

export interface TravelPlace {
  slug: string;
  name: string;
  region: 'colombo' | 'island';
  area: string;
  description: string;
  featured: boolean;
  image: {
    src: string;
    alt: string;
    credit: string;
    sourceUrl: string;
    license: string;
    licenseUrl: string;
  };
}

export const event = eventJson as EventInfo;
export const tracks = tracksJson as Track[];
export const speakers = speakersJson as Speaker[];
export const sessions = sessionsJson as Session[];
export const sponsorTiers = (sponsorsJson as { tiers: SponsorTier[] }).tiers;
export const faqs = faqsJson as Faq[];
export const hotels = hotelsJson as Hotel[];
export const gallery = galleryJson as { note: string; photos: GalleryPhoto[] };
export const places = placesJson as TravelPlace[];

export function getTrack(id: string): Track | undefined {
  return tracks.find((t) => t.id === id);
}

export function getSpeaker(slug: string): Speaker | undefined {
  return speakers.find((s) => s.slug === slug);
}

export function getSession(slug: string): Session | undefined {
  return sessions.find((s) => s.slug === slug);
}

export function sessionsForSpeaker(slug: string): Session[] {
  return sessions.filter((s) => s.speakerSlugs.includes(slug));
}

export function sessionsForDay(day: string): Session[] {
  return sessions
    .filter((s) => s.day === day)
    .sort((a, b) => a.start.localeCompare(b.start));
}

export const conferenceDays = Array.from(new Set(sessions.map((s) => s.day))).sort();

export function relatedSessions(session: Session, limit = 3): Session[] {
  return sessions
    .filter((s) => s.slug !== session.slug && s.track === session.track)
    .slice(0, limit);
}
