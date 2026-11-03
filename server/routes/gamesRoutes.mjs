import { Router } from 'express';
import {
  getAllGamesCTRL,
  getGameByIdCTRL,
  addGameCTRL,
  updateGameByIdCTRL,
  deleteGameByIdCTRL,
  syncGamesCTRL,
} from '../controller/gamesController.mjs';

const router = Router();

router.get('/games', getAllGamesCTRL);
router.get('/games/:id', getGameByIdCTRL);
router.post('/games', addGameCTRL);
router.put('/games/:id', updateGameByIdCTRL);
router.delete('/games/:id', deleteGameByIdCTRL);
router.post('/sync', syncGamesCTRL);

export default router;

