import React, { useState } from 'react';
import { players } from '../data/players';
import { Shield, Lock, User } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const player = players.find(
      (p) => p.username.toLowerCase() === username.toLowerCase() && p.password === password
    );

    if (player) {
      onLogin(player);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-[#0a0a0c] to-[#0a0a0c]">
      <div className="w-full max-w-md p-10 glass animate-fade-in relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
        
        <div className="flex flex-col items-center mb-10 relative z-10">
          <div className="mb-6 transform hover:scale-110 transition-transform duration-500">
            <img src="/logo.png" alt="Sparks FC Logo" className="w-32 h-auto drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          </div>
          <h1 className="text-4xl font-black tracking-[0.1em] text-white uppercase italic">
            SPARKS <span className="text-blue-600">FC</span>
          </h1>
          <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full"></div>
          <p className="text-xs text-gray-400 mt-4 uppercase tracking-[0.3em] font-semibold">Elite Player Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                className="w-full pl-10 bg-white/5 border border-white/10 rounded-xl py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="Enter player username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                className="w-full pl-10 bg-white/5 border border-white/10 rounded-xl py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20 transform hover:-translate-y-1"
          >
            Authenticate
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-gray-500 uppercase tracking-widest">
          Secure Infrastructure &bull; 2026
        </p>
      </div>
    </div>
  );
};

export default Login;
