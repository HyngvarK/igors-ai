import { NextRequest } from 'next/server';

const MLX_URL = 'http://localhost:8080/v1/chat/completions';

export async function POST(request: NextRequest) {
  const { model, messages } = await request.json();

  const response = await fetch(MLX_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'MLX server error' }), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
