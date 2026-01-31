
import React, { useState } from 'react';

interface OnboardingProps {
  onFinish: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [step, setStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "The Art of Heritage",
      description: "Discover a collection where every piece tells a story of centuries-old Indian craftsmanship, from Kundan to Polki.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMXuLxBJfNfqMIo0i-X7GQsI6D2Y8nWxQMN03Jt8IQzyW6kCWvoK_qv9AzQkeIT9AKAFpQRv_vypGukbADLFtC5r5LxEq8EyFPew13jaqbXQwBN_V2hswfpKLZtOdYKQiRqoyhNxd97aINK7NTJczJn5xvF_GLbGJVOmh6QvGFmvfaWKBSLHjzHm4ezeDRy2qoiLuLjX1K5-gFsMMMDMlpeZJweCeWTVRuLAQ9wtWz4r0y7W4KZv2w5GMfEo1bqUdUiM0xQLin2owe",
      cta: "Next"
    },
    {
      id: 2,
      title: "Manifest Your Vision",
      description: "Use our AI-powered Design Studio and dedicated Concierge to bring your most exquisite jewelry dreams to life.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWzuMyXPhiYTUsfcto6vkDTN8WNtJzNB4LROFVOQ2aMBtDEe_XvdnUgTmR52T9XM4RgjaNkScWbMFieedzOTTkzw0QytxIcUqCI92TQ3WOkjb_kCs5PLSpveATHcUfwxos_p1x_ZdbjpoPcEzikPaOn9y18DIZk0Ja2YWx8BmEFqNH2RTj8JxvORAJytKZD-Hl24nSihVucYoby32ICVQSrzD6Gjd-UilCbPLW98BbbWLvFugNxh6ySbmERCjargUtGJw8c8AxXEK9",
      cta: "Get Started"
    }
  ];

  const currentData = steps[step - 1];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="relative h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden flex flex-col font-display">
      {/* Full-bleed background image with gradient */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out scale-105"
          style={{ backgroundImage: `url("${currentData.image}")` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full justify-end px-8 pb-20">
        {/* Step Indicator */}
        <div className="flex gap-2 mb-6">
          {steps.map((s) => (
            <div 
              key={s.id} 
              className={`h-1 rounded-full transition-all duration-500 ${step === s.id ? 'w-8 bg-primary' : 'w-2 bg-white/30'}`}
            ></div>
          ))}
        </div>

        {/* Text Content */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <p className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-2">Sultan Exclusive</p>
          <h2 className="text-white text-4xl font-serif font-bold leading-tight mb-4 tracking-tight">
            {currentData.title}
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-10 max-w-[280px]">
            {currentData.description}
          </p>
        </div>

        {/* CTA Button */}
        <button 
          onClick={handleNext}
          className="group relative w-full h-14 overflow-hidden rounded-full bg-primary text-background-dark font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-primary/20"
        >
          <span className="relative z-10">{currentData.cta}</span>
          <span className="material-symbols-outlined text-sm relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
          
          {/* Subtle shimmer effect on button */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>

        {/* Skip option for Step 1 */}
        {step === 1 && (
          <button 
            onClick={onFinish}
            className="mt-6 text-white/50 text-[10px] font-bold uppercase tracking-widest text-center hover:text-white transition-colors"
          >
            Skip Intro
          </button>
        )}
      </div>
    </div>
  );
};
