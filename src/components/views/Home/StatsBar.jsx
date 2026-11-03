const stats = [
  { valor: "10M+", label: "Jugadores activos" },
  { valor: "500+", label: "Juegos disponibles" },
  { valor: "50+", label: "Países" },
  { valor: "99.9%", label: "Actividad" },
];

export default function StatsBar() {
  return (
    <section className="w-full bg-surface-container-lowest border-y border-outline-variant">
      <div className="max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-xl grid grid-cols-2 lg:grid-cols-4 gap-lg">

        {
          stats.map((stat, index) => (
          <div key={index} className="text-center">
            <span className="block text-3xl md:text-4xl font-black text-primary drop-shadow-[0_0_12px_rgba(56,189,248,0.3)]">
              {stat.valor}
            </span>
            <span className="text-on-surface-variant text-sm mt-sm block">{stat.label}</span>
          </div>

        ))}
      </div>
    </section>
  );
}
