"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Mail,
  Phone,
  ExternalLink,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  imageUrl: string;
  images: string[];
  category: string;
  ticketPrice?: number | null;
  ticketUrl?: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  maxAttendees: number;
  currentAttendees: number;
  tags: string[];
  organizer: {
    name: string;
    email: string;
  };
}

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === event.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? event.images.length - 1 : prev - 1
    );
  };

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

  const attendancePercentage =
    (event.currentAttendees / event.maxAttendees) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      {/* Image Gallery */}
      <div className="relative h-96 rounded-lg overflow-hidden ">
        <Image
          src={event.images[currentImageIndex]}
          alt={event.title}
          className="w-full h-full object-cover"
          width={1200}
          height={384}
        />

        {event.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {event.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Category and Price badges */}
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
              event.category
            )}`}
          >
            {event.category.replace("_", " ")}
          </span>
        </div>

        {event.ticketPrice ? (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent text-accent-foreground">
              ${event.ticketPrice}
            </span>
          </div>
        ) : (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
              FREE
            </span>
          </div>
        )}
      </div>

      {/* Event Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">
          {event.shortDescription}
        </p>

        {/* Key Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Date & Time</h3>
              <p className="text-muted-foreground">
                {formatDateTime(event.startDate)}
              </p>
              {event.endDate && (
                <p className="text-muted-foreground text-sm">
                  Ends: {formatDateTime(event.endDate)}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-muted-foreground">{event.location}</p>
              {event.address && (
                <p className="text-muted-foreground text-sm">{event.address}</p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Users className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Attendance</h3>
              <p className="text-muted-foreground">
                {event.currentAttendees} / {event.maxAttendees} registered
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(attendancePercentage, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {event.ticketUrl && (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              {event.ticketPrice
                ? `Buy Tickets - $${event.ticketPrice}`
                : "Register for Free"}
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          )}

          {event.websiteUrl && (
            <a
              href={event.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-primary border border-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
            >
              Visit Website
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="bg-muted/50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
        <div className="prose prose-gray max-w-none">
          {event.description.split("\n").map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 text-muted-foreground leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="bg-background border border-border/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-muted-foreground text-sm">
                Organizer
              </h4>
              <p className="font-medium">{event.organizer.name}</p>
            </div>

            {event.contactEmail && (
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${event.contactEmail}`}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {event.contactEmail}
                </a>
              </div>
            )}

            {event.contactPhone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`tel:${event.contactPhone}`}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {event.contactPhone}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="bg-background border border-border/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      {event.latitude && event.longitude && (
        <div className="mt-8 bg-background border border-border/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Location</h3>
          <div className="bg-muted/50 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                Map integration would be here
              </p>
              <p className="text-sm text-muted-foreground">
                Coordinates: {event.latitude}, {event.longitude}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
