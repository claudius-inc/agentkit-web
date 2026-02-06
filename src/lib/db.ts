import { createClient } from '@libsql/client';

// Turso database connection
// Uses environment variables for configuration:
// - TURSO_DATABASE_URL: Your Turso database URL
// - TURSO_AUTH_TOKEN: Your Turso auth token (for remote connections)
export const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Initialize database schema
export async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      source TEXT DEFAULT 'web',
      invited_at DATETIME,
      notes TEXT
    )
  `);
}
