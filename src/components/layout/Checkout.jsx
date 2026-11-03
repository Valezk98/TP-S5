import { useState, useEffect } from "react"
import { useCarritoContext } from "../../context/CarritoContext"
import { useForm } from "react-hook-form"
import Buttons from "../UI/Buttons"
import { formatearPrecio } from "../../utils/formato"

export default function Checkout({ item: propItem, onConfirmado, onClose }) {
  const [cantidad, setCantidad] = useState(1)
  const { agregar, isInCart, checkoutItem, setCheckoutItem } = useCarritoContext()

  const currentItem = propItem || checkoutItem

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { metodoEnvio: "retiro" },
  })

  // Cerrar modal al presionar Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleCerrar()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  })

  if (!currentItem) return null

  const titulo = currentItem.title || currentItem.nombre || "Juego"
  const imagen = currentItem.thumbnail || currentItem.imagen || ""
  const genero = currentItem.genre || currentItem.genero || "General"
  const anio = currentItem.release_date ? currentItem.release_date.substring(0, 4) : (currentItem.año || "")
  const precio = currentItem.precio || 0
  const stock = currentItem.stock ?? 5
  const yaAgregado = isInCart(currentItem.id)

  // eslint-disable-next-line react-hooks/incompatible-library
  const metodoEnvio = watch("metodoEnvio")

  const handleCerrar = () => {
    if (onClose) onClose()
    setCheckoutItem(null)
  }

  const inputClass =
    "w-full bg-surface-container-lowest border border-outline-variant/40 text-on-surface rounded-lg px-4 py-2 placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"

  const a11y = (campo) => ({
    id: campo,
    "aria-invalid": !!errors[campo],
    "aria-describedby": errors[campo] ? `error-${campo}` : undefined,
  })

  const onSubmit = (datos) => {
    const datosCompra = {
      ...datos,
      direccion: datos.metodoEnvio === "domicilio" ? datos.direccion : null,
      juego: titulo,
      cantidad,
      total: precio * cantidad,
    }

    if (!yaAgregado) {
      agregar(
        {
          ...currentItem,
          id: currentItem.id,
          title: titulo,
          nombre: titulo,
          thumbnail: imagen,
          imagen: imagen,
          precio,
          stock,
          genre: genero,
        },
        cantidad
      )
      if (onConfirmado) onConfirmado(datosCompra)
    }

    handleCerrar()
  }

  return (
    <section
      className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCerrar()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-surface-container border border-outline-variant/40 rounded-2xl w-full max-w-135 overflow-hidden shadow-2xl my-auto transition-all"
      >
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 bg-surface-container-high">
          <h2 id="checkout-modal-title" className="text-lg font-bold text-primary tracking-wide">
            Checkout de Compra
          </h2>
          <button
            type="button"
            onClick={handleCerrar}
            className="text-on-surface-variant hover:text-primary hover:bg-surface-bright rounded-lg w-8 h-8 flex items-center justify-center transition-colors text-lg"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* Contenido con scroll */}
        <div className="p-6 flex flex-col gap-4 max-h-[75vh] overflow-y-auto">
          {/* Card resumen del item */}
          <div className="flex flex-col sm:flex-row gap-4 bg-surface-container-high p-3 rounded-xl border border-outline-variant/30">
            {imagen && (
              <img
                src={imagen}
                alt={titulo}
                className="w-full sm:w-36 h-28 object-cover rounded-lg border border-outline-variant/20"
              />
            )}
            <div className="flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="bg-primary-container/10 text-primary px-2 py-0.5 rounded text-xs font-mono border border-primary-container/20">
                    {genero.toUpperCase()}
                  </span>
                  {anio && (
                    <span className="text-on-surface-variant text-xs font-mono">
                      {anio}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-on-surface line-clamp-1">{titulo}</h3>
              </div>
              <p className="text-xl font-bold text-primary font-mono mt-2">
                {formatearPrecio(precio)}
              </p>
            </div>
          </div>

          {/* Selector de cantidad y Subtotal */}
          <div className="flex items-center justify-between bg-surface-container-lowest/60 p-3 rounded-xl border border-outline-variant/20 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-sm text-on-surface-variant font-medium">Cantidad:</span>
              <Buttons cantidad={cantidad} max={stock} onChange={setCantidad} />
            </div>
            <div className="text-right">
              <span className="text-xs text-on-surface-variant block">Stock disp: {stock}</span>
              <p className="font-semibold text-sm text-on-surface">
                Total: <span className="text-primary font-bold font-mono text-base">{formatearPrecio(precio * cantidad)}</span>
              </p>
            </div>
          </div>

          {/* Formulario con React Hook Form */}
          <div className="space-y-3 pt-2">
            <div>
              <label htmlFor="nombre" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">
                Nombre Completo *
              </label>
              <input
                {...a11y("nombre")}
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                  minLength: { value: 3, message: "Al menos 3 caracteres" },
                })}
                className={inputClass}
                type="text"
                placeholder="Tu nombre completo"
              />
              {errors.nombre?.message && (
                <p id="error-nombre" role="alert" className="text-error text-xs mt-1">
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">
                Correo Electrónico *
              </label>
              <input
                {...a11y("email")}
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "Ingresá un email válido" },
                })}
                className={inputClass}
                type="email"
                placeholder="nombre@ejemplo.com"
              />
              {errors.email?.message && (
                <p id="error-email" role="alert" className="text-error text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="telefono" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">
                Teléfono de Contacto *
              </label>
              <input
                {...a11y("telefono")}
                {...register("telefono", {
                  required: "El teléfono es obligatorio",
                  pattern: { value: /^\d+$/, message: "Solo números permitidos" },
                  minLength: { value: 8, message: "Mínimo 8 dígitos" },
                })}
                className={inputClass}
                type="tel"
                inputMode="numeric"
                placeholder="Tu número de teléfono"
              />
              {errors.telefono?.message && (
                <p id="error-telefono" role="alert" className="text-error text-xs mt-1">
                  {errors.telefono.message}
                </p>
              )}
            </div>

            <div>
              <span id="metodoEnvio-label" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">
                Método de Entrega *
              </span>
              <div className="flex gap-4 mt-1" role="radiogroup" aria-labelledby="metodoEnvio-label">
                <label className="flex items-center gap-2 text-sm text-on-surface cursor-pointer">
                  <input
                    type="radio"
                    value="retiro"
                    aria-invalid={!!errors.metodoEnvio}
                    aria-describedby={errors.metodoEnvio ? "error-metodoEnvio" : undefined}
                    {...register("metodoEnvio", { required: "Elegí un método de entrega" })}
                    className="accent-primary"
                  />
                  Digital
                </label>
                <label className="flex items-center gap-2 text-sm text-on-surface cursor-pointer">
                  <input
                    type="radio"
                    value="domicilio"
                    aria-invalid={!!errors.metodoEnvio}
                    aria-describedby={errors.metodoEnvio ? "error-metodoEnvio" : undefined}
                    {...register("metodoEnvio", { required: "Elegí un método de entrega" })}
                    className="accent-primary"
                  />
                  Envío a Domicilio
                </label>
              </div>
              {errors.metodoEnvio?.message && (
                <p id="error-metodoEnvio" role="alert" className="text-error text-xs mt-1">
                  {errors.metodoEnvio.message}
                </p>
              )}
            </div>

            {metodoEnvio === "domicilio" && (
              <div>
                <label htmlFor="direccion" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">
                  Dirección de Envío *
                </label>
                <input
                  {...a11y("direccion")}
                  {...register("direccion", {
                    validate: (valor) =>
                      Boolean(valor?.trim()) || "La dirección es obligatoria para envío a domicilio",
                  })}
                  className={inputClass}
                  type="text"
                  placeholder="Calle, número, piso/depto, ciudad"
                />
                {errors.direccion?.message && (
                  <p id="error-direccion" role="alert" className="text-error text-xs mt-1">
                    {errors.direccion.message}
                  </p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="notas" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">
                Notas adicionales (Opcional)
              </label>
              <textarea
                {...a11y("notas")}
                {...register("notas", {
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                })}
                className={inputClass}
                rows={2}
                placeholder="Instrucciones para la entrega o mensaje..."
              />
              {errors.notas?.message && (
                <p id="error-notas" role="alert" className="text-error text-xs mt-1">
                  {errors.notas.message}
                </p>
              )}
            </div>

            <div className="pt-1">
              <label htmlFor="terminos" className="flex items-center gap-2 text-xs text-on-surface-variant cursor-pointer">
                <input
                  {...a11y("terminos")}
                  {...register("terminos", { required: "Debés aceptar los términos y condiciones" })}
                  type="checkbox"
                  className="accent-primary w-4 h-4 cursor-pointer rounded"
                />
                <span>Acepto los términos y condiciones de compra de GLITCH_CORE</span>
              </label>
              {errors.terminos?.message && (
                <p id="error-terminos" role="alert" className="text-error text-xs mt-1">
                  {errors.terminos.message}
                </p>
              )}
            </div>
          </div>

          {/* Botón de acción */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={yaAgregado}
              className={
                yaAgregado
                  ? "w-full bg-surface-container-highest text-on-surface-variant font-bold py-3 rounded-xl border border-outline-variant/40 cursor-not-allowed text-center transition-all"
                  : "w-full bg-primary hover:bg-primary-container text-on-primary font-bold py-3 rounded-xl shadow-lg hover:shadow-primary/20 active:scale-98 transition-all cursor-pointer text-center"
              }
            >
              {yaAgregado ? "✓ Ya está en tu carrito" : "Agregar al Carrito"}
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}