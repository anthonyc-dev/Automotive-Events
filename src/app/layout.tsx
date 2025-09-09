import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SessionProvider } from "@/components/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoEvents - Discover Automotive Events",
  description:
    "The premier platform for discovering and managing automotive events including car rallies, exhibitions, shows, and races.",
  keywords:
    "automotive events, car rallies, car shows, racing events, car exhibitions",
  authors: [{ name: "AutoEvents Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://autoevents.com",
    title: "AutoEvents - Discover Automotive Events",
    description:
      "The premier platform for discovering and managing automotive events including car rallies, exhibitions, shows, and races.",
    siteName: "AutoEvents",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoEvents - Discover Automotive Events",
    description:
      "The premier platform for discovering and managing automotive events including car rallies, exhibitions, shows, and races.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="smooth-scroll">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <SessionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
