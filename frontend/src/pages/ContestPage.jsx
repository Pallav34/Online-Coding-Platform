
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ContestPage = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  
  useEffect(() => {
    axios.get(`http://localhost:8080/api/contest/contests/${id}`)
      .then(response => setContest(response.data))
      .catch(error => console.error('Error fetching contest:', error));
    
    const startTime = localStorage.getItem(`contest_${id}_startTime`);
    const timeLimit = localStorage.getItem(`contest_${id}_timeLimit`);
    const currentTime = new Date().getTime();
    
    if (startTime && timeLimit) {
      const elapsed = currentTime - parseInt(startTime, 10);
      const initialRemainingTime = Math.max(parseInt(timeLimit, 10) * 60000 - elapsed, 0);
      setRemainingTime(initialRemainingTime);
      
      const interval = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [id]);

  if (!contest) return <div>Loading...</div>;

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{contest.title}</h1>
      <p className="text-xl font-semibold mb-4">Remaining Time: {formatTime(remainingTime)}</p>
      <div className="space-y-4">
        {contest.questions.map((question) => (
          <div key={question._id} className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold">{question.title}</h2>
            <p className="text-gray-600">{question.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContestPage;
