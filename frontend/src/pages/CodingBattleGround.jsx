// src/CodingBattleground.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CodingBattleground = () => {
  const [name, setName] = useState('');
  const [contests, setContests] = useState([]);
  const [isNameSet, setIsNameSet] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isNameSet) {
      axios.get('http://localhost:8080/api/contest/contests')
        .then(response => setContests(response.data))
        .catch(error => console.error('Error fetching contests:', error));
    }
  }, [isNameSet]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setIsNameSet(true);
    }
  };

  const handleStartContest = (id, timeLimit) => {
    const startTime = new Date().getTime();
    localStorage.setItem(`contest_${id}_startTime`, startTime);
    localStorage.setItem(`contest_${id}_timeLimit`, timeLimit);
    navigate(`/codingbattleground/${id}`);
  };

  if (!isNameSet) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100 dark">
        <form onSubmit={handleNameSubmit} className="p-6 bg-gray-800 rounded shadow-md">
          <label className="block mb-4">
            <span className="text-gray-200">What is your name?</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen dark">
      <h1 className="text-2xl font-bold mb-4">Coding Battleground</h1>
      <div className="space-y-4">
        {contests.map((contest) => (
          <div
            key={contest._id}
            className="p-4 bg-gray-800 rounded shadow-md hover:shadow-lg cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{contest.title}</h2>
            <p className="text-gray-400">Time Limit: {contest.timeLimit} minutes</p>
            <button
              onClick={() => handleStartContest(contest._id, contest.timeLimit)}
              className="mt-4 py-2 px-4 bg-green-600 text-white rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Start
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodingBattleground;
