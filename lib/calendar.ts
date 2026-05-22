// lib/calendar.ts
type CalendarEvent = {
  title: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
  url?: string;
};

// Format date as YYYYMMDDTHHmmssZ (UTC)
const formatDate = (date: Date) =>
  date.toISOString().replace(/[-:]|\.\d{3}/g, "");

export function googleCalendarUrl(event: CalendarEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${formatDate(event.start)}/${formatDate(event.end)}`,
    details: event.description ?? "",
    location: event.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsContent(event: CalendarEvent) {
  // CRLF line endings are required by RFC 5545
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Cult Creative//Save the Date//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}@cultcreativeasia.com`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(event.start)}`,
    `DTEND:${formatDate(event.end)}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    event.description && `DESCRIPTION:${escapeIcs(event.description)}`,
    event.location && `LOCATION:${escapeIcs(event.location)}`,
    event.url && `URL:${event.url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return lines.join("\r\n");
}

// Escape commas, semicolons, newlines per RFC 5545
function escapeIcs(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}
