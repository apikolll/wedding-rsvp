import { StarDivider } from "@/components/star-divider";
import React, { ReactNode } from "react";

const InvitationDetails = () => {
  return (
    <section id="invitation-details" className="mt-30">
      <div className="flex flex-col items-center">
        <h1 className="font-serif font-medium text-center text-2xl text-taupe">
          Walimatul Urus
        </h1>
        <StarDivider theme="dark" />

        <p className="font-sans tracking-[5px] uppercase font-light text-[10px]">
          Puteri kepada
        </p>

        <div className="font-gyahegi flex flex-col gap-6 text-xs italic items-center my-10">
          <h1>Raja Zainuri Bin Raja Kamal</h1>
          <p>&</p>
          <h1>Noor Azizah Binti Yusoff</h1>
        </div>

        <div className="text-pretty text-center text-taupe">
          <p>Dengan penuh kesyukuran, kami mempersilakan</p>
          <p className="italic">
            Dato&apos; | Datin | Tuan | Puan | Encik | Cik
          </p>
          <p>hadir ke majlis perkahwinan puteri kami</p>
        </div>

        <div className="font-parisienne flex flex-col gap-6 text-2xl items-center my-10 font-bold w-xs text-center leading-9 tracking-wide">
          <h1>Raja Nur Shafini Dania Binti Raja Zainuri</h1>
          <p>&</p>
          <h1>Muhammad Shahril Bin Muhammad Sayuthi</h1>
        </div>

        <StarDivider theme="dark" />

        <div className="mt-5 flex flex-col gap-10">
          <DetailContainer title="tempat">
            <div className="text-center">
              <p className="text-center text-pretty w-xs font-serif font-medium text-xl tracking-tight leading-tight">
                368, Lorong Rhu 3/2, Taman Rhu 3, Tikam Batu, 08600, Sungai
                Petani, Kedah
              </p>
            </div>
          </DetailContainer>

          <DetailContainer title="tarikh">
            <div className="text-center">
              <p className="font-serif font-medium text-xl">
                Sabtu, 05 Disember 2026
              </p>

              <p className="text-center italic text-pretty w-xs text-taupe text-[13px]">
                25 Jamadil Akhir 1448H
              </p>
            </div>
          </DetailContainer>

          <DetailContainer title="waktu jamuan makan">
            <div className="text-center">
              <p className="font-serif font-medium text-xl">
                12.00 tengahari – 5.00 petang
              </p>
            </div>
          </DetailContainer>
        </div>
      </div>
    </section>
  );
};

export default InvitationDetails;

const DetailContainer = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div>
      <p className="uppercase tracking-[3px] text-[10px] text-taupe mb-3 text-center">
        {title}
      </p>
      {children}
    </div>
  );
};
