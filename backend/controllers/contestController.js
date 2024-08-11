import CodingContest from '../models/ContestModels/CodingContest.js';
import Question from '../models/QuestionModels/Question.js';

export const createContest = async (req, res) => {
  try {
    const { title, timeLimit, questionIds, totalMarks } = req.body;

    if (!title || !timeLimit || !Array.isArray(questionIds) || !totalMarks) {
      return res.status(400).json({ error: 'Title, time limit, question IDs, and total marks are required' });
    }

    const questions = await Question.find({ '_id': { $in: questionIds } });
    if (questions.length !== questionIds.length) {
      return res.status(400).json({ error: 'One or more provided question IDs are invalid' });
    }

    const newContest = new CodingContest({
      title,
      timeLimit,
      questions: questionIds,
      totalMarks,
    });

    const savedContest = await newContest.save();
    res.status(201).json(savedContest);
  } catch (error) {
    console.error('Error creating contest:', error);
    res.status(500).json({ message: 'Error creating contest' });
  }
};

export const getAllContests = async (req, res) => {
  try {
    const contests = await CodingContest.find().populate('questions');
    res.status(200).json(contests);
  } catch (error) {
    console.error('Error fetching contests:', error);
    res.status(500).json({ message: 'Error fetching contests' });
  }
};

export const getContestById = async (req, res) => {
  try {
    const { id } = req.params;
    const contest = await CodingContest.findById(id).populate('questions');
    
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }

    res.status(200).json(contest);
  } catch (error) {
    console.error('Error fetching contest:', error);
    res.status(500).json({ message: 'Error fetching contest' });
  }
};
