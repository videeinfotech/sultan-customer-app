import React, { useEffect, useState } from 'react';

type View = 'addresses' | 'orders' | 'concierge';

interface ProfileProps {
  onLogout: () => void;
  onNavigate: (view: View) => void;
}

export const Profile: React.FC<ProfileProps> = ({ onLogout, onNavigate }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('customer_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const menuItems = [
    { icon: 'person', label: 'Personal Information', sub: user?.email || 'Update your details' },
    { icon: 'location_on', label: 'Shipping Addresses', sub: 'Manage your delivery locations', view: 'addresses' as View },
    { icon: 'payments', label: 'Payment Methods', sub: 'Saved cards and wallets' },
    { icon: 'notifications', label: 'Notifications', sub: 'Auction alerts, Order updates', view: 'orders' as View },
    { icon: 'security', label: 'Privacy & Security', sub: 'Password and account safety' },
    { icon: 'help', label: 'Help & Support', sub: 'FAQ, Contact Concierge', view: 'concierge' as View },
  ];

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display overflow-y-auto no-scrollbar pb-32">
      {/* Profile Header Card */}
      <div className="px-4 pt-6">
        <div className="bg-white dark:bg-zinc-800/50 rounded-2xl p-6 border border-zinc-100 dark:border-white/5 shadow-sm flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="size-24 rounded-full border-2 border-primary p-1 overflow-hidden">
              <div className="h-full w-full rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif text-3xl font-bold">
                {user?.name?.charAt(0) || 'S'}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 size-8 bg-primary rounded-full flex items-center justify-center border-4 border-white dark:border-zinc-800">
              <span className="material-symbols-outlined text-white text-base">verified</span>
            </div>
          </div>
          <h2 className="text-charcoal dark:text-white text-2xl font-serif font-bold tracking-tight">{user?.name || 'Sultan Member'}</h2>
          <p className="text-gold-muted text-[10px] font-bold uppercase tracking-[0.25em] mt-1">{user?.membership_level || 'Royal Circle Member'}</p>

          <div className="flex gap-4 mt-6 w-full">
            <div className="flex-1 bg-primary/5 rounded-xl p-3 border border-primary/10">
              <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Points</p>
              <p className="text-charcoal dark:text-white text-lg font-bold">{user?.loyalty_points || '0'}</p>
            </div>
            <div className="flex-1 bg-primary/5 rounded-xl p-3 border border-primary/10">
              <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Status</p>
              <p className="text-charcoal dark:text-white text-lg font-bold">{user?.status || 'Active'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sultan Circle Benefits */}
      <div className="px-4 mt-6">
        <div className="bg-[#181611] dark:bg-black rounded-2xl p-5 relative overflow-hidden flex items-center gap-4">
          <div className="absolute inset-0 filigree-bg"></div>
          <div className="size-12 bg-primary rounded-full flex items-center justify-center shrink-0 z-10 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white">workspace_premium</span>
          </div>
          <div className="z-10">
            <h4 className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Sultan Circle Benefits</h4>
            <p className="text-white text-sm font-medium leading-tight">You have exclusive early access to heritage collections.</p>
          </div>
        </div>
      </div>

      {/* Account Settings List */}
      <div className="px-4 mt-8 flex flex-col gap-3 font-noto">
        <h3 className="text-gold-muted text-[10px] font-bold uppercase tracking-[0.2em] mb-1 ml-1">Account Settings</h3>
        {menuItems.map((item, i) => (
          <button
            key={i}
            className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-2xl border border-zinc-100 dark:border-white/5 shadow-sm active:scale-[0.98] transition-all text-left"
          >
            <div className="size-10 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-gold-muted text-xl">{item.icon}</span>
            </div>
            <div className="flex-1">
              <p className="text-charcoal dark:text-white text-sm font-bold">{item.label}</p>
              <p className="text-gold-muted text-[10px]">{item.sub}</p>
            </div>
            <span className="material-symbols-outlined text-zinc-300">chevron_right</span>
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-10">
        <button
          onClick={onLogout}
          className="w-full py-4 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-500 font-bold text-sm uppercase tracking-widest active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          Logout Account
        </button>
      </div>

      <p className="text-center text-gold-muted text-[9px] mt-8 opacity-50 uppercase tracking-widest">Version 2.4.0 • Sultan Heritage</p>
    </div>
  );
};
