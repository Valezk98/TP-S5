import Game from '../model/gameModel.mjs';

const buildFilter = (id) => ({ _id: id, type: 'game' });

class GamesRepository {
  async getAllGames({ category, search } = {}) {
    const filter = { type: 'game' };
    if (category) filter.genre = new RegExp(category.replace(/-/g, '[- ]?'), 'i');
    if (search) filter.title = new RegExp(search, 'i');
    return Game.find(filter);
  }

  async getGameById(id) {
    return Game.findOne(buildFilter(id));
  }

  async addGame(data) {
    return Game.create({ ...data, type: 'game' });
  }

  async editGameById(id, data) {
    return Game.findOneAndUpdate(buildFilter(id), { ...data, type: 'game' }, { new: true, runValidators: true });
  }

  async deleteGameById(id) {
    return Game.findOneAndDelete(buildFilter(id));
  }

  async saveGames(games) {
    if (!games?.length) return { upsertedCount: 0 };
    const ops = games.map((g) => ({
      updateOne: {
        filter: { gameId: g.gameId, type: 'game' },
        update: { $setOnInsert: { ...g, type: 'game' } },
        upsert: true,
      },
    }));
    return Game.bulkWrite(ops);
  }
}

export default new GamesRepository();
