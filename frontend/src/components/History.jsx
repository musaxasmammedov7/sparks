import React from 'react';
import { clubInfo } from '../data/clubInfo';

const History = () => {
  return (
    <section className="py-12">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight">CLUB <span className="text-blue-600">HISTORY</span></h2>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-600/50 to-transparent"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
          {clubInfo.history.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="p-4 border-l-2 border-blue-600 bg-blue-600/5">
              <p className="text-white font-bold text-2xl">{clubInfo.founded}</p>
              <p className="text-sm">Founding Year</p>
            </div>
            <div className="p-4 border-l-2 border-blue-600 bg-blue-600/5">
              <p className="text-white font-bold text-2xl">{clubInfo.titles}</p>
              <p className="text-sm">Major Titles</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-video rounded-3xl overflow-hidden glass p-2">
            <img 
              src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Football Team" 
              className="w-full h-full object-cover rounded-2xl opacity-80"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default History;
