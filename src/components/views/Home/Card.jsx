import { useContext } from "react";
import { useCarritoContext } from "../../../context/CarritoContext";
import { GamesContext } from "../../../context/GamesContext";
import { formatearPrecio } from "../../../utils/formato";
import { STORE_ENABLED } from "../../../config/features";

export default function Card({ game, onEdit }) {
  const { setCheckoutItem, isInCart } = useCarritoContext();
  const { isFavorito, toggleFavorito, eliminarJuego } = useContext(GamesContext);

  const yaEnCarrito = STORE_ENABLED && isInCart(game.id);
  const esFav = isFavorito(game.id);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`¿Seguro que deseas eliminar "${game.title}"?`)) {
      eliminarJuego(game._id || game.id || game.gameId);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(game);
    }
  };

  return (
    <article
      onClick={() => STORE_ENABLED && setCheckoutItem(game)}
      className="bg-surface-container-high rounded-xl border border-outline-variant overflow-hidden group hover:-translate-y-2 hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col select-none"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={game.thumbnail}
          alt={game.title}
          loading="lazy"
        />

        {/* Botón de Favorito (Estrellita) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorito(game.id);
          }}
          aria-label={esFav ? "Quitar de favoritos" : "Agregar a favoritos"}
          title={esFav ? "Quitar de favoritos" : "Agregar a favoritos"}
          className="absolute top-2 left-2 z-10 p-1.5 rounded-full bg-slate-900/75 hover:bg-slate-900 backdrop-blur-sm border border-slate-700/60 transition-all text-amber-400 active:scale-90 cursor-pointer flex items-center justify-center shadow-md"
        >
          <svg
            className={`w-4 h-4 transition-transform ${esFav ? "fill-amber-400 scale-110 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" : "fill-none stroke-current"}`}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>

        {STORE_ENABLED && yaEnCarrito && (
          <span className="absolute top-2 right-2 bg-primary text-on-primary text-xs font-bold px-2 py-1 rounded-md shadow-md">
            En Carrito
          </span>
        )}
      </div>

      <div className="p-md flex-1 flex flex-col">
        <div className="flex gap-2 mb-sm flex-wrap">
          <span className="bg-primary-container/10 text-primary px-2 py-0.5 rounded-full text-xs font-label-sm border border-primary-container/20">
            {game.genre?.toUpperCase()}
          </span>
          <span className="bg-primary-container/10 text-primary px-2 py-0.5 rounded-full text-xs font-label-sm border border-primary-container/20">
            {game.platform?.toUpperCase()}
          </span>
        </div>

        <h3 className="font-bold text-lg mb-xs text-on-surface group-hover:text-primary transition-colors line-clamp-1">
          {game.title}
        </h3>

        <p className="text-on-surface-variant text-sm line-clamp-2 mb-4">
          {game.short_description}
        </p>

        {/* Sección de Precio y Botón de Compra si la tienda está habilitada */}
        {STORE_ENABLED && (
          <div className="mt-auto pt-3 border-t border-outline-variant/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block font-medium">
                Precio
              </span>
              <span className="text-base font-bold text-primary font-mono">
                {formatearPrecio(game.precio)}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCheckoutItem(game);
              }}
              className="bg-primary/10 hover:bg-primary text-primary hover:text-on-primary text-xs font-bold px-3 py-1.5 rounded-lg border border-primary/30 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {yaEnCarrito ? "Ver" : "Comprar"}
            </button>
          </div>
        )}

        {/* Acciones CRUD si la tienda está en modo catálogo (bypass) */}
        {!STORE_ENABLED && (
          <div className="mt-auto pt-3 border-t border-outline-variant/30 flex items-center justify-between gap-2">
            <a
              href={game.game_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
            >
              Jugar ↗
            </a>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleEdit}
                title="Editar juego"
                className="text-xs px-2.5 py-1 rounded bg-surface hover:bg-surface-bright text-on-surface border border-outline-variant/40 hover:border-primary/50 transition-colors cursor-pointer"
              >
                Editar
              </button>

              <button
                type="button"
                onClick={handleDelete}
                title="Eliminar juego"
                className="text-xs px-2.5 py-1 rounded bg-error-container/20 hover:bg-error-container/40 text-error border border-error/30 transition-colors cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
