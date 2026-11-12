"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { IconCalendar, IconCheck, IconUsers } from "@tabler/icons-react";

import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { memo, useEffect } from "react";
import Image from "next/image";

const schema = z.discriminatedUnion("status", [
  z.object({
    name: z.string().min(1, "Name is required.").max(100, "Name too long"),
    status: z.literal("accept"),
    pax: z.number().min(1, "Minimum pax is 1.").max(2, "Maximum pax is 2."),
    notes: z.string().max(300, "Notes is too long").nullable(),
  }),
  z.object({
    name: z.string().min(1, "Name is required.").max(100, "Name too long"),
    status: z.literal("decline"),
    notes: z.string().max(300, "Notes is too long").nullable(),
  }),
]);

const showSuccessToast = (message: string, pax?: number) => {
  return toast.custom(
    () => (
      <div className="flex gap-3 items-start bg-white border border-zinc-200 rounded-xl p-4 shadow-lg max-w-sm">
        <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <IconCheck size={18} strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xl font-medium text-zinc-900 font-serif">
            {message}
          </p>
          {pax && (
            <div className="flex gap-4 mt-2.5 pt-2.5 border-t border-zinc-100 text-xs text-zinc-500 font-serif">
              <span className="flex items-center gap-1">
                <IconCalendar size={12} /> Ahad, Jun 28
              </span>
              <span className="flex items-center gap-1 font-serif">
                <IconUsers size={12} /> {pax} orang
              </span>
            </div>
          )}
        </div>
      </div>
    ),
    { duration: 5000 },
  );
};

