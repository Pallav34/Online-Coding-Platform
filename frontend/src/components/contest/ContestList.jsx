import React from 'react';

const ContestList = ({ contests, onStart }) => {
  return (
    <div className="contest-list">
      <h2>Available Contests</h2>
      <ul>
        {contests.map(contest => (
          <li key={contest._id}>
            {contest.title}
            <button onClick={() => onStart(contest._id)}>Start</button>
          </li>
        ))}
      </ul>
      <button>Create New Contest</button>
    </div>
  );
};

export default ContestList;
