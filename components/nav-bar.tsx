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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
      <div className="bg-[#fffdf3] mx-5 shadow-md p-1.5 rounded-full">
        <div className="flex justify-between gap-3">
          <Button
            variant={"outline"}
            className="rounded-full flex-1 uppercase text-xs tracking-wider"
          >
            <IconCalendarEvent stroke={2} />
            Save Date
          </Button>
          <Button
            variant={"outline"}
            className="rounded-full flex-1 uppercase text-xs tracking-wider"
          >
            <IconMapPin stroke={2} />
            Maps
          </Button>
          <Button
            variant={"outline"}
            className="rounded-full flex-1 uppercase text-xs bg-[#5c1f1f] text-white tracking-wider"
            onClick={() => scrollToSection("rsvp")}
          >
            R.S.V.P
          </Button>

          <Button
            onClick={() => {
              if (playing) {
                pause();
              } else {
                play({ src: "/songs/gurindam_jiwa.mp3" });
              }
            }}
            variant={"outline"}
            className="rounded-full"
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
