import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Monthly Pro');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] via-[#ffffff] to-[#e6eeff] text-slate-800 font-sans pb-24">
      {/* Top Header */}
      <header className="flex justify-between items-center p-4 max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <span className="font-bold text-lg">Sx</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Solvix</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur border border-blue-100 px-3 py-1.5 rounded-full shadow-sm text-sm font-semibold">
            <span>⚡ 3</span>
            <span className="text-xs text-slate-500">Credits</span>
          </div>
          <button 
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm hover:bg-rose-100 transition"
          >
            {isLoggedIn ? 'Sign out' : 'Sign in'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-md mx-auto px-4 space-y-4">
        {!isLoggedIn ? (
          /* Login Screen Design */
          <div className="flex flex-col items-center justify-center pt-12 text-center space-y-6">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/50">
              <span className="text-3xl font-bold">Sx</span>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Welcome to <span className="text-blue-600">Solvix</span></h2>
              <p className="text-sm text-slate-500 mt-2 px-6">Your AI super-app for building apps, auditing pages, and mastering freelance & trading.</p>
            </div>
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full bg-white border border-slate-200 py-3.5 px-6 rounded-2xl shadow-md flex items-center justify-center gap-3 font-medium hover:bg-slate-50 transition"
            >
              <span className="text-lg">🌐</span>
              <span>Continue with Google (Gmail)</span>
              <span className="ml-auto">→</span>
            </button>
          </div>
        ) : (
          /* Dashboard Home Design */
          <>
            <div className="pt-2">
              <p className="text-xs font-medium text-slate-400">Welcome back, <span className="text-slate-700 font-semibold">Alex</span></p>
              <h2 className="text-2xl font-extrabold tracking-tight mt-0.5 text-slate-900">What shall we <span className="text-blue-600">build</span> today?</h2>
            </div>

            {/* Prompt Box */}
            <div className="bg-slate-900 text-white p-4 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
              <textarea 
                placeholder="What do you need today? Type your request, prompt, or paste your website link here..."
                className="w-full bg-transparent text-sm text-slate-200 placeholder-slate-400 resize-none outline-none h-20"
              />
              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                <div className="flex gap-3 text-slate-400">
                  <span>🔗</span>
                  <span>📎</span>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 shadow-lg shadow-blue-500/30 transition">
                  <span>Generate</span>
                  <span>↑</span>
                </button>
              </div>
            </div>

            {/* Daily Bonus Card */}
            <div className="bg-white/80 backdrop-blur border border-blue-50 p-4 rounded-2xl shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-sky-400 rounded-xl flex items-center justify-center text-white shadow-md">
                  ⏱️
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Daily Bonus</h3>
                  <p className="text-xs text-slate-400">Next bonus in 23:59:44</p>
                </div>
              </div>
              <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200">✓ Claimed</span>
            </div>

            {/* Watch Ad Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Watch Ad for Credits</h3>
                <p className="text-xs text-blue-100 mt-0.5">Watch a 5s video to earn 2 credits</p>
              </div>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-blue-50 transition">
                Watch Ad
              </button>
            </div>

            {/* Refer & Earn Card */}
            <div className="bg-white/90 backdrop-blur border border-blue-100 p-4 rounded-2xl shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Refer & Earn</h3>
                  <p className="text-xs text-slate-500">Get 3 credits per friend who joins</p>
                </div>
                <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">7 invited</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs text-slate-600 font-mono truncate">
                https://solvix.app/r/ALX-7K3F
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl text-xs font-semibold transition">Copy Link</button>
                <button 
                  onClick={() => setShowPayment(true)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-xs font-semibold shadow-md shadow-blue-600/30 transition"
                >
                  Upgrade Pro
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Payment</h3>
              <button onClick={() => setShowPayment(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">✕</button>
            </div>
            
            <div className="bg-slate-50 p-3 rounded-2xl flex justify-between items-center border border-slate-200">
              <span className="text-sm font-semibold text-slate-700">{selectedPlan}</span>
              <span className="text-base font-extrabold text-blue-600">499 BDT</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select payment method</label>
              <div className="grid grid-cols-3 gap-2">
                <button className="border-2 border-blue-600 bg-blue-50/50 p-3 rounded-2xl flex flex-col items-center gap-1 text-xs font-bold text-slate-800">
                  <span className="w-6 h-6 bg-pink-600 text-white rounded-md flex items-center justify-center text-[10px]">BV</span>
                  <span>bKash</span>
                </button>
                <button className="border border-slate-200 p-3 rounded-2xl flex flex-col items-center gap-1 text-xs font-bold text-slate-600">
                  <span className="w-6 h-6 bg-red-600 text-white rounded-md flex items-center justify-center text-[10px]">N</span>
                  <span>Nagad</span>
                </button>
                <button className="border border-slate-200 p-3 rounded-2xl flex flex-col items-center gap-1 text-xs font-bold text-slate-600">
                  <span className="w-6 h-6 bg-slate-800 text-white rounded-md flex items-center justify-center text-[10px]">💳</span>
                  <span>Card</span>
                </button>
              </div>
            </div>

            <div className="bg-blue-50/60 border border-blue-100 p-3 rounded-2xl text-xs space-y-1">
              <p className="font-semibold text-blue-900">Send Money to: <span className="font-mono text-blue-600">017XX-XXXXXX</span></p>
              <p className="text-slate-500 text-[11px]">Open your bKash app, send 499 BDT, then enter the Transaction ID below.</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Transaction ID (TrxID)</label>
              <input type="text" placeholder="e.g. 9XK4ABCD12" className="w-full border border-slate-200 bg-slate-50 px-3 py-2.5 rounded-xl text-sm outline-none focus:border-blue-500" />
            </div>

            <button 
              onClick={() => setShowPayment(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/30 hover:opacity-95 transition"
            >
              Verify Payment
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 py-3 px-6 flex justify-around max-w-md mx-auto shadow-lg">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-600' : 'text-slate-400'}`}>
          <span>🏠</span>
          <span className="text-[10px] font-semibold">Home</span>
        </button>
        <button onClick={() => setActiveTab('templates')} className={`flex flex-col items-center gap-1 ${activeTab === 'templates' ? 'text-blue-600' : 'text-slate-400'}`}>
          <span>🗂️</span>
          <span className="text-[10px] font-semibold">Templates</span>
        </button>
        <button onClick={() => setActiveTab('community')} className={`flex flex-col items-center gap-1 ${activeTab === 'community' ? 'text-blue-600' : 'text-slate-400'}`}>
          <span>👥</span>
          <span className="text-[10px] font-semibold">Community</span>
        </button>
      </nav>
    </div>
  );
}
