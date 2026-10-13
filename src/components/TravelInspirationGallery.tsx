import React, { useState } from 'react';
import { Camera, MapPin, X, Sparkles, ExternalLink } from 'lucide-react';
import { TRAVEL_PHOTO_GALLERY } from '../data/travelData';

interface TravelInspirationGalleryProps {
  onSelectPhotoLocation: (location: string) => void;
}

export const TravelInspirationGallery: React.FC<TravelInspirationGalleryProps> = ({
  onSelectPhotoLocation,
}) => {
  const [activePhoto, setActivePhoto] = useState<(typeof TRAVEL_PHOTO_GALLERY)[0] | null>(null);

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            <Camera className="w-3.5 h-3.5 text-emerald-700" />
            <span>Traveler Photography Showcase</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
            Visions of Sri Lanka
          </h2>
        </div>
        <span className="text-xs text-stone-500 font-medium">
          {TRAVEL_PHOTO_GALLERY.length} iconic views
        </span>
      </div>

      {/* Horizontal Photo Stream */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
        {TRAVEL_PHOTO_GALLERY.map((item, index) => (
          <div
            key={index}
            onClick={() => setActivePhoto(item)}
            className="group relative flex-none w-[200px] sm:w-[220px] aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-2xs hover:shadow-md transition-all duration-200"
          >
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20" />

            {/* Top Category Tag */}
            <div className="absolute top-2 left-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-stone-900/80 backdrop-blur-xs text-white">
                {item.category}
              </span>
            </div>

            {/* Bottom text */}
            <div className="absolute bottom-2 inset-x-2 text-white">
              <p className="text-xs font-bold leading-tight line-clamp-1 group-hover:text-amber-300 transition-colors">
                {item.title}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-stone-300 mt-0.5">
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* High-Res Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setActivePhoto(null)}
          />

          <div className="relative w-full max-w-lg bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 z-10 animate-in zoom-in-95 duration-150">
            {/* Image */}
            <div className="relative aspect-[4/3] w-full bg-stone-950">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActivePhoto(null)}
                aria-label="Close photo"
                className="absolute top-3 right-3 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo info */}
            <div className="p-4 sm:p-5 text-white">
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                <span>{activePhoto.category}</span>
                <span className="text-stone-400 font-normal">{activePhoto.photographer}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1">{activePhoto.title}</h3>
              <div className="flex items-center gap-1.5 text-xs text-stone-300 mb-4">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{activePhoto.location}</span>
              </div>

              <button
                onClick={() => {
                  const loc = activePhoto.location.split(',')[0];
                  setActivePhoto(null);
                  onSelectPhotoLocation(loc);
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Find Experiences in this Area</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
