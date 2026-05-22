import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  DM_Serif_Text,
  Allura,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import localFont from "next/font/local";
import { Toaster } from "sonner";
import Providers from "./provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allura",
});

const samantha = localFont({
  src: "../public/fonts/samantha.ttf",
  variable: "--font-samantha",
  display: "swap",
});

const dmSerif = DM_Serif_Text({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Afiq & Athirah – Wedding RSVP",
  description: "Specially designed and develop by Afiq & Athirah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        dmSerif.variable,
        allura.variable,
        samantha.variable,
      )}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col">
        <main>
          <Providers>{children}</Providers>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
