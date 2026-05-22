import Flower1 from "@/public/flowers/flower_6.svg";
import Flower2 from "@/public/flowers/flower_7.svg";
import Image from "next/image";

const Gallery = () => {
  return (
    <section id="gallery" className="mt-10">
      <div className="text-center flex flex-col gap-3 relative">
        <p className="uppercase tracking-[3px] text-[10px] text-[#6B6258]">
          Moments
        </p>
        <h1 className="font-allura text-5xl">Our Story</h1>
        <Flower1 className="size-30 absolute -left-7 top-10" />
        <Flower2 className="size-30 absolute -right-7" />
      </div>

      {/* <div className="grid grid-cols-2 px-5 mt-20 gap-3">
        <Image
          src={"/images/E-128.jpg"}
          alt="1"
          width={400}
          height={400}
          preload
          className="rounded-md col-span-2 aspect-video w-full"
        />
        <Image
          src={"/images/E-5.jpg"}
          alt="2"
          width={400}
          height={400}
          preload
          className="rounded-md row-span-3 h-50 object-cover"
        />
        <Image
          src={"/images/E-34.jpg"}
          alt="3"
          width={400}
          height={400}
          preload
          className="rounded-md row-span-3 h-50 object-cover"
        />
        <Image
          src={"/images/E-109.jpg"}
          alt="4"
          width={400}
          height={400}
          preload
          className="rounded-md row-span-3 h-80 object-cover"
        />
        <div className="flex flex-col justify-between row-span-3 space-y-2.5">
          <Image
            src={"/images/E-129.jpg"}
            alt="5"
            width={400}
            height={400}
            preload
            className="rounded-md object-cover h-40"
          />
          <Image
            src={"/images/E-129.jpg"}
            alt="6"
            width={400}
            height={400}
            preload
            className="rounded-md object-cover h-40"
          />
        </div>
      </div> */}

      <div className="grid grid-cols-2 grid-rows-[auto_auto_auto] gap-3 px-5 mt-20">
        <Image
          src="/images/E-128.jpg"
          alt="Hero"
          width={800}
          height={450}
          priority
          className="col-span-2 aspect-video w-full rounded-md object-cover shadow-md shadow-black/30"
        />

        <Image
          src="/images/E-5.jpg"
          alt="Gallery 2"
          width={400}
          height={400}
          className="h-48 w-full rounded-md object-cover shadow-md shadow-black/30"
        />
        <Image
          src="/images/E-34.jpg"
          alt="Gallery 3"
          width={400}
          height={400}
          className="h-48 w-full rounded-md object-cover shadow-md shadow-black/30"
        />

        <Image
          src="/images/E-109.jpg"
          alt="Gallery 4"
          width={400}
          height={600}
          className="h-80 w-full rounded-md object-cover shadow-md shadow-black/30"
        />
        <div className="flex flex-col gap-3 h-80">
          <Image
            src="/images/E-166.jpg"
            alt="Gallery 5"
            width={400}
            height={300}
            className="h-[calc(50%-0.375rem)] w-full rounded-md object-cover shadow-md shadow-black/30"
          />
          <Image
            src="/images/E-129.jpg"
            alt="Gallery 6"
            width={400}
            height={300}
            className="h-[calc(50%-0.375rem)] w-full rounded-md object-cover shadow-md shadow-black/30"
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
