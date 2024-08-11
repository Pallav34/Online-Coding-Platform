import express from "express";
import { createContest, getAllContests, getContestById } from "../controllers/contestController.js";

const router = express.Router();

router.post('/createContest',createContest);
router.get('/contests', getAllContests);
router.get('/contests/:id', getContestById);

export default router;