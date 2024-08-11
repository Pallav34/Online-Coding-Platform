// src/QuestionPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CodeEditor from '../components/code-editor/CodeEditor'; // Ensure the correct path
import CodeRunnerBtn from '../components/buttons/CodeRunnerBtn'; // Ensure the correct path
import LanguageBar from '../components/language-bar/LanguageBar'; // Ensure the correct path
import LanguageFooter from '../components/language-footer/LanguageFooter'; // Ensure the correct path

const QuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("Java");
  const [code, setCode] = useState(""); 
  const [result, setResult] = useState(null);
  const [initialCode, setInitialCode] = useState("");
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`/api/questions/${id}`); // Adjust URL as needed
        setQuestion(response.data);
        // Set initial code after the question data is fetched
        setInitialCode(response.data.codeSnippet.code);
        setCode(initialCode);
      } catch (error) {
        setError('Failed to fetch question');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id, initialCode]);

  // Effect to trigger re-render when code changes
  useEffect(() => {
    // Ensure editor is updated when code changes
    if (question) {
      setCode(question.codeSnippet.code);
    }
  }, [question,initialCode]);

  const handleRunCode = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/submit', {
        questionId: id,
        code: code
      });
      setResult(response.data);
    } catch (error) {
      setResult({ error: 'Failed to submit code' });
    }
  };

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="flex flex-row w-screen h-screen bg-black text-white font-poppins">
      {/* Left Side: Question Details */}
      <div className="w-[40%] h-full p-6 flex flex-col">
        <div className="mb-6 flex-grow">
          <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-400">{question.content}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Example Test Cases</h2>
            <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left text-lg font-semibold">Input</th>
                  <th className="py-3 px-4 text-left text-lg font-semibold">Expected Output</th>
                </tr>
              </thead>
              <tbody>
                {question.testCases.map((testCase) => (
                  <tr key={testCase._id} className="border-b border-gray-700">
                    <td className="py-3 px-4">{testCase.input}</td>
                    <td className="py-3 px-4">{testCase.expectedOutput}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          {result && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{result.success ? "Results" : "Error"}</h3>
              {result.success ? (
                <ul>
                  {result.results.map((res) => (
                    <li key={res.input} className={`text-${res.success ? 'green' : 'red'}-400`}>
                      Input: {res.input} - Output: {res.outputValue.trim()} (Expected: {res.expectedOutput})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-red-500">{result.error}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Code Editor and Controls */}
      <div className="w-[60%] h-full flex flex-col">
        <div className="h-[10%] bg-[#181818] p-4">
          <LanguageBar selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
        </div>
        <div className="flex-grow bg-gray-900 p-4 overflow-auto">
          <CodeEditor code={code} setCode={setCode} language={selectedLanguage} />
        </div>
        <div className="h-[10%] bg-[#181818] p-4 flex items-center justify-center">
          <button 
            onClick={handleRunCode}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Run
          </button>
        </div>
        <div className="h-[10%] bg-[#181818] p-4">
          <LanguageFooter selectedLanguage={selectedLanguage} />
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
