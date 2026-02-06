import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgentKit — Your Personal AI Assistant in 60 Seconds",
  description: "Get a personal AI agent on Telegram that manages finances, boosts productivity, and researches anything. No coding required.",
  keywords: ["AI assistant", "Telegram bot", "personal AI", "productivity", "finance", "research"],
  openGraph: {
    title: "AgentKit — Your Personal AI Assistant",
    description: "Get a personal AI agent on Telegram in 60 seconds. No coding required.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentKit — Your Personal AI Assistant",
    description: "Get a personal AI agent on Telegram in 60 seconds. No coding required.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
