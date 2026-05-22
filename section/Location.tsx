"use client";
import { Button } from "@/components/ui/button";
import { IconBrandGoogleMaps, IconBrandWaze } from "@tabler/icons-react";

const Location = () => {
  const open = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="location" className="mt-10">
      <div className="mx-5 flex flex-col gap-2">
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.550100715572!2d101.54049297628266!3d2.944698297031566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdb17a534fe0b7%3A0x5293fdef388d4c19!2sBIZMILLA%20Grand%20Ballroom%20Eco%20Sanctuary!5e0!3m2!1sen!2smy!4v1779357683302!5m2!1sen!2smy"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex justify-between gap-3">
          <Button
            className="uppercase rounded-sm text-xs px-8 py-5 w-max flex-1"
            onClick={() =>
              open(
                "https://ul.waze.com/ul?place=ChIJt-BPU3qxzTERGUyNOO_9k1I&ll=2.94469830%2C101.54306790&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location",
              )
            }
          >
            <IconBrandWaze stroke={2} />
            Waze
          </Button>
          <Button
            // className="uppercase rounded-sm text-xs px-8 py-5 w-max flex-1 border-[#2A2722] text-[#2A2722]"
            className="uppercase rounded-sm text-xs px-8 py-5 w-max flex-1"
            onClick={() => open("https://maps.app.goo.gl/XD6R4wcSyf6WdHiW7")}
          >
            <IconBrandGoogleMaps stroke={2} />
            Google Maps
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Location;
