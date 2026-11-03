import gamesRepository from '../repository/gamesRepository.mjs';

export async function getAllGamesSRVC({ category, search } = {}) {
  return await gamesRepository.getAllGames({ category, search });
}

export async function getGameByIdSRVC(id) {
  return await gamesRepository.getGameById(id);
}

export async function addGameSRVC(gameData) {
  return await gamesRepository.addGame(gameData);
}

export async function editGameByIdSRVC(id, gameData) {
  return await gamesRepository.editGameById(id, gameData);
}

export async function deleteGameByIdSRVC(id) {
  return await gamesRepository.deleteGameById(id);
}

export async function saveGamesSRVC(games) {
  return await gamesRepository.saveGames(games);
}
