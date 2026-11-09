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
import {
  IconCalendar,
  IconCheck,
  IconChevronLeft,
  IconUsers,
} from "@tabler/icons-react";

import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

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
                <IconCalendar size={12} /> Sabtu, Disember 5
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

const RsvpForm = () => {
  const queryClient = useQueryClient();

  const param = useSearchParams();

  const referenceNumber = param.get("ref");

  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

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
    <motion.div
      initial={{ x: 500, opacity: 0 }}
      // Next.js unmounts the page immediately on navigation, so `exit` would
      // never run — play the slide-out ourselves, then go back once it's done.
      animate={leaving ? { x: 500, opacity: 0 } : { x: 0, opacity: 1 }}
      onAnimationComplete={() => {
        if (leaving) router.back();
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
      className="bg-card h-screen overflow-scroll flex flex-col max-w-md mx-auto"
    >
      <div className="text-center pt-15 flex flex-col gap-4 relative">
        <Button
          variant="default"
          color=""
          size="icon-sm"
          className="rounded-full absolute top-7 left-7 bg-transparent border-2 border-primary hover:bg-primary/20"
          onClick={() => {
            reset();
            setLeaving(true);
          }}
        >
          <IconChevronLeft className="size-5 text-primary" />
        </Button>
        <p className="uppercase tracking-[3px] text-[10px] text-taupe">
          Sila sahkan kehadiran
        </p>
        <h1 className="font-allura font-medium text-6xl">R.S.V.P</h1>
      </div>

      {/* RSVP Form  */}
      <div className="px-5 flex-1 relative overflow-hidden">
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
                            if (Number(field.value) >= 2) return;
                            field.onChange(Number(field.value) + 1);
                          }}
                          disabled={Number(field.value) === 2}
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
              className={cn(
                "w-sm py-6 uppercase tracking-[2px] text-[13px] mt-5 bg-primary/70 absolute left-1/2 bottom-5 -translate-x-1/2",
                isValid && "bg-primary",
              )}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Hantar"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </motion.div>
  );
};

// useSearchParams() needs a Suspense boundary, otherwise `next build` fails
// for this route (it can't be prerendered without knowing ?ref=).
const Page = () => (
  <Suspense fallback={<div className="bg-card h-screen max-w-md mx-auto" />}>
    <RsvpForm />
  </Suspense>
);

export default Page;
