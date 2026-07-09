'use client';

import { useUser, SignIn, SignUp, useClerk } from '@clerk/nextjs';
import React, { useState } from 'react';

export default function StudioMindAcademia() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'marketplace' | 'ai-tools' | 'library' | 'calendar'>('dashboard');

  // AI Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hello! How can I help you focus today?' }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Placeholder AI response (replace with real API call later)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Great! Let's boost your productivity today. What subject are you working on?" 
      }]);
    }, 800);
  };

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

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-5xl font-bold mb-4">Welcome back, {user?.firstName || 'Scholar'}!</h2>
        
        {/* Add real tab content here based on activeTab */}
        <div className="mt-8">
          {activeTab === 'dashboard' && <p>Dashboard content coming soon...</p>}
          {activeTab === 'ai-tools' && (
            <div className="bg-zinc-900 p-6 rounded-2xl">
              {/* AI Chat UI */}
              <button onClick={() => setChatOpen(!chatOpen)} className="bg-violet-600 px-4 py-2 rounded">Open AI Tutor</button>
              {chatOpen && (
                <div className="mt-4 h-96 flex flex-col">
                  <div className="flex-1 overflow-auto p-4 space-y-4 bg-zinc-950 rounded">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-violet-600' : 'bg-zinc-800'}`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-white"
                      placeholder="Ask your AI tutor..."
                    />
                    <button onClick={sendMessage} className="bg-violet-600 px-8 rounded">Send</button>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Add other tabs similarly */}
        </div>
      </main>
    </div>
  );
}
