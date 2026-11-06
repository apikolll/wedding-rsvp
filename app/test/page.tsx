"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BUTTON_COLOR = "#7c3aed";
const NEW_BUTTON_COLOR = "#1f2937";

const BTN_W = 220;
const BTN_H = 48;
const BOX_H = 180;
const GAP = 24; // space between button and box after it settles
const RADIUS = 14;

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", width: BTN_W, height: BTN_H }}>
      {/* The gooey filter (invisible, only defines the effect) */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
            />
          </filter>
        </defs>
      </svg>

      {/* Liquid layer: everything in here melts together */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: "url(#goo)",
          zIndex: 0,
        }}
      >
        {/* Liquid "source" hiding behind the button */}
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 4,
            width: BTN_W - 8,
            height: BTN_H - 8,
            borderRadius: RADIUS,
            background: BUTTON_COLOR,
          }}
        />

        <AnimatePresence>
          {open && (
            <>
              {/* The drip: makes the stretchy neck, then snaps back */}
              <motion.div
                initial={{ y: 0, scale: 1 }}
                animate={{ y: [0, GAP + 20, 0], scale: [1, 0.8, 0] }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: BTN_H - 30,
                  left: BTN_W / 2 - 18,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: BUTTON_COLOR,
                }}
              />

              {/* The box: drops out with a squish */}
              <motion.div
                initial={{ y: -(BTN_H / 2 + GAP), scaleX: 0.3, scaleY: 0.2 }}
                animate={{
                  y: [-(BTN_H / 2 + GAP), 10, 0],
                  scaleX: [0.3, 0.9, 1],
                  scaleY: [0.2, 1.05, 1],
                }}
                exit={{ y: -(BTN_H / 2 + GAP), scaleX: 0.3, scaleY: 0.2 }}
                transition={{
                  duration: 0.9,
                  times: [0, 0.7, 1],
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  top: BTN_H + GAP,
                  left: 0,
                  width: BTN_W,
                  height: BOX_H,
                  borderRadius: RADIUS,
                  background: BUTTON_COLOR,
                  transformOrigin: "top center",
                }}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Text: outside the filter so it stays sharp */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            style={{
              position: "absolute",
              top: BTN_H + GAP,
              left: 0,
              width: BTN_W,
              padding: 16,
              boxSizing: "border-box",
              color: "white",
              zIndex: 1,
            }}
          >
            Liquid box content here.
          </motion.div>
        )}
      </AnimatePresence>

      {/* The button: stays on top and changes color */}
      <motion.button
        onClick={() => setOpen(!open)}
        animate={{ backgroundColor: open ? NEW_BUTTON_COLOR : BUTTON_COLOR }}
        transition={{ duration: 0.5 }}
        style={{
          position: "relative",
          zIndex: 2,
          width: BTN_W,
          height: BTN_H,
          border: "none",
          borderRadius: RADIUS,
          color: "white",
          cursor: "pointer",
        }}
      >
        {open ? "Close" : "Open"}
      </motion.button>
    </div>
  );
}
