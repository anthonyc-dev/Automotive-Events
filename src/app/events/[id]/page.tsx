import { notFound } from "next/navigation";
import { EventDetails } from "@/components/events/EventDetails";
import { ShareButtons } from "@/components/events/ShareButtons";
import { CalendarAdd } from "@/components/events/CalendarAdd";

// Mock data - in a real app, this would come from your database
const mockEvents = [
  {
    id: "1",
    title: "European Rally Championship",
    description:
      "Experience the ultimate thrill of professional rally racing across Europe's most challenging and scenic terrains. This championship brings together the world's best rally drivers for an unforgettable weekend of high-speed action, precision driving, and automotive excellence.\n\nWitness cutting-edge rally cars tackle demanding courses through forests, mountains, and coastal roads. From hairpin turns to high-speed straights, every moment promises heart-pounding excitement.\n\nThe event features multiple categories including WRC, WRC2, and historic rally classes, ensuring entertainment for all motorsport enthusiasts. Meet the drivers, explore the service areas, and get up close with the latest rally technology.",
    shortDescription:
      "Experience the thrill of professional rally racing across Europe's most challenging terrains.",
    startDate: new Date("2024-12-15T10:00:00"),
    endDate: new Date("2024-12-15T18:00:00"),
    location: "Monte Carlo, Monaco",
    address: "Circuit de Monaco, 98000 Monaco",
    latitude: 43.7347,
    longitude: 7.4206,
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2006&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2006&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
    ],
    category: "RALLY",
    ticketPrice: 75,
    ticketUrl: "https://example.com/tickets",
    websiteUrl: "https://example.com/rally",
    contactEmail: "info@rally-championship.com",
    contactPhone: "+33 123 456 789",
    maxAttendees: 500,
    currentAttendees: 287,
    tags: ["rally", "motorsport", "championship", "europe"],
    organizer: {
      name: "European Motorsport Association",
      email: "contact@ema.com",
    },
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `${event.title} | AutoEvents`,
    description: event.shortDescription,
    openGraph: {
      title: event.title,
      description: event.shortDescription,
      images: [event.imageUrl],
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  return (
    <div className="container px-4 py-8">
      <EventDetails event={event} />

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <ShareButtons
          url={`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/events/${
            event.id
          }`}
          title={event.title}
        />
        <CalendarAdd event={event} />
      </div>
    </div>
  );
}
