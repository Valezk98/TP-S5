import axios from 'axios';

export default async function getGamesFromAPI() {
  const response = await axios.get('https://www.freetogame.com/api/games');
  return response.data;
}

//este APIcon es para el server node, se comunica con la API real de freetogame y se usa para mandar todos los juegos de esa API a la db con el botón de sincronizar