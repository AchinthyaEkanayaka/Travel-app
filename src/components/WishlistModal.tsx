import React from 'react';
import { X, Heart, MapPin, Trash2, ArrowRight } from 'lucide-react';
import { Experience, Currency } from '../types/travel';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedExperiences: Experience[];
  currency: Currency;
  onSelectExperience: (exp: Experience) => void;
  onRemoveFromSaved: (id: string) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  savedExperiences,
  currency,
  onSelectExperience,
  onRemoveFromSaved,
}) => {
  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-stone-50 rounded-3xl shadow-2xl overflow-hidden border border-stone-200 z-10 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200/80 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-600 text-rose-600" />
            <h2 className="text-base font-bold text-stone-900">
              Saved Experiences ({savedExperiences.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedExperiences.length === 0 ? (
            <div className="text-center py-10 px-4">
              <Heart className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-stone-700">No saved experiences yet</h3>
              <p className="text-xs text-stone-500 mt-1">
                Tap the heart icon on any experience card to add to your Sri Lanka itinerary.
              </p>
            </div>
          ) : (
            savedExperiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-2xl border border-stone-200/90 p-3 flex items-center gap-3 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onSelectExperience(exp);
                  }}
                />

                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onSelectExperience(exp);
                  }}
                >
                  <h3 className="text-xs font-bold text-stone-900 truncate">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-700" />
                    <span className="truncate">{exp.location}</span>
                  </div>
                  <div className="text-xs font-extrabold text-stone-900 mt-1">
                    {formatPrice(exp.priceUsd, exp.priceLkr)}{' '}
                    <span className="text-[10px] font-normal text-stone-500">
                      {exp.priceUnit}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFromSaved(exp.id)}
                  aria-label="Remove item"
                  className="p-2 text-stone-400 hover:text-rose-600 transition-colors rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-stone-200/80">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
