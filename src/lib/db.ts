import { createClient, Client } from '@libsql/client';

// Turso database connection
// Uses environment variables for configuration:
// - TURSO_DATABASE_URL: Your Turso database URL (e.g., libsql://your-db.turso.io)
// - TURSO_AUTH_TOKEN: Your Turso auth token

let dbClient: Client | null = null;
let initialized = false;

function getDbClient(): Client {
  if (!dbClient) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    
    if (!url) {
      // In-memory database for local development or when Turso isn't configured
      // Note: This won't persist data across serverless function invocations
      console.warn('TURSO_DATABASE_URL not configured - using in-memory database');
      dbClient = createClient({
        url: ':memory:',
      });
    } else {
      dbClient = createClient({
        url,
        authToken,
      });
    }
  }
  return dbClient;
}

// Initialize database schema and return client
export async function getDb(): Promise<Client> {
  const client = getDbClient();
  
  if (!initialized) {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        source TEXT DEFAULT 'web',
        invited_at DATETIME,
        notes TEXT
      )
    `);
    initialized = true;
  }
  
  return client;
}
