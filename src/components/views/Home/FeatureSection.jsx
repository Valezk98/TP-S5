const features = [
  {
    icon: "☁️",
    title: "Juegos en la Nube",
    description: "Jugá desde cualquier dispositivo sin descargas ni instalaciones.",
  },
  {
    icon: "🔀",
    title: "Crossplay",
    description: "Jugá con amigos sin importar la plataforma que usen.",
  },
  {
    icon: "🌎",
    title: "Multijugador Masivo",
    description: "Servidores globales con latencia ultrabaja para competir al máximo nivel.",
  },
  {
    icon: "🕶️",
    title: "Modo VR",
    description: "Sumergite en mundos virtuales con soporte completo de realidad virtual.",
  },
];

export default function FeatureSection() {
  return (
    <section className="w-full max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-xl">
      <div className="text-center mb-xl">
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
          ¿Por qué GLITCH_CORE?
        </h2>
        <p className="text-on-surface-variant font-body-md mt-sm">
          La plataforma pensada para gamers exigentes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {features.map((feature, index) => (
          <article
            key={index}
            className="bg-surface-container-high rounded-xl border border-outline-variant p-lg flex flex-col items-center text-center gap-md hover:-translate-y-1 hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all duration-300"
          >
            <span className="text-4xl">{feature.icon}</span>
            <h3 className="font-bold text-on-surface">{feature.title}</h3>
            <p className="text-on-surface-variant text-sm">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
