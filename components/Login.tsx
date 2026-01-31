
import React, { useState } from 'react';

export const Login: React.FC<{ onLogin: () => void; onRegisterClick: () => void }> = ({ onLogin, onRegisterClick }) => {
  const [method, setMethod] = useState<'Mobile' | 'Email'>('Mobile');

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-900 overflow-hidden font-sans">
      {/* TopAppBar with Gold Accent */}
      <div className="flex items-center bg-white dark:bg-neutral-900 p-4 pt-10 pb-2 justify-between border-t-4 border-primary shadow-sm">
        <div className="text-[#181611] dark:text-white flex size-12 shrink-0 items-center justify-start">
          <span className="material-symbols-outlined cursor-pointer">arrow_back_ios</span>
        </div>
        <h2 className="text-[#181611] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12 font-display">Sultan Style</h2>
      </div>

      {/* Hero Branding / Image */}
      <div className="flex flex-col items-center justify-center pt-8 pb-4">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-500">
          <span className="material-symbols-outlined text-primary text-4xl">diamond</span>
        </div>
        <h1 className="text-[#181611] dark:text-white tracking-tight text-[32px] font-bold leading-tight px-4 text-center">Login / Sign Up</h1>
        <p className="text-[#8a8060] dark:text-neutral-400 text-sm mt-2">Enter your details to continue</p>
      </div>

      {/* SegmentedButtons Toggle */}
      <div className="flex px-6 py-6">
        <div className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#f5f3f0] dark:bg-neutral-800 p-1">
          <button
            onClick={() => setMethod('Mobile')}
            className={`flex flex-1 items-center justify-center rounded-full h-full text-sm font-semibold transition-all ${
              method === 'Mobile' ? 'bg-white dark:bg-neutral-700 shadow-sm text-[#181611] dark:text-white' : 'text-[#8a8060]'
            }`}
          >
            Mobile
          </button>
          <button
            onClick={() => setMethod('Email')}
            className={`flex flex-1 items-center justify-center rounded-full h-full text-sm font-semibold transition-all ${
              method === 'Email' ? 'bg-white dark:bg-neutral-700 shadow-sm text-[#181611] dark:text-white' : 'text-[#8a8060]'
            }`}
          >
            Email
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-col gap-4 px-6 py-2 flex-1">
        {method === 'Mobile' ? (
          <label className="flex flex-col w-full">
            <p className="text-[#181611] dark:text-white text-sm font-semibold leading-normal pb-2 ml-1">Mobile Number</p>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[#8a8060] font-medium">+91</span>
              <input 
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181611] dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-primary/30 bg-white dark:bg-neutral-800 focus:border-primary h-14 placeholder:text-[#8a8060] pl-14 pr-4 text-base font-normal transition-all" 
                placeholder="Enter mobile number" 
                type="tel"
              />
            </div>
            <p className="text-[12px] text-[#8a8060] px-1 mt-2">We'll send a 6-digit verification code to this number.</p>
          </label>
        ) : (
          <label className="flex flex-col w-full">
            <p className="text-[#181611] dark:text-white text-sm font-semibold leading-normal pb-2 ml-1">Email Address</p>
            <input 
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181611] dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-primary/30 bg-white dark:bg-neutral-800 focus:border-primary h-14 placeholder:text-[#8a8060] px-4 text-base font-normal transition-all" 
              placeholder="Enter your email" 
              type="email"
            />
          </label>
        )}

        {/* SingleButton CTA */}
        <div className="pt-8">
          <button 
            onClick={onLogin}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 bg-primary text-[#181611] text-lg font-bold leading-normal tracking-wide shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform active:scale-95"
          >
            <span className="truncate uppercase tracking-wider">{method === 'Mobile' ? 'Get OTP' : 'Continue'}</span>
          </button>
        </div>

        {/* New to Sultan? Sign Up Link */}
        <div className="text-center pt-4">
          <p className="text-sm text-zinc-500">
            New here? 
            <button 
              onClick={onRegisterClick}
              className="ml-1 text-primary font-bold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center px-4 py-6">
          <div className="flex-1 border-t border-neutral-200 dark:border-neutral-700"></div>
          <span className="px-3 text-[#8a8060] text-xs font-medium uppercase tracking-widest">or</span>
          <div className="flex-1 border-t border-neutral-200 dark:border-neutral-700"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-[#181611] dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.909 3.292-2.09 4.413-1.18 1.12-2.7 2.03-5.75 2.03-4.57 0-8.33-3.71-8.33-8.28s3.76-8.28 8.33-8.28c2.48 0 4.27.98 5.61 2.26l2.31-2.31C18.5 2.14 15.82 1 12.48 1 6.69 1 2 5.69 2 11.48s4.69 10.48 10.48 10.48c3.15 0 5.52-1.04 7.37-2.97 1.91-1.91 2.51-4.58 2.51-6.75 0-.65-.05-1.28-.15-1.87h-9.73z"></path></svg>
            </button>
            <button className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-[#181611] dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"></path></svg>
            </button>
          </div>
          
          <button 
            onClick={onLogin}
            className="text-[#181611] dark:text-white text-sm font-semibold tracking-wide underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-all mb-10"
          >
            Continue as Guest
          </button>
        </div>
      </div>

      {/* iOS Home Indicator Space */}
      <div className="h-8 w-full shrink-0 bg-white dark:bg-neutral-900"></div>
    </div>
  );
};
