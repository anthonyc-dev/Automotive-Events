"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { EventsTable } from "@/components/dashboard/EventsTable";
import { AddEventButton } from "@/components/dashboard/AddEventButton";
import { Calendar } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="container relative z-10 px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <Calendar className="h-7 w-7" />
              </div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                AutoEvents Dashboard
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
              Welcome back, {session?.user?.name || "Organizer"}!
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Manage your automotive events and track their performance with
              ease.
            </p>
          </div>
          <div className="flex-shrink-0">
            <AddEventButton className="shadow-lg hover:scale-105 transition-transform" />
          </div>
        </div>

        <div className="mb-12">
          <DashboardStats />
        </div>

        <div className="mt-8 bg-background/80 backdrop-blur-md rounded-2xl shadow-lg border border-border/50 p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              Your Events
            </h2>
            <AddEventButton
              variant="outline"
              className="hover:scale-105 transition-transform"
            />
          </div>
          <EventsTable />
        </div>
      </div>
    </div>
  );
}
