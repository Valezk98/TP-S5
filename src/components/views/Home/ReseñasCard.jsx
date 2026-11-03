export default function ReseñasCard({ name, quote, avatar, rating }) {
  return (
    <article className="bg-surface-container-high rounded-xl border border-outline-variant p-lg flex flex-col gap-md hover:-translate-y-1 hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all duration-300">
      <div className="flex items-center gap-md">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-primary-container"
        />
        <div>
          <h4 className="font-bold text-on-surface">{name}</h4>
          <div className="text-primary text-sm">
            {"★".repeat(rating)}{"☆".repeat(5 - rating)}
            </div>
        </div>
      </div>
      <p className="text-on-surface-variant text-sm italic leading-relaxed">
        "{quote}"
      </p>
    </article>
  );
}
