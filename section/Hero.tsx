import CoupleNames from "@/components/couple-names";

const Hero = () => {
  return (
    <section id="hero" className="relative">
      <h1
        lang="ar"
        dir="rtl"
        className="font-arabic text-center text-2xl leading-loose text-taupe"
      >
        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </h1>

      <CoupleNames
        waitForIntro
        className="px-18 mt-15"
        firstClassName="self-start sm:self-center ml-5 sm:mr-60"
        secondClassName="self-end sm:self-center sm:ml-60"
      />
    </section>
  );
};

export default Hero;
