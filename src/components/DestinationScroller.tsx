import React from 'react';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/travelData';

interface DestinationScrollerProps {
  onSelectDestination: (destName: string) => void;
}

export const DestinationScroller: React.FC<DestinationScrollerProps> = ({
  onSelectDestination,
}) => {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
            Popular Destinations
          </h2>
          <p className="text-xs text-stone-500">
            Top traveler destinations across Sri Lanka's 9 provinces
          </p>
        </div>
      </div>

      {/* Horizontal Scroller */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {POPULAR_DESTINATIONS.map((dest) => (
          <div
            key={dest.id}
            onClick={() => onSelectDestination(dest.name)}
            className="group flex-none w-[220px] sm:w-[240px] rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden cursor-pointer flex flex-col"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
              <img
                src={dest.image}
                alt={dest.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/20" />

              {/* Tag in Ocean Blue or Emerald Green as requested */}
              <div className="absolute top-2.5 left-2.5">
                <span
                  className={`px-2 py-0.5 rounded-md text-[11px] font-semibold text-white shadow-2xs ${
                    dest.accent === 'blue'
                      ? 'bg-sky-700/90'
                      : 'bg-emerald-800/90'
                  }`}
                >
                  {dest.tag}
                </span>
              </div>

              {/* Bottom text inside image scrim */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <div className="text-[11px] font-medium text-stone-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{dest.region}</span>
                </div>
                <h3 className="text-sm font-bold text-white leading-tight mt-0.5 truncate">
                  {dest.name}
                </h3>
              </div>
            </div>

            {/* Footer with TripAdvisor ratings */}
            <div className="p-2.5 flex items-center justify-between bg-white text-xs">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="font-bold text-stone-900 tabular-nums">{dest.rating}</span>
                <span className="text-stone-400">·</span>
                <span className="text-stone-500 text-[11px]">{dest.reviewCount}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
