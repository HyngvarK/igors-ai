import Database from 'better-sqlite3';
import { homedir } from 'os';
import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';

const DB_DIR = join(homedir(), '.igors-ai');
const DB_PATH = join(DB_DIR, 'chat.db');

if (!existsSync(DB_DIR)) {
  mkdirSync(DB_DIR, { recursive: true });
}

const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    title TEXT,
    model TEXT,
    created_at INTEGER,
    updated_at INTEGER
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    conversation_id TEXT,
    role TEXT,
    content TEXT,
    created_at INTEGER,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
  );
`);

export interface Conversation {
  id: string;
  title: string;
  model: string;
  created_at: number;
  updated_at: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: number;
}

export function getConversations(): Conversation[] {
  return db.prepare('SELECT * FROM conversations ORDER BY updated_at DESC').all() as Conversation[];
}

export function getConversation(id: string): Conversation | undefined {
  return db.prepare('SELECT * FROM conversations WHERE id = ?').get(id) as Conversation | undefined;
}

export function createConversation(id: string, model: string, title: string = 'New Chat'): Conversation {
  const now = Date.now();
  db.prepare('INSERT INTO conversations (id, title, model, created_at, updated_at) VALUES (?, ?, ?, ?, ?)').run(id, title, model, now, now);
  return { id, title, model, created_at: now, updated_at: now };
}

export function updateConversationTitle(id: string, title: string): void {
  const now = Date.now();
  db.prepare('UPDATE conversations SET title = ?, updated_at = ? WHERE id = ?').run(title, now, id);
}

export function updateConversationTimestamp(id: string): void {
  const now = Date.now();
  db.prepare('UPDATE conversations SET updated_at = ? WHERE id = ?').run(now, id);
}

export function deleteConversation(id: string): void {
  db.prepare('DELETE FROM messages WHERE conversation_id = ?').run(id);
  db.prepare('DELETE FROM conversations WHERE id = ?').run(id);
}

export function getMessages(conversationId: string): Message[] {
  return db.prepare('SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC').all(conversationId) as Message[];
}

export function addMessage(id: string, conversationId: string, role: 'user' | 'assistant', content: string): Message {
  const now = Date.now();
  db.prepare('INSERT INTO messages (id, conversation_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)').run(id, conversationId, role, content, now);
  updateConversationTimestamp(conversationId);
  return { id, conversation_id: conversationId, role, content, created_at: now };
}

export function updateMessageContent(id: string, content: string): void {
  db.prepare('UPDATE messages SET content = ? WHERE id = ?').run(content, id);
}

export default db;
