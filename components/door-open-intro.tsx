"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";

interface DoorOpenIntroProps {
  onOpen?: () => void;
  brideName?: string;
  groomName?: string;
  ctaText?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

const DoorOpenIntro = ({
  onOpen,
  brideName = "Athirah",
  groomName = "Afiq",
  ctaText = "BUKA",
  backgroundImage = "/logo.png",
  children,
}: DoorOpenIntroProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isFullyOpen, setIsFullyOpen] = useState(false);

  // Lock body scroll until doors are fully open
  useLayoutEffect(() => {
    if (isFullyOpen) {
      document.documentElement.classList.remove("intro-locked");
    }
  }, [isFullyOpen]);

  useLayoutEffect(() => {
    // Reset scroll position on mount (handles refresh)
    window.scrollTo(0, 0);

    // Also disable browser's scroll restoration so it doesn't fight us
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    onOpen?.();
    setTimeout(() => setIsFullyOpen(true), 1800);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 ${isFullyOpen ? "hidden" : ""}`}
        aria-hidden={isFullyOpen}
      >
        {/* Soft white overlay */}
        <div className="absolute inset-0 bg-white/30" />

        {/* Left door */}
        <div
          className={`
            absolute top-0 left-0 h-full w-1/2
            bg-white/20 backdrop-blur-xs
            // border-r border-white/5
            origin-left
            transition-transform duration-1800
            ${
              isOpening
                ? "transform-[perspective(1800px)_rotateY(-105deg)]"
                : "transform-[perspective(1800px)_rotateY(0deg)]"
            }
          `}
          style={{
            transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
          }}
        />

        {/* Right door */}
        <div
          className={`
            absolute top-0 right-0 h-full w-1/2
            bg-white/20 backdrop-blur-xs
            // border-l border-white/5
            origin-right
            transition-transform duration-1800
            ${
              isOpening
                ? "transform-[perspective(1800px)_rotateY(105deg)]"
                : "transform-[perspective(1800px)_rotateY(0deg)]"
            }
          `}
          style={{
            transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
          }}
        />

        {/* Center button */}
        <div
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            transition-all duration-700 ease-out
            ${isOpening ? "opacity-0 scale-75" : "opacity-100 scale-100"}
          `}
        >
          <button
            onClick={handleOpen}
            disabled={isOpening}
            className="
              group relative w-44 h-44 rounded-full
              bg-white/80 backdrop-blur-xl
              border border-white/60
              shadow-[0_8px_40px_-8px_rgba(0,0,0,0.2)]
              flex flex-col items-center justify-center
              transition-all duration-500
              hover:scale-105 active:scale-95
              cursor-pointer
            "
            aria-label="Open invitation"
          >
            <span className="absolute inset-0 rounded-full animate-doorPulse pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center px-6">
              <span
                className="text-2xl text-neutral-800 leading-tight font-allura"
                // style={{
                //   fontFamily: "var(--font-script, 'Brush Script MT', cursive)",
                // }}
              >
                {groomName}
              </span>
              <span
                className="text-2xl text-neutral-800 leading-tight -mt-1 font-allura"
                // style={{
                //   fontFamily: "var(--font-script, 'Brush Script MT', cursive)",
                // }}
              >
                {brideName}
              </span>
              <span className="mt-3 text-[11px] tracking-[0.3em] text-neutral-600 font-medium font-serif">
                {ctaText}
              </span>
            </div>
          </button>
        </div>
      </div>

      {children}
    </>
  );
};

export default DoorOpenIntro;
