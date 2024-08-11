import mongoose from "mongoose";

const testCasesSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  expectedOutput: {
    type: String,
    required: true,
  },
});

const TestCases = mongoose.model("TestCases", testCasesSchema);
export default TestCases;
