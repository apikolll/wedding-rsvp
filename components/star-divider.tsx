import clsx from "clsx";
import Divider from "./divider";

import Plain from "@/public/plain.svg";

export const StarDivider = ({
  theme = "dark",
}: {
  theme: "dark" | "light" | "custom";
}) => {
  return (
    <div className="flex items-center gap-3 justify-center my-7">
      <Divider width={80} color={theme} />
      <Plain
        className={clsx(
          "size-4",
          theme === "dark" ? "text-[#6B6258]" : "text-white",
        )}
      />
      <Divider width={80} color={theme} />
    </div>
  );
};
