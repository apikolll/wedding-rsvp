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
import { useRouter } from "next/navigation";
import { useIntro } from "@/context/IntroContext";

const navItem =
  "h-full flex-1 flex-col gap-0.5 rounded-full text-[10px] uppercase tracking-wider text-ink hover:bg-ivory/45 active:bg-ivory/60";

const NavBar = () => {
  const { play, playing, pause } = useAudioPlayer();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  const router = useRouter();
  const { isOpen, instant } = useIntro();

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
            title: "The Wedding of Shafini & Shahril",
            location:
              "368, Lorong Rhu 3/2, Taman Rhu 3, Tikam Batu, 08600, Sungai Petani, Kedah",
            start: new Date("2026-12-05T11:00:00+08:00"),
            end: new Date("2026-12-05T16:30:00+08:00"),
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
          title: "The Wedding of Shafini & Shahril",
          location:
            "368, Lorong Rhu 3/2, Taman Rhu 3, Tikam Batu, 08600, Sungai Petani, Kedah",
          start: new Date("2026-12-05T11:00:00+08:00"),
          end: new Date("2026-12-05T16:30:00+08:00"),
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

  // Not mounted until the intro is opened
  if (!isOpen) return null;

  return (
    // Outer: one-time entrance after the intro (waits for the names to land).
    // Inner: hide on scroll down / show on scroll up.
    <motion.div
      initial={{ y: 140, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: instant ? 0 : 1.4,
        duration: 0.6,
        ease: [0.32, 0.72, 0, 1],
      }}
      className="fixed inset-x-0 bottom-3 z-40 px-4 pb-[env(safe-area-inset-bottom)]"
    >
      <motion.nav
        animate={{ y: hidden ? 140 : 0 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="liquid-glass relative mx-auto h-16 max-w-md rounded-full p-1.5">
          {/* Glossy rim: SVG specular lighting on the pill's edge (every browser) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 size-full overflow-visible"
          >
            <rect
              width="100%"
              height="100%"
              rx="32"
              fill="#fff"
              filter="url(#lg-rim)"
              opacity="0.9"
            />
          </svg>

          <div className="relative flex h-full items-center gap-1">
            <Button variant="ghost" className={navItem} onClick={handleClick}>
              <IconCalendarEvent stroke={1.75} className="size-5" />
              Save Date
            </Button>
            <Button
              variant="ghost"
              className={navItem}
              onClick={() => scrollToSection("location")}
            >
              <IconMapPin stroke={1.75} className="size-5" />
              Maps
            </Button>
            <Button
              className="h-full flex-[1.3] rounded-full bg-wine text-xs uppercase tracking-wider text-ivory shadow-[inset_0_1px_0_rgb(255_255_255/0.28),inset_0_-2px_4px_rgb(0_0_0/0.25),0_4px_12px_-4px_rgb(92_31_31/0.6)] hover:bg-wine/90"
              onClick={() => {
                // router.push("/rsvp");
                scrollToSection("rsvp");
              }}
            >
              R.S.V.P
            </Button>
            <Button
              variant="ghost"
              aria-label={playing ? "Pause music" : "Play music"}
              className="size-12 shrink-0 rounded-full text-ink hover:bg-ivory/45 active:bg-ivory/60"
              onClick={() => {
                if (playing) {
                  pause();
                } else {
                  play({ src: "/songs/wedding_nasheed.mp3" });
                }
              }}
            >
              {playing ? (
                <IconPlayerPause stroke={1.75} className="size-5" />
              ) : (
                <IconPlayerPlay stroke={1.75} className="size-5" />
              )}
            </Button>
          </div>
        </div>
      </motion.nav>
    </motion.div>
  );
};

export default NavBar;
