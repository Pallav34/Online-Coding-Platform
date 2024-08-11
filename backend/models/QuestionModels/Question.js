import mongoose from "mongoose";
import CodeSnippet from "./CodeSnippet.js";
import TestCases from "./TestCases.js";

const questionSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  codeSnippet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CodeSnippet",
    required: true,
  },
  testCases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestCases",
    required: true,
  }],
  marks: {
    type: Number,
    default: 0, 
  },
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
