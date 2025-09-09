"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { EventsTable } from "@/components/dashboard/EventsTable";
import { AddEventButton } from "@/components/dashboard/AddEventButton";
import { Plus, Calendar } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="container px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="container px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {session?.user?.name || "Organizer"}!
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your automotive events and track their performance.
          </p>
        </div>

        <AddEventButton />
      </div>

      <DashboardStats />

      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Your Events</h2>
          <AddEventButton variant="outline" />
        </div>

        <EventsTable />
      </div>
    </div>
  );
}
