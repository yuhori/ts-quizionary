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

export async function GET(request: Request) {
  // get params を取得
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const index = searchParams.get('index');
  if (!type || !index) {
    return NextResponse.json({ error: 'Missing type or index parameter' }, { status: 400 });
  }
  try {
    const res = await fetch(`https://go-quizionary-api.onrender.com/api/v1/four-option-questions?type=${type}&index=${index}&num=1000`);
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch external quizzes' }, { status: 500 });
    }
    const apiResponse: ApiResponse = await res.json();
    return NextResponse.json(apiResponse.quizzes);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
