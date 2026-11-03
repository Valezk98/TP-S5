export default function Newsletter() {
  return (
    <section className="w-full max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-xl">
      <div className="bg-surface-container-high rounded-2xl border border-outline-variant p-xl md:p-2xl text-center flex flex-col items-center gap-lg">
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
          No te pierdas nada
        </h2>

        <p className="text-on-surface-variant font-body-md ">
          Suscribite al newsletter y recibí las últimas novedades, ofertas exclusivas y acceso anticipado a nuevos lanzamientos.
        </p>

        <div className="flex flex-col w-full my-auto gap-sm">

          <input
            type="email"
            placeholder="tu@email.com"
            className="flex-1 bg-surface-container-highest border border-outline-variant rounded-full px-5 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
          />

          <button className="bg-primary-container text-on-primary-container px-6 py-3 rounded-full font-bold hover:drop-shadow-[0_0_24px_rgba(56,189,248,0.6)] transition-all hover:scale-105 active:scale-95 max-w-auto mx-auto">
            Suscribirme
          </button>

        </div>
      </div>
    </section>
  );
}
