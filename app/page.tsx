import CountDown from "@/section/CountDown";
import DateDetails from "@/section/DateDetails";
import Hero from "@/section/Hero";
import InvitationDetails from "@/section/InvitationDetails";
import WeddingItenary from "@/section/WeddingItinerary";
import Image from "next/image";

export default function Home() {
  return (
    <main className="mt-10">
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
    </main>
  );
}
