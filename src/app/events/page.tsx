import { Suspense } from "react";
import { EventsFilter } from "@/components/events/EventsFilter";
import { EventsList } from "@/components/events/EventsList";
import { EventsSearch } from "@/components/events/EventsSearch";
import { Calendar } from "lucide-react";

export const metadata = {
  title: "All Events | AutoEvents",
  description:
    "Discover all upcoming automotive events including rallies, exhibitions, shows, and races.",
};

export default function EventsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="container relative z-10 px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <Calendar className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-1 bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
              All Events
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Discover amazing automotive events happening around the world.
              Filter by category, location, or date to find exactly what
              you&apos;re looking for.
            </p>
          </div>
        </div>

        <div className="mb-10">
          <EventsSearch />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-background/80 backdrop-blur-md rounded-2xl shadow-lg border border-border/50 p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Filter Events
                </h2>
                <EventsFilter />
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="bg-background/80 backdrop-blur-md rounded-2xl shadow-lg border border-border/50 p-6">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-primary mr-4"></div>
                    <span className="text-muted-foreground text-lg">
                      Loading events...
                    </span>
                  </div>
                }
              >
                <EventsList />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
