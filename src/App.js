import React, { useState, useEffect } from 'react';
import './App.css';
import TTHCM1 from './quizzes/TTHCM/TTHCM1.json';
import TTHCM2 from './quizzes/TTHCM/TTHCM2.json';
import TTHCM3 from './quizzes/TTHCM/TTHCM3.json';
import TTHCM4 from './quizzes/TTHCM/TTHCM4.json';
import TTHCM5 from './quizzes/TTHCM/TTHCM5.json';
import TTHCM6 from './quizzes/TTHCM/TTHCM6.json';

const quizFiles = {
  'TTHCM 1': TTHCM1,
  'TTHCM 2': TTHCM2,
  'TTHCM 3': TTHCM3,
  'TTHCM 4': TTHCM4,
  'TTHCM 5': TTHCM5,
  'TTHCM 6': TTHCM6,
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [questionsData, setQuestionsData] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(Object.keys(quizFiles)[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Control sidebar visibility

  useEffect(() => {
    const loadQuizData = () => {
      const data = quizFiles[selectedQuiz];
      setQuestionsData(data);
      setCurrentQuestion(0);
      setSelectedOption(null);
      setIsCorrect(null);
    };
    
    loadQuizData();
  }, [selectedQuiz]);

  const handleOptionClick = (option) => {
    const isAnswerCorrect = option[0] === questionsData[currentQuestion].answer;
    setSelectedOption(option);
    setIsCorrect(isAnswerCorrect);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="App">
      <h1 className="title">Quiz App</h1>
      <button className="toggle-sidebar" onClick={toggleSidebar}>
        {isSidebarOpen ? 'Close' : 'Open'} Quiz List
      </button>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h2>Chọn bài test</h2>
        {Object.keys(quizFiles).map((quiz) => (
          <div
            key={quiz}
            className={`quiz-item ${selectedQuiz === quiz ? 'selected' : ''}`}
            onClick={() => {
              setSelectedQuiz(quiz);
              toggleSidebar(); // Close sidebar on selection
            }}
          >
            {quiz}
          </div>
        ))}
      </div>
      <div className="question-section">
        <h2 className="question-number">
          Câu {currentQuestion + 1} / {questionsData.length}
        </h2>
        <h2 className="question-text">{questionsData[currentQuestion]?.question}</h2>
        <div className="options">
          {questionsData[currentQuestion]?.options.map((option) => (
            <div
              key={option}
              className={`option ${selectedOption === option ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
        <div className="navigation-buttons">
          <button 
            onClick={handlePreviousQuestion} 
            disabled={currentQuestion === 0} 
            className="nav-button"
          >
            Previous Question
          </button>
          <button onClick={handleNextQuestion} className="nav-button">
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
