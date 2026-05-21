import { StarDivider } from "@/components/star-divider";
import React, { ReactNode } from "react";

const InvitationDetails = () => {
  return (
    <section id="invitation-details" className="mt-20 h-screen">
      <div className="flex flex-col items-center">
        <h1 className="font-serif font-medium text-center text-2xl text-[#626262]">
          Walimatul Urus
        </h1>
        <StarDivider theme="dark" />

        <p className="font-sans tracking-[5px] uppercase font-light text-[10px]">
          Anakanda kepada
        </p>

        <div className="font-samantha flex flex-col gap-6 text-xl items-center my-10">
          <h1>Hj Noorazam Bin Ismail</h1>
          <p>&</p>
          <h1>Hjh Nooriah Binti Yusoff</h1>
        </div>

        <div className="text-pretty text-center text-[#626262]">
          <p>Dengan penuh kesyukuran, kami mempersilakan</p>
          <p className="italic">
            Dato&apos; | Datin | Tuan | Puan | Encik | Cik
          </p>
          <p>hadir ke majlis perkahwinan anakanda kami</p>
        </div>

        <div className="font-allura flex flex-col gap-6 text-3xl items-center my-10 font-bold">
          <h1>Afiq Danial bin Noorazam</h1>
          <p>&</p>
          <h1>Nur Athirah Binti Ahmad Faisal</h1>
        </div>

        <StarDivider theme="dark" />

        <div className="mt-5 flex flex-col gap-10">
          <DetailContainer title="tempat">
            <div className="text-center">
              <p className="font-serif font-medium text-xl">
                Bizmilla Grand Ballroom
              </p>
              <p className="font-serif font-medium text-xl">Eco Sanctuary</p>

              <p className="text-center text-pretty w-xs mt-3 text-[#6B6258] text-[13px]">
                02-02A, Level 2, Sanctuary Mall Jalan Eco Santuari 8/3 Eco
                Santuari, 42500 Telok Panglima Garang, Selangor
              </p>
            </div>
          </DetailContainer>

          <DetailContainer title="tarikh">
            <div className="text-center">
              <p className="font-serif font-medium text-xl">
                Ahad, 28 Jun 2026
              </p>

              <p className="text-center italic text-pretty w-xs text-[#6B6258] text-[13px]">
                12 Muharram 1448 AH
              </p>
            </div>
          </DetailContainer>

          <DetailContainer title="waktu">
            <div className="text-center">
              <p className="font-serif font-medium text-xl">
                11:00 pagi – 4:00 petang
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
      <p className="uppercase tracking-[3px] text-[10px] text-[#6B6258] mb-3 text-center">
        {title}
      </p>
      {children}
    </div>
  );
};
