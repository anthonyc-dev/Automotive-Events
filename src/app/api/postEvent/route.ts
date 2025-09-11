import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { EventCategory, EventStatus } from "@prisma/client";

interface CreateEventRequest {
  title: string;
  description: string;
  shortDescription?: string;
  startDate: string;
  endDate?: string;
  location: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  images?: string[];
  ticketPrice?: number;
  ticketUrl?: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  category?: EventCategory;
  maxAttendees?: number;
  tags?: string[];
}
//Create
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body: CreateEventRequest = await request.json();

    // Validate required fields
    const requiredFields = ["title", "description", "startDate", "location"];
    const missingFields = requiredFields.filter(
      (field) => !body[field as keyof CreateEventRequest]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          message: "Missing required fields",
          missingFields,
        },
        { status: 400 }
      );
    }

    // Validate dates
    const startDate = new Date(body.startDate);
    const endDate = body.endDate ? new Date(body.endDate) : null;

    if (isNaN(startDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid start date" },
        { status: 400 }
      );
    }

    if (endDate && isNaN(endDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid end date" },
        { status: 400 }
      );
    }

    if (endDate && endDate <= startDate) {
      return NextResponse.json(
        { message: "End date must be after start date" },
        { status: 400 }
      );
    }

    // Validate category if provided
    if (
      body.category &&
      !Object.values(EventCategory).includes(body.category)
    ) {
      return NextResponse.json(
        { message: "Invalid event category" },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (body.contactEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.contactEmail)) {
        return NextResponse.json(
          { message: "Invalid contact email format" },
          { status: 400 }
        );
      }
    }

    // Create event in database
    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        shortDescription: body.shortDescription,
        startDate: startDate,
        endDate: endDate,
        location: body.location,
        address: body.address,
        latitude: body.latitude,
        longitude: body.longitude,
        imageUrl: body.imageUrl,
        images: body.images || [],
        ticketPrice: body.ticketPrice,
        ticketUrl: body.ticketUrl,
        websiteUrl: body.websiteUrl,
        contactEmail: body.contactEmail,
        contactPhone: body.contactPhone,
        category: body.category || EventCategory.EXHIBITION,
        status: EventStatus.PENDING,
        maxAttendees: body.maxAttendees,
        tags: body.tags || [],
        organizerId: session.user.id,
      },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: {
          id: event.id,
          title: event.title,
          description: event.description,
          shortDescription: event.shortDescription,
          startDate: event.startDate,
          endDate: event.endDate,
          location: event.location,
          address: event.address,
          latitude: event.latitude,
          longitude: event.longitude,
          imageUrl: event.imageUrl,
          images: event.images,
          ticketPrice: event.ticketPrice,
          ticketUrl: event.ticketUrl,
          websiteUrl: event.websiteUrl,
          contactEmail: event.contactEmail,
          contactPhone: event.contactPhone,
          category: event.category,
          status: event.status,
          maxAttendees: event.maxAttendees,
          currentAttendees: event.currentAttendees,
          tags: event.tags,
          organizer: event.organizer,
          createdAt: event.createdAt,
          updatedAt: event.updatedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      {
        message: "Failed to create event",
        error:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Update an event by ID
export async function PUT(req: NextRequest) {
  try {
    const { id, ...data } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Event ID is required for update" },
        { status: 400 }
      );
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data,
    });

    return NextResponse.json(
      {
        message: "Event updated successfully",
        event: updatedEvent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      {
        message: "Failed to update event",
        error:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Delete an event by ID
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Event ID is required for deletion" },
        { status: 400 }
      );
    }

    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        message: "Event deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      {
        message: "Failed to delete event",
        error:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : "Internal server error",
      },
      { status: 500 }
    );
  }
}
// Get all events or a single event by ID
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      // Fetch a single event by ID
      const event = await prisma.event.findUnique({
        where: { id },
      });

      if (!event) {
        return NextResponse.json(
          { message: "Event not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(event, { status: 200 });
    } else {
      // Fetch all events
      const events = await prisma.event.findMany({
        orderBy: { startDate: "asc" },
      });
      return NextResponse.json(events, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching event(s):", error);
    return NextResponse.json(
      {
        message: "Failed to fetch event(s)",
        error:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : "Internal server error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch all events for "view all" (no filters, all events)
export async function GET_ALL_EVENTS() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startDate: "asc" },
    });
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching all events:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch all events",
        error:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : "Internal server error",
      },
      { status: 500 }
    );
  }
}
