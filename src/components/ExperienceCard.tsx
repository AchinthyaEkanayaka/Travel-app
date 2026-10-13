import React, { useState } from 'react';
import { Star, Heart, MapPin, Clock, Award } from 'lucide-react';
import { Experience, Currency } from '../types/travel';

interface ExperienceCardProps {
  experience: Experience;
  currency: Currency;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onClick: () => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  currency,
  isSaved,
  onToggleSave,
  onClick,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Currency conversion helper
  const formatPrice = (usd: number, lkr: number) => {
    switch (currency) {
      case 'USD':
        return `$${usd}`;
      case 'LKR':
        return `Rs ${lkr.toLocaleString()}`;
      case 'EUR':
        return `€${Math.round(usd * 0.92)}`;
      case 'GBP':
        return `£${Math.round(usd * 0.78)}`;
      default:
        return `$${usd}`;
    }
  };

  // TripAdvisor-style rating dots / stars
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <Star
            key={starIndex}
            className={`w-3.5 h-3.5 ${
              starIndex <= fullStars
                ? 'fill-amber-500 text-amber-500' // Golden star rating
                : 'fill-amber-500/30 text-amber-500'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      onClick={onClick}
      className="group relative flex-none w-[285px] sm:w-[310px] bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-700/40 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col"
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        {/* Fallback pattern while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
            <MapPin className="w-6 h-6 text-stone-400" />
          </div>
        )}

        <img
          src={experience.image}
          alt={experience.title}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Measured subtle scrim overlay for top contrast */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

        {/* Top badges: TripAdvisor Travelers' Choice & Heart */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-auto">
          {experience.isTravelersChoice ? (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-900/95 backdrop-blur-xs text-emerald-100 rounded-md text-[11px] font-semibold tracking-tight shadow-xs">
              <Award className="w-3 h-3 text-amber-400" />
              <span>Travelers' Choice</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-stone-900/75 backdrop-blur-xs text-white rounded-md text-[11px] font-medium shadow-xs">
              <span>{experience.province}</span>
            </span>
          )}

          {/* Heart wishlist button */}
          <button
            onClick={(e) => onToggleSave(experience.id, e)}
            aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
            className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-rose-600 hover:bg-white shadow-xs transition-transform active:scale-90"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isSaved ? 'fill-rose-600 text-rose-600' : 'text-stone-700'
              }`}
            />
          </button>
        </div>

        {/* Bottom image pill: Duration */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="flex items-center gap-1 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white rounded-md text-[11px] font-medium">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{experience.duration}</span>
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed location kicker */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-stone-500 mb-1">
            <MapPin className="w-3 h-3 text-emerald-700 shrink-0" />
            <span className="truncate">{experience.kicker}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-900 transition-colors line-clamp-2 leading-snug mb-2">
            {experience.title}
          </h3>

          {/* TripAdvisor 5-Star Rating & Review Count */}
          <div className="flex items-center gap-1.5 mb-2.5">
            {renderStars(experience.rating)}
            <span className="text-xs font-bold text-stone-900 ml-0.5 tabular-nums">
              {experience.rating.toFixed(1)}
            </span>
            <span className="text-xs text-stone-500 tabular-nums">
              ({experience.reviewCount.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Price and CTA Strip */}
        <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-semibold text-stone-500 tracking-wide">
              From
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-stone-900 tabular-nums">
                {formatPrice(experience.priceUsd, experience.priceLkr)}
              </span>
              <span className="text-[11px] text-stone-500 font-normal">
                {experience.priceUnit}
              </span>
            </div>
          </div>

          {/* Minimalist View button */}
          <span className="px-3 py-1.5 rounded-lg text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-500 transition-colors shadow-2xs">
            View
          </span>
        </div>
      </div>
    </div>
  );
};
