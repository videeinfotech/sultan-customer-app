
import React from 'react';

interface RegistrationProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const Registration: React.FC<RegistrationProps> = ({ onBack, onSuccess }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full max-w-[430px] mx-auto flex-col bg-white dark:bg-background-dark overflow-x-hidden font-sans">
      {/* Top Navigation */}
      <div className="flex items-center bg-white dark:bg-background-dark p-4 pt-10 pb-2 justify-between sticky top-0 z-10 shadow-sm md:shadow-none">
        <button 
          onClick={onBack}
          className="text-[#181611] dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-[#181611] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Registration</h2>
      </div>

      {/* Progress Indicator */}
      <div className="flex flex-col gap-3 p-6 pt-2">
        <div className="flex gap-6 justify-between items-center">
          <p className="text-[#181611] dark:text-white text-[10px] font-semibold uppercase tracking-wider leading-normal">Step 1 of 3: Profile Details</p>
          <p className="text-primary text-xs font-bold leading-normal">33%</p>
        </div>
        <div className="rounded-full bg-primary/10 h-1.5 overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-700 ease-out" style={{ width: '33.33%' }}></div>
        </div>
      </div>

      {/* Headline */}
      <div className="px-6 py-4">
        <h2 className="text-[#181611] dark:text-white tracking-tight text-[32px] font-bold leading-tight">Create Your Account</h2>
        <p className="text-[#8a8060] dark:text-gray-400 mt-2 text-sm">Enter your details to join our exclusive circle of luxury collectors.</p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-2 px-6 py-4 flex-1">
        {/* Full Name */}
        <div className="flex flex-col py-3">
          <p className="text-[#181611] dark:text-white text-sm font-semibold leading-normal pb-2 px-1">Full Name</p>
          <input 
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-[#181611] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e6e3db] dark:border-gray-700 bg-white dark:bg-[#2d281a] h-14 placeholder:text-[#8a8060] px-6 text-base font-normal transition-all" 
            placeholder="Enter your full name" 
          />
        </div>

        {/* Mobile Number */}
        <div className="flex flex-col py-3">
          <p className="text-[#181611] dark:text-white text-sm font-semibold leading-normal pb-2 px-1">Mobile Number</p>
          <div className="relative flex items-center">
            <div className="absolute left-5 flex items-center gap-1 border-r border-gray-200 dark:border-gray-600 pr-3">
              <span className="text-[#181611] dark:text-white font-medium">+91</span>
            </div>
            <input 
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-[#181611] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e6e3db] dark:border-gray-700 bg-white dark:bg-[#2d281a] h-14 placeholder:text-[#8a8060] pl-20 pr-5 text-base font-normal transition-all" 
              placeholder="000 000 0000" 
              type="tel"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col py-3">
          <p className="text-[#181611] dark:text-white text-sm font-semibold leading-normal pb-2 px-1">Email Address</p>
          <input 
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-[#181611] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e6e3db] dark:border-gray-700 bg-white dark:bg-[#2d281a] h-14 placeholder:text-[#8a8060] px-6 text-base font-normal transition-all" 
            placeholder="yourname@luxury.com" 
            type="email" 
          />
        </div>

        {/* CTA Button */}
        <div className="pt-8 pb-4">
          <button 
            onClick={onSuccess}
            className="w-full h-16 bg-primary hover:bg-[#e0ab0b] text-[#181611] font-bold text-lg rounded-full shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            Create Account
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="px-6 py-6 border-t border-gray-100 dark:border-gray-800 mt-4 bg-gray-50/50 dark:bg-black/10">
        <div className="flex justify-center gap-8 items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <div className="text-center">
              <p className="text-[#181611] dark:text-white text-[10px] font-bold uppercase tracking-tight">GIA Certified</p>
              <p className="text-[#8a8060] text-[9px]">Diamonds</p>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[28px]">gpp_good</span>
            </div>
            <div className="text-center">
              <p className="text-[#181611] dark:text-white text-[10px] font-bold uppercase tracking-tight">100% Secure</p>
              <p className="text-[#8a8060] text-[9px]">Payments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-10 pt-6 text-center">
        <p className="text-[#8a8060] dark:text-gray-400 text-sm">
          Already have an account? 
          <button 
            onClick={onBack}
            className="text-primary font-bold hover:underline ml-1"
          >
            Log In
          </button>
        </p>
      </div>

      {/* iOS Home Indicator Space */}
      <div className="h-5 shrink-0"></div>
    </div>
  );
};
