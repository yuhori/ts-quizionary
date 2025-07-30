'use client';

import { useState } from 'react';

const categories = ['旧約聖書', '新約聖書'];

const oldTestamentBooks = [
  '創世記', '出エジプト記', 'レビ記', '民数記', '申命記', 'ヨシュア記', '士師記',
  'ルツ記', 'サムエル記上', 'サムエル記下', '列王記上', '列王記下', '歴代誌上',
  '歴代誌下', 'エズラ記', 'ネヘミヤ記', 'エステル記', 'ヨブ記', '詩編', '箴言',
  '伝道の書', '雅歌', 'イザヤ書', 'エレミヤ書', '哀歌', 'エゼキエル書', 'ダニエル書',
  'ホセア書', 'ヨエル書', 'アモス書', 'オバデヤ書', 'ヨナ書', 'ミカ書', 'ナホム書',
  'ハバクク書', 'ゼパニヤ書', 'ハガイ書', 'ゼカリヤ書', 'マラキ書',
];

const newTestamentBooks = [
  'マタイによる福音書', 'マルコによる福音書', 'ルカによる福音書', 'ヨハネによる福音書',
  '使徒行伝', 'ローマ人への手紙', 'コリント人への第一', 'コリント人への第二',
  'ガラテヤ人への手紙', 'エペソ人への手紙', 'ピリピ人への手紙', 'コロサイ人への手紙',
  'テサロニケ人への第一', 'テサロニケ人への第二', 'テモテへの第一', 'テモテへの第二',
  'テトスへの手紙', 'ピレモンへの手紙', 'ヘブライ人への手紙', 'ヤコブの手紙',
  'ペテロの第一の手紙', 'ペテロの第二の手紙', 'ヨハネの第一の手紙', 'ヨハネの第二の手紙',
  'ヨハネの第三の手紙', 'ユダの手紙', '黙示録',
];

const formats = ['4択クイズ'];

export default function QuizPage() {
  const quizzes = [
    {
      question: "詩編2篇において強調されるテーマは何ですか？",
      choices: ["喜び", "悲しみ", "悔い改め", "賛美"],
      answer: "悔い改め",
      explanation: "詩編2篇では神の怒りと裁き、そして悔い改めの重要性が語られます。",
      sources: ["創世記 1:1-2:3"],
    },
    {
      question: "イエス・キリストが誕生した場所はどこですか？",
      choices: ["ナザレ", "ベツレヘム", "エルサレム", "ガリラヤ"],
      answer: "ベツレヘム",
      explanation: "新約聖書によれば、イエスはベツレヘムで誕生しました。",
      sources: ["ルカによる福音書 2:1-7"],
    },
    {
      question: "モーセが受けた戒めはいくつありますか？",
      choices: ["5つ", "7つ", "10個", "12個"],
      answer: "10個",
      explanation: "シナイ山で神から授けられた十戒は、モーセを通してイスラエルに伝えられました。",
      sources: ["出エジプト記 20:1-17"],
    },
  ];

  
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const quiz = quizzes[currentQuizIndex];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const selectedBooks = selectedCategory === '旧約聖書' ? oldTestamentBooks : newTestamentBooks;
  const [selectedBook, setSelectedBook] = useState(selectedBooks[0]);
  const [selectedFormat, setSelectedFormat] = useState(formats[0]);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (choice: string) => {
    setSelectedAnswer(choice);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    const nextIndex = (currentQuizIndex + 1) % quizzes.length;
    setCurrentQuizIndex(nextIndex);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">聖書クイズ</h1>

      {/* ▼ 設定 */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="p-2 border w-full sm:w-auto"
          value={selectedCategory}
          onChange={(e) => {
            const newCategory = e.target.value;
            setSelectedCategory(newCategory);
            const newBooks = newCategory === '旧約聖書' ? oldTestamentBooks : newTestamentBooks;
            setSelectedBook(newBooks[0]);
          }}
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
          {selectedBooks.map((b) => (
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
          <p className={`text-lg font-bold ${selectedAnswer === quiz.answer ? 'text-green-600' : 'text-red-600'}`}>
            {selectedAnswer === quiz.answer ? '✅ 正解です！' : '❌ 残念、不正解です。'}
          </p>

          <div className="mt-2">
            <p className="font-semibold">解説：</p>
            <p>{quiz.explanation}</p>
          </div>

          {quiz.sources?.length > 0 && (
            <div className="mt-2">
              <p className="font-semibold">出典：</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {quiz.sources.map((source, i) => (
                  <li key={i}>{source}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleNextQuestion}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            次の問題へ
          </button>
        </div>
      )}
    </div>
  );
}