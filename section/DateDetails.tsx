import Divider from "@/components/divider";

import Image from "next/image";

const DateDetails = () => {
  return (
    <div className="relative">
      {/* <Image
        src={"/flowers/flower_3.svg"}
        alt="flower_3"
        width={100}
        height={100}
        className="w-40 absolute -left-13 top-40"
      /> */}

      <h1 className="font-serif italic text-center text-[16px] text-muted-foreground mt-10">
        {/* Invites you to celebrate their wedding */}
        Menjemput ke majlis perkahwinan kami
      </h1>

      <div className="flex flex-col items-center justify-center my-10 space-y-6">
        <p className="text-center font-gyahegi text-[10px] italic">Pada</p>

        <div className="flex gap-10">
          <div className="inline-flex flex-col items-center gap-2">
            <Divider width={80} />
            <p className="font-serif italic text-taupe">Sabtu</p>
            <Divider width={80} />
          </div>

          <div className="inline-flex flex-col items-center">
            <p className="font-allura text-4xl font-bold">05</p>
            <p className="font-allura text-lg italic text-muted-foreground font-semibold">
              2026
            </p>
          </div>

          <div className="inline-flex flex-col items-center gap-2">
            <Divider width={80} />
            <p className="font-serif italic text-taupe">Disember</p>
            <Divider width={80} />
          </div>
        </div>

        {/* <p className="text-center font-gyahegi text-[10px] italic">Di</p> */}
      </div>

      {/* <div className="flex flex-col items-center justify-center mt-7">
        <p className="font-serif text-xl">
          368, Lorong Rhu 3/2, Taman Rhu 3, Tikam Batu, 08600, Sungai Petani,
          Kedah
        </p>
        <p className="font-serif italic text-sm text-taupe">
          Eco Sanctuary, Selangor
        </p>
      </div> */}

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
