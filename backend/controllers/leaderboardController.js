import Leaderboard from '../models/ContestModels/Leaderboard.js';


// Create a new leaderboard entry
export const createLeaderboardEntry = async (req, res) => {
  try {
    const { contestId, participantName, score } = req.body;

    if (!contestId || !participantName || score === undefined) {
      return res.status(400).json({ error: 'contestId, participantName, and score are required' });
    }

    const leaderboardEntry = new Leaderboard({
      contestId,
      participantName,
      score
    });

    await leaderboardEntry.save();
    res.status(201).json(leaderboardEntry);
  } catch (error) {
    console.error('Error creating leaderboard entry:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all leaderboard entries, optionally filtered by contestId
export const getAllLeaderboardEntries = async (req, res) => {
  try {
    const { contestId } = req.query;
    
    let query = {};
    if (contestId) {
      query.contestId = contestId;
    }

    const leaderboardEntries = await Leaderboard.find(query).populate('contestId');
    res.status(200).json(leaderboardEntries);
  } catch (error) {
    console.error('Error fetching leaderboard entries:', error);
    res.status(500).json({ message: 'Error fetching leaderboard entries' });
  }
};


export const updateLeaderboardEntry = async (req, res) => {
  try {
    const { contestId, participantName, score } = req.body;

    if (!contestId || !participantName || score === undefined) {
      return res.status(400).json({ error: 'contestId, participantName, and score are required' });
    }

    // Find the leaderboard entry and update the score
    const leaderboardEntry = await Leaderboard.findOneAndUpdate(
      { contestId, participantName },
      { score },
      { new: true } // Return the updated document
    );

    if (!leaderboardEntry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }

    res.status(200).json(leaderboardEntry);
  } catch (error) {
    console.error('Error updating leaderboard entry:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



