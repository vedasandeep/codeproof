import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeProof — AI Engineering Harness",
  description: "Agentic Software Engineering Control Plane and Proof Inspector",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 min-h-screen antialiased`}>
        <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-mono text-lg font-bold tracking-tight">🛡️ CodeProof Control Plane</span>
          </div>
          <div className="flex items-center gap-6 font-mono text-xs text-zinc-400">
            <span>Lifecycle: <strong className="text-emerald-400">ACTIVE</strong></span>
            <span>MCP Server: <strong className="text-emerald-400">STDIO ONLINE</strong></span>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
