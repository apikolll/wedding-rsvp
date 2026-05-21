"use client";
import Divider from "@/components/divider";
import { useCountdown } from "@/hooks/use-countdown";
import React, { useEffect, useState } from "react";

type CountDownType = "DAYS" | "HOURS" | "MINS" | "SECS";

const CountDownCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-md border self-stretch p-3 px-10 flex items-center justify-between">
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
    <div className="flex items-center flex-col mt-10 gap-3 px-10 border-[#2A272220]">
      <h4 className="uppercase tracking-[3px] text-[#6B6258] text-[10px] font-medium font-sans">
        counting down
      </h4>

      <CountDownCard>
        <CoundownItems number={days} type="DAYS" />
        <Divider orientation="vertical" width={30} />
        <CoundownItems number={hours} type="HOURS" />
        <Divider orientation="vertical" width={30} />
        <CoundownItems number={minutes} type="MINS" />
        <Divider orientation="vertical" width={30} />
        <CoundownItems number={seconds} type="SECS" />
      </CountDownCard>
    </div>
  );
};

export default CountDown;
