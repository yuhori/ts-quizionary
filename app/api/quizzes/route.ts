import { NextResponse } from 'next/server';

type Quiz = {
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
  sources?: string[];
};

type ApiResponse = {
  quizzes: Quiz[];
};

export async function GET() {
  try {
    const res = await fetch('https://go-quizionary-api.onrender.com/api/v1/four-option-questions?index=1&num=1');
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch external quizzes' }, { status: 500 });
    }
    const apiResponse: ApiResponse = await res.json();
    return NextResponse.json(apiResponse.quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
//   return NextResponse.json(quizzes);
}
