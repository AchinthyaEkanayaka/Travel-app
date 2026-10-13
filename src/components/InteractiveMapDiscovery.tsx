import React, { useState } from 'react';
import {
  MapPin,
  List,
  Map as MapIcon,
  Star,
  Compass,
  ArrowRight,
  Sparkles,
  Calendar,
  X,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { MAP_LANDMARKS, MapLandmark, LandmarkCategory } from '../data/landmarksMapData';

interface InteractiveMapDiscoveryProps {
  onSelectExperienceById: (id: string) => void;
  onExploreLandmark: (name: string) => void;
}

export const InteractiveMapDiscovery: React.FC<InteractiveMapDiscoveryProps> = ({
  onSelectExperienceById,
  onExploreLandmark,
}) => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedCategory, setSelectedCategory] = useState<LandmarkCategory>('all');
  const [activeLandmarkId, setActiveLandmarkId] = useState<string>('lm-sigiriya');

  // Filter landmarks
  const filteredLandmarks = MAP_LANDMARKS.filter((lm) => {
    if (selectedCategory === 'all') return true;
    return lm.category === selectedCategory;
  });

  const activeLandmark =
    MAP_LANDMARKS.find((lm) => lm.id === activeLandmarkId) || MAP_LANDMARKS[0];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'wildlife':
        return {
          bg: 'bg-emerald-900',
          text: 'text-emerald-100',
          ring: 'ring-emerald-700/40',
          border: 'border-emerald-700',
          dot: '#064E3B',
        };
      case 'heritage':
        return {
          bg: 'bg-amber-700',
          text: 'text-amber-100',
          ring: 'ring-amber-500/40',
          border: 'border-amber-600',
          dot: '#B45309',
        };
      case 'coast':
        return {
          bg: 'bg-sky-700',
          text: 'text-sky-100',
          ring: 'ring-sky-500/40',
          border: 'border-sky-600',
          dot: '#0284C7',
        };
      case 'highlands':
        return {
          bg: 'bg-[#5C3D2E]', // Earthy teak brown
          text: 'text-amber-100',
          ring: 'ring-stone-600/40',
          border: 'border-[#5C3D2E]',
          dot: '#5C3D2E',
        };
      default:
        return {
          bg: 'bg-stone-900',
          text: 'text-white',
          ring: 'ring-stone-400/40',
          border: 'border-stone-800',
          dot: '#1C1917',
        };
    }
  };

  return (
    <section className="w-full bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs">
      {/* Top Header & View Toggle (Map vs List) */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>Interactive Island Explorer</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight mt-0.5">
            Discover Sri Lanka by Region
          </h2>
        </div>

        {/* Segmented Control Switcher */}
        <div className="flex items-center self-start xs:self-auto bg-stone-100 p-1 rounded-2xl border border-stone-200 text-xs font-semibold">
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'map'
                ? 'bg-white text-stone-950 shadow-xs font-bold'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5 text-emerald-800" />
            <span>Map View</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'list'
                ? 'bg-white text-stone-950 shadow-xs font-bold'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <List className="w-3.5 h-3.5 text-stone-600" />
            <span>List View</span>
          </button>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-3 -mx-1 px-1 text-xs">
        {[
          { id: 'all', label: 'All Landmarks' },
          { id: 'wildlife', label: 'Wildlife & Safaris' },
          { id: 'heritage', label: 'Ancient Heritage' },
          { id: 'coast', label: 'Coasts & Ocean' },
          { id: 'highlands', label: 'Tea Highlands' },
        ].map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as LandmarkCategory)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs transition-colors shrink-0 ${
                isActive
                  ? 'bg-emerald-900 text-white font-bold shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 font-normal'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* MAP VIEW MODE */}
      {viewMode === 'map' && (
        <div className="space-y-4">
          {/* Map canvas container */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[4/4.5] max-h-[480px] bg-gradient-to-b from-sky-50/70 via-sky-50/40 to-blue-50/80 rounded-2xl border border-sky-100/90 overflow-hidden shadow-inner flex items-center justify-center">
            {/* Ambient ocean wave pattern */}
            <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Ocean labels */}
            <span className="absolute top-4 left-4 text-[10px] tracking-widest text-sky-800/40 uppercase font-semibold pointer-events-none">
              Gulf of Mannar
            </span>
            <span className="absolute top-4 right-4 text-[10px] tracking-widest text-sky-800/40 uppercase font-semibold pointer-events-none">
              Bay of Bengal
            </span>
            <span className="absolute bottom-3 left-4 text-[10px] tracking-widest text-sky-800/40 uppercase font-semibold pointer-events-none">
              Indian Ocean
            </span>

            {/* Geographical SVG Silhouette of Sri Lanka */}
            <svg
              viewBox="0 0 340 440"
              className="w-full h-full max-w-[340px] drop-shadow-md select-none"
              aria-label="Map of Sri Lanka"
            >
              <defs>
                <linearGradient id="sriLankaTerrain" x1="0%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#DCFCE7" /> {/* emerald-100 */}
                  <stop offset="40%" stopColor="#BBF7D0" /> {/* emerald-200 */}
                  <stop offset="70%" stopColor="#86EFAC" /> {/* emerald-300 */}
                  <stop offset="100%" stopColor="#FEF3C7" /> {/* southern warm sands */}
                </linearGradient>
                <linearGradient id="centralHighlands" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#15803D" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Sri Lanka island boundary path */}
              <path
                d="M170,22 C178,25 186,40 188,52 C192,68 185,82 188,96 C194,115 210,128 220,146 C230,165 242,185 244,210 C246,238 238,260 236,285 C233,312 242,335 235,360 C228,382 208,405 185,415 C160,422 135,412 118,395 C102,376 96,350 95,325 C94,295 98,270 102,242 C108,212 112,185 118,158 C124,132 138,105 145,80 C150,60 156,38 165,24 Z"
                fill="url(#sriLankaTerrain)"
                stroke="#059669"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />

              {/* Central Highlands mountain mass */}
              <path
                d="M150,225 C165,215 195,220 205,240 C215,260 210,290 195,305 C180,315 155,305 145,285 C140,265 142,235 150,225 Z"
                fill="url(#centralHighlands)"
                stroke="#047857"
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* Kandy Lake / Pidurutalagala elevation mark */}
              <text x="175" y="270" fontSize="9" fill="#064E3B" textAnchor="middle" fontWeight="bold" opacity="0.65">
                Central Highlands
              </text>
              <text x="175" y="150" fontSize="9" fill="#064E3B" textAnchor="middle" fontWeight="bold" opacity="0.65">
                Cultural Triangle
              </text>
            </svg>

            {/* Interactive Pins Overlay */}
            {filteredLandmarks.map((lm) => {
              const isSelected = activeLandmarkId === lm.id;
              const colorInfo = getCategoryColor(lm.category);

              return (
                <button
                  key={lm.id}
                  onClick={() => setActiveLandmarkId(lm.id)}
                  style={{
                    left: `${lm.xPercent}%`,
                    top: `${lm.yPercent}%`,
                  }}
                  aria-label={`View landmark ${lm.name}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group focus-visible:outline-none z-20 cursor-pointer"
                >
                  {/* Outer animated halo if selected */}
                  {isSelected && (
                    <span className="absolute -inset-2.5 rounded-full bg-amber-400/40 animate-ping pointer-events-none" />
                  )}

                  <div
                    className={`relative flex items-center justify-center transition-all ${
                      isSelected
                        ? 'scale-125 z-30 drop-shadow-lg'
                        : 'hover:scale-110 drop-shadow-sm'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-[10px] ring-2 ring-white shadow-md transition-colors ${
                        colorInfo.bg
                      } ${isSelected ? 'ring-amber-400 ring-3' : ''}`}
                    >
                      <MapPin className="w-4 h-4 fill-current text-white stroke-[1.5]" />
                    </div>

                    {/* Tooltip on active pin */}
                    {isSelected && (
                      <span className="absolute -top-7 whitespace-nowrap px-2 py-0.5 bg-stone-950 text-white rounded-md text-[10px] font-bold shadow-md pointer-events-none animate-in fade-in duration-100">
                        {lm.name}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Landmark Preview Card (TripAdvisor Style) */}
          <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/90 shadow-2xs">
            <div className="flex gap-3">
              <img
                src={activeLandmark.image}
                alt={activeLandmark.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800">
                  <span>{activeLandmark.region}</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-stone-500 font-normal">
                    {activeLandmark.bestSeason}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-stone-900 truncate mt-0.5">
                  {activeLandmark.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 text-xs mt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="font-bold text-stone-900 tabular-nums">
                    {activeLandmark.rating.toFixed(2)}
                  </span>
                  <span className="text-stone-500 text-[11px] tabular-nums">
                    ({activeLandmark.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>

                <p className="text-xs text-stone-600 line-clamp-1 mt-1">
                  {activeLandmark.shortDesc}
                </p>
              </div>
            </div>

            {/* Highlights pill tags & CTA */}
            <div className="mt-3 pt-2.5 border-t border-stone-200/70 flex flex-col xs:flex-row xs:items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-[11px] text-stone-500 overflow-x-auto no-scrollbar">
                {activeLandmark.highlights.map((h, i) => (
                  <span key={i} className="whitespace-nowrap px-2 py-0.5 bg-white rounded-md border border-stone-200">
                    {h}
                  </span>
                ))}
              </div>

              {activeLandmark.experienceId ? (
                <button
                  onClick={() => onSelectExperienceById(activeLandmark.experienceId!)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs shrink-0"
                >
                  <span>Explore Experience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => onExploreLandmark(activeLandmark.name)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs shrink-0"
                >
                  <span>View Guides</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LIST VIEW MODE */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredLandmarks.map((lm) => (
            <div
              key={lm.id}
              onClick={() => {
                if (lm.experienceId) {
                  onSelectExperienceById(lm.experienceId);
                } else {
                  onExploreLandmark(lm.name);
                }
              }}
              className="group bg-stone-50 rounded-2xl p-3 border border-stone-200/80 hover:border-emerald-700/50 hover:bg-white transition-all cursor-pointer flex items-center gap-3 shadow-2xs hover:shadow-xs"
            >
              <img
                src={lm.image}
                alt={lm.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-200"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[11px] text-stone-500">
                  <MapPin className="w-3 h-3 text-emerald-800 shrink-0" />
                  <span className="font-medium text-emerald-900">{lm.region}</span>
                  <span>·</span>
                  <span className="truncate">{lm.bestSeason}</span>
                </div>

                <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-900 transition-colors truncate mt-0.5">
                  {lm.name}
                </h3>

                <div className="flex items-center gap-1 text-xs mt-0.5">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span className="font-bold text-stone-900 tabular-nums">
                    {lm.rating.toFixed(2)}
                  </span>
                  <span className="text-stone-500 text-[11px] tabular-nums">
                    ({lm.reviewCount.toLocaleString()})
                  </span>
                </div>

                <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                  {lm.shortDesc}
                </p>
              </div>

              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
