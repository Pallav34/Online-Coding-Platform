import mongoose from "mongoose";
import CodeSnippet from "../models/QuestionModels/CodeSnippet.js";
import Question from "../models/QuestionModels/Question.js";
import TestCases from "../models/QuestionModels/TestCases.js";

// Create a new question with code snippet and test cases
export const createQuestion = async (req, res) => {
    try {
        const { level, title, content, code, testcases } = req.body;

        // Validate input
        if (!level || !title || !content || !code || !testcases || !Array.isArray(testcases)) {
            return res.status(400).json({ error: 'All fields are required and testcases must be an array' });
        }

        // Create CodeSnippet
        const codeSnippet = new CodeSnippet({
            lang: 'java', // Adjust if needed
            code
        });
        await codeSnippet.save();

        // Create Testcases
        const savedTestcases = await Promise.all(testcases.map(async (testcase) => {
            const newTestcase = new TestCases(testcase);
            return await newTestcase.save();
        }));

        // Create Question
        const question = new Question({
            level,
            title,
            content,
            codeSnippet: codeSnippet._id,
            testCases: savedTestcases.map(tc => tc._id)
        });

        await question.save();

        res.status(201).json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid question ID' });
        }

        // Find the question and populate the codeSnippet and testCases
        const question = await Question.findById(id)
            .populate('codeSnippet')
            .populate('testCases');

        // Check if question exists
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.status(200).json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getAllQuestions = async (req, res) => {
    try {
        // Fetch all questions and populate the codeSnippet and testCases
        const questions = await Question.find();

        // Check if there are any questions
        if (!questions.length) {
            return res.status(404).json({ error: 'No questions found' });
        }

        res.status(200).json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};