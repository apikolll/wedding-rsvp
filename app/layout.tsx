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
import AudioPlayerProvider from "@/context/AudioPlayerContext";

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
  title: "Afiq & Athirah · Walimatulurus",
  description: "Ahad, 28 Jun 2026 · Klik untuk RSVP 🤍",
  metadataBase: new URL("https://cintahathiafiq.com"),
  openGraph: {
    title: "Afiq & Athirah · Walimatulurus",
    description: "Ahad, 28 Jun 2026 · Klik untuk RSVP 🤍",
    url: "https://cintahathiafiq.com",
    siteName: "Afiq & Athirah Wedding",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Afiq & Athirah Wedding Invitation",
      },
    ],
    locale: "ms_MY",
    type: "website",
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
        "intro-locked",
      )}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col">
        <main>
          <Providers>
            <AudioPlayerProvider>{children}</AudioPlayerProvider>
          </Providers>
        </main>
        <Toaster
          position="top-center"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: "w-full",
            },
          }}
        />
      </body>
    </html>
  );
}
