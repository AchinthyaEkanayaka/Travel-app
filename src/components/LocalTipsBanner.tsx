import React from 'react';
import { Shield, Sparkles, Sun, Info } from 'lucide-react';

export const LocalTipsBanner: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-2xl p-4 sm:p-5 shadow-xs relative overflow-hidden">
      {/* Subtle organic watermark curve */}
      <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-40 h-40 bg-emerald-800/30 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Foreign Traveler Essentials</span>
        </div>

        <h3 className="text-base font-bold text-white mb-2">
          Visiting Sri Lanka for the First Time?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 text-xs">
          <div className="bg-emerald-800/50 backdrop-blur-xs p-2.5 rounded-xl border border-emerald-700/50">
            <div className="font-bold text-white flex items-center gap-1 mb-0.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Tourist Police 1912</span>
            </div>
            <p className="text-[11px] text-emerald-100/80 leading-normal">
              Direct emergency helpline available in English, German & French islandwide.
            </p>
          </div>

          <div className="bg-emerald-800/50 backdrop-blur-xs p-2.5 rounded-xl border border-emerald-700/50">
            <div className="font-bold text-white flex items-center gap-1 mb-0.5">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Temple Sacred Dress</span>
            </div>
            <p className="text-[11px] text-emerald-100/80 leading-normal">
              Cover shoulders and knees in Buddhist & Hindu sanctuaries; white clothing is customary.
            </p>
          </div>

          <div className="bg-emerald-800/50 backdrop-blur-xs p-2.5 rounded-xl border border-emerald-700/50">
            <div className="font-bold text-white flex items-center gap-1 mb-0.5">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>Pure Ceylon Cinnamon</span>
            </div>
            <p className="text-[11px] text-emerald-100/80 leading-normal">
              Look for the official Ceylon Lion logo on certified pure Cinnamomum zeylanicum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
