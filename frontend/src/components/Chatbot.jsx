import React, { useState, useRef, useEffect } from 'react';
import { players } from '../data/players';
import { clubInfo } from '../data/clubInfo';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Hello! I'm the Sparks FC Assistant. Ask me about any player's characteristics or club history!" }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    
    const query = input.toLowerCase();
    let response = "I'm not sure about that. Try asking about a specific player like 'Tell me about Farid' or 'What are Musa's stats?'";

    // Search for players
    const foundPlayer = players.find(p => 
      query.includes(p.name.toLowerCase()) || 
      query.includes(p.username.toLowerCase()) ||
      (p.role && query.includes(p.role.toLowerCase()))
    );

    if (foundPlayer) {
      if (query.includes('stats') || query.includes('характеристика') || query.includes('char') || query.includes('power')) {
        response = `📊 **${foundPlayer.name}'s Stats:**
        - Speed: ${foundPlayer.stats.speed}
        - Shooting: ${foundPlayer.stats.shooting}
        - Passing: ${foundPlayer.stats.passing}
        - Dribbling: ${foundPlayer.stats.dribbling}
        - Physical: ${foundPlayer.stats.physical}
        - Defense: ${foundPlayer.stats.defense}`;
      } else {
        response = `⚽ **${foundPlayer.name} (${foundPlayer.role}):**
        ${foundPlayer.description}
        
        🧠 **AI Analysis:** ${foundPlayer.ai_note}`;
      }
    } else if (query.includes('history') || query.includes('клуб') || query.includes('история') || query.includes('about')) {
      response = `🏛️ **About Sparks FC:** 
      Founding Year: ${clubInfo.founded}
      Titles: ${clubInfo.titles}
      
      Our Mission: ${clubInfo.mission}`;
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: response }]);
    }, 600);

    setInput('');
  };

  return (
    <div className="chat-container">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        >
          <MessageSquare className="text-white w-8 h-8" />
        </button>
      ) : (
        <div className="chat-window glass flex flex-col animate-fade-in shadow-2xl border-blue-500/30">
          <div className="chat-header">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-400" />
              </div>
              <span className="font-bold text-sm tracking-wide">SPARKS ASSISTANT</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="chat-messages scrollbar-hide">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.type} flex gap-2`}>
                {msg.type === 'bot' && <Bot className="w-4 h-4 mt-1 shrink-0 text-blue-400" />}
                <span>{msg.text}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input border-t border-white/10">
            <input 
              type="text" 
              placeholder="Ask about players..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <button 
              onClick={handleSend}
              className="p-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
