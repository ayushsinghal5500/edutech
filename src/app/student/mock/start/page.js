'use client';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const questions = [
  {
    id: 1,
    question: "The dimensional formula of Planck's constant is",
    options: [
      "[ML²T⁻¹]",
      "[ML²T⁻²]",
      "[MLT⁻¹]",
      "[ML⁻²T]"
    ],
    correct: 0,
    marks: 4,
    negative: 1
  },
  {
    id: 2,
    question: "In pteridophytes, the dominant generation is",
    options: [
      "Gametophytic",
      "Sporophytic",
      "Both equally",
      "Depends on species"
    ],
    correct: 1,
    marks: 4,
    negative: 1
  },
  // Add more questions...
];

export default function StartPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [testStarted, setTestStarted] = useState(false);

  useEffect(() => {
    if (testStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [testStarted, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to change your answers after submission!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit!'
    });

    if (result.isConfirmed) {
      let score = 0;
      let correct = 0;
      let incorrect = 0;

      questions.forEach((q, index) => {
        if (selectedAnswers[index] !== undefined) {
          if (selectedAnswers[index] === q.correct) {
            score += q.marks;
            correct++;
          } else {
            score -= q.negative;
            incorrect++;
          }
        }
      });

      Swal.fire({
        title: 'Test Submitted!',
        html: `
          <div class="text-left">
            <p>Correct Answers: ${correct}</p>
            <p>Incorrect Answers: ${incorrect}</p>
            <p>Unattempted: ${questions.length - (correct + incorrect)}</p>
            <p class="font-bold mt-2">Total Score: ${score}/${questions.length * 4}</p>
          </div>
        `,
        icon: 'success'
      });
    }
  };

  if (!testStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg shadow-lg max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-4 text-blue-600">JEE Main Mock Test 2024</h1>
          <div className="space-y-4 mb-6">
            <p className="text-lg">📝 Total Questions: {questions.length}</p>
            <p className="text-lg">⏱️ Duration: 30 Minutes</p>
            <p className="text-lg">📌 Marking Scheme: +4 / -1</p>
          </div>
          <button 
            onClick={() => setTestStarted(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all"
          >
            Start Test Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Test Header */}
        <div className="bg-white rounded-t-lg p-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-bold text-blue-600">JEE Main Mock Test 2024</h1>
          <div className="text-red-500 font-bold">
            ⏳ Time Left: {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question Panel */}
        <div className="bg-gray-50 p-6 rounded-b-lg shadow-md">
          <div className="mb-6">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                Marks: +4 / -1
              </span>
            </div>

            <h3 className="text-lg font-semibold mb-4">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-3 rounded-lg border ${
                    selectedAnswers[currentQuestion] === index
                      ? 'bg-blue-50 border-blue-500'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {String.fromCharCode(65 + index)}) {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg disabled:opacity-50"
            >
              ← Previous
            </button>
            
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}