'use client';

import { useState } from 'react';

const categories = ['旧約聖書', '新約聖書'];
const books = ['詩篇', '創世記', 'ヨハネ', 'マタイ']; // 適当に追加
const formats = ['4択クイズ', '記述式'];

export default function QuizPage() {
  const quizzes = [
    {
      question: "詩編2篇において強調されるテーマは何ですか？",
      choices: ["喜び", "悲しみ", "悔い改め", "賛美"],
      answer: "悔い改め",
      explanation: "詩編2篇では神の怒りと裁き、そして悔い改めの重要性が語られます。",
    }
  ];

  const quiz = quizzes[0]; // 仮の固定クイズ
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedBook, setSelectedBook] = useState(books[0]);
  const [selectedFormat, setSelectedFormat] = useState(formats[0]);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (choice: string) => {
    setSelectedAnswer(choice);
    setShowExplanation(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">聖書クイズ</h1>

      {/* ▼ 設定 */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="p-2 border w-full sm:w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="p-2 border w-full sm:w-auto"
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
        >
          {books.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          className="p-2 border w-full sm:w-auto"
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value)}
        >
          {formats.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* ▼ 問題文 */}
      <div className="mb-6">
        <p className="text-lg font-medium">問題文</p>
        <p className="border p-4 mt-2">{quiz.question}</p>
      </div>

      {/* ▼ 回答ボタン */}
      <div className="mb-6">
        <p className="text-lg font-medium mb-2">回答</p>
        <div className="grid grid-cols-2 gap-4">
          {quiz.choices.map((choice) => (
            <button
              key={choice}
              className={`p-3 rounded ${
                selectedAnswer
                  ? choice === quiz.answer
                    ? 'bg-green-400'
                    : choice === selectedAnswer
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

      {/* ▼ 解説 */}
      {showExplanation && (
        <div className="border p-4 bg-white">
          <p>
            {selectedAnswer === quiz.answer ? '正解！' : '不正解。'} 解説: {quiz.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
