# AgentKit Landing Page

Landing page for AgentKit - "Your personal AI assistant in 60 seconds."

## Live URL

- **Production**: https://web-nu-two-48.vercel.app

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Turso (libSQL) for waitlist storage

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment Variables

Create a `.env.local` file:

```env
# Turso Database (get from turso.tech dashboard)
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-auth-token
```

### Setting up Turso

1. Install Turso CLI: `curl -sSfL https://get.tur.so/install.sh | bash`
2. Login: `turso auth login`
3. Create database: `turso db create agentkit`
4. Get URL: `turso db show agentkit --url`
5. Create token: `turso db tokens create agentkit`

### Vercel Environment Variables

Set these in the Vercel dashboard:
- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`

## Features

- 🚀 Landing page with hero section
- 💼 Three power packs: Finance, Productivity, Research
- 📝 Waitlist signup form
- ✨ Modern, responsive design

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── waitlist/     # Waitlist signup API
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
└── lib/
    └── db.ts             # Turso database client
```

## Deployment

Automatic deployment via Vercel on push to `main` branch.

GitHub: https://github.com/claudius-inc/agentkit-web
