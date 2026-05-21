import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import Flower from "@/public/flowers/flower_5.svg";

const Rsvp = () => {
  return (
    <section id="rsvp" className="bg-card mt-10 pb-20">
      <div className="text-center pt-15 flex flex-col gap-4 relative">
        <p className="uppercase tracking-[3px] text-[10px] text-[#6B6258]">
          kindly respond
        </p>
        <h1 className="font-allura font-medium text-6xl">R.S.V.P</h1>
        <p className="font-serif text-[14px] text-[#6B6258] italic">
          by 14 June 2026
        </p>
        <Flower className={"size-30 absolute -right-3 top-13"} />
      </div>

      {/* RSVP Form  */}
      <div className="px-5 mt-6">
        <FieldGroup>
          <Field>
            <FieldLabel
              htmlFor="name"
              className="text-[#6B6258] uppercase tracking-[2px] text-[10px]"
            >
              Your name
            </FieldLabel>

            <Input
              id="name"
              autoComplete="off"
              placeholder="Athirah"
              className="bg-[#FFFDF380] rounded-sm py-5 border border-[#2A272220] placeholder:text-sm"
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="name"
              className="text-[#6B6258] uppercase tracking-[2px] text-[10px]"
            >
              Will you attend ?
            </FieldLabel>

            <RadioGroup
              defaultValue=""
              className="flex gap-3 justify-center max-w-sm mx-auto"
            >
              <FieldLabel
                htmlFor="rsvp-accept"
                className="flex-1 justify-center has-data-[state=checked]:bg-[#2A2722] has-data-[state=checked]:text-[#FFFDF3]"
              >
                <Field className="items-center text-center cursor-pointer flex-1 border-[#2A2722] border rounded-sm">
                  <FieldContent className="items-center justify-center">
                    <FieldTitle className="uppercase text-[12px] tracking-[1px]">
                      Joyfully Accept
                    </FieldTitle>
                  </FieldContent>
                  <RadioGroupItem value="accept" id="rsvp-accept" hidden />
                </Field>
              </FieldLabel>

              <FieldLabel
                htmlFor="rsvp-decline"
                className="flex-1 justify-between has-data-[state=checked]:bg-[#2A2722] has-data-[state=checked]:text-[#FFFDF3]"
              >
                <Field className="items-center text-center cursor-pointer flex-1 border-[#2A2722] border rounded-sm">
                  <FieldContent className="items-center justify-between">
                    <FieldTitle className="uppercase text-[12px] tracking-[1px]">
                      Regretfully Decline
                    </FieldTitle>
                  </FieldContent>
                  <RadioGroupItem value="decline" id="rsvp-decline" hidden />
                </Field>
              </FieldLabel>
            </RadioGroup>
          </Field>

          <Field>
            <FieldLabel
              htmlFor="name"
              className="text-[#6B6258] uppercase tracking-[2px] text-[10px]"
            >
              Pax ( incl. yourself )
            </FieldLabel>

            <div className="flex justify-evenly">
              <Button className="size-10 rounded-full text-lg bg-[#FFFDF3] text-[#2A2722] border border-[#2A272220]">
                -
              </Button>

              <p className="font-serif text-3xl">29</p>

              <Button className="size-10 rounded-full text-lg bg-[#FFFDF3] text-[#2A2722] border border-[#2A272220]">
                +
              </Button>
            </div>
          </Field>

          <Field>
            <FieldLabel
              htmlFor="name"
              className="text-[#6B6258] uppercase tracking-[2px] text-[10px]"
            >
              A note for the couple
            </FieldLabel>

            <Textarea
              id="name"
              autoComplete="off"
              placeholder="Type your note here."
              className="bg-[#FFFDF380] rounded-sm border border-[#2A272220] placeholder:text-sm"
            />
          </Field>
        </FieldGroup>

        <Button className="w-full py-6 uppercase tracking-[2px] text-[13px] mt-5 bg-[#5C1F1F]">
          Send response
        </Button>
      </div>
    </section>
  );
};

export default Rsvp;
