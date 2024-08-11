import express from 'express';
import { submitSolution } from '../controllers/submissionController.js';

const router = express.Router();

// Route for submitting code and testing it
router.post('/submit', submitSolution);

export default router;
