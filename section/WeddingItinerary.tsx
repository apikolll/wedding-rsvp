import { StarDivider } from "@/components/star-divider";
import Image from "next/image";
import Flower from "@/public/flowers/flower_4.svg";

const WeddingItinerary = () => {
  return (
    <section
      id="wedding-itinerary"
      aria-label="wedding-itinerary"
      className="mt-10"
    >
      <div className="flex flex-col items-center p-5 relative sm:bg-linear-to-r sm:from-[#A52A2A] sm:via-[#80000070] sm:to-[#9CAF88] sm:w-md sm:rounded-xl sm:mx-auto sm:overflow-hidden">
        <Image
          src={"/blob/Blob.svg"}
          alt="blob"
          width={100}
          height={100}
          className="absolute right-0 w-101 -z-10 sm:hidden"
        />

        <div className="mt-15">
          <h1 className="font-samantha text-white text-3xl">The Day</h1>
        </div>

        <StarDivider theme="light" />

        <Flower className="size-52 absolute -left-7 sm:-left-5 not-sm:top-100 sm:-bottom-10 sm:size-40" />

        <div className="self-start ml-23 relative pl-8">
          <div className="absolute left-3 top-2 bottom-15 w-px bg-white/40"></div>

          <div className="space-y-2">
            <div className="relative">
              <div className="absolute -left-6.5 top-1.5 w-3 h-3 rounded-full border-2 bg-white"></div>
              <div className="font-serif text-[#E6E6E6]">
                <p>11:00 am</p>
                <h4 className="text-xl font-medium">Guest Arrival</h4>
                <p>Welcome drinks & seating</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6.5 top-1.5 w-3 h-3 rounded-full border-2 bg-white "></div>
              <div className="font-serif text-[#E6E6E6]">
                <p>11:30 am</p>
                <h4 className="text-xl font-medium">Guest Arrival</h4>
                <p>Welcome drinks & seating</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6.5 top-1.5 w-3 h-3 rounded-full border-2 bg-white "></div>
              <div className="font-serif text-[#E6E6E6]">
                <p>11:30 am</p>
                <h4 className="text-xl font-medium">Guest Arrival</h4>
                <p>Welcome drinks & seating</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6.5 top-1.5 w-3 h-3 rounded-full border-2 bg-white "></div>
              <div className="font-serif text-[#E6E6E6]">
                <p>11:30 am</p>
                <h4 className="text-xl font-medium">Guest Arrival</h4>
                <p>Welcome drinks & seating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingItinerary;
