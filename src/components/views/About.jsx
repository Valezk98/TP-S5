
import { Link } from "react-router-dom"

export default function About() {
  return (
    <main className="w-full max-w-360 mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-xl min-h-[80vh]">
      <h1 className="font-headline-md text-headline-md font-bold text-primary mb-md">
        About
      </h1>
      <p className="text-on-surface-variant font-body-md max-w-2xl">
        GLITCH_CORE es una tienda de videojuegos. Esta vista existe para probar
        la navegación con React Router

        <Link to="/" className="text-primary font-bold ml-1">
          Volver al inicio
        </Link>
      </p>
    </main>
  )
}
