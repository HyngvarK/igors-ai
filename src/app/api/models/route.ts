import { NextResponse } from 'next/server';

const MLX_URL = 'http://localhost:8080/v1/models';

export async function GET() {
  try {
    const response = await fetch(MLX_URL);

    if (!response.ok) {
      return NextResponse.json({ error: 'MLX server unavailable' }, { status: 503 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'MLX server unavailable' }, { status: 503 });
  }
}
