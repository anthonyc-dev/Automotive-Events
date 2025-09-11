"use client";

import { Calendar, Download } from "lucide-react";
import { useState } from "react";

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
  const [downloading, setDownloading] = useState(false);

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

  const generateICSFile = async () => {
    setDownloading(true);
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
    setTimeout(() => setDownloading(false), 800);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 bg-muted/40 border border-border/60 rounded-xl px-4 py-3 shadow-sm">
      <span className="text-sm font-semibold text-muted-foreground flex items-center mr-2">
        <Calendar className="h-4 w-4 mr-1 text-primary" />
        Add to Calendar
      </span>

      <a
        href={generateGoogleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        title="Add to Google Calendar"
      >
        <Calendar className="h-4 w-4 mr-2" />
        Google Calendar
      </a>

      <button
        onClick={generateICSFile}
        disabled={downloading}
        className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition-colors shadow-sm border border-border/40 bg-muted text-foreground hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
          downloading ? "opacity-60 cursor-not-allowed" : ""
        }`}
        title="Download .ics file"
      >
        <Download className="h-4 w-4 mr-2" />
        {downloading ? "Downloading..." : "Download .ics"}
      </button>
    </div>
  );
}
