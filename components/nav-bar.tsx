"use client";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { Button } from "./ui/button";
import {
  IconCalendarEvent,
  IconMapPin,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { useMotionValueEvent, useScroll, motion } from "motion/react";
import { useState } from "react";
import { buildIcsContent, googleCalendarUrl } from "@/lib/calendar";

const NavBar = () => {
  const { play, playing, pause } = useAudioPlayer();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    // Ignore tiny jitters and the rubber-band area near the top
    if (latest < 50) {
      setHidden(false);
      return;
    }

    if (Math.abs(diff) < 5) return;

    if (diff > 0) {
      setHidden(true); // scrolling down → hide
    } else {
      setHidden(false); // scrolling up → show
    }
  });

  const handleClick = () => {
    const ua = navigator.userAgent;
    const isApple = /iPhone|iPad|iPod|Macintosh/.test(ua);

    if (isApple) {
      // .ics opens directly in Apple Calendar
      const blob = new Blob(
        [
          buildIcsContent({
            title: "The Wedding of Afiq & Athirah",
            location: "Bizmilla Grand Ballroom Eco Sanctuary",
            start: new Date("2026-06-28T11:00:00+08:00"),
            end: new Date("2026-06-28T16:00:00+08:00"),
          }),
        ],
        {
          type: "text/calendar;charset=utf-8",
        },
      );
      const url = URL.createObjectURL(blob);
      window.location.href = url;
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } else {
      // Android / desktop: Google Calendar is usually fastest
      window.open(
        googleCalendarUrl({
          title: "The Wedding of Afiq & Athirah",
          location: "Bizmilla Grand Ballroom Eco Sanctuary",
          start: new Date("2026-06-28T11:00:00+08:00"),
          end: new Date("2026-06-28T16:00:00+08:00"),
        }),
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  const scrollToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "100%" },
      }}
      animate={hidden ? { y: 200 } : "visible"}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed bottom-5 left-0 right-0 w-full"
    >
      <div className="bg-[#fffdf3] mx-5 shadow-md p-1.5 rounded-full h-15">
        <span
          className="
      absolute inset-x-0 top-0 h-1/2 rounded-t-full
      bg-linear-to-b from-white/40 to-transparent
      opacity-60 pointer-events-none
    "
        />
        <div className="flex justify-between gap-3 h-full">
          <Button
            variant={"outline"}
            className="rounded-full flex-1 uppercase text-xs tracking-wider h-full"
            onClick={handleClick}
          >
            <IconCalendarEvent stroke={2} />
            Save Date
          </Button>
          <Button
            variant={"outline"}
            className="rounded-full flex-1 uppercase text-xs tracking-wider h-full"
            onClick={() => scrollToSection("location")}
          >
            <IconMapPin stroke={2} />
            Maps
          </Button>
          <Button
            variant={"outline"}
            className="rounded-full flex-1 uppercase text-xs bg-[#5c1f1f] text-white tracking-wider h-full"
            onClick={() => scrollToSection("rsvp")}
          >
            R.S.V.P
          </Button>

          <Button
            onClick={() => {
              if (playing) {
                pause();
              } else {
                play({
                  src: "https://umtctumwfvjpuk5g.public.blob.vercel-storage.com/Dayang%20Nurfaizah%2C%20Hael%20Husaini%20-%20Gurindam%20Jiwa%20%28SPOTISAVER%29.mp3",
                });
              }
            }}
            variant={"outline"}
            className="rounded-full self-center size-10 bg-transparent"
          >
            {!playing ? (
              <IconPlayerPlay stroke={2} />
            ) : (
              <IconPlayerPause stroke={2} />
            )}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
