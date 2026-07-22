'use client';

const ICS = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//DHIS2 Asia-Pacific Conference//EN',
  'BEGIN:VEVENT',
  'UID:dhis2-apac-2026@2026.apac.dhis2.org',
  'DTSTAMP:20260709T000000Z',
  'DTSTART;VALUE=DATE:20261005',
  'DTEND;VALUE=DATE:20261008',
  'SUMMARY:DHIS2 Asia-Pacific Conference 2026',
  'LOCATION:Galle Face Hotel\\, Colombo\\, Sri Lanka',
  'DESCRIPTION:Connecting communities\\, advancing innovation. Hosted by HISP Asia and the HISP Centre\\, University of Oslo. Details: https://2026.apac.dhis2.org/',
  'END:VEVENT',
  'END:VCALENDAR',
].join('\r\n');

export default function AddToCalendar({ className = 'btn-ghost' }: { className?: string }) {
  function download() {
    const blob = new Blob([ICS], { type: 'text/calendar' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'dhis2-asia-pacific-2026.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }
  return (
    <button type="button" className={className} onClick={download}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18M12 13v6M9 16h6" />
      </svg>
      Add dates to calendar
    </button>
  );
}
