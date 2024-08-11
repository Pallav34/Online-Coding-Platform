import React from 'react';

const ContestDetails = ({ contest }) => {
  return (
    <div className="contest-details">
      <h2>{contest.title}</h2>
      <p>Time Limit: {contest.timeLimit} minutes</p>
      <div className="questions">
        {contest.questions.map(questionId => (
          <Question key={questionId} questionId={questionId} />
        ))}
      </div>
    </div>
  );
};

export default ContestDetails;
