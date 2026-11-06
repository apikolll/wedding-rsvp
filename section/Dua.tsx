import React from "react";

import { StarDivider } from "@/components/star-divider";
import Image from "next/image";

const Dua = () => {
  return (
    <section id="dua" className="relative pb-50 mt-10">
      <Image
        width={100}
        height={100}
        alt="asd"
        src={"/ring-heart-dark.svg"}
        className="w-full object-fill mb-10 absolute left-0 top-0 opacity-60"
        quality={75}
      />

      <div className="pt-35">
        <p className="text-pretty text-center font-serif italic text-taupe text-[15px] px-6">
          &quot;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
          untuk kamu pasangan hidup dari jenis kamu sendiri supaya kamu hidup
          tenang bersamanya. Dia menjadikan di antara kamu kasih sayang dan
          belas kasihan. Sesungguhnya pada yang demikian itu terdapat
          tanda-tanda bagi kaum yang berfikir.&quot;
        </p>
        <p className="text-[10px] uppercase text-center mt-3 text-sand tracking-[2px]">
          — Surah Ar-Rum (30:21)
        </p>
      </div>

      <StarDivider theme="dark" />

      <div
        className="font-gyahegi text-4xl text-center"
        style={{ lineHeight: 1.5 }}
      >
        <p>Shafini &</p>
        <p>Shahril</p>
      </div>
      <p className="text-center mt-5 text-[10px] tracking-[2px] text-sand">
        05.12.2026
      </p>
    </section>
  );
};

export default Dua;
