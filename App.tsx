
import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { Concierge } from './components/Concierge';
import { Studio } from './components/Studio';
import { Gallery } from './components/Gallery';
import { Home } from './components/Home';
import { Sidebar } from './components/Sidebar';
import { Search } from './components/Search';
import { Auctions } from './components/Auctions';
import { View } from './types';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [currentView, setCurrentView] = useState<View>('home');

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[430px] h-screen bg-background-light dark:bg-background-dark text-[#181611] dark:text-white flex flex-col shadow-2xl overflow-hidden border-x border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
          {authView === 'login' ? (
            <Login 
              onLogin={() => setIsLoggedIn(true)} 
              onRegisterClick={() => setAuthView('register')}
            />
          ) : (
            <Registration 
              onBack={() => setAuthView('login')}
              onSuccess={() => setIsLoggedIn(true)}
            />
          )}
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    setAuthView('login');
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex justify-center overflow-hidden">
      {/* Mobile Frame Container */}
      <div className="relative w-full max-w-[430px] h-screen bg-background-light dark:bg-background-dark text-[#181611] dark:text-white flex flex-col shadow-2xl overflow-hidden border-x border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
        
        {/* Side Menu Drawer Component */}
        <Sidebar 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
          onNavigate={setCurrentView}
          onLogout={handleLogout}
        />

        {/* Persistent Navigation Header */}
        <header className="sticky top-0 z-30 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-primary/10 shrink-0">
          <div className="flex items-center p-4 justify-between">
            <div className="flex size-12 items-center justify-start">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center justify-center active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-[#181611] dark:text-white">menu</span>
              </button>
            </div>
            <h1 
              onClick={() => setCurrentView('home')}
              className="text-[#181611] dark:text-white text-2xl font-bold tracking-[0.2em] flex-1 text-center uppercase cursor-pointer font-serif"
            >
              Sultan
            </h1>
            <div className="flex size-12 items-center justify-end gap-3">
              <button 
                onClick={() => setCurrentView('search')}
                className={`flex cursor-pointer items-center justify-center p-0 active:scale-90 transition-transform ${currentView === 'search' ? 'text-primary' : 'text-[#181611] dark:text-white'}`}
              >
                <span className="material-symbols-outlined">search</span>
              </button>
              <button className="flex cursor-pointer items-center justify-center p-0 active:scale-90 transition-transform text-[#181611] dark:text-white">
                <span className="material-symbols-outlined">shopping_bag</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {currentView === 'home' && <Home onNavigate={setCurrentView} />}
          {currentView === 'concierge' && <div className="h-full overflow-hidden"><Concierge /></div>}
          {currentView === 'studio' && <div className="h-full overflow-y-auto no-scrollbar"><Studio /></div>}
          {currentView === 'collection' && <div className="h-full overflow-y-auto no-scrollbar"><Gallery /></div>}
          {currentView === 'search' && <Search onNavigate={setCurrentView} />}
          {currentView === 'auctions' && <Auctions />}
        </main>

        {/* Persistent Bottom Tab Bar */}
        <nav className="absolute bottom-0 w-full z-30 px-4 pb-6 pt-2 pointer-events-none">
          <div className="w-full h-16 rounded-full border shadow-2xl pointer-events-auto flex items-center justify-around px-4 transition-all duration-500 bg-white/95 dark:bg-[#1a1608]/95 backdrop-blur-xl border-primary/20">
            {[
              { id: 'home', icon: 'home', label: 'Home' },
              { id: 'auctions', icon: 'gavel', label: 'Auctions' },
              { id: 'studio', icon: 'draw', label: 'Studio' },
              { id: 'concierge', icon: 'auto_awesome', label: 'Chat' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setCurrentView(tab.id as View)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  currentView === tab.id 
                    ? 'text-primary scale-110' 
                    : 'text-zinc-400'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                <span className="text-[7px] font-bold uppercase tracking-tighter">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom Safe Area Spacer */}
        <div className="h-6 shrink-0 bg-transparent"></div>
      </div>
    </div>
  );
};

export default App;
