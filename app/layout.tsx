import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  DM_Serif_Text,
  Allura,
  Parisienne,
  Amiri,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import localFont from "next/font/local";
import { Toaster } from "sonner";
import Providers from "./provider";
import AudioPlayerProvider from "@/context/AudioPlayerContext";
import Image from "next/image";
import LiquidGlassFilters from "@/components/liquid-glass-filters";

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

const wistania = localFont({
  src: "../public/fonts/Wistania.ttf",
  variable: "--font-wistania",
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

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: "400",
});

const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: "400",
});

const barley = localFont({
  src: "../public/fonts/BarleyScript.ttf",
  variable: "--font-barley",
  display: "swap",
});

const gyahegi = localFont({
  src: "../public/fonts/Gyahegi.otf",
  variable: "--font-gyahegi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shafini & Shahril · Walimatulurus",
  description: "Sabtu, 05 Dec 2026 · Klik untuk RSVP 🤍",
  metadataBase: new URL("https://cintahathiafiq.com"),
  openGraph: {
    title: "Shafini & Shahril · Walimatulurus",
    description: "Sabtu, 05 Dec 2026 · Klik untuk RSVP 🤍",
    url: "https://cintahathiafiq.com",
    siteName: "Shafini & Shahril Wedding",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Shafini & Shahril Wedding Invitation",
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
    //6B1A0F
    <html
      lang="en"
      className={cn(
        "h-full overscroll-none [scrollbar-color:var(--color-amber-800)_transparent]",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        dmSerif.variable,
        allura.variable,
        samantha.variable,
        wistania.variable,
        parisienne.variable,
        amiri.variable,
        barley.variable,
        gyahegi.variable,
        "intro-locked",
      )}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col">
        <main className="relative isolate min-h-full">
          <LiquidGlassFilters />
          <div aria-hidden className="fixed inset-0 -z-20">
            <Image
              src="/background/FirstScreen.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
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
