import { useEffect } from "react"
import { useCarritoContext } from "../../context/CarritoContext"
import Buttons from "../UI/Buttons"
import { formatearPrecio } from "../../utils/formato"

export default function CarritoModal() {
  const {
    carrito,
    quitar,
    cambiarCantidad,
    vaciar,
    total,
    isCartOpen,
    setIsCartOpen,
  } = useCarritoContext()

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsCartOpen(false)
    }
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isCartOpen, setIsCartOpen])

  if (!isCartOpen) return null

  const handleFinalizarCompra = () => {
    alert("¡Gracias por tu compra! Tu orden ha sido procesada con éxito.")
    vaciar()
    setIsCartOpen(false)
  }

  return (
    <section
      className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsCartOpen(false)
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
    >
      <div className="bg-surface-container border border-outline-variant/40 rounded-2xl w-full max-w-155 overflow-hidden shadow-2xl my-auto transition-all">
        {/* Cabecera del Carrito */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 bg-surface-container-high">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 id="cart-modal-title" className="text-lg font-bold text-on-surface">
              Carrito de Compras
            </h2>
            <span className="bg-primary/10 text-primary text-xs font-mono px-2 py-0.5 rounded-full border border-primary/20">
              {carrito.length} {carrito.length === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="text-on-surface-variant hover:text-primary hover:bg-surface-bright rounded-lg w-8 h-8 flex items-center justify-center transition-colors text-lg"
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {/* Lista de productos */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {carrito.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4 text-on-surface-variant/40">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-1">Tu carrito está vacío</h3>
              <p className="text-on-surface-variant text-sm max-w-90 mb-6">
                Aún no has agregado juegos a tu colección. ¡Explora el catálogo y añade tus favoritos!
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="bg-primary hover:bg-primary-container text-on-primary font-bold px-6 py-2.5 rounded-xl shadow transition-all cursor-pointer text-sm"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {carrito.map((item) => {
                const titulo = item.title || item.nombre || "Juego"
                const imagen = item.thumbnail || item.imagen || ""
                const precio = item.precio || 0
                const stock = item.stock ?? 10

                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 bg-surface-container-high rounded-xl border border-outline-variant/30 transition-all hover:border-outline-variant/60"
                  >
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {imagen && (
                        <img
                          src={imagen}
                          alt={titulo}
                          className="w-16 h-16 object-cover rounded-lg border border-outline-variant/30 shrink-0"
                        />
                      )}
                      <div>
                        <h4 className="font-bold text-on-surface text-sm sm:text-base line-clamp-1">{titulo}</h4>
                        <p className="text-xs text-on-surface-variant font-mono">
                          Unitario: <span className="text-primary font-semibold">{formatearPrecio(precio)}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-outline-variant/20">
                      {/* Control de cantidad */}
                      <Buttons
                        cantidad={item.cantidad}
                        max={stock}
                        onChange={(nuevaCant) => cambiarCantidad(item.id, nuevaCant)}
                      />

                      {/* Subtotal del item */}
                      <div className="text-right min-w-32">
                        <span className="text-xs text-on-surface-variant block">Subtotal</span>
                        <span className="text-sm font-bold text-primary font-mono">
                          {formatearPrecio(precio * item.cantidad)}
                        </span>
                      </div>

                      {/* Botón quitar */}
                      <button
                        type="button"
                        onClick={() => quitar(item.id)}
                        className="text-on-surface-variant hover:text-error hover:bg-error-container/20 p-2 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar del carrito"
                        aria-label={`Eliminar ${titulo} del carrito`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer del Carrito con Totales y Botón Vaciar */}
        {carrito.length > 0 && (
          <div className="p-6 border-t border-outline-variant/30 bg-surface-container-high space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant font-medium">Total de la orden:</span>
              <span className="text-2xl font-black text-primary font-mono">
                {formatearPrecio(total)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Botón para vaciar el carrito */}
              <button
                type="button"
                onClick={vaciar}
                className="w-full sm:w-1/3 py-2.5 px-4 rounded-xl border border-error/40 text-error hover:bg-error-container/20 hover:border-error transition-all font-semibold text-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Vaciar Carrito
              </button>

              {/* Botón para finalizar compra */}
              <button
                type="button"
                onClick={handleFinalizarCompra}
                className="w-full sm:w-2/3 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold transition-all cursor-pointer shadow-lg hover:shadow-primary/20 active:scale-98 flex items-center justify-center gap-2"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
