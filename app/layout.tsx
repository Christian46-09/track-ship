import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://track-ship.vercel.app"), // change to your real domain

  title: {
    default: "TrackShip | Real-Time Shipment Tracking & Logistics Platform",
    template: "%s | TrackShip",
  },

  description:
    "TrackShip is a real-time shipment tracking platform that helps you monitor packages, manage logistics, and stay updated with delivery progress worldwide.",

  keywords: [
    "shipment tracking",
    "package tracking",
    "logistics platform",
    "track shipment",
    "delivery tracking",
    "courier tracking",
    "real-time tracking",
    "freight tracking",
  ],

  authors: [{ name: "TrackShip Team" }],
  creator: "TrackShip",
  publisher: "TrackShip",

  openGraph: {
    title: "TrackShip | Real-Time Shipment Tracking",
    description:
      "Track your shipments in real time. Get delivery updates, status history, and logistics insights with TrackShip.",
    url: "https://track-ship.vercel.app",
    siteName: "TrackShip",
    images: [
      {
        url: "/og-image.png", // create this later
        width: 1200,
        height: 630,
        alt: "TrackShip Shipment Tracking Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TrackShip | Shipment Tracking",
    description:
      "Track your shipments globally with real-time updates and delivery insights.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(`h-full antialiased font-sans`, figtree.variable)}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
