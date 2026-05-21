import Divider from "@/components/divider";

import Image from "next/image";

const DateDetails = () => {
  return (
    <div className="relative">
      <Image
        src={"/flowers/flower_3.svg"}
        alt="flower_3"
        width={100}
        height={100}
        className="w-40 absolute -left-13 top-40"
      />

      <h1 className="font-serif italic text-center text-[16px] text-muted-foreground mt-10">
        Invites you to celebrate their wedding
      </h1>

      <p className="text-center font-samantha mt-7">On</p>

      <div className="flex justify-center gap-10 mt-5">
        <div className="inline-flex flex-col items-center gap-2">
          <Divider width={80} />
          <p className="font-serif italic text-[#6B6258]">June</p>
          <Divider width={80} />
        </div>

        <div className="inline-flex flex-col items-center">
          <p className="font-serif text-4xl">28</p>
          <p className="font-serif text-lg italic text-muted-foreground">
            2026
          </p>
        </div>

        <div className="inline-flex flex-col items-center gap-2">
          <Divider width={80} />
          <p className="font-serif italic text-[#6B6258]">11:00 AM</p>
          <Divider width={80} />
        </div>
      </div>

      <p className="text-center font-samantha mt-7">At</p>

      <div className="flex flex-col items-center justify-center mt-7">
        <p className="font-serif text-xl">Bizmilla Grand Ballroom</p>
        <p className="font-serif italic text-sm text-[#696969]">
          Eco Sanctuary, Selangor
        </p>
      </div>

      <div className="flex items-center gap-3 justify-center my-7">
        <Divider width={80} />

        <Image
          src={"/plain.svg"}
          alt="logo"
          width={200}
          height={200}
          className="size-4"
        />
        <Divider width={80} />
      </div>
    </div>
  );
};

export default DateDetails;
