"use client";
import DoorOpenIntro from "@/components/door-open-intro";
import NavBar from "@/components/nav-bar";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import CountDown from "@/section/CountDown";
import DateDetails from "@/section/DateDetails";
import Dua from "@/section/Dua";
import Gallery from "@/section/Gallery";
import Hero from "@/section/Hero";
import InvitationDetails from "@/section/InvitationDetails";
import Location from "@/section/Location";
// import Rsvp from "@/section/Rsvp";
import WeddingItenary from "@/section/WeddingItinerary";
import Image from "next/image";
import { lazy, Suspense } from "react";

const RsvpSection = lazy(() => import("@/section/Rsvp"));

export default function Home() {
  const { play } = useAudioPlayer();

  return (
    <main className="mt-10 overflow-x-hidden max-w-md mx-auto overscroll-x-contain">
      <DoorOpenIntro
        brideName="Athirah"
        groomName="Afiq"
        ctaText="BUKA"
        onOpen={() => {
          // This click is a guaranteed user gesture — audio will play
          play({
            src: "https://umtctumwfvjpuk5g.public.blob.vercel-storage.com/Dayang%20Nurfaizah%2C%20Hael%20Husaini%20-%20Gurindam%20Jiwa%20%28SPOTISAVER%29.mp3",
          });
        }}
      >
        <Image
          src={"/logo.png"}
          alt="logo"
          width={100}
          height={100}
          className="w-80 fixed left-1/2 top-1/2 -translate-1/2 -z-10 opacity-4"
          loading="eager"
        />

        <Hero />
        <DateDetails />
        <CountDown />
        <WeddingItenary />
        <InvitationDetails />
        <Location />
        <Suspense fallback={<h1>Loading...</h1>}>
          <RsvpSection />
        </Suspense>
        <Gallery />
        <Dua />
        <NavBar />
      </DoorOpenIntro>
    </main>
  );
}
