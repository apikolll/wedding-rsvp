"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import CoupleNames from "./couple-names";
import { IntroContext } from "@/context/IntroContext";
import {
  getSavedScrollY,
  introAlreadyOpened,
  markIntroOpened,
  resolveIntroOpened,
  saveScrollY,
} from "@/lib/intro-session";

interface DoorOpenIntroProps {
  onOpen?: () => void;
  brideName?: string;
  groomName?: string;
  ctaText?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

const MotionButton = motion.create(Button);

const DoorOpenIntro = ({
  onOpen,
  brideName = "Athirah",
  groomName = "Afiq",
  ctaText = "BUKA",
  backgroundImage = "/logo.png",
  children,
}: DoorOpenIntroProps) => {
  // On a client-side "back" (e.g. from /rsvp) we already know, so start open with no flash
  const [skipped, setSkipped] = useState(introAlreadyOpened);
  const [opening, setIsOpening] = useState(false);
  const [fullyOpen, setIsFullyOpen] = useState(false);
  const isOpening = opening || skipped;
  const isFullyOpen = fullyOpen || skipped;

  // Lock body scroll until doors are fully open
  useLayoutEffect(() => {
    if (isFullyOpen) {
      document.documentElement.classList.remove("intro-locked");
    }
  }, [isFullyOpen]);

  useLayoutEffect(() => {
    // Disable browser's scroll restoration so it doesn't fight us
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (resolveIntroOpened()) {
      // Came back with the back button → skip the intro, return to where they were.
      // Needs the browser's navigation type, which isn't known during SSR/hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSkipped(true);
      const y = getSavedScrollY();
      requestAnimationFrame(() => window.scrollTo(0, y));
    } else {
      // Refresh / fresh visit → start from the top
      window.scrollTo(0, 0);
    }

    // Remember the position for when they come back
    return () => saveScrollY(window.scrollY);
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    markIntroOpened();
    setIsOpening(true);
    onOpen?.();
    setTimeout(() => {
      setIsFullyOpen(true);

      startAutoScroll();
    }, 1800);
  };

  const startAutoScroll = () => {
    const pixelsPerSecond = 60; // cruising speed — snaps to whole px per frame (60 = 1px/frame @60Hz)
    const rampSeconds = 1; // time spent easing in to full speed
    const stopEvents = [
      "wheel",
      "touchstart",
      "pointerdown",
      "keydown",
    ] as const;

    let cancelled = false;
    let frame = 0;

    const stopAutoScroll = () => {
      cancelled = true;
      clearTimeout(startDelay);
      cancelAnimationFrame(frame);
      stopEvents.forEach((e) => window.removeEventListener(e, stopAutoScroll));
    };

    stopEvents.forEach((e) =>
      window.addEventListener(e, stopAutoScroll, { passive: true }),
    );

    const startDelay = setTimeout(() => {
      // 1. Measure the display's refresh rate (60Hz, 90Hz, 120Hz…)
      const samples: number[] = [];
      let last = 0;

      const measure = (now: number) => {
        if (cancelled) return;
        if (last) samples.push(now - last);
        last = now;
        if (samples.length < 12) {
          frame = requestAnimationFrame(measure);
          return;
        }
        samples.sort((a, b) => a - b);
        const fps = 1000 / samples[Math.floor(samples.length / 2)];
        run(fps);
      };

      // 2. Scroll whole pixels on a fixed frame cadence, so every step is
      //    identical. Uneven 1px/2px (or 0px/1px) steps are what reads as judder.
      const run = (fps: number) => {
        const perFrame = pixelsPerSecond / fps;
        const step = Math.max(1, Math.round(perFrame)); // px per move
        const every = perFrame >= 1 ? 1 : Math.round(1 / perFrame); // frames per move
        const rampFrames = Math.round(fps * rampSeconds);

        let y = Math.round(window.scrollY);
        let tick = 0;

        const scroll = () => {
          if (cancelled) return;
          tick++;

          // Ease in: move every 3rd, then 2nd "beat" before reaching cruise speed
          const slow = tick < rampFrames / 2 ? 3 : tick < rampFrames ? 2 : 1;

          if (tick % (every * slow) === 0) {
            // Something else moved the page (e.g. an image loading above) — follow it
            if (Math.abs(window.scrollY - y) > step + 1) {
              y = Math.round(window.scrollY);
            }

            y += step;

            const maxScroll =
              document.documentElement.scrollHeight - window.innerHeight;
            if (y >= maxScroll) {
              window.scrollTo(0, maxScroll);
              stopAutoScroll();
              return;
            }

            window.scrollTo(0, y);
          }

          frame = requestAnimationFrame(scroll);
        };

        frame = requestAnimationFrame(scroll);
      };

      frame = requestAnimationFrame(measure);
    }, 1500);
  };

  return (
    <IntroContext.Provider value={{ isOpen: isOpening, instant: skipped }}>
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            key="intro-screen"
            className="fixed inset-0 z-40 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: skipped ? 0 : 0.8, ease: "easeOut" }}
            onClick={handleOpen}
          >
            {/* Same image as the page background, so the intro covers the content seamlessly */}
            <Image
              src="/background/FirstScreen.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center -z-10"
            />

            <CoupleNames
              firstClassName="self-start sm:self-center ml-5 sm:mr-40"
              secondClassName="self-end sm:self-center sm:ml-35"
            />

            <motion.div
              className="absolute bottom-20"
              animate={{ y: [0, 40] }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.8,
                ease: "easeInOut",
              }}
            >
              <MotionButton
                variant="ghost"
                className="font-barley text-lg cursor-pointer transition-none hover:bg-transparent"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
              >
                Tap to open
              </MotionButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coming back from /rsvp: fade the page in instead of popping in.
          Opacity only — a transform here would break the fixed nav bar while it runs. */}
      <motion.div
        initial={skipped ? { opacity: 0 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </IntroContext.Provider>
  );
};

export default DoorOpenIntro;
