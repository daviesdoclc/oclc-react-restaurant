import clsx from "clsx";

type CardProps = {
  style?: object;
  /** CSS class applied to the root div */
  className?: string;
  children: React.ReactNode;
};

export function Card(props: CardProps) {
  return (
    <div
      className={clsx(
        props.className,
        "flex flex-col rounded-lg bg-slate-50 border-solid border-2 border-black"
      )}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
