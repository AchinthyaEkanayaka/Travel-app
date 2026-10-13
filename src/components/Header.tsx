import React from 'react';
import { Menu, Globe } from 'lucide-react';
import { Currency } from '../types/travel';

interface HeaderProps {
  onOpenMenu: () => void;
  currency: Currency;
  onCurrencyToggle: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  currency,
  onCurrencyToggle,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 px-4 py-3 transition-colors">
      <div className="flex items-center justify-between gap-3 max-w-xl mx-auto">
        {/* Left: Hamburger menu icon */}
        <button
          onClick={onOpenMenu}
          aria-label="Open navigation menu"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center -ml-2 rounded-xl text-stone-800 hover:text-stone-950 hover:bg-stone-200/60 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
        >
          <Menu className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Center: Welcoming greeting */}
        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-emerald-800 tracking-wider uppercase">
            <span>Sri Lanka Tourism</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span className="text-stone-600 font-medium">Ceylon</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight leading-snug">
            Ayubowan! Where to next?
          </h1>
        </div>

        {/* Right: Currency switcher & User profile thumbnail */}
        <div className="flex items-center gap-2">
          <button
            onClick={onCurrencyToggle}
            aria-label="Change currency"
            className="hidden xs:flex items-center gap-1 px-2 py-1 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200/80 rounded-lg border border-stone-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            title="Click to switch currency"
          >
            <Globe className="w-3.5 h-3.5 text-stone-600" />
            <span>{currency}</span>
          </button>

          <button
            onClick={onOpenMenu}
            aria-label="View user profile"
            className="relative min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Traveler Profile"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-800/20"
            />
            {savedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-amber-500 text-stone-950 font-bold text-[10px] rounded-full flex items-center justify-center ring-2 ring-stone-50">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