const Rsvp = () => {
  const queryClient = useQueryClient();

  const param = useSearchParams();
  const referenceNumber = param.get("ref");

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      status: "accept",
      pax: 0,
      notes: "",
    },
    mode: "onChange",
  });

  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    reset,
    watch,
  } = methods;

  // eslint-disable-next-line react-hooks/incompatible-library
  const status = watch("status");

  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     const res = await fetch("/api/rsvp", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "POST",
  //       body: JSON.stringify({ ...data, ref: localStorage.getItem("ref") }),
  //     });

  //     if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  //     const response = await res.json();

  //     reset();
  //     queryClient.invalidateQueries({ queryKey: ["rsvp"] });

  //     if (response.status === "decline") {
  //       showSuccessToast("Terima kasih atas maklum balas anda.");
  //     } else {
  //       showSuccessToast(
  //         "Terima kasih, kami nantikan kehadiran anda.",
  //         response.pax,
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Prefer the live param; fall back to the persisted one.
      const ref = referenceNumber ?? localStorage.getItem("ref");

      // Build the payload explicitly so `pax` never leaks on decline.
      const payload =
        data.status === "decline"
          ? { name: data.name, status: data.status, notes: data.notes }
          : {
              name: data.name,
              status: data.status,
              pax: data.pax,
              notes: data.notes,
            };

      const res = await fetch("/api/rsvp", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ ...payload, ref }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const response = await res.json();

      reset();
      queryClient.invalidateQueries({ queryKey: ["rsvp"] });

      if (response.status === "decline") {
        showSuccessToast("Terima kasih atas maklum balas anda.");
      } else {
        showSuccessToast(
          "Terima kasih, kami nantikan kehadiran anda.",
          response.pax,
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Maaf, ada masalah. Sila cuba lagi.");
    }
  });

  useEffect(() => {
    if (!referenceNumber) return;

    localStorage.setItem("ref", referenceNumber);
  }, [referenceNumber]);

  return (
    <section className="relative flex flex-col mt-10">
      <Image
        width={100}
        height={100}
        alt="asd"
        src={"/ring-heart-dark.svg"}
        className="w-full object-fill mb-10 absolute left-0 top-0 opacity-60"
        quality={75}
      />

      {/* Wrapper is not masked, so the title can sit in the card's notch */}
      <div id="rsvp" className="relative mt-40 m-5">
        {/* Sits in the cut-out, on the page background (see .corner-cut) */}
        <div className="absolute left-0 top-0 z-10 flex w-40 h-14 items-center justify-center">
          <h1 className="font-samantha font-medium text-2xl">R.S.V.P</h1>
        </div>

        <div className="corner-cut relative pb-10 overflow-hidden backdrop-blur-sm rounded-xl rounded-tl-none bg-linear-150 from-10% from-[#6B1A0F]/30 to-transparent">
          {/* Header row: notch on the left, subtitle on the raised right part */}
          <div className="flex justify-end min-h-20 pt-5 pr-5">
            <p className="w-32 text-right uppercase tracking-[3px] text-[10px] leading-relaxed text-taupe">
              Sila sahkan kehadiran
            </p>
          </div>

          {/* RSVP Form  */}
          <div className="px-5">
            <FormProvider {...methods}>
              <form onSubmit={onSubmit}>
                <FieldGroup>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <Field>
                        <FieldLabel
                          htmlFor="name"
                          className="text-taupe uppercase tracking-[2px] text-[10px]"
                        >
                          Nama
                        </FieldLabel>
                        <Input
                          {...field}
                          autoComplete="off"
                          placeholder="Nama anda"
                          className="bg-ivory/50 rounded-sm py-5 border border-ink/12 placeholder:text-sm text-md font-serif"
                          aria-invalid={!!error}
                        />
                        {error && (
                          <FieldDescription className="text-destructive text-[10px]">
                            {error.message}
                          </FieldDescription>
                        )}
                      </Field>
                    )}
                  />

                  <Field>
                    <FieldLabel
                      htmlFor="status"
                      className="text-taupe uppercase tracking-[2px] text-[10px]"
                    >
                      {/* Will you attend ? */}
                      Sahkan kehadiran anda
                    </FieldLabel>

                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          value={field.value}
                          className="flex gap-3 justify-center max-w-sm mx-auto"
                          onValueChange={(val) => {
                            field.onChange(val);
                          }}
                        >
                          <FieldLabel
                            htmlFor="rsvp-accept"
                            className="flex-1 justify-center has-data-[state=checked]:bg-ink has-data-[state=checked]:text-ivory"
                          >
                            <Field className="items-center text-center cursor-pointer flex-1 border-ink border rounded-sm">
                              <FieldContent className="items-center justify-center">
                                <FieldTitle className="uppercase text-[12px] tracking-[1px]">
                                  {/* Joyfully Accept */}
                                  Hadir
                                </FieldTitle>
                              </FieldContent>
                              <RadioGroupItem
                                value="accept"
                                id="rsvp-accept"
                                hidden
                              />
                            </Field>
                          </FieldLabel>

                          <FieldLabel
                            htmlFor="rsvp-decline"
                            className="flex-1 justify-center has-data-[state=checked]:bg-ink has-data-[state=checked]:text-ivory"
                          >
                            <Field className="items-center text-center cursor-pointer flex-1 border-ink border rounded-sm">
                              <FieldContent className="items-center justify-center">
                                <FieldTitle className="uppercase text-[12px] tracking-[1px]">
                                  {/* Regretfully Decline */}
                                  Tidak Hadir
                                </FieldTitle>
                              </FieldContent>
                              <RadioGroupItem
                                value="decline"
                                id="rsvp-decline"
                                hidden
                              />
                            </Field>
                          </FieldLabel>
                        </RadioGroup>
                      )}
                    />
                  </Field>

                  {status === "accept" && (
                    <Field>
                      <FieldLabel
                        htmlFor="pax"
                        className="text-taupe uppercase tracking-[2px] text-[10px]"
                      >
                        {/* Pax ( incl. yourself ) */}
                        Bilangan kehadiran (termasuk anda)
                      </FieldLabel>

                      <Controller
                        name="pax"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <div className="flex justify-evenly">
                            <Button
                              type="button"
                              className="size-10 rounded-full text-lg bg-ivory text-ink border border-ink/12 hover:bg-accent"
                              onClick={() => {
                                if (Number(field.value) < 1) return;
                                field.onChange(Number(field.value) - 1);
                              }}
                              disabled={Number(field.value) === 0}
                            >
                              -
                            </Button>

                            <p className="font-serif text-3xl">{field.value}</p>

                            <Button
                              type="button"
                              className="size-10 rounded-full text-lg bg-ivory text-ink border border-ink/12 hover:bg-accent"
                              onClick={() => {
                                if (Number(field.value) >= 10) return;
                                field.onChange(Number(field.value) + 1);
                              }}
                              disabled={Number(field.value) === 10}
                              aria-invalid={error?.type === "too_small"}
                            >
                              +
                            </Button>
                          </div>
                        )}
                      />
                    </Field>
                  )}

                  <Field>
                    <FieldLabel
                      htmlFor="notes"
                      className="text-taupe uppercase tracking-[2px] text-[10px]"
                    >
                      {/* A note for the couple (optional) */}
                      Ucapan untuk pasangan
                    </FieldLabel>

                    <Controller
                      name="notes"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          value={field.value || ""}
                          autoComplete="off"
                          placeholder="Tulis ucapan anda di sini."
                          className="bg-ivory/50 rounded-sm border border-ink/12 placeholder:text-sm text-md font-serif"
                        />
                      )}
                    />
                  </Field>
                </FieldGroup>

                <Button
                  className="w-full py-6 uppercase tracking-[2px] text-[13px] mt-5 bg-wine"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? <Spinner /> : "Hantar"}
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Rsvp);
