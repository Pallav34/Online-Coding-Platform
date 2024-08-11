import express from 'express';
import { createQuestion, getAllQuestions, getQuestion } from '../controllers/questionController.js';

const router = express.Router();


router.post('/questions', createQuestion);
router.get('/questions',getAllQuestions);
router.get('/questions/:id',getQuestion);
export default router;
