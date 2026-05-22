// hooks/useRSVPStream.ts
"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useRSVPStream = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const es = new EventSource("/api/rsvp/stream");

    es.onmessage = (event) => {
      queryClient.setQueryData(["rsvp"], JSON.parse(event.data));
    };

    es.onerror = () => es.close();

    return () => es.close();
  }, [queryClient]);
};

export default useRSVPStream;
