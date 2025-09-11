"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";

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
      "https://images.unsplash.com/photo-1632239505939-a21dfe8fb6b7?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20 relative overflow-hidden ">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Featured Events
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Don&apos;t miss these upcoming automotive events that are creating
            buzz in the community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group bg-background/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-lg">
                    {event.category}
                  </span>
                </div>
                {event.ticketPrice && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-accent/90 text-accent-foreground backdrop-blur-sm shadow-lg">
                      ${event.ticketPrice}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="text-white text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {event.shortDescription}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="p-1.5 bg-primary/10 rounded-full mr-3">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                    </div>
                    {formatDateTime(event.startDate)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="p-1.5 bg-accent/10 rounded-full mr-3">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                    </div>
                    {event.location}
                  </div>
                </div>

                <Link
                  href={`/events/${event.id}`}
                  className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-semibold transition-all duration-300 group-hover:gap-2 gap-1 pt-2"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/events"
            className="group inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/25 hover:-translate-y-1"
          >
            View All Events
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
