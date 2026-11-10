
import { Link } from "react-router-dom"

export default function About() {
  return (
    <main className="w-full max-w-360 mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-xl min-h-[80vh]">
      <h1 className="font-headline-md text-headline-md font-bold text-primary mb-md">
        About
      </h1>
      <p className="text-on-surface-variant font-body-md max-w-2xl">
        GLITCH_CORE es una catálogo de videojuegos que ofrece una amplia variedad de títulos para diferentes plataformas. Nuestro objetivo es proporcionar a los jugadores una experiencia única y emocionante al explorar el mundo de los videojuegos. Desde los clásicos hasta los lanzamientos más recientes, GLITCH_CORE tiene algo para todos los gustos.

        <Link to="/" className="text-primary font-bold ml-1">
          Volver al inicio
        </Link>
      </p>
    </main>
  )
}
