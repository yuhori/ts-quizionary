import { NextResponse } from 'next/server';

type Quiz = {
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
  sources?: string[];
};

const quizzes: Quiz[] = [
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

export async function GET() {
  return NextResponse.json(quizzes);
}
