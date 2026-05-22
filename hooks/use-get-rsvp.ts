"use client";
import { useEffect, useState } from "react";

type RSVP = {
  id: string;
  status: string;
  name: string;
  pax: number;
  notes?: string;
  // ...
};

type State =
  | { status: "loading"; list: null; error: null }
  | { status: "success"; list: RSVP[]; error: null }
  | { status: "error"; list: null; error: Error };

const useGetRSVP = () => {
  const [state, setState] = useState<State>({
    status: "loading",
    list: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/rsvp");
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data: RSVP[] = await res.json();
        if (!cancelled)
          setState({ status: "success", list: data, error: null });
      } catch (err) {
        if (!cancelled) {
          setState({
            status: "error",
            list: null,
            error: err instanceof Error ? err : new Error("Unknown error"),
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
};

export default useGetRSVP;
