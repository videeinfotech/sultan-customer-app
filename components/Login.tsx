
import React, { useState } from 'react';
import { customerApi } from '../api';

export const Login: React.FC<{ onLogin: (user: any, token: string) => void; onRegisterClick: () => void }> = ({ onLogin, onRegisterClick }) => {
  const [method, setMethod] = useState<'Mobile' | 'Email'>('Mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<any>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      if (method === 'Email') {
        const res = await customerApi.login({ email, password });
        if (res.success) {
          localStorage.setItem('customer_token', res.data.token);
          localStorage.setItem('customer_user', JSON.stringify(res.data.user));
          onLogin(res.data.user, res.data.token);
        }
      } else {
        // Mobile method
        if (step === 'mobile') {
          const res = await customerApi.sendOtp(mobile);
          if (res.success) {
            setStep('otp');
            // Clear mobile field errors if any
            setFieldErrors({});
          }
        } else {
          const res = await customerApi.loginWithOtp({ mobile, otp });
          if (res.success) {
            localStorage.setItem('customer_token', res.data.token);
            localStorage.setItem('customer_user', JSON.stringify(res.data.user));
            onLogin(res.data.user, res.data.token);
          }
        }
      }
    } catch (err: any) {
      if (err.errors) {
        setFieldErrors(err.errors);
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-900 overflow-hidden font-sans">
      {/* TopAppBar with Gold Accent */}
      <div className="flex items-center bg-white dark:bg-neutral-900 p-4 pt-10 pb-2 justify-between border-t-4 border-primary shadow-sm">
        <div className="text-[#181611] dark:text-white flex size-12 shrink-0 items-center justify-start">
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={() => {
              if (method === 'Mobile' && step === 'otp') {
                setStep('mobile');
              } else {
                window.history.back();
              }
            }}
          >
            arrow_back_ios
          </span>
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
      <div className="flex px-6 py-4">
        <div className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#f5f3f0] dark:bg-neutral-800 p-1">
          <button
            onClick={() => {
              setMethod('Mobile');
              setStep('mobile');
              setFieldErrors({});
            }}
            className={`flex flex-1 items-center justify-center rounded-full h-full text-sm font-semibold transition-all ${method === 'Mobile' ? 'bg-white dark:bg-neutral-700 shadow-sm text-[#181611] dark:text-white' : 'text-[#8a8060]'
              }`}
          >
            Mobile
          </button>
          <button
            onClick={() => {
              setMethod('Email');
              setFieldErrors({});
            }}
            className={`flex flex-1 items-center justify-center rounded-full h-full text-sm font-semibold transition-all ${method === 'Email' ? 'bg-white dark:bg-neutral-700 shadow-sm text-[#181611] dark:text-white' : 'text-[#8a8060]'
              }`}
          >
            Email
          </button>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4 px-6 py-2 flex-1 overflow-y-auto no-scrollbar">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-100">
            {error}
          </div>
        )}

        {method === 'Mobile' ? (
          step === 'mobile' ? (
            <label className="flex flex-col w-full">
              <p className="text-[#181611] dark:text-white text-sm font-semibold leading-normal pb-2 ml-1">Mobile Number</p>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-[#8a8060] font-medium">+91</span>
                <input
                  className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181611] dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border ${fieldErrors.mobile ? 'border-red-500' : 'border-primary/30'} bg-white dark:bg-neutral-800 focus:border-primary h-14 placeholder:text-[#8a8060] pl-14 pr-4 text-base font-normal transition-all`}
                  placeholder="Enter mobile number"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={loading}
                />
              </div>
              {fieldErrors.mobile && <p className="text-[10px] text-red-500 mt-1 ml-2">{fieldErrors.mobile[0]}</p>}
              <p className="text-[12px] text-[#8a8060] px-1 mt-2">We'll send a 6-digit verification code to this number.</p>
            </label>
          ) : (
            <label className="flex flex-col w-full">
              <p className="text-[#181611] dark:text-white text-sm font-semibold leading-normal pb-2 ml-1">Enter 6-digit OTP</p>
              <input
                className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181611] dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border ${fieldErrors.otp ? 'border-red-500' : 'border-primary/30'} bg-white dark:bg-neutral-800 focus:border-primary h-14 placeholder:text-[#8a8060] px-4 text-base font-center tracking-[1em] font-normal transition-all`}
                placeholder="000000"
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
                autoFocus
              />
              {fieldErrors.otp && <p className="text-[10px] text-red-500 mt-1 ml-2">{fieldErrors.otp[0]}</p>}
              <div className="flex justify-between items-center mt-2 px-1">
                <p className="text-[12px] text-[#8a8060]">Sent to +91 {mobile}</p>
                <button
                  type="button"
                  onClick={() => setStep('mobile')}
                  className="text-primary text-[12px] font-bold hover:underline"
                >
                  Change Number
                </button>
              </div>
            </label>
          )
        ) : (
          <>
            <label className="flex flex-col w-full">
              <p className="text-[#181611] dark:text-white text-sm font-semibold leading-normal pb-2 ml-1">Email Address</p>
              <input
                className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181611] dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border ${fieldErrors.email ? 'border-red-500' : 'border-primary/30'} bg-white dark:bg-neutral-800 focus:border-primary h-14 placeholder:text-[#8a8060] px-4 text-base font-normal transition-all`}
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              {fieldErrors.email && <p className="text-[10px] text-red-500 mt-1 ml-2">{fieldErrors.email[0]}</p>}
            </label>

            <label className="flex flex-col w-full mt-2">
              <p className="text-[#181611] dark:text-white text-sm font-semibold leading-normal pb-2 ml-1">Password</p>
              <input
                className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181611] dark:text-white focus:outline-0 focus:ring-1 focus:ring-primary border ${fieldErrors.password ? 'border-red-500' : 'border-primary/30'} bg-white dark:bg-neutral-800 focus:border-primary h-14 placeholder:text-[#8a8060] px-4 text-base font-normal transition-all`}
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              {fieldErrors.password && <p className="text-[10px] text-red-500 mt-1 ml-2">{fieldErrors.password[0]}</p>}
            </label>
          </>
        )}

        {/* SingleButton CTA */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 bg-primary text-[#181611] text-lg font-bold leading-normal tracking-wide shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform active:scale-95 disabled:opacity-70"
          >
            <span className="truncate uppercase tracking-wider">
              {loading ? 'Processing...' : (method === 'Mobile' ? (step === 'mobile' ? 'Get OTP' : 'Verify & Login') : 'Continue')}
            </span>
          </button>
        </div>

        {/* New to Sultan? Sign Up Link */}
        <div className="text-center pt-2">
          <p className="text-sm text-zinc-500">
            New here?
            <button
              type="button"
              onClick={onRegisterClick}
              className="ml-1 text-primary font-bold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center px-4 py-4">
          <div className="flex-1 border-t border-neutral-200 dark:border-neutral-700"></div>
          <span className="px-3 text-[#8a8060] text-xs font-medium uppercase tracking-widest">or</span>
          <div className="flex-1 border-t border-neutral-200 dark:border-neutral-700"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <button type="button" className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-[#181611] dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.909 3.292-2.09 4.413-1.18 1.12-2.7 2.03-5.75 2.03-4.57 0-8.33-3.71-8.33-8.28s3.76-8.28 8.33-8.28c2.48 0 4.27.98 5.61 2.26l2.31-2.31C18.5 2.14 15.82 1 12.48 1 6.69 1 2 5.69 2 11.48s4.69 10.48 10.48 10.48c3.15 0 5.52-1.04 7.37-2.97 1.91-1.91 2.51-4.58 2.51-6.75 0-.65-.05-1.28-.15-1.87h-9.73z"></path></svg>
            </button>
            <button type="button" className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-[#181611] dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"></path></svg>
            </button>
          </div>

          <button
            type="button"
            onClick={() => onLogin({ name: 'Guest' }, '')}
            className="text-[#181611] dark:text-white text-sm font-semibold tracking-wide underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-all mb-4"
          >
            Continue as Guest
          </button>
        </div>
      </form>

      {/* iOS Home Indicator Space */}
      <div className="h-4 w-full shrink-0 bg-white dark:bg-neutral-900"></div>
    </div>
  );
};
