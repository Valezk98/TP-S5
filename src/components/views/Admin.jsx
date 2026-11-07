import { useState, useEffect, useContext } from 'react';
import { GamesContext } from '../../context/GamesContext';
import Paginacion from './Home/utils/Paginacion';
import GameModalForm from './Home/GameModalForm';

const ITEMS_POR_PAGINA = 12;

const getPageFromURL = () => {
  const p = parseInt(new URLSearchParams(window.location.search).get('page'), 10);
  return !isNaN(p) && p > 0 ? p : 1;
};

export default function Admin() {
  const {
    catalogo,
    loadingCatalogo,
    error,
    agregarJuego,
    actualizarJuego,
    eliminarJuego,
  } = useContext(GamesContext);

  const [page, setPage] = useState(getPageFromURL);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameToEdit, setGameToEdit] = useState(null);

  useEffect(() => {
    const onPop = () => setPage(getPageFromURL());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const totalPaginas = Math.max(1, Math.ceil(catalogo.length / ITEMS_POR_PAGINA));
  const paginaActual = loadingCatalogo ? page : Math.min(Math.max(1, page), totalPaginas);

  const indiceInicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const displayedGames = catalogo.slice(indiceInicio, indiceInicio + ITEMS_POR_PAGINA);

  const cambiarPagina = (nuevaPagina) => {
    const p = Math.max(1, Math.min(nuevaPagina, totalPaginas));
    setPage(p);
    const params = new URLSearchParams(window.location.search);
    params.set('page', p);
    window.history.pushState(null, '', `${window.location.pathname}?${params.toString()}`);
    document.getElementById('admin')?.scrollIntoView({ behavior: 'smooth' });
  };

  const abrirCrear = () => {
    setGameToEdit(null);
    setIsModalOpen(true);
  };

  const abrirEditar = (game) => {
    setGameToEdit(game);
    setIsModalOpen(true);
  };

  const handleEliminar = async (game) => {
    if (window.confirm(`¿Seguro que deseas eliminar "${game.title}"?`)) {
      await eliminarJuego(game._id || game.id || game.gameId);
    }
  };

  const handleSubmit = async (data) => {
    if (gameToEdit) {
      await actualizarJuego(gameToEdit._id || gameToEdit.id || gameToEdit.gameId, data);
    } else {
      await agregarJuego(data);
    }
  };

  return (
    <main
      id="admin"
      className="w-full max-w-360 mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-xl min-h-[80vh]"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-lg">
        <div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary mb-1">
            Panel de Administración
          </h1>
          <p className="text-on-surface-variant font-body-md">
            Gestioná el catálogo ({catalogo.length} juegos en total).
          </p>
        </div>

        <button
          type="button"
          onClick={abrirCrear}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface border border-outline-variant/50 hover:border-primary/50 text-xs font-bold transition-all active:scale-95 cursor-pointer"
        >
          Nuevo Juego
        </button>
      </div>

      {loadingCatalogo ? (
        <div className="flex flex-col items-center justify-center py-xl">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-primary font-bold animate-pulse font-label-sm tracking-widest">
            CARGANDO...
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-xl bg-error-container/20 rounded-xl border border-error/50 p-6">
          <p className="text-error font-bold">{error}</p>
        </div>
      ) : displayedGames.length === 0 ? (
        <div className="text-center py-xl">
          <p className="text-on-surface-variant font-bold text-lg">
            No hay juegos en el catálogo.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-outline-variant/40 bg-surface-container">
          <table className="w-full min-w-215 text-sm">
            <thead className="bg-surface-container-high text-on-surface-variant">
              <tr>
                <th className="text-left font-semibold px-4 py-3">Juego</th>
                <th className="text-left font-semibold px-4 py-3">Género</th>
                <th className="text-left font-semibold px-4 py-3">Plataforma</th>
                <th className="text-left font-semibold px-4 py-3">Desarrollador / Publisher</th>
                <th className="text-left font-semibold px-4 py-3">Lanzamiento</th>
                <th className="text-right font-semibold px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {displayedGames.map((game) => (
                <tr
                  key={game._id || game.id || game.gameId}
                  className="hover:bg-surface-container-high/60 transition-colors align-middle"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        loading="lazy"
                        className="w-16 h-10 object-cover rounded-md border border-outline-variant/40 shrink-0"
                      />
                      <div className="min-w-0">
                        <a
                          href={game.game_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-on-surface hover:text-primary line-clamp-1"
                        >
                          {game.title}
                        </a>
                        <p className="text-xs text-on-surface-variant line-clamp-1 max-w-90">
                          {game.short_description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-primary-container/10 text-primary px-2 py-0.5 rounded-full text-xs border border-primary-container/20">
                      {game.genre}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">{game.platform}</td>
                  <td className="px-4 py-3 text-on-surface-variant">
                    <p>{game.developer || '—'}</p>
                    <p className="text-xs">{game.publisher || '—'}</p>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant font-mono text-xs">
                    {game.release_date || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => abrirEditar(game)}
                        title="Editar juego"
                        className="text-xs px-2.5 py-1 rounded bg-surface hover:bg-surface-bright text-on-surface border border-outline-variant/40 hover:border-primary/50 transition-colors cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEliminar(game)}
                        title="Eliminar juego"
                        className="text-xs px-2.5 py-1 rounded bg-error-container/20 hover:bg-error-container/40 text-error border border-error/30 transition-colors cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loadingCatalogo && !error && (
        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambiarPagina={cambiarPagina}
        />
      )}

      <GameModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gameToEdit={gameToEdit}
        onSubmitGame={handleSubmit}
      />
    </main>
  );
}
