import { Suspense } from "react";
import { EventsList } from "@/components/events/EventsList";
import { History } from "lucide-react";

export const metadata = {
  title: "Past Events | AutoEvents",
  description: "Browse automotive events that have already taken place.",
};

export default function PastEventsPage() {
  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <History className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Past Events</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Look back at amazing automotive events that have taken place. Get
          inspired for future events!
        </p>
      </div>

      <Suspense fallback={<div>Loading past events...</div>}>
        <EventsList filter="past" />
      </Suspense>
    </div>
  );
}
