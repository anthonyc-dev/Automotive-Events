"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";

export default function NewEventPage() {
  const router = useRouter();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    startDate: "",
    endDate: "",
    location: "",
    address: "",
    category: "EXHIBITION",
    ticketPrice: "",
    maxAttendees: "",
    contactEmail: "",
    contactPhone: "",
    websiteUrl: "",
    ticketUrl: "",
    tags: "",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="container px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              {status === "loading" ? "Loading..." : "Redirecting..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Format form data for API
      const apiData = {
        title: formData.title,
        description: formData.description,
        shortDescription: formData.shortDescription || undefined,
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
        location: formData.location,
        address: formData.address || undefined,
        category: formData.category,
        ticketPrice: formData.ticketPrice
          ? parseFloat(formData.ticketPrice)
          : undefined,
        maxAttendees: formData.maxAttendees
          ? parseInt(formData.maxAttendees)
          : undefined,
        contactEmail: formData.contactEmail || undefined,
        contactPhone: formData.contactPhone || undefined,
        websiteUrl: formData.websiteUrl || undefined,
        ticketUrl: formData.ticketUrl || undefined,
        tags: formData.tags
          ? formData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag)
          : undefined,
      };

      const response = await fetch("/api/postEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event");
      }

      // Success - redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating event:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create event"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container px-4 py-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-2">Create New Event</h1>
          <p className="text-muted-foreground">
            Fill out the details below to create your automotive event.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">Error creating event:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-background border border-border/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2"
                >
                  Event Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter event title"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="shortDescription"
                  className="block text-sm font-medium mb-2"
                >
                  Short Description *
                </label>
                <input
                  type="text"
                  id="shortDescription"
                  name="shortDescription"
                  required
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Brief description (max 100 characters)"
                  maxLength={100}
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-2"
                >
                  Full Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Detailed event description"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium mb-2"
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="RALLY">Rally</option>
                  <option value="EXHIBITION">Exhibition</option>
                  <option value="SHOW">Show</option>
                  <option value="RACE">Race</option>
                  <option value="TRACK_DAY">Track Day</option>
                  <option value="MEET_UP">Meet Up</option>
                  <option value="CONFERENCE">Conference</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium mb-2"
                >
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Comma-separated tags (e.g., motorsport, rally, championship)"
                />
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-background border border-border/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Date & Time
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium mb-2"
                >
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  required
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium mb-2"
                >
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-background border border-border/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium mb-2"
                >
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium mb-2"
                >
                  Venue Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Full address"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Capacity */}
          <div className="bg-background border border-border/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Pricing & Capacity
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="ticketPrice"
                  className="block text-sm font-medium mb-2"
                >
                  Ticket Price (USD)
                </label>
                <input
                  type="number"
                  id="ticketPrice"
                  name="ticketPrice"
                  min="0"
                  step="0.01"
                  value={formData.ticketPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0.00 (leave empty for free)"
                />
              </div>

              <div>
                <label
                  htmlFor="maxAttendees"
                  className="block text-sm font-medium mb-2"
                >
                  Max Attendees
                </label>
                <input
                  type="number"
                  id="maxAttendees"
                  name="maxAttendees"
                  min="1"
                  value={formData.maxAttendees}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Maximum capacity"
                />
              </div>

              <div>
                <label
                  htmlFor="ticketUrl"
                  className="block text-sm font-medium mb-2"
                >
                  Ticket URL
                </label>
                <input
                  type="url"
                  id="ticketUrl"
                  name="ticketUrl"
                  value={formData.ticketUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-background border border-border/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium mb-2"
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="contact@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="contactPhone"
                  className="block text-sm font-medium mb-2"
                >
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label
                  htmlFor="websiteUrl"
                  className="block text-sm font-medium mb-2"
                >
                  Event Website
                </label>
                <input
                  type="url"
                  id="websiteUrl"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-muted-foreground border border-border hover:bg-muted rounded-lg transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Event..." : "Create Event"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
