
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, onLogout }) => {
  const navItems: { id: View | string; icon: string; label: string }[] = [
    { id: 'collection', icon: 'diamond', label: 'Collections' },
    { id: 'studio', icon: 'edit_note', label: 'Bespoke Services' },
    { id: 'education', icon: 'school', label: 'Diamond Education' },
    { id: 'account', icon: 'person', label: 'My Account' },
    { id: 'concierge', icon: 'support_agent', label: 'Concierge' },
    { id: 'locator', icon: 'distance', label: 'Store Locator' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Side Menu Drawer */}
      <div 
        className={`absolute left-0 top-0 z-50 flex h-full w-[320px] flex-col bg-background-light dark:bg-background-dark shadow-2xl transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* User Profile Header */}
        <div className="flex flex-col gap-4 px-8 pb-8 pt-16">
          <div className="relative size-20 rounded-full border border-primary p-1">
            <div className="h-full w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <img 
                className="h-full w-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6WAcb6-opdEVA4ZDnV6_MgmrgNtA0ptck89WmhNRSozCQxYFCnSCZm4QWyG4w4OstfTFofx--CcPaptTTIXZQzkhtVbYFSV7BNQnktNAooh5FFPLKpunwAJPN9qYXNKoObEdl90uzVR97tHwJUph3Ci0VeQrLmOuFoIPg1DKY7J8BdUfwAfaMKxqyWGzt6rF1BVWHdIJP-x1xkrp1rJLGfxMI8D-kikAgpgQCUaZH3x3mrNDTrx6RyH1e_8Tn6PL11XGyPFlmHyN3" 
                alt="User Profile" 
              />
            </div>
          </div>
          <div>
            <h2 className="text-charcoal dark:text-white text-2xl font-bold leading-tight tracking-tight font-noto">Welcome, Al-Sultan</h2>
            <p className="text-primary text-xs font-medium uppercase tracking-[0.2em] mt-1">Royal Member</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 overflow-y-auto no-scrollbar">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li 
                key={item.id}
                onClick={() => {
                  if (['collection', 'studio', 'concierge'].includes(item.id)) {
                    onNavigate(item.id as View);
                    onClose();
                  }
                }}
                className="group flex h-14 items-center gap-4 rounded-full px-4 transition-colors hover:bg-primary/5 cursor-pointer"
              >
                <div className="flex size-10 items-center justify-center">
                  <span className="material-symbols-outlined text-[28px] text-primary">{item.icon}</span>
                </div>
                <p className="text-charcoal dark:text-white text-lg font-medium leading-tight truncate font-noto">{item.label}</p>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="mt-auto p-6 space-y-2 border-t border-zinc-100 dark:border-white/10">
          <div className="flex justify-start">
            <button 
              onClick={onLogout}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-4 bg-transparent text-charcoal dark:text-white gap-3 text-sm font-bold leading-normal tracking-wide transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <span className="material-symbols-outlined !text-charcoal dark:!text-white">logout</span>
              <span className="truncate font-display uppercase">Logout</span>
            </button>
          </div>
          
          <div className="flex flex-col px-4 pt-2">
            <p className="text-primary text-[10px] font-bold uppercase tracking-widest pb-1">Sultan & Co. Jewelers</p>
            <a className="text-zinc-400 dark:text-zinc-500 text-xs font-normal leading-normal underline decoration-zinc-300" href="#">Legal & Privacy Policy</a>
          </div>
        </div>

        {/* Safe area padding for iOS */}
        <div className="h-8 shrink-0"></div>
      </div>

      {/* Close Interaction Area */}
      {isOpen && (
        <button 
          onClick={onClose}
          className="absolute right-4 top-10 z-50 h-12 w-12 flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined !text-white !text-3xl">close</span>
        </button>
      )}
    </>
  );
};
