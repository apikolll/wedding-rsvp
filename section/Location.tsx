import { Button } from "@/components/ui/button";

const Location = () => {
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
          <Button className="uppercase rounded-sm text-xs px-8 py-5 w-max flex-1">
            open in maps
          </Button>
          <Button
            className="uppercase rounded-sm text-xs px-8 py-5 w-max flex-1 border-[#2A2722] text-[#2A2722]"
            variant={"outline"}
          >
            copy address
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Location;
