import { useState, useEffect, useContext } from 'react';
import { GamesContext } from '../../../context/GamesContext';
import { filtrarJuegos } from '../../../utils/filtros';
import Card from './Card';
import Filtros from './utils/Filtros';
import Paginacion from './utils/Paginacion';

const ITEMS_POR_PAGINA = 12;

const getPageFromURL = () => {
  const p = parseInt(new URLSearchParams(window.location.search).get('page'), 10);
  return !isNaN(p) && p > 0 ? p : 1;
};

export default function Content() {
  const {
    games, loading, error,
    activeSearchQuery, setActiveSearchQuery,
    filtroOrden, favoritos,
  } = useContext(GamesContext);

  const [showGames, setShowGames] = useState(true);
  const [page, setPage] = useState(getPageFromURL);

  // Navegación atrás/adelante
  useEffect(() => {
    const onPop = () => setPage(getPageFromURL());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Filtrado y ordenamiento (la búsqueda ya la resuelve la API)
  const result = filtrarJuegos(games, { orden: filtroOrden, favoritos });

  // Paginación
  const totalPaginas = Math.max(1, Math.ceil(result.length / ITEMS_POR_PAGINA));
  const paginaActual = loading ? page : Math.min(Math.max(1, page), totalPaginas);

  // Volver a pág. 1 cuando cambian los filtros o la búsqueda
  useEffect(() => {
    setPage(1);
  }, [activeSearchQuery, filtroOrden]);

  // Corregir página fuera de rango
  useEffect(() => {
    if (loading) return;
    const safe = Math.min(Math.max(1, page), totalPaginas);
    if (safe !== page) setPage(safe);
  }, [loading, totalPaginas]); // eslint-disable-line react-hooks/exhaustive-deps

  const cambiarPagina = (nuevaPagina) => {
    const p = Math.max(1, Math.min(nuevaPagina, totalPaginas));
    setPage(p);
    const params = new URLSearchParams(window.location.search);
    params.set('page', p);
    window.history.pushState(null, '', `${window.location.pathname}?${params.toString()}`);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const indiceInicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const displayedGames = result.slice(indiceInicio, indiceInicio + ITEMS_POR_PAGINA);

  return (
    <main className="w-full max-w-360 mx-auto px-margin-mobile md:px-margin-desktop py-xl min-h-auto" id="catalog">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-lg gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
              {activeSearchQuery ? `Resultados para "${activeSearchQuery}"` : "Catálogo"}
            </h2>
          </div>

          <p className="text-on-surface-variant font-body-md mt-sm">
            {activeSearchQuery ? `Se encontraron ${result.length} juegos.` : `Explora la colección (${result.length} juegos en total).`}
          </p>

          <div className="flex gap-4 items-center mt-4 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer text-on-surface text-sm">
              <input type="checkbox" checked={showGames} onChange={(e) => setShowGames(e.target.checked)} className="accent-primary w-4 h-4 cursor-pointer" />
              Mostrar/Ocultar juegos
            </label>
            {activeSearchQuery && (
              <button onClick={() => setActiveSearchQuery('')} className="text-primary hover:text-on-surface transition-colors font-bold text-sm border border-primary/30 px-3 py-1 rounded-full cursor-pointer">
                Volver al inicio
              </button>
            )}
          </div>
        </div>
        <Filtros />
      </div>

      {showGames && (
        <>
          <div id="cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter transition-all">
            {loading && (
              <div className="col-span-full flex flex-col items-center justify-center py-xl">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-primary font-bold animate-pulse font-label-sm tracking-widest">CARGANDO...</p>
              </div>
            )}

            {error && (
              <div className="col-span-full text-center py-xl bg-error-container/20 rounded-xl border border-error/50 p-6">
                <p className="text-error font-bold">{error}</p>
              </div>
            )}

            {!loading && !error && displayedGames.length === 0 && (
              <div className="col-span-full text-center py-xl">
                <p className="text-on-surface-variant font-bold text-lg">
                  {filtroOrden === 'favoritos'
                    ? 'Aún no tienes juegos favoritos. Haz clic en ⭐ para agregar.'
                    : 'No se encontraron juegos con los filtros seleccionados.'}
                </p>
              </div>
            )}

            {!loading && !error && displayedGames.map((game) => (
              <Card key={game._id || game.id} game={game} />
            ))}
          </div>

          {!loading && !error && (
            <Paginacion paginaActual={paginaActual} totalPaginas={totalPaginas} onCambiarPagina={cambiarPagina} />
          )}
        </>
      )}
    </main>
  );
}
