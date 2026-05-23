"use client";
import { useQuery } from "@tanstack/react-query";

type RSVP = {
  id: string;
  status: string;
  name: string;
  pax: number;
  notes?: string;
  createdAt: string;
};

const fetchRSVP = async (): Promise<RSVP[]> => {
  const res = await fetch("/api/rsvp");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
};

const useGetRSVP = () => {
  return useQuery({
    queryKey: ["rsvp"],
    queryFn: fetchRSVP,
  });
};

export default useGetRSVP;
