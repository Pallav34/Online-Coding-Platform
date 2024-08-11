// src/UploadQuestion.js

import React, { useState } from 'react';
import axios from 'axios';
import CodeEditor from '../components/code-editor/CodeEditor'; // Ensure the correct path

const UploadQuestion = () => {
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('easy');
  const [content, setContent] = useState('');
  const [code, setCode] = useState('');
  const [testCases, setTestCases] = useState([{ input: '', expectedOutput: '' }]);
  const [message, setMessage] = useState('');

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: '', expectedOutput: '' }]);
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const handleRemoveTestCase = (index) => {
    const updatedTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(updatedTestCases);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/questions', {
        level,
        title,
        content,
        code,
        testcases: testCases,
      });
      setMessage('Question uploaded successfully!');
      // Clear form after submission if needed
      setTitle('');
      setLevel('easy');
      setContent('');
      setCode('');
      setTestCases([{ input: '', expectedOutput: '' }]);
    } catch (error) {
      setMessage('Failed to upload question');
    }
  };

  return (
    <div className="p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Upload a New Question</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="level">
            Difficulty Level
          </label>
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-lg"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="content">
            Description
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-lg"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="code">
            Code
          </label>
          <CodeEditor
            code={code}
            setCode={setCode}
            language="Java" // Or any default language you prefer
          />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Test Cases</h2>
          {testCases.map((testCase, index) => (
            <div key={index} className="mb-4 flex flex-col space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={testCase.input}
                  onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                  placeholder="Input"
                  className="w-full p-2 bg-gray-800 text-white rounded-lg"
                  required
                />
                <input
                  type="text"
                  value={testCase.expectedOutput}
                  onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                  placeholder="Expected Output"
                  className="w-full p-2 bg-gray-800 text-white rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveTestCase(index)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTestCase}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Add Test Case
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Submit Question
        </button>
      </form>

      {message && (
        <div className="mt-4 text-lg font-semibold">
          {message}
        </div>
      )}
    </div>
  );
};

export default UploadQuestion;
