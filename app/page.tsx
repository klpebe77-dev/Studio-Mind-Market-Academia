'use client';

import { useUser, SignIn, SignUp, useClerk } from '@clerk/nextjs';
import React, { useState } from 'react';

export default function StudioMindAcademia() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'marketplace' | 'ai-tools' | 'library' | 'calendar'>('dashboard');

  // AI Chat State (kept from before)
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hello! How can I help you focus today?' }]);
  const [input, setInput] = useState('');

  const sendMessage = () => { /* same as before */ };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <h1 className="text-5xl font-bold text-center mb-12">Studio-Mind Market Academia</h1>
          
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-700">
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-violet-600 hover:bg-violet-700',
                  card: 'bg-transparent shadow-none',
                }
              }} 
            />
            <div className="text-center my-6 text-zinc-500">— or —</div>
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-violet-600 hover:bg-violet-700',
                }
              }} 
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header with real user info */}
      <header className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Studio-Mind</h1>
          <div className="flex items-center gap-8">
            <nav className="flex gap-6">
              {['dashboard', 'marketplace', 'ai-tools', 'library', 'calendar'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`capitalize ${activeTab === tab ? 'text-violet-400 font-medium' : 'hover:text-zinc-400'}`}
                >
                  {tab}
                </button>
              ))}
            </nav>
            <button onClick={() => signOut()} className="text-red-400 text-sm">Logout</button>
          </div>
        </div>
      </header>

      {/* Rest of the app (Dashboard, Marketplace, AI Chat, Library, Calendar) - same rich UI as before */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-5xl font-bold mb-4">Welcome back, {user?.firstName || 'Scholar'}!</h2>
        {/* All previous sections go here... */}
      </main>
    </div>
  );
              }
