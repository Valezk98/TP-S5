import { createContext, useState, useEffect, useCallback } from 'react';
import { fetchData, syncGamesAPI, addGameAPI, updateGameAPI, deleteGameAPI } from '../API/APIcon';
import useLocalStorage from '../hooks/useLocalStorage';
import { STORE_ENABLED } from '../config/features';
import { obtenerGeneros, esTagValido } from '../config/genres';

const agregarDatosTienda = (games) =>
  STORE_ENABLED
    ? games.map((g) => ({
        ...g,
        precio: (10 + ((Number(g.id || 1) * 37 + 17) % 51)) * 1000,
        stock: ((Number(g.id || 1) * 13 + 7) % 10) + 3,
      }))
    : games;

const getGeneroFromURL = () => {
  const tag = new URLSearchParams(window.location.search).get('genero') || '';
  return esTagValido(tag) ? tag : '';
};

// eslint-disable-next-line react-refresh/only-export-components
export const GamesContext = createContext();

export const GamesProvider = ({ children }) => {
  const [catalogo, setCatalogo] = useState([]);
  const [juegosGenero, setJuegosGenero] = useState([]);
  const [loadingCatalogo, setLoadingCatalogo] = useState(true);
  const [loadingGenero, setLoadingGenero] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState(null);
  const [activeSearch, setActiveSearch] = useState('');
  const [filtroOrden, setFiltroOrden] = useState('');
  const [filtroGenero, setFiltroGenero] = useState(getGeneroFromURL);
  const [favoritos, setFavoritos] = useLocalStorage('GLITCH_CORE:favoritos', []);

  const generos = obtenerGeneros(catalogo);
  const games = (filtroGenero || activeSearch) ? juegosGenero : catalogo;
  const loading = loadingCatalogo || ((filtroGenero || activeSearch) ? loadingGenero : false);

  const toggleFavorito = (id) =>
    setFavoritos((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  const isFavorito = (id) => favoritos.includes(id);

  // Cargar catálogo completo
  const cargarCatalogo = useCallback(async () => {
    setLoadingCatalogo(true);
    setError(null);
    const data = await fetchData();
    if (data.length === 0) {
      setCatalogo([]);
      setError('No hay juegos en la base de datos. Sincronizá el catálogo desde el Panel de Administración.');
    } else {
      setCatalogo(agregarDatosTienda(data));
    }
    setLoadingCatalogo(false);
  }, []);

  // 1. Carga inicial
  useEffect(() => { cargarCatalogo(); }, [cargarCatalogo]);

  // 2. Filtro por género y/o búsqueda → pega a la API
  useEffect(() => {
    if (!filtroGenero && !activeSearch) { setJuegosGenero([]); return; }
    if (catalogo.length === 0) return;

    const cargar = async () => {
      setLoadingGenero(true);
      setError(null);
      const data = await fetchData({ category: filtroGenero, search: activeSearch });
      setJuegosGenero(data.length ? agregarDatosTienda(data) : []);
      setLoadingGenero(false);
    };
    cargar();
  }, [catalogo.length, filtroGenero, activeSearch]);

  // 3. Sincronizar género en la URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    filtroGenero ? params.set('genero', filtroGenero) : params.delete('genero');
    const q = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${q ? `?${q}` : ''}`);
  }, [filtroGenero]);

  // 4. Navegación atrás/adelante
  useEffect(() => {
    const onPop = () => { setError(null); setFiltroGenero(getGeneroFromURL()); };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // CRUD & Sync
  const sincronizar = async () => {
    setIsSyncing(true);
    try { const r = await syncGamesAPI(); await cargarCatalogo(); return r; }
    catch (e) { console.error('Error en sync:', e); throw e; }
    finally { setIsSyncing(false); }
  };

  const matchId = (g, id) => g.id === id || g._id === id || g.gameId === id;

  const agregarJuego = async (data) => {
    const nuevo = await addGameAPI(data);
    setError(null);
    setCatalogo((prev) => [nuevo, ...prev]);
    return nuevo;
  };

  const actualizarJuego = async (id, data) => {
    const act = await updateGameAPI(id, data);
    const updater = (prev) => prev.map((g) => matchId(g, id) ? { ...g, ...act } : g);
    setCatalogo(updater);
    setJuegosGenero(updater);
    return act;
  };

  const eliminarJuego = async (id) => {
    await deleteGameAPI(id);
    const remover = (prev) => prev.filter((g) => !matchId(g, id));
    setCatalogo(remover);
    setJuegosGenero(remover);
  };

  return (
    <GamesContext.Provider
      value={{
        games, loading, error,
        catalogo, loadingCatalogo,
        activeSearch, setActiveSearch,
        activeSearchQuery: activeSearch, setActiveSearchQuery: setActiveSearch,
        filtroOrden, setFiltroOrden,
        filtroGenero, setFiltroGenero: (tag) => { setError(null); setFiltroGenero(tag); },
        generos, favoritos, toggleFavorito, isFavorito,
        sincronizar, isSyncing,
        agregarJuego, actualizarJuego, eliminarJuego,
        refrescarCatalogo: cargarCatalogo,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
