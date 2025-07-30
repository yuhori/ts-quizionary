'use client';

import { useState } from 'react';

export default function QuizPage() {
  const quizzes = [
  {
      question: "詩編2篇において強調されるテーマは何ですか？",
      choices: ["喜び", "悲しみ", "悔い改め", "賛美"],
      answer: "悔い改め",
      explanation: "詩編2篇では神の怒りと裁き、そして悔い改めの重要性が語られます。",
  }
  ]

  const quiz = quizzes[0];
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (choice: string) => {
    setSelected(choice);
    setShowExplanation(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">聖書クイズ</h1>

      <div className="mb-6">
        <p className="text-lg font-medium">問題文</p>
        <p className="border p-4 mt-2">{quiz.question}</p>
      </div>

      <div className="mb-6">
        <p className="text-lg font-medium mb-2">回答</p>
        <div className="grid grid-cols-2 gap-4">
          {quiz.choices.map((choice) => (
            <button
              key={choice}
              className={`p-3 rounded ${
                selected
                  ? choice === quiz.answer
                    ? 'bg-green-400'
                    : choice === selected
                    ? 'bg-red-400'
                    : 'bg-gray-200'
                  : 'bg-black text-white'
              }`}
              onClick={() => handleAnswer(choice)}
              disabled={showExplanation}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className="border p-4 bg-white">
          <p>
            {selected === quiz.answer ? '正解！' : '不正解。'} 解説: {quiz.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
