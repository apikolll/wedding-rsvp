import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCircleCheck, IconLink, IconXboxX } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
});

export function CreateLinkDialog() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof schema>) => {
      const res = await fetch("/api/link", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Failed to create reference");
      }

      return json; // { newReference }
    },
    onError: (error) => {
      toast.custom(() => (
        <div className="bg-white rounded-md p-3 px-4 flex items-center gap-2">
          <IconXboxX stroke={2} color="red" size={17} />

          <p className="text-sm font-medium">{error?.message}</p>
        </div>
      ));
    },
    onSuccess: async () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["reference"] });
      toast.custom(() => (
        <div className="bg-white rounded-md p-3 px-4 flex items-center gap-2">
          <IconCircleCheck stroke={2} color="green" size={17} />
          <p className="text-sm font-medium">
            Successfully created new reference
          </p>
        </div>
      ));
    },
  });

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, control, reset } = methods;

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <IconLink stroke={2} />
          Create new link
        </Button>
      </DialogTrigger>

      <FormProvider {...methods}>
        <form>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Manage RSVP Links</DialogTitle>
              <DialogDescription>
                You can create a new reference of a unique link.
              </DialogDescription>
            </DialogHeader>

            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <Label htmlFor={"name"}>Name</Label>
                  <Input
                    {...field}
                    placeholder="Enter unique name"
                    aria-invalid={!!error}
                  />
                  {/* {error && <FieldDescription>asda</FieldDescription>} */}
                </Field>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button" onClick={() => reset()}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" onClick={onSubmit}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </FormProvider>
    </Dialog>
  );
}
