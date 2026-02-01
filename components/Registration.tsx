
import React, { useState } from 'react';
import { customerApi } from '../api';

interface RegistrationProps {
  onBack: () => void;
  onSuccess: (user: any, token: string) => void;
}

export const Registration: React.FC<RegistrationProps> = ({ onBack, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<any>({});

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      const res = await customerApi.register({
        name,
        email,
        contact,
        password,
        password_confirmation: passwordConfirmation
      });

      if (res.success) {
        localStorage.setItem('customer_token', res.data.token);
        localStorage.setItem('customer_user', JSON.stringify(res.data.user));
        onSuccess(res.data.user, res.data.token);
      }
    } catch (err: any) {
      if (err.errors) {
        setFieldErrors(err.errors);
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full max-w-[430px] mx-auto flex-col bg-white dark:bg-background-dark overflow-x-hidden font-sans">
      {/* Top Navigation */}
      <div className="flex items-center bg-white dark:bg-background-dark p-4 pt-10 pb-2 justify-between sticky top-0 z-10 shadow-sm md:shadow-none">
        <button
          type="button"
          onClick={onBack}
          className="text-[#181611] dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-[#181611] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Registration</h2>
      </div>

      <form onSubmit={handleRegister} className="flex-1 overflow-y-auto no-scrollbar pb-10">
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
        <div className="px-6 py-2">
          <h2 className="text-[#181611] dark:text-white tracking-tight text-[32px] font-bold leading-tight">Create Your Account</h2>
          <p className="text-[#8a8060] dark:text-gray-400 mt-2 text-sm">Enter your details to join our exclusive circle of luxury collectors.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-100">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <div className="flex flex-col gap-0 px-6 py-4">
          {/* Full Name */}
          <div className="flex flex-col py-2">
            <p className="text-[#181611] dark:text-white text-sm font-semibold leading-normal pb-2 px-1">Full Name</p>
            <input
              className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-[#181611] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border ${fieldErrors.name ? 'border-red-500' : 'border-[#e6e3db]'} dark:border-gray-700 bg-white dark:bg-[#2d281a] h-14 placeholder:text-[#8a8060] px-6 text-base font-normal transition-all`}
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            {fieldErrors.name && <p className="text-[10px] text-red-500 mt-1 ml-4">{fieldErrors.name[0]}</p>}
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col py-2">
            <p className="text-[#181611] dark:text-white text-sm font-semibold leading-normal pb-2 px-1">Mobile Number</p>
            <div className="relative flex items-center">
              <div className="absolute left-5 flex items-center gap-1 border-r border-gray-200 dark:border-gray-600 pr-3">
                <span className="text-[#181611] dark:text-white font-medium">+91</span>
              </div>
              <input
                className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-[#181611] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border ${fieldErrors.contact ? 'border-red-500' : 'border-[#e6e3db]'} dark:border-gray-700 bg-white dark:bg-[#2d281a] h-14 placeholder:text-[#8a8060] pl-20 pr-5 text-base font-normal transition-all`}
                placeholder="000 000 0000"
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                disabled={loading}
              />
            </div>
            {fieldErrors.contact && <p className="text-[10px] text-red-500 mt-1 ml-4">{fieldErrors.contact[0]}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col py-2">
            <p className="text-[#181611] dark:text-white text-sm font-semibold leading-normal pb-2 px-1">Email Address</p>
            <input
              className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-[#181611] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border ${fieldErrors.email ? 'border-red-500' : 'border-[#e6e3db]'} dark:border-gray-700 bg-white dark:bg-[#2d281a] h-14 placeholder:text-[#8a8060] px-6 text-base font-normal transition-all`}
              placeholder="yourname@luxury.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            {fieldErrors.email && <p className="text-[10px] text-red-500 mt-1 ml-4">{fieldErrors.email[0]}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col py-2">
            <p className="text-[#181611] dark:text-white text-sm font-semibold leading-normal pb-2 px-1">Password</p>
            <input
              className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-[#181611] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border ${fieldErrors.password ? 'border-red-500' : 'border-[#e6e3db]'} dark:border-gray-700 bg-white dark:bg-[#2d281a] h-14 placeholder:text-[#8a8060] px-6 text-base font-normal transition-all`}
              placeholder="Minimum 6 characters"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            {fieldErrors.password && <p className="text-[10px] text-red-500 mt-1 ml-4">{fieldErrors.password[0]}</p>}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col py-2">
            <p className="text-[#181611] dark:text-white text-sm font-semibold leading-normal pb-2 px-1">Confirm Password</p>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-[#181611] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e6e3db] dark:border-gray-700 bg-white dark:bg-[#2d281a] h-14 placeholder:text-[#8a8060] px-6 text-base font-normal transition-all"
              placeholder="Re-enter password"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* CTA Button */}
          <div className="pt-8 pb-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-primary hover:bg-[#e0ab0b] text-[#181611] font-bold text-lg rounded-full shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
              {!loading && <span className="material-symbols-outlined">arrow_forward</span>}
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
        <div className="pt-6 text-center">
          <p className="text-[#8a8060] dark:text-gray-400 text-sm">
            Already have an account?
            <button
              type="button"
              onClick={onBack}
              className="text-primary font-bold hover:underline ml-1"
            >
              Log In
            </button>
          </p>
        </div>
      </form>

      {/* iOS Home Indicator Space */}
      <div className="h-5 shrink-0"></div>
    </div>
  );
};
