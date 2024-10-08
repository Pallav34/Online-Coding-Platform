import mongoose from "mongoose";

const codeSnippetSchema = new mongoose.Schema({
  lang: {
    type: String,
    required: true,
    enum: ["java"], 
  },
  code: {
    type: String,
    required: true,
  },
});

const CodeSnippet = mongoose.model("CodeSnippet", codeSnippetSchema);
export default CodeSnippet;
