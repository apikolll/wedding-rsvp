import React from "react";
import Flower1 from "@/public/flowers/flower_8.svg";
import Flower2 from "@/public/flowers/flower_9.svg";
import { StarDivider } from "@/components/star-divider";

const Dua = () => {
  return (
    <section id="dua" className="mt-10 relative pb-50">
      <Flower1 className="size-30 absolute -left-11 -rotate-12" />
      <Flower2 className="size-35 absolute -right-6 top-27" />
      <div>
        <p className="text-pretty text-center font-serif italic text-[#6B6258] text-[15px] px-6 pt-20">
          {/* “And among His signs is this, that He created for you mates from among
          yourselves, that you may dwell in tranquility with them, and He has
          put love and mercy between your hearts.” */}
          &quot;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
          untuk kamu pasangan hidup dari jenis kamu sendiri supaya kamu hidup
          tenang bersamanya. Dia menjadikan di antara kamu kasih sayang dan
          belas kasihan. Sesungguhnya pada yang demikian itu terdapat
          tanda-tanda bagi kaum yang berfikir.&quot;
        </p>
        <p className="text-[10px] uppercase text-center mt-3 text-[#A99F92] tracking-[2px]">
          — Surah Ar-Rum (30:21)
        </p>
      </div>

      <StarDivider theme="dark" />

      <div className="font-allura text-6xl text-center">
        <p>Afiq &</p>
        <p>Athirah</p>
      </div>
      <p className="text-center mt-5 text-[10px] tracking-[2px] text-[#A99F92]">
        28.06.2026
      </p>
    </section>
  );
};

export default Dua;
