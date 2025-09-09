"use client";

import { Calendar, Download } from "lucide-react";

interface Event {
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  address?: string;
}

interface CalendarAddProps {
  event: Event;
}

export function CalendarAdd({ event }: CalendarAddProps) {
  const formatDateForCalendar = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const generateGoogleCalendarUrl = () => {
    const startDate = formatDateForCalendar(event.startDate);
    const endDate = event.endDate
      ? formatDateForCalendar(event.endDate)
      : formatDateForCalendar(
          new Date(event.startDate.getTime() + 2 * 60 * 60 * 1000)
        ); // Default 2 hours

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates: `${startDate}/${endDate}`,
      details: event.description,
      location: event.address || event.location,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const generateICSFile = () => {
    const startDate =
      event.startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const endDate = event.endDate
      ? event.endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
      : new Date(event.startDate.getTime() + 2 * 60 * 60 * 1000)
          .toISOString()
          .replace(/[-:]/g, "")
          .split(".")[0] + "Z";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//AutoEvents//Event Calendar//EN",
      "BEGIN:VEVENT",
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
      `LOCATION:${event.address || event.location}`,
      `UID:${Date.now()}@autoevents.com`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.title
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-muted-foreground flex items-center">
        <Calendar className="h-4 w-4 mr-1" />
        Add to Calendar:
      </span>

      <a
        href={generateGoogleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
      >
        Google Calendar
      </a>

      <button
        onClick={generateICSFile}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-md transition-colors"
      >
        <Download className="h-4 w-4 mr-1" />
        Download .ics
      </button>
    </div>
  );
}
