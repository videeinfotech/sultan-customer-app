
import React, { useEffect, useState } from 'react';

export const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 500);
          return 100;
        }
        return old + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background-light dark:bg-background-dark font-display antialiased">
      <div className="shimmer-effect pointer-events-none"></div>
      
      <div className="flex flex-col items-center justify-center grow w-full z-10 px-8">
        <div className="logo-shadow mb-8 flex flex-col items-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center border border-primary/10 transition-transform duration-1000 ease-out scale-100">
            <span className="material-symbols-outlined text-primary !text-7xl md:!text-8xl">
              diamond
            </span>
            <div className="absolute inset-0 border-[0.5px] border-primary/30 rounded-full scale-110"></div>
          </div>
          <h1 className="mt-8 text-3xl md:text-4xl font-medium tracking-[0.2em] text-[#181611] dark:text-white uppercase">
            Sultan
          </h1>
        </div>
        
        <div className="flex flex-col items-center">
          <p className="text-[#4a4a4a] dark:text-[#a0a0a0] text-[10px] md:text-xs font-normal tracking-[0.3em] uppercase leading-normal px-4 text-center">
            Handcrafted in India
          </p>
          <div className="mt-2 w-8 h-[1px] bg-primary/40"></div>
        </div>
      </div>

      <div className="w-full max-w-xs px-12 pb-24 z-10">
        <div className="flex flex-col gap-3">
          <div className="rounded-full bg-primary/10 dark:bg-primary/5 h-1 overflow-hidden">
            <div 
              className="h-full rounded-full bg-primary transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[#8a8060] text-[9px] tracking-widest text-center uppercase">Authenticity Guaranteed</p>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply dark:mix-blend-screen overflow-hidden">
        <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC0UyFyIfaMCpXilw9wayhQWcN1ct8ObgyIJ1zlx0deEWXMqFJWyTCTSZPh9P1ULS8buKQ5GC0BCZ6UxNWyCc5opjhV-jB2nx0KWZ3JIzv0XfZQhHR4VeZK8LUETCEhAoPYlVt4jalBaBxMhBctfsUv0HOj9qT54ILv7JPXdnNMbyg12ugXQddJUBP7AAVBzOWOQvcaUI4fdtUDEMM0ADC9A03_AHQNSf7YrAa6cmyjxr6liJwLSH3xUnD2wN7VHPxadKuKbh1hvbZ2")' }}></div>
      </div>
    </div>
  );
};
