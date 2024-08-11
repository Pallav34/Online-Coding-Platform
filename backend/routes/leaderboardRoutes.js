import express from 'express';
import {
  createLeaderboardEntry,
  getAllLeaderboardEntries,
  updateLeaderboardEntry,
  
} from '../controllers/leaderboardController.js';

const router = express.Router();

router.post('/', createLeaderboardEntry);
router.get('/', getAllLeaderboardEntries);
router.put('/', updateLeaderboardEntry);

export default router;
