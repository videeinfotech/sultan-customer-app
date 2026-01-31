
import React, { useState } from 'react';
import { generateJewelryDesign } from '../services/geminiService';

export const Studio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDesign = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    try {
      const img = await generateJewelryDesign(prompt);
      setResult(img);
    } catch (e) {
      console.error(e);
      alert("Our artisans are busy. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-5 space-y-6 pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-display italic text-zinc-900 dark:text-white">Design Studio</h2>
        <p className="text-[9px] text-primary uppercase tracking-[0.3em]">Manifest Your Vision</p>
      </div>

      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800/50 border border-primary/10 flex items-center justify-center shadow-inner">
        {result ? (
          <img src={result} alt="AI Design" className="w-full h-full object-cover animate-in fade-in duration-700" />
        ) : (
          <div className="text-center space-y-3 p-8 opacity-40">
            <span className="material-symbols-outlined !text-5xl text-primary">draw</span>
            <p className="text-xs font-display italic">Describe your masterpiece</p>
          </div>
        )}
        
        {loading && (
          <div className="absolute inset-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] tracking-widest uppercase text-primary font-bold">Crafting...</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A Polki necklace with oversized rubies..."
            className="w-full bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-sm min-h-[100px] focus:ring-1 focus:ring-primary outline-none shadow-sm dark:text-zinc-200"
          />
        </div>

        <button
          onClick={handleDesign}
          disabled={loading || !prompt}
          className="w-full py-4 bg-primary text-background-dark rounded-full font-bold tracking-widest uppercase shadow-lg active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? 'Processing...' : 'Generate Design'}
          <span className="material-symbols-outlined text-sm">magic_button</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-center">
          <p className="text-[8px] text-primary uppercase font-bold mb-1">Recent Trend</p>
          <p className="text-[10px] italic text-zinc-500">"Emerald layering"</p>
        </div>
        <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-center">
          <p className="text-[8px] text-primary uppercase font-bold mb-1">Craft Tip</p>
          <p className="text-[10px] italic text-zinc-500">"Polki with pearls"</p>
        </div>
      </div>
    </div>
  );
};
