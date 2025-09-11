"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit,
  Trash2,
  Eye,
  Calendar,
  Users,
  MapPin,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";

// Mock data - in a real app, this would come from your API
const mockEvents = [
  {
    id: "1",
    title: "European Rally Championship",
    location: "Monte Carlo, Monaco",
    startDate: new Date("2024-12-15T10:00:00"),
    category: "RALLY",
    status: "PUBLISHED",
    attendees: 287,
    maxAttendees: 500,
    ticketPrice: 75,
    views: 1234,
  },
  {
    id: "2",
    title: "Classic Car Exhibition",
    location: "London, UK",
    startDate: new Date("2024-12-20T09:00:00"),
    category: "EXHIBITION",
    status: "PENDING",
    attendees: 154,
    maxAttendees: 300,
    ticketPrice: 25,
    views: 856,
  },
  {
    id: "3",
    title: "BMW M Series Meetup",
    location: "Munich, Germany",
    startDate: new Date("2024-12-25T14:00:00"),
    category: "MEET_UP",
    status: "APPROVED",
    attendees: 89,
    maxAttendees: 150,
    ticketPrice: null,
    views: 432,
  },
];

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-blue-100 text-blue-800",
  PUBLISHED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-100 text-gray-800",
};

export function EventsTable() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const handleEdit = (eventId: string) => {
    // Navigate to edit page
    console.log("Edit event:", eventId);
  };

  const handleDelete = (eventId: string) => {
    // Show confirmation dialog and delete
    console.log("Delete event:", eventId);
  };

  if (mockEvents.length === 0) {
    return (
      <div className="bg-background border border-border/20 rounded-lg p-12 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No events yet</h3>
        <p className="text-muted-foreground mb-6">
          Create your first automotive event to get started.
        </p>
        <Link
          href="/dashboard/events/new"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Create Your First Event
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background  rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Event
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Attendees
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Views
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Revenue
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockEvents.map((event, index) => (
              <motion.tr
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="hover:bg-muted/25 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-foreground">
                      {event.title}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {event.location}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {event.category.replace("_", " ")}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">
                    {formatDateTime(event.startDate)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[event.status as keyof typeof statusColors]
                    }`}
                  >
                    {event.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-sm">
                      {event.attendees} / {event.maxAttendees}
                    </span>
                  </div>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (event.attendees / event.maxAttendees) * 100
                        }%`,
                      }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-sm">
                      {event.views.toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium">
                    {event.ticketPrice
                      ? `$${(
                          event.attendees * event.ticketPrice
                        ).toLocaleString()}`
                      : "Free"}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      href={`/events/${event.id}`}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      title="View Event"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleEdit(event.id)}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      title="Edit Event"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="p-2 text-muted-foreground hover:text-red-600 transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
