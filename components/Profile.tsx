
import React from 'react';

interface ProfileProps {
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const menuItems = [
    { icon: 'person', label: 'Personal Information', sub: 'Name, Email, Mobile' },
    { icon: 'location_on', label: 'Shipping Addresses', sub: '3 addresses saved' },
    { icon: 'payments', label: 'Payment Methods', sub: 'Visa •••• 4242' },
    { icon: 'notifications', label: 'Notifications', sub: 'Auction alerts, Order updates' },
    { icon: 'security', label: 'Privacy & Security', sub: 'Password, Biometrics' },
    { icon: 'help', label: 'Help & Support', sub: 'FAQ, Contact Concierge' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display overflow-y-auto no-scrollbar pb-32">
      {/* Profile Header Card */}
      <div className="px-4 pt-6">
        <div className="bg-white dark:bg-zinc-800/50 rounded-2xl p-6 border border-zinc-100 dark:border-white/5 shadow-sm flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="size-24 rounded-full border-2 border-primary p-1 overflow-hidden">
              <img 
                className="h-full w-full object-cover rounded-full bg-zinc-100" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6WAcb6-opdEVA4ZDnV6_MgmrgNtA0ptck89WmhNRSozCQxYFCnSCZm4QWyG4w4OstfTFofx--CcPaptTTIXZQzkhtVbYFSV7BNQnktNAooh5FFPLKpunwAJPN9qYXNKoObEdl90uzVR97tHwJUph3Ci0VeQrLmOuFoIPg1DKY7J8BdUfwAfaMKxqyWGzt6rF1BVWHdIJP-x1xkrp1rJLGfxMI8D-kikAgpgQCUaZH3x3mrNDTrx6RyH1e_8Tn6PL11XGyPFlmHyN3" 
                alt="User Profile" 
              />
            </div>
            <div className="absolute -bottom-1 -right-1 size-8 bg-primary rounded-full flex items-center justify-center border-4 border-white dark:border-zinc-800">
              <span className="material-symbols-outlined text-white text-base">verified</span>
            </div>
          </div>
          <h2 className="text-charcoal dark:text-white text-2xl font-serif font-bold tracking-tight">Al-Sultan Vanderbilt</h2>
          <p className="text-gold-muted text-[10px] font-bold uppercase tracking-[0.25em] mt-1">Royal Circle Member</p>
          
          <div className="flex gap-4 mt-6 w-full">
            <div className="flex-1 bg-primary/5 rounded-xl p-3 border border-primary/10">
              <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Points</p>
              <p className="text-charcoal dark:text-white text-lg font-bold">12,450</p>
            </div>
            <div className="flex-1 bg-primary/5 rounded-xl p-3 border border-primary/10">
              <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Status</p>
              <p className="text-charcoal dark:text-white text-lg font-bold">Gold</p>
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
            <p className="text-white text-sm font-medium leading-tight">You are eligible for private heritage viewing in Delhi.</p>
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
