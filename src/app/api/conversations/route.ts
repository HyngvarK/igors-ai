import { NextRequest, NextResponse } from 'next/server';
import { getConversations, createConversation } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const conversations = getConversations();
  return NextResponse.json(conversations);
}

export async function POST(request: NextRequest) {
  const { model, title } = await request.json();
  const id = uuidv4();
  const conversation = createConversation(id, model, title || 'New Chat');
  return NextResponse.json(conversation);
}
