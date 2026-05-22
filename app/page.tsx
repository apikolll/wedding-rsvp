import NavBar from "@/components/nav-bar";
import AudioPlayerProvider from "@/context/AudioPlayerContext";
import CountDown from "@/section/CountDown";
import DateDetails from "@/section/DateDetails";
import Dua from "@/section/Dua";
import Gallery from "@/section/Gallery";
import Hero from "@/section/Hero";
import InvitationDetails from "@/section/InvitationDetails";
import Location from "@/section/Location";
import Rsvp from "@/section/Rsvp";
import WeddingItenary from "@/section/WeddingItinerary";
import Image from "next/image";

export default function Home() {
  return (
    <main className="mt-10 overflow-x-hidden max-w-md mx-auto overscroll-x-contain">
      <AudioPlayerProvider>
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
        <Rsvp />
        <Gallery />
        <Dua />
        <NavBar />
      </AudioPlayerProvider>
    </main>
  );
}
