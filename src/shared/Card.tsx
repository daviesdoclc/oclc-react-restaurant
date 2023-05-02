type CardProps = {
  children: React.ReactNode;
};

export function Card(props: CardProps) {
  return (
    <div
      className="flex flex-col rounded-lg bg-slate-800 mb-10 ml-10 px-5 py-5 border-solid border-2 border-gray-500"
      style={{ width: 350 }}
    >
      {props.children}
    </div>
  );
}
