const ITEMS = [
  "Service auto · Detailing",
  "Pensiuni · Restaurante",
  "Saloane · Clinici",
  "Meseriași · Construcții",
  "Comerț local",
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="relative py-8 overflow-hidden border-y border-white/8">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent z-10" />
      <div className="flex gap-10 marquee-track w-max">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-muted text-[14px] font-medium whitespace-nowrap flex items-center gap-2"
          >
            <span className="w-1 h-1 rounded-full bg-white/20" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
