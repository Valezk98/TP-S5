import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    gameId: {
      type: Number,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      default: 'game',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    short_description: {
      type: String,
      required: true,
      trim: true,
    },
    game_url: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    platform: {
      type: String,
      required: true,
      trim: true,
    },
    publisher: {
      type: String,
      default: '',
      trim: true,
    },
    developer: {
      type: String,
      default: '',
      trim: true,
    },
    release_date: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model('Game', gameSchema, 'Grupo-29');

