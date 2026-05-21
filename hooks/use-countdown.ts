import dayjs from "dayjs";
import { useEffect, useState } from "react";
import duration, { Duration } from "dayjs/plugin/duration";

dayjs.extend(duration);

export function useCountdown(targetDate: string | Date) {
  const [timeLeft, setTimeLeft] = useState<Duration | null>(null);

  useEffect(() => {
    // Set initial value on client only
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(dayjs.duration(dayjs(targetDate).diff(dayjs())));

    const interval = setInterval(() => {
      setTimeLeft(dayjs.duration(dayjs(targetDate).diff(dayjs())));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: false,
      ready: false,
    };
  }

  return {
    days: Math.max(0, Math.floor(timeLeft.asDays())),
    hours: Math.max(0, timeLeft.hours()),
    minutes: Math.max(0, timeLeft.minutes()),
    seconds: Math.max(0, timeLeft.seconds()),
    isExpired: timeLeft.asMilliseconds() <= 0,
    ready: true,
  };
}
