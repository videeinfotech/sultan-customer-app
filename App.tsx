
import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { Concierge } from './components/Concierge';
import { Studio } from './components/Studio';
import { Gallery } from './components/Gallery';
import { Home } from './components/Home';
import { Sidebar } from './components/Sidebar';
import { Search } from './components/Search';
import { Auctions } from './components/Auctions';
import { AuctionDetail } from './components/AuctionDetail';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Orders } from './components/Orders';
import { OrderSuccess } from './components/OrderSuccess';
import { OrderDetail } from './components/OrderDetail';
import { Social } from './components/Social';
import { SocialDetail } from './components/SocialDetail';
import { Profile } from './components/Profile';
import { ProductDetail } from './components/ProductDetail';
import { Addresses } from './components/Addresses';
import { View } from './types';
import { customerApi } from './api';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [currentView, setCurrentView] = useState<View>('home');

  // Handle mobile back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Push initial state
    if (!window.history.state) {
      window.history.replaceState({ view: 'home' }, '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view: View) => {
    // Validate that view is a string (not an event object)
    if (typeof view !== 'string') {
      console.error('navigateTo called with non-string value:', view);
      return;
    }

    // If navigating to login/register, log out first
    if (view === 'login' || view === 'register') {
      localStorage.removeItem('customer_token');
      localStorage.removeItem('customer_user');
      setIsLoggedIn(false);
      setUser(null);
      setAuthView(view === 'register' ? 'register' : 'login');
      return;
    }

    setCurrentView(view);
    try {
      window.history.pushState({ view: view }, '', `#${view}`);
    } catch (error) {
      console.error('Error pushing history state:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('customer_token');
    const savedUser = localStorage.getItem('customer_user');
    if (token && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
    const hasSeenOnboarding = localStorage.getItem('has_seen_onboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingFinish = () => {
    localStorage.setItem('has_seen_onboarding', 'true');
    setShowOnboarding(false);
  };

  const handleLogin = (userData: any, token: string) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer_user');
    setIsLoggedIn(false);
    setUser(null);
    setIsMenuOpen(false);
    setAuthView('login');
    setCurrentView('home');
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (showOnboarding) {
    return <Onboarding onFinish={handleOnboardingFinish} />;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex justify-center overflow-hidden">
        <div className="relative w-full max-w-[430px] h-screen bg-background-light dark:bg-background-dark text-[#181611] dark:text-white flex flex-col shadow-2xl overflow-hidden border-x border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
          {authView === 'login' ? (
            <Login
              onLogin={handleLogin}
              onRegisterClick={() => setAuthView('register')}
            />
          ) : (
            <Registration
              onBack={() => setAuthView('login')}
              onSuccess={handleLogin}
            />
          )}
        </div>
      </div>
    );
  }

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'cart': return 'Shopping Bag';
      case 'checkout': return 'Secure Checkout';
      case 'orders': return 'My Orders';
      case 'orderDetail': return 'Order Detail';
      case 'orderSuccess': return 'Confirmation';
      case 'search': return 'Discovery';
      case 'auctions': return 'Live Auctions';
      case 'auctionDetail': return 'Auction Portfolio';
      case 'studio': return 'Design Studio';
      case 'collection': return 'Heritage Shop';
      case 'social': return 'Exquisite Contests';
      case 'socialDetail': return 'Contest Details';
      case 'profile': return 'My Profile';
      case 'productDetail': return 'The Royal Solitaire';
      default: return 'Sultan';
    }
  };

  const isFullView = ['checkout', 'cart', 'socialDetail', 'productDetail', 'orderDetail', 'orderSuccess', 'addresses', 'auctionDetail'].includes(currentView);

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex justify-center overflow-hidden">
      {/* Mobile Frame Container */}
      <div className="relative w-full max-w-[430px] h-screen bg-background-light dark:bg-background-dark text-[#181611] dark:text-white flex flex-col shadow-2xl overflow-hidden border-x border-zinc-200 dark:border-zinc-800 transition-colors duration-300">

        {/* Side Menu Drawer Component */}
        <Sidebar
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onNavigate={navigateTo}
          onLogout={handleLogout}
        />

        {/* Persistent Navigation Header */}
        <header className={`sticky top-0 z-30 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-primary/10 shrink-0 ${isFullView ? 'hidden' : ''}`}>
          <div className="flex items-center p-4 justify-between">
            <div className="flex size-12 items-center justify-start">
              {['home', 'search', 'studio', 'auctions', 'collection', 'social', 'profile'].includes(currentView) ? (
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="flex items-center justify-center active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[#181611] dark:text-white">menu</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (currentView === 'socialDetail') navigateTo('social');
                    else if (currentView === 'productDetail') navigateTo('collection');
                    else if (currentView === 'orderDetail') navigateTo('orders');
                    else if (currentView === 'auctionDetail') navigateTo('auctions');
                    else navigateTo('home');
                  }}
                  className="flex items-center justify-center active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[#181611] dark:text-white">arrow_back_ios</span>
                </button>
              )}
            </div>
            <h1
              onClick={() => setCurrentView('home')}
              className={`text-[#181611] dark:text-white ${currentView === 'home' ? 'text-2xl font-bold tracking-[0.2em] uppercase font-serif' : 'text-lg font-bold'} flex-1 text-center cursor-pointer`}
            >
              {getHeaderTitle()}
            </h1>
            <div className="flex size-12 items-center justify-end gap-3">
              {currentView !== 'checkout' && currentView !== 'socialDetail' && currentView !== 'productDetail' && currentView !== 'addresses' && (
                <>
                  <button
                    onClick={() => navigateTo('search')}
                    className={`flex cursor-pointer items-center justify-center p-0 active:scale-90 transition-transform ${currentView === 'search' ? 'text-primary' : 'text-[#181611] dark:text-white'}`}
                  >
                    <span className="material-symbols-outlined">search</span>
                  </button>
                  <button
                    onClick={() => navigateTo('cart')}
                    className={`flex cursor-pointer items-center justify-center p-0 active:scale-90 transition-transform ${currentView === 'cart' ? 'text-primary' : 'text-[#181611] dark:text-white'}`}
                  >
                    <span className="material-symbols-outlined">shopping_bag</span>
                  </button>
                </>
              )}
              {currentView === 'checkout' && (
                <span className="material-symbols-outlined text-primary">shield</span>
              )}
              {(currentView === 'socialDetail' || currentView === 'productDetail') && (
                <span className="material-symbols-outlined text-primary">share</span>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {currentView === 'home' && <Home onNavigate={navigateTo} />}
          {currentView === 'concierge' && <div className="h-full overflow-hidden"><Concierge /></div>}
          {currentView === 'studio' && <div className="h-full overflow-y-auto no-scrollbar"><Studio /></div>}
          {currentView === 'collection' && <div className="h-full overflow-y-auto no-scrollbar"><Gallery onNavigate={navigateTo} /></div>}
          {currentView === 'search' && <Search onNavigate={navigateTo} />}
          {currentView === 'auctions' && <Auctions onNavigate={navigateTo} />}
          {currentView === 'auctionDetail' && <AuctionDetail onNavigate={navigateTo} />}
          {currentView === 'cart' && <Cart onNavigate={navigateTo} />}
          {currentView === 'checkout' && <Checkout onNavigate={navigateTo} />}
          {currentView === 'orders' && <Orders onNavigate={navigateTo} />}
          {currentView === 'orderDetail' && <OrderDetail onNavigate={navigateTo} />}
          {currentView === 'orderSuccess' && <OrderSuccess onNavigate={navigateTo} />}
          {currentView === 'social' && <Social onNavigate={navigateTo} />}
          {currentView === 'socialDetail' && <SocialDetail />}
          {currentView === 'profile' && <Profile onLogout={handleLogout} onNavigate={navigateTo} />}
          {currentView === 'productDetail' && <ProductDetail onNavigate={navigateTo} />}
          {currentView === 'addresses' && <Addresses onNavigate={navigateTo} />}
        </main>

        {/* Persistent Bottom Tab Bar */}
        {!isFullView && (
          <nav className="absolute bottom-0 w-full z-30 px-4 pb-6 pt-2 pointer-events-none">
            <div className="w-full h-16 rounded-full border shadow-2xl pointer-events-auto flex items-center justify-around px-4 transition-all duration-500 bg-white/95 dark:bg-[#1a1608]/95 backdrop-blur-xl border-primary/20">
              {[
                { id: 'home', icon: 'home', label: 'Home' },
                { id: 'collection', icon: 'diamond', label: 'Shop' },
                { id: 'auctions', icon: 'gavel', label: 'Auction' },
                { id: 'social', icon: 'emoji_events', label: 'Contest' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => navigateTo(tab.id as View)}
                  className={`flex flex-col items-center gap-1 transition-all ${currentView === tab.id || (tab.id === 'social' && currentView === 'socialDetail')
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
        )}

        {/* Bottom Safe Area Spacer */}
        <div className="h-6 shrink-0 bg-transparent"></div>
      </div>
    </div>
  );
};

export default App;
