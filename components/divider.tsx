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
        "bg-ink/12 h-px",
        orientation == "vertical" ? "rotate-90" : "rotate-0",
        color === "light" && "bg-white/20",
      )}
      style={{ width: width }}
    />
  );
};

export default Divider;
