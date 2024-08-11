// src/CodingArena.js

import{ useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CodingArena = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/questions'); 
        setQuestions(response.data);
      } catch (error) {
        setError('Failed to fetch questions');
        console.log(error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 font-poppins">
      <h1 className="text-3xl font-bold mb-6">Coding Arena</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-left text-lg font-semibold">Title</th>
              <th className="py-3 px-4 text-left text-lg font-semibold">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question._id} className="border-b border-gray-700">
                <td className="py-3 px-4">
                  <Link
                    to={`/question/${question._id}`}
                    className="text-blue-400 hover:underline"
                  >
                    {question.title}
                  </Link>
                </td>
                <td className="py-3 px-4">{question.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CodingArena;
