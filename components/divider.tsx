import clsx from "clsx";

const Divider = ({
  width = 40,
  orientation,
}: {
  width?: number;
  orientation?: "horizontol" | "vertical";
}) => {
  return (
    <div
      className={clsx(
        "bg-black opacity-30 w-40 h-px",
        orientation == "vertical" ? "rotate-90" : "rotate-0",
      )}
      style={{ width: width }}
    />
  );
};

export default Divider;
