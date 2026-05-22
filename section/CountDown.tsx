"use client";
import Divider from "@/components/divider";
import { useCountdown } from "@/hooks/use-countdown";
import React from "react";

type CountDownType = "HARI" | "JAM" | "MINIT" | "SAAT";

const CountDownCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-md border p-2 px-10 flex items-center gap justify-around self-stretch sm:w-90 sm:mx-auto">
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
      <p className="font-serif font-bold text-3xl">{number}</p>
      <p className="font-sans text-xs text-[#2A2722] opacity-40">{type}</p>
    </div>
  );
};

const CountDown = () => {
  const { days, hours, minutes, seconds } = useCountdown("2026-06-28");

  return (
    <section
      id="countdown"
      className="flex items-center flex-col mt-10 gap-3 px-10 border-[#2A272220]"
    >
      <h4 className="uppercase tracking-[3px] text-[#6B6258] text-[10px] font-medium font-sans">
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
