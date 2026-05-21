import clsx from "clsx";

const Divider = ({
  width = 40,
  orientation,
  color = "dark",
}: {
  width?: number;
  orientation?: "horizontol" | "vertical";
  color?: "dark" | "light" | "custom";
}) => {
  return (
    <div
      className={clsx(
        "bg-[#2A272220] opacity-100 w-40 h-px",
        orientation == "vertical" ? "rotate-90" : "rotate-0",
        color === "light" && "bg-[#FFFFFF20]",
      )}
      style={{ width: width }}
    />
  );
};

export default Divider;
