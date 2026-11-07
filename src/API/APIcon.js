import axios from 'axios';

// La URL base apunta al servidor Express local definido en las variables de entorno
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001';

export const normalizeGame = (game) => ({
  ...game,
  id: game.gameId ?? game.id ?? game._id,
  _id: game._id ?? game.id,
});

export const fetchData = async ({ category, search } = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/games`, {
      params: { ...(category && { category }), ...(search && { search }) },
    });

    if (Array.isArray(response.data)) {
      return response.data.map(normalizeGame);
    } else {
      throw new Error('La API no devolvió datos válidos.');
    }
  } catch (error) {
    console.error('Error al obtener los datos de la API:', error);
    return [];
  }
};

export const syncGamesAPI = async () => {
  const response = await axios.post(`${BASE_URL}/api/sync`);
  return response.data;
};

export const addGameAPI = async (gameData) => {
  const response = await axios.post(`${BASE_URL}/api/games`, gameData);
  return normalizeGame(response.data);
};

export const updateGameAPI = async (id, gameData) => {
  const response = await axios.put(`${BASE_URL}/api/games/${id}`, gameData);
  return normalizeGame(response.data);
};

export const deleteGameAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/api/games/${id}`);
  return response.data;
};


// Este APIcon corre en el navegador y se comunica con el backend, pide los get, post, put y delete