// import { prisma } from "@/lib/prisma";

import { prisma } from "@/config/prisma";

export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: unknown) => {
        controller.enqueue(
          new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`),
        );
      };

      // Send immediately on connect
      try {
        const rsvp = await prisma.user.findMany({
          include: { reference: true },
        });
        send(rsvp);
      } catch (err) {
        console.error("RSVP stream initial fetch failed:", err);
      }

      // Poll every 3 seconds and push new data
      const interval = setInterval(async () => {
        try {
          const rsvp = await prisma.user.findMany({
            include: { reference: true },
          });
          send(rsvp);
        } catch (err) {
          console.error("RSVP stream poll failed:", err);
          clearInterval(interval);
          controller.close();
        }
      }, 3000);

      // Cleanup on disconnect
      return () => clearInterval(interval);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
