"use client";

import { motion } from "framer-motion";
import { Edit, Trash2, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}
export function EventsTable() {
  const [events, setEvents] = useState<Event[]>([]);

  const handleEdit = (eventId: string) => {
    console.log("Edit event:", eventId);
  };

  const handleDelete = (eventId: string) => {
    console.log("Delete event:", eventId);
  };

  const handleShow = async () => {
    try {
      const response = await fetch("/api/postEvent");

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      console.log("bla bla bla: ", data);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    handleShow();
  }, []);

  if (events.length === 0) {
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
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Location
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Description
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events.map((event, index) => (
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
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">{event.date}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">
                    {event.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">
                    {event.description}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      href={`/dashboard/events/${event.id}`}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      title="View Event"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleEdit(event.id.toString())}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      title="Edit Event"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id.toString())}
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
