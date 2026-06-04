import { Prisma } from "@/generated/prisma-client";
import { useQuery } from "@tanstack/react-query";

type ReferenceWithUser = Prisma.ReferenceGetPayload<{
  include: { user: true };
}>;

export const useGetLinks = () => {
  const data = useQuery<ReferenceWithUser[]>({
    queryFn: async () => {
      const res = await fetch("/api/link");
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return res.json();
    },
    queryKey: ["reference"],
  });

  return data;
};
