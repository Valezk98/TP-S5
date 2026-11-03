import { useContext } from 'react';
import { GamesContext } from '../../../../context/GamesContext';
import { STORE_ENABLED } from '../../../../config/features';

export default function Filtros() {
  const { filtroOrden, setFiltroOrden, favoritos, filtroGenero, setFiltroGenero, generos } = useContext(GamesContext);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <label
        htmlFor="filtro-genero"
        className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:flex items-center gap-1.5"
      >
        <svg
          className="w-4 h-4 text-sky-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filtrar por:
      </label>

      <div className="relative">
        <select
          id="filtro-genero"
          aria-label="Filtrar por género"
          value={filtroGenero}
          onChange={(e) => setFiltroGenero(e.target.value)}
          className="bg-slate-900 border text-sky-100 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-sky-400 transition-all cursor-pointer appearance-none"
        >
          <option value="">Todos los géneros</option>
          {generos.map((genero) => (
            <option key={genero.value} value={genero.value}>
              {genero.label}
            </option>
          ))}
        </select>

        {/* Flecha select */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-sky-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="relative">
        <select
          id="filtro-orden"
          aria-label="Ordenar juegos"
          value={filtroOrden}
          onChange={(e) => setFiltroOrden(e.target.value)}
          className="bg-slate-900 border text-sky-100 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-sky-400 transition-all cursor-pointer appearance-none"
        >
          <option value="">Por defecto</option>
          <option value="favoritos">⭐ Favoritos ({favoritos ? favoritos.length : 0})</option>
          <option value="recientes">Más recientes</option>
          <option value="antiguos">Más antiguos</option>
          {STORE_ENABLED && (
            <>
              <option value="mayor-precio">Mayor precio</option>
              <option value="menor-precio">Menor precio</option>
            </>
          )}
        </select>

        {/* Flecha select */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-sky-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
