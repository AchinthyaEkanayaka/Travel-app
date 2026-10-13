import React from 'react';
import { Star, MessageSquareQuote, CheckCircle, PenLine } from 'lucide-react';

interface TravelerReviewSpotlightProps {
  onWriteReview: () => void;
}

export const TravelerReviewSpotlight: React.FC<TravelerReviewSpotlightProps> = ({
  onWriteReview,
}) => {
  return (
    <section className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs">
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            <MessageSquareQuote className="w-3.5 h-3.5 text-emerald-700" />
            <span>Traveler Voice · TripAdvisor Community</span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-stone-900 tracking-tight mt-0.5">
            What Foreign Travelers Say
          </h2>
        </div>

        <button
          onClick={onWriteReview}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200/60"
        >
          <PenLine className="w-3.5 h-3.5" />
          <span>Write Review</span>
        </button>
      </div>

      {/* Spotlight review testimonial */}
      <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/70 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
              alt="Liam Harrington"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div className="text-xs font-bold text-stone-900">Liam Harrington</div>
              <div className="text-[10px] text-stone-500">Edinburgh, Scotland · October 2026</div>
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            ))}
          </div>
        </div>

        <p className="text-xs text-stone-700 italic leading-relaxed">
          "Sri Lanka exceeded every expectation. The warmth of the people, the biodiversity in Yala, and waking up to mist over the Ella tea plantations felt transcendent. Booking licensed guides through this platform made navigating seamless and worry-free."
        </p>

        <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-500">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
          <span>Verified Foreign Traveler · 3-Week Cultural Triangle & Safari Route</span>
        </div>
      </div>
    </section>
  );
};
