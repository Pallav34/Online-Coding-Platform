import React from 'react';

const Leaderboard = ({ entries }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {entries.sort((a, b) => b.score - a.score).map(entry => (
          <li key={entry._id}>
            {entry.participantName}: {entry.score} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
