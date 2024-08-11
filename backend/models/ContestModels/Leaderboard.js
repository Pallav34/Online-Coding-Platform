import mongoose from "mongoose";
import CodingContest from "./CodingContest.js";
const leaderboardSchema = new mongoose.Schema({
  contestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CodingContest",
    required: true,
  },
  participantName: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
export default Leaderboard;
