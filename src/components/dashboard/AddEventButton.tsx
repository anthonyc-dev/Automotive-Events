"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddEventButtonProps {
  variant?: "default" | "outline";
  className?: string;
}

export function AddEventButton({
  variant = "default",
  className = "",
}: AddEventButtonProps) {
  return (
    <Link
      href="/dashboard/events/new"
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg transition-colors shadow-sm hover:shadow-md",
        variant === "default"
          ? "text-white bg-primary hover:bg-primary/90"
          : "text-primary border border-primary hover:bg-primary hover:text-primary-foreground",
        className
      )}
    >
      <Plus className="h-4 w-4 mr-2" />
      Add New Event
    </Link>
  );
}
