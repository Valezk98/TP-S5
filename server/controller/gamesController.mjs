import {
  getAllGamesSRVC,
  getGameByIdSRVC,
  addGameSRVC,
  editGameByIdSRVC,
  deleteGameByIdSRVC,
  saveGamesSRVC,
} from '../service/gamesService.mjs';
import getGamesFromAPI from '../API/APIcon.mjs';

export async function getAllGamesCTRL(req, res) {
  try {
    const games = await getAllGamesSRVC(req.query);
    return res.json(games);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getGameByIdCTRL(req, res) {
  try {
    const game = await getGameByIdSRVC(req.params.id);
    if (!game) return res.status(404).json({ error: 'Juego no encontrado' });
    return res.json(game);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function addGameCTRL(req, res) {
  try {
    const created = await addGameSRVC({
      ...req.body,
      gameId: req.body.gameId ? Number(req.body.gameId) : Date.now(),
      type: 'game',
    });
    return res.status(201).json(created);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function updateGameByIdCTRL(req, res) {
  try {
    const updated = await editGameByIdSRVC(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Juego no encontrado' });
    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function deleteGameByIdCTRL(req, res) {
  try {
    const result = await deleteGameByIdSRVC(req.params.id);
    if (!result) return res.status(404).json({ error: 'Juego no encontrado' });
    return res.json({ message: 'Juego eliminado', result });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function syncGamesCTRL(req, res) {
  try {
    const apiGames = await getGamesFromAPI();
    if (!Array.isArray(apiGames)) {
      return res.status(502).json({ error: 'La API externa no devolvió una lista válida' });
    }

    const mappedGames = apiGames.map((g) => ({
      gameId: g.id, type: 'game',
      title: g.title, thumbnail: g.thumbnail,
      short_description: g.short_description, game_url: g.game_url,
      genre: g.genre, platform: g.platform,
      publisher: g.publisher || '', developer: g.developer || '',
      release_date: g.release_date || '',
    }));

    const result = await saveGamesSRVC(mappedGames);
    return res.json({ message: 'Sincronización completada', result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
