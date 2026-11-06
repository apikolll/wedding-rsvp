"use client";
import { Button } from "@/components/ui/button";
import { IconBrandGoogleMaps } from "@tabler/icons-react";

const Location = () => {
  const open = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="location" className="mt-10">
      <div className="mx-5 flex flex-col gap-2">
        <div className="aspect-video rounded-lg overflow-hidden border border-ink/12 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9293327273726!2d100.46197657588715!3d5.577465594402954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ad7148ec7df99%3A0x561a772c3768202!2s368%2C%20Jalan%20Rhu%203%2F2%2C%20Taman%20Rhu%2C%2008600%20Sungai%20Petani%2C%20Kedah!5e0!3m2!1sen!2smy!4v1793952839179!5m2!1sen!2smy"
            width="600"
            height="450"
            className="size-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex justify-between gap-3">
          <Button
            className="uppercase rounded-sm text-xs px-8 py-5 flex-1 cursor-pointer"
            onClick={() => open("https://maps.app.goo.gl/fw9BsVAiurJiy2mm8")}
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
