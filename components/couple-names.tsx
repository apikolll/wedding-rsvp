"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useIntro } from "@/context/IntroContext";

interface CoupleNamesProps {
  className?: string;
  firstClassName?: string;
  secondClassName?: string;
  // Keep the space reserved but invisible until the intro opens,
  // then mount the shared elements so they fly in from the intro.
  waitForIntro?: boolean;
}

const transition = { duration: 1.4, ease: [0.65, 0, 0.35, 1] } as const;

const CoupleNames = ({
  className,
  firstClassName,
  secondClassName,
  waitForIntro = false,
}: CoupleNamesProps) => {
  const { isOpen, instant } = useIntro();
  const hidden = waitForIntro && !isOpen;
  const layoutId = (id: string) => (hidden || instant ? undefined : id);

  return (
    <div
      key={hidden ? "placeholder" : "shared"}
      aria-hidden={hidden}
      className={cn(
        "flex flex-col items-center gap-2 text-[#6B1A0F]",
        hidden && "invisible",
        !waitForIntro && "w-[70vw]",
        className,
      )}
    >
      <motion.h1
        layoutId={layoutId("couple-first")}
        transition={transition}
        className={cn("font-barley text-6xl", firstClassName)}
      >
        Shafini
      </motion.h1>

      <motion.p
        layoutId={layoutId("couple-amp")}
        transition={transition}
        className="font-barley text-4xl text-wine/80"
      >
        &
      </motion.p>

      <motion.h1
        layoutId={layoutId("couple-second")}
        transition={transition}
        className={cn("font-barley text-6xl", secondClassName)}
      >
        Shahril
      </motion.h1>
    </div>
  );
};

export default CoupleNames;
