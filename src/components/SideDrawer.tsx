import React from 'react';
import {
  X,
  Heart,
  Edit3,
  Award,
  PhoneCall,
  Compass,
  Sparkles,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  Globe,
  Share2,
} from 'lucide-react';
import { Currency } from '../types/travel';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedCount: number;
  onOpenWishlist: () => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onWriteReviewClick: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  savedCount,
  onOpenWishlist,
  currency,
  onCurrencyChange,
  onWriteReviewClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-stone-50 shadow-2xl flex flex-col z-10 border-r border-stone-200 animate-in slide-in-from-left duration-200">
        {/* Top header with close button */}
        <div className="px-5 pt-5 pb-4 border-b border-stone-200/80 bg-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800">
              Ayubowan Traveler
            </span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User profile details */}
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Sarah Jenkins"
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-700/20"
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-bold text-stone-900 truncate">Sarah Jenkins</h2>
              <p className="text-xs text-stone-500">London, United Kingdom</p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-amber-700 font-medium">
                <span className="flex items-center gap-0.5">
                  <Award className="w-3 h-3 text-amber-600" />
                  Level 4 Reviewer
                </span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-stone-600">48 Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable menu navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {/* Section: Your Journey */}
          <div>
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider px-2 mb-1.5">
              Your Journey
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => {
                  onClose();
                  onOpenWishlist();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-stone-800 hover:bg-white hover:shadow-xs transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Saved Experiences</span>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full">
                  {savedCount}
                </span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onWriteReviewClick();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-stone-800 hover:bg-white hover:shadow-xs transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Edit3 className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Write a Review</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>
          </div>

          {/* Section: Discover Sri Lanka */}
          <div>
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider px-2 mb-1.5">
              Explore
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center justify-between px-3 py-2 rounded-xl text-stone-800">
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-stone-600" />
                  <span className="text-sm font-medium">Currency Display</span>
                </div>
                <div className="flex items-center gap-1 bg-stone-200/70 p-0.5 rounded-lg text-xs font-semibold">
                  {(['USD', 'LKR', 'EUR', 'GBP'] as Currency[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => onCurrencyChange(c)}
                      className={`px-1.5 py-0.5 rounded-md transition-colors ${
                        currency === c
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-3 py-2.5 rounded-xl text-stone-800 hover:bg-white hover:shadow-xs transition-colors flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium">Travelers’ Choice 2026</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                  Top 1%
                </span>
              </div>
            </div>
          </div>

          {/* Section: Traveler Safety & Help */}
          <div>
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider px-2 mb-1.5">
              Traveler Safety & Assistance
            </div>
            <div className="space-y-1">
              <a
                href="tel:1912"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/70 text-emerald-950 hover:bg-emerald-100/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-emerald-800" />
                  <div>
                    <div className="text-xs font-bold">Tourist Police Hotline</div>
                    <div className="text-[11px] text-emerald-800">24/7 Helpline · Dial 1912</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-800">1912</span>
              </a>

              <div className="flex items-center justify-between px-3 py-2 rounded-xl text-stone-700 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-stone-500" />
                  <span>SLTDA Certified Operators Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer footer */}
        <div className="p-4 border-t border-stone-200/80 bg-white text-stone-500 text-xs">
          <div className="flex items-center justify-between text-[11px]">
            <span>Sri Lanka Tourism Development Authority</span>
            <span>v2.4</span>
          </div>
          <p className="text-[10px] text-stone-400 mt-1">
            TripAdvisor Traveler Partner Ecosystem · Colombo 03
          </p>
        </div>
      </div>
    </div>
  );
};
