import React from 'react';
import History from './History';
import { players } from '../data/players';
import { Trophy, Users, Calendar, Zap, Star, ShieldCheck } from 'lucide-react';

const Dashboard = ({ user }) => {
  return (
    <div className="min-h-screen pb-20">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="font-black tracking-widest text-xl">SPARKS <span className="text-blue-600">FC</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Authenticated: <span className="text-white font-semibold">{user.name}</span></span>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
            {user.name.charAt(0)}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551952237-954a0e68786c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30 grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
            <Star className="w-3 h-3 fill-current" /> Official Team Portal
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none">
            IGNITE THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">VICTORY</span>
          </h1>
          <p className="text-xl text-gray-400 font-light leading-relaxed mb-10">
            More than a club. A legacy built on discipline, strategy, and the relentless pursuit of greatness.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30">View Match Schedule</button>
            <button className="px-8 py-4 glass hover:bg-white/10 rounded-xl font-bold transition-all">Club Registry</button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20 grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Trophies', value: '12', icon: Trophy, color: 'text-yellow-500' },
          { label: 'Win Rate', value: '78%', icon: Zap, color: 'text-blue-500' },
          { label: 'Active Players', value: '24', icon: Users, color: 'text-green-500' },
          { label: 'Clean Sheets', value: '42', icon: ShieldCheck, color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="glass p-8 flex items-center gap-5 group hover:border-blue-500/50 transition-all duration-500">
            <div className={`p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">{stat.label}</p>
              <p className="text-3xl font-black">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Player Showcase */}
      <div className="max-w-7xl mx-auto px-4 mt-32">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-5xl font-black tracking-tight italic">SQUAD <span className="text-blue-600">HIGHLIGHTS</span></h2>
          <div className="hidden md:block h-[1px] flex-1 mx-12 bg-white/10"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {players.map((p) => (
            <div key={p.id} className="group relative glass p-6 hover:bg-white/5 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                 <span className="text-6xl font-black italic">{p.role.charAt(0)}</span>
              </div>
              <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-2">{p.role}</p>
              <h3 className="text-2xl font-black mb-4 group-hover:text-blue-400 transition-colors">{p.name}</h3>
              <div className="space-y-3">
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${p.stats.speed}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] uppercase font-bold text-gray-500 tracking-tighter">
                  <span>Speed</span>
                  <span className="text-white">{p.stats.speed}</span>
                </div>
              </div>
              <p className="mt-6 text-sm text-gray-500 line-clamp-3 italic leading-relaxed">"{p.description}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 mt-32">
        <History />
      </div>
    </div>
  );
};

export default Dashboard;
