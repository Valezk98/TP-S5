import ReseñasCard from './ReseñasCard';

const ReseñasArray = [
  { name: "Lucía Fernández", quote: "La mejor plataforma de gaming que probé. La calidad de streaming es impresionante.", avatar: "https://i.pravatar.cc/150?img=1", rating: 5 },
  { name: "Martín Rodríguez", quote: "Crossplay funciona perfecto. Juego con mis amigos sin importar la consola.", avatar: "https://i.pravatar.cc/150?img=3", rating: 5 },
  { name: "Camila Torres", quote: "El catálogo es enorme y los servidores nunca fallan. 100% recomendado.", avatar: "https://i.pravatar.cc/150?img=5", rating: 4 },
];

export default function Reseñas() {
  return (
    <section className="w-full max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-xl">
      <div className="text-center mb-xl">
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Lo que dicen nuestros gamers</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {ReseñasArray.map((reseña, index) => (
          <ReseñasCard key={index} {...reseña} />
        ))}
      </div>
    </section>
  );
}
