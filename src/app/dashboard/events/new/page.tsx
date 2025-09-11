"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Helper: convert file to base64 string
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject("Failed to read file");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function NewEventPage() {
  const router = useRouter();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // form data (text fields + optional image URLs)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    images: "", // for URLs (comma separated)
    location: "",
    price: "",
  });

  // image handling
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

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

  // handle text input changes
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

  // handle file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    setImageFiles(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      setUploadingImages(true);

      // Prepare images array: combine uploaded files (as base64) and URLs
      let images: string[] = [];

      // 1. Add image URLs (if any)
      if (formData.images.trim()) {
        // Split by comma, trim, filter out empty
        images = formData.images
          .split(",")
          .map((url) => url.trim())
          .filter((url) => url.length > 0);
      }

      // 2. Add uploaded files (as base64)
      if (imageFiles.length > 0) {
        const base64Images = await Promise.all(
          imageFiles.map((file) => fileToBase64(file))
        );
        images = images.concat(base64Images);
      }

      // Prepare payload for JSON API
      const payload: {
        title: string;
        description: string;
        images?: string[];
        date: string;
        location: string;
        price?: number;
      } = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        images: images.length > 0 ? images : undefined,
        location: formData.location,
        price: formData.price ? Number(formData.price) : undefined,
      };

      const response = await fetch("/api/postEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event");
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating event:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create event"
      );
    } finally {
      setIsLoading(false);
      setUploadingImages(false);
    }
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
                  htmlFor="description"
                  className="block text-sm font-medium mb-2"
                >
                  Description *
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
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 gap-6 mt-6">
              <div>
                <label
                  htmlFor="images"
                  className="block text-sm font-medium mb-2"
                >
                  Upload Images (optional)
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You can select multiple images or paste image URLs below
                  (comma separated).
                </p>
                <input
                  type="text"
                  id="images-url"
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                  className="w-full mt-2 px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Paste image URLs, separated by commas"
                  disabled={imageFiles.length > 0}
                />

                {/* Preview selected images */}
                {imagePreviews.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {imagePreviews.map((src, idx) => (
                      <Image
                        key={idx}
                        src={src}
                        alt={`Preview ${idx + 1}`}
                        className="h-20 w-20 object-cover rounded border"
                        width={80}
                        height={80}
                      />
                    ))}
                  </div>
                )}
                {uploadingImages && (
                  <div className="text-xs text-muted-foreground mt-2">
                    Uploading images...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-background border border-border/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Date & Time
            </h2>
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">
                Date & Time *
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Location */}
          <div className="bg-background border border-border/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Location
            </h2>
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
          </div>

          {/* Pricing */}
          <div className="bg-background border border-border/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Pricing & Capacity
            </h2>
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-2">
                Ticket Price (USD)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="0.00 (leave empty for free)"
              />
            </div>
          </div>

          {/* Submit */}
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
