"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Grid,
  List,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { formatDateTime } from "@/lib/utils";

// Mock data - in a real app, this would come from your database/API
const mockEvents = [
  {
    id: "1",
    title: "European Rally Championship",
    shortDescription:
      "Experience the thrill of professional rally racing across Europe's most challenging terrains.",
    startDate: new Date("2024-12-15T10:00:00"),
    endDate: new Date("2024-12-15T18:00:00"),
    location: "Monte Carlo, Monaco",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2006&auto=format&fit=crop",
    category: "RALLY",
    ticketPrice: 75,
    maxAttendees: 500,
    currentAttendees: 287,
  },
  {
    id: "2",
    title: "Classic Car Exhibition",
    shortDescription:
      "Discover vintage automobiles from the golden age of motoring.",
    startDate: new Date("2024-12-20T09:00:00"),
    endDate: new Date("2024-12-20T17:00:00"),
    location: "London, UK",
    imageUrl:
      "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?q=80&w=2069&auto=format&fit=crop",
    category: "EXHIBITION",
    ticketPrice: 25,
    maxAttendees: 1000,
    currentAttendees: 654,
  },
  {
    id: "3",
    title: "Street Racing Night",
    shortDescription: "Legal street racing with the best drivers in the city.",
    startDate: new Date("2024-12-22T18:00:00"),
    endDate: new Date("2024-12-22T23:00:00"),
    location: "Los Angeles, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
    category: "RACE",
    ticketPrice: 40,
    maxAttendees: 300,
    currentAttendees: 198,
  },
  {
    id: "4",
    title: "BMW M Series Meetup",
    shortDescription:
      "Connect with fellow BMW M enthusiasts and showcase your ride.",
    startDate: new Date("2024-12-25T14:00:00"),
    endDate: new Date("2024-12-25T18:00:00"),
    location: "Munich, Germany",
    imageUrl:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
    category: "MEET_UP",
    ticketPrice: null,
    maxAttendees: 150,
    currentAttendees: 89,
  },
];

interface EventsListProps {
  filter?: "today" | "past" | "upcoming";
}

export function EventsList({ filter }: EventsListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter events based on the filter prop
  const filteredEvents = mockEvents.filter((event) => {
    const now = new Date();
    const eventDate = new Date(event.startDate);

    switch (filter) {
      case "today":
        return eventDate.toDateString() === now.toDateString();
      case "past":
        return eventDate < now;
      case "upcoming":
      default:
        return eventDate >= now;
    }
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      RALLY: "bg-red-100 text-red-800",
      EXHIBITION: "bg-blue-100 text-blue-800",
      RACE: "bg-yellow-100 text-yellow-800",
      MEET_UP: "bg-green-100 text-green-800",
      SHOW: "bg-purple-100 text-purple-800",
      TRACK_DAY: "bg-orange-100 text-orange-800",
      CONFERENCE: "bg-indigo-100 text-indigo-800",
      OTHER: "bg-gray-100 text-gray-800",
    };
    return colors[category as keyof typeof colors] || colors.OTHER;
  };

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No events found</h3>
        <p className="text-muted-foreground mb-4">
          {filter === "today" && "No events are happening today."}
          {filter === "past" && "No past events to show."}
          {!filter && "No upcoming events found."}
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
        >
          Add the first event
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          Showing {filteredEvents.length} event
          {filteredEvents.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-colors ${
              viewMode === "list"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Events Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 gap-6"
            : "space-y-4"
        }
      >
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`bg-background border rounded-lg overflow-hidden shadow-sm card-hover ${
              viewMode === "list" ? "flex" : ""
            }`}
          >
            <div
              className={`relative overflow-hidden ${
                viewMode === "list" ? "w-48 flex-shrink-0" : "h-48"
              }`}
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                    event.category
                  )}`}
                >
                  {event.category.replace("_", " ")}
                </span>
              </div>
              {event.ticketPrice && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                    ${event.ticketPrice}
                  </span>
                </div>
              )}
              {!event.ticketPrice && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                    FREE
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                {event.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {event.shortDescription}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">
                    {formatDateTime(event.startDate)}
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>
                    {event.currentAttendees} / {event.maxAttendees} attendees
                  </span>
                </div>
              </div>

              <Link
                href={`/events/${event.id}`}
                className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                View Details
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
