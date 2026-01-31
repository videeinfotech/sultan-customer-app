
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { chatWithConcierge } from '../services/geminiService';

export const Concierge: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Namaste. I am your Sultan Concierge. How may I assist you with our heritage collections today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithConcierge(input);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: response.text,
        sources: response.sources
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "I apologize, but I am having trouble connecting to the heritage archives. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="px-5 py-4 border-b border-primary/10 flex items-center justify-between bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
        <div>
          <h2 className="text-lg font-display font-bold text-zinc-900 dark:text-white">Concierge</h2>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-[9px] text-primary uppercase tracking-widest font-bold">Online Now</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-primary">support_agent</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] rounded-2xl px-4 py-3 ${
              m.role === 'user' 
                ? 'bg-primary text-background-dark shadow-sm rounded-tr-none' 
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-tl-none'
            }`}>
              <p className="text-xs leading-relaxed whitespace-pre-wrap">{m.content}</p>
              {m.sources && m.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                  <p className="text-[8px] uppercase tracking-wider mb-2 opacity-50 font-bold">Heritage Links:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.sources.map((s, si) => (
                      <a 
                        key={si} 
                        href={s.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[8px] px-2 py-1 bg-white/20 dark:bg-black/20 rounded-full border border-current hover:bg-white/40 transition-colors truncate max-w-[120px]"
                      >
                        {s.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
              <div className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800 pb-20">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-full px-5 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg active:scale-90 transition-transform disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-background-dark text-xl">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
