import mongoose from "mongoose";
import Question from "../QuestionModels/Question.js"; // Import the Question schema

const codingContestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timeLimit: {
    type: Number, // Time limit in minutes
    required: true,
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  }],
  totalMarks: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  leaderboard: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Leaderboard", // Reference to the Leaderboard schema
  }],
});

const CodingContest = mongoose.model("CodingContest", codingContestSchema);
export default CodingContest;
