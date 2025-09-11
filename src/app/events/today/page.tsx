import { Suspense } from "react";
import { EventsList } from "@/components/events/EventsList";
import { Calendar } from "lucide-react";

export const metadata = {
  title: "Events Today | AutoEvents",
  description: "Discover automotive events happening today near you.",
};

export default function EventsTodayPage() {
  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Events Today</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Don&apos;t miss out! Here are all the automotive events happening
          today.
        </p>
      </div>

      <Suspense fallback={<div>Loading today&apos;s events...</div>}>
        <EventsList filter="today" />
      </Suspense>
    </div>
  );
}
