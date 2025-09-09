"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

// Mock data - in a real app, this would come from your database
const featuredEvents = [
  {
    id: "1",
    title: "European Rally Championship",
    shortDescription:
      "Experience the thrill of professional rally racing across Europe's most challenging terrains.",
    startDate: new Date("2024-12-15T10:00:00"),
    location: "Monte Carlo, Monaco",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2006&auto=format&fit=crop",
    category: "RALLY",
    ticketPrice: 75,
  },
  {
    id: "2",
    title: "Classic Car Exhibition",
    shortDescription:
      "Discover vintage automobiles from the golden age of motoring in this exclusive showcase.",
    startDate: new Date("2024-12-20T09:00:00"),
    location: "London, UK",
    imageUrl:
      "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?q=80&w=2069&auto=format&fit=crop",
    category: "EXHIBITION",
    ticketPrice: 25,
  },
  {
    id: "3",
    title: "Street Racing Night",
    shortDescription:
      "Join us for an electrifying night of legal street racing with the best drivers in the city.",
    startDate: new Date("2024-12-22T18:00:00"),
    location: "Los Angeles, CA",
    imageUrl:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
    category: "RACE",
    ticketPrice: 40,
  },
];

export function FeaturedEvents() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Events
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't miss these upcoming automotive events that are creating buzz
            in the community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background rounded-lg overflow-hidden shadow-sm border card-hover"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    {event.category}
                  </span>
                </div>
                {event.ticketPrice && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                      ${event.ticketPrice}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {event.shortDescription}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDateTime(event.startDate)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/events"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            View All Events
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
