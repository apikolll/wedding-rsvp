import Image from "next/image";

const Hero = () => {
  return (
    <section id="hero" className="relative">
      <Image
        src={"/flowers/flower_1.svg"}
        alt="flower_1"
        width={100}
        height={100}
        className="w-35 absolute left-0 top-10"
      />

      <Image
        src={"/flowers/flower_2.svg"}
        alt="flower_2"
        width={100}
        height={100}
        className="w-50 absolute right-0 top-8"
      />

      <h1 className="font-serif uppercase text-center text-[20px] tracking-wider text-muted-foreground">
        {/* Together with their families */}
        {/* Bismillahirrahmanirrahim */}
        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </h1>

      <div className="flex flex-col items-center px-10 mt-15 gap-12">
        <h1 className="font-samantha text-5xl self-start sm:self-center ml-5 sm:mr-60">
          Afiq
        </h1>
        <p className="font-samantha text-4xl">&</p>
        <h1 className="font-samantha text-5xl self-end sm:self-center sm:ml-60">
          Athirah
        </h1>
      </div>
    </section>
  );
};

export default Hero;
