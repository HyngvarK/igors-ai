import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const AVAILABLE_MODELS = [
  'mlx-community/Qwen3-30B-A3B-8bit',
  'mlx-community/Qwen3-4B-8bit',
  'unsloth/Qwen3.6-35B-A3B-MLX-8bit',
];

export async function POST(request: NextRequest) {
  const { model } = await request.json();

  if (!AVAILABLE_MODELS.includes(model)) {
    return NextResponse.json({ error: 'Invalid model' }, { status: 400 });
  }

  try {
    await execAsync(`/Users/hyngvarkenig/bin/mlx-switch "${model}"`);
    return NextResponse.json({ success: true, model });
  } catch (error) {
    console.error('Failed to switch model:', error);
    return NextResponse.json({ error: 'Failed to switch model' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const res = await fetch('http://localhost:8080/v1/models');
    if (!res.ok) {
      return NextResponse.json({ loaded: null, available: AVAILABLE_MODELS });
    }
    const data = await res.json();
    const loaded = data.data?.[0]?.id || null;
    return NextResponse.json({ loaded, available: AVAILABLE_MODELS });
  } catch {
    return NextResponse.json({ loaded: null, available: AVAILABLE_MODELS });
  }
}
