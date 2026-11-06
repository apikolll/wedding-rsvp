import { StarDivider } from "@/components/star-divider";

// Same outline as public/blob.svg (used as the glass mask), for the rim highlight
const BLOB_PATH =
  "M155.786 1.48421C192.115 -1.38673 230.407 -1.95529 261.228 17.5245C293.084 37.6584 318.931 70.7014 324.379 108.039C329.533 143.354 301.266 172.785 288.76 206.204C277.028 237.557 275.931 272.811 253.451 297.589C227.681 325.991 193.965 355.959 155.786 352.765C117.801 349.588 94.5808 310.759 69.2942 282.184C49.2642 259.549 36.596 233.451 25.3581 205.375C13.2044 175.011 -5.32541 144.682 1.44701 112.679C8.50511 79.3261 34.1458 53.1922 61.7752 33.2864C89.3015 13.4549 121.986 4.15528 155.786 1.48421Z";

const WeddingItinerary = () => {
  return (
    <section
      id="wedding-itinerary"
      aria-label="wedding-itinerary"
      className="mt-10"
    >
      {/* <svg width={"auto"} viewBox="0 0 300 300" className="bg-amber-200">
        <path
          // d="M 0,60 Q10 -10 150 10 Q10 100"
          d="M 0 20 C 40 10, 60 10, 100 10 S 150 150, 300 80"
          stroke="black"
          strokeWidth={10}
          strokeLinecap="round"
          fill="none"
        />
      </svg> */}
      <div className="flex flex-col items-center p-5 relative pb-20 sm:bg-linear-to-r sm:from-rose sm:via-wine/45 sm:to-sage sm:w-md sm:rounded-xl sm:mx-auto sm:overflow-hidden">
        {/* Liquid-glass blob: masked frosted glass + specular rim */}
        <div
          aria-hidden
          className="absolute right-0 w-101 aspect-325/353 -z-10 sm:hidden"
        >
          <div className="liquid-blob absolute inset-0" />
          <svg
            viewBox="0 0 325 353"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full overflow-visible pointer-events-none"
          >
            <path d={BLOB_PATH} fill="#fff" filter="url(#lg-rim-soft)" />
          </svg>
        </div>

        <div className="mt-18">
          <h1 className="font-parisienne text-white text-3xl">
            Aturcara Majlis
          </h1>
        </div>

        <StarDivider theme="light" />

        {/* <Flower className="size-52 absolute -left-7 sm:-left-5 not-sm:top-100 sm:-bottom-10 sm:size-40" /> */}

        <div className="self-start ml-23 relative pl-8">
          <div className="absolute left-3 top-2 bottom-15 w-px bg-white/40"></div>

          <div className="space-y-2">
            <div className="relative">
              <div className="absolute -left-6.5 top-1.5 w-3 h-3 rounded-full border-2 bg-white"></div>
              <div className="font-serif text-ivory/90">
                <p>11.00 pagi</p>
                <h4 className="text-xl font-medium">Bacaan Tahlil</h4>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6.5 top-1.5 w-3 h-3 rounded-full border-2 bg-white "></div>
              <div className="font-serif text-ivory/90">
                <p>12.00 tengahari</p>
                <h4 className="text-xl font-medium">Ketibaan Pengantin</h4>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6.5 top-1.5 w-3 h-3 rounded-full border-2 bg-white "></div>
              <div className="font-serif text-ivory/90">
                <p>4.30 petang</p>
                <h4 className="text-xl font-medium">Majlis selesai</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingItinerary;
