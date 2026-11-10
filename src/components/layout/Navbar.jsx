import { Link, NavLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useCarritoContext } from "../../context/CarritoContext";
import { STORE_ENABLED } from "../../config/features";

export default function Navbar() {
  const { carrito, setIsCartOpen } = useCarritoContext();
  const { pathname } = useLocation();
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav
      className="fixed top-0 w-full z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-none transition-all duration-300"
      id="main-nav"
    >
      <div className="flex items-center w-full px-margin-mobile md:px-margin-desktop py-md max-w-360 mx-auto gap-4">
        <Link
          className="font-display-lg-mobile text-display-lg-mobile font-black tracking-tighter text-primary shrink-0"
          to="/"
        >
          GLITCH_CORE
        </Link>

        <div className="flex items-center gap-4 ml-auto">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hidden sm:inline font-semibold text-sm transition-colors shrink-0 ${
                isActive ? "text-primary" : "text-on-surface-variant hover:text-primary"
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `hidden sm:inline font-semibold text-sm transition-colors shrink-0 ${
                isActive ? "text-primary" : "text-on-surface-variant hover:text-primary"
              }`
            }
          >
            Admin
          </NavLink>

          {!pathname.startsWith("/admin") && (
            <div className="hidden md:flex items-center">
              <SearchBar />
            </div>
          )}

          {/* Botón Carrito en Navbar (visible en escritorio y móvil) */}
          {STORE_ENABLED && (
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-surface-container-high hover:bg-surface-bright border border-outline-variant/40 hover:border-primary/50 text-on-surface hover:text-primary px-3.5 py-2 rounded-xl transition-all duration-300 cursor-pointer shrink-0 active:scale-95"
              aria-label="Abrir carrito de compras"
            >
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
              <span className="hidden sm:inline font-semibold text-sm">Carrito</span>

              {cantidadTotal > 0 && (
                <span className="bg-primary text-on-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center font-mono animate-in zoom-in duration-200">
                  {cantidadTotal}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}