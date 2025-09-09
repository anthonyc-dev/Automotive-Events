import { Suspense } from "react";
import { EventsFilter } from "@/components/events/EventsFilter";
import { EventsList } from "@/components/events/EventsList";
import { EventsSearch } from "@/components/events/EventsSearch";

export const metadata = {
  title: "All Events | AutoEvents",
  description:
    "Discover all upcoming automotive events including rallies, exhibitions, shows, and races.",
};

export default function EventsPage() {
  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Events</h1>
        <p className="text-muted-foreground text-lg">
          Discover amazing automotive events happening around the world. Filter
          by category, location, or date to find exactly what youre looking for.
        </p>
      </div>

      <div className="mb-8">
        <EventsSearch />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <EventsFilter />
        </aside>

        <main className="lg:col-span-3">
          <Suspense fallback={<div>Loading events...</div>}>
            <EventsList />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
