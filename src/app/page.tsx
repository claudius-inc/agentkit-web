'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'You\'re on the list!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setMessage('Failed to join waitlist');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute top-60 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
          {/* Logo */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <span className="text-2xl">🤖</span>
            <span className="text-white font-semibold">AgentKit</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your personal AI assistant
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              in 60 seconds
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Connect Telegram. Choose your pack. Get a personal AI that manages your finances, 
            boosts productivity, and researches anything — no coding required.
          </p>

          {/* Waitlist form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/25"
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </button>
            </div>
            
            {status === 'success' && (
              <p className="mt-4 text-green-400 flex items-center justify-center gap-2">
                <span>✓</span> {message}
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-red-400 flex items-center justify-center gap-2">
                <span>✕</span> {message}
              </p>
            )}
          </form>

          <p className="mt-6 text-sm text-slate-500">
            Free early access for the first 100 users
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-800/50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Choose Your Power Pack
          </h2>
          <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            Pre-configured agent bundles for your specific needs. Install in one click, 
            customize as you grow.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Finance Pack */}
            <div className="group p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 rounded-2xl hover:border-green-500/30 transition-all hover:shadow-lg hover:shadow-green-500/10">
              <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Finance Pack</h3>
              <p className="text-slate-400 mb-6">
                Track portfolios, get stock alerts, scan financial news, and run investment research — all from chat.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Real-time stock alerts</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Portfolio monitoring</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> News summarization</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Research reports</li>
              </ul>
            </div>

            {/* Productivity Pack */}
            <div className="group p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 rounded-2xl hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Productivity Pack</h3>
              <p className="text-slate-400 mb-6">
                Manage calendar, email triage, smart reminders, and task tracking — your personal chief of staff.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Calendar management</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Email summaries</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Smart reminders</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Task automation</li>
              </ul>
            </div>

            {/* Research Pack */}
            <div className="group p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 rounded-2xl hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/10">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔬</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Research Pack</h3>
              <p className="text-slate-400 mb-6">
                Deep web research, document analysis, report generation, and knowledge synthesis.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Web research</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Document analysis</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Report generation</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Citation tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Sign Up</h3>
              <p className="text-slate-400">
                Join the waitlist and get early access. No credit card required.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Connect Telegram</h3>
              <p className="text-slate-400">
                Link your Telegram account. That&apos;s your command center.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Start Chatting</h3>
              <p className="text-slate-400">
                Your AI agent is live. Just message it like a friend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to meet your AI assistant?
          </h2>
          <p className="text-slate-300 mb-8">
            Join hundreds of early adopters getting things done with AI.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-block px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-all shadow-lg"
          >
            Join the Waitlist →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-xl">🤖</span>
            <span>AgentKit</span>
          </div>
          <p className="text-sm text-slate-500">
            © 2024 Claudius Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
