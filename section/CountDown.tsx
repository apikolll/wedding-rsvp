"use client";
import Divider from "@/components/divider";
import { useCountdown } from "@/hooks/use-countdown";
import React from "react";

type CountDownType = "HARI" | "JAM" | "MINIT" | "SAAT";

const CountDownCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-md border border-ink/12 bg-ivory/60 p-2 px-10 flex items-center justify-around self-stretch sm:w-90 sm:mx-auto">
      {children}
    </div>
  );
};

const CoundownItems = ({
  number,
  type,
}: {
  number: number;
  type: CountDownType;
}) => {
  return (
    <div className="inline-flex flex-col items-center">
      <p className="font-serif text-3xl tabular-nums text-ink">
        {String(number).padStart(2, "0")}
      </p>
      <p className="font-sans text-[10px] tracking-[2px] text-sand">{type}</p>
    </div>
  );
};

const CountDown = () => {
  const { days, hours, minutes, seconds } = useCountdown("2026-12-05");

  return (
    <section
      id="countdown"
      className="flex items-center flex-col mt-10 gap-3 px-10 border-ink/12"
    >
      <h4 className="uppercase tracking-[3px] text-taupe text-[10px] font-medium font-sans">
        {/* counting down */}
        Menghitung hari
      </h4>

      <CountDownCard>
        <CoundownItems number={days} type="HARI" />
        <Divider orientation="vertical" width={30} />
        <CoundownItems number={hours} type="JAM" />
        <Divider orientation="vertical" width={30} />
        <CoundownItems number={minutes} type="MINIT" />
        <Divider orientation="vertical" width={30} />
        <CoundownItems number={seconds} type="SAAT" />
      </CountDownCard>
    </section>
  );
};

export default CountDown;
