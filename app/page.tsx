"use client";
import DoorOpenIntro from "@/components/door-open-intro";
import NavBar from "@/components/nav-bar";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import CountDown from "@/section/CountDown";
import DateDetails from "@/section/DateDetails";
import Dua from "@/section/Dua";
import Hero from "@/section/Hero";
import InvitationDetails from "@/section/InvitationDetails";
import Location from "@/section/Location";
import WeddingItenary from "@/section/WeddingItinerary";

export default function Home() {
  const { play } = useAudioPlayer();

  return (
    <main className="mt-10 overflow-x-hidden max-w-md mx-auto overscroll-x-contain">
      <DoorOpenIntro
        brideName="Athirah"
        groomName="Afiq"
        ctaText="BUKA"
        onOpen={() => {
          play({
            src: "/songs/wedding_nasheed.mp3",
          });
        }}
      >
        <Hero />
        <DateDetails />
        <CountDown />
        <WeddingItenary />
        <InvitationDetails />
        <Location />

        <Dua />
        <NavBar />
      </DoorOpenIntro>
    </main>
  );
}
