import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  images: z.array(z.string()).optional(),
  location: z.string().min(1),
  price: z.number().optional(),
});

//Create
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = eventSchema.parse(await request.json());

    // Validate required fields
    const requiredFields = Object.keys(eventSchema.shape);
    const missingFields = requiredFields.filter(
      (field) => !body[field as keyof typeof body]
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
    const startDate = new Date(body.date);

    if (isNaN(startDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid start date" },
        { status: 400 }
      );
    }

    // Create event in database
    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        date: startDate,
        images: body.images || [],
        location: body.location,
        price: body.price,
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
          date: event.date,
          images: event.images,
          location: event.location,
          price: event.price,
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
        orderBy: { date: "asc" },
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
