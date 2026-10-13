import React, { useRef } from 'react';
import { Search, X, MapPin, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  onFocusSearch?: () => void;
}

const POPULAR_TAGS = [
  'Yala Leopard Safari',
  'Sigiriya Sunrise',
  'Ella Tea Train',
  'Mirissa Whales',
  'Ceylon Spices',
];

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  selectedTag,
  onSelectTag,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full">
      {/* Prominent minimalist TripAdvisor-style search container */}
      <div className="relative group">
        <div className="relative flex items-center bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md hover:border-emerald-700/50 focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/20 transition-all p-1.5 sm:p-2">
          {/* Search Icon */}
          <div className="pl-3 pr-2 text-stone-400 group-focus-within:text-emerald-700 transition-colors">
            <Search className="w-5 h-5 stroke-[2.2]" />
          </div>

          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search for hotels, safaris, or guides..."
            className="w-full py-2 px-1 text-sm sm:text-base text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none font-normal"
          />

          {/* Clear button if has text */}
          {query && (
            <button
              onClick={() => {
                onQueryChange('');
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Quick filter action icon */}
          <div className="border-l border-stone-200 pl-2 pr-1 hidden xs:flex items-center">
            <span className="text-xs font-medium text-stone-500 flex items-center gap-1 px-2 py-1 bg-stone-100 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-emerald-800" />
              <span>Sri Lanka</span>
            </span>
          </div>
        </div>
      </div>

      {/* Quick popular search suggestions */}
      <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar pb-1 text-xs">
        <span className="text-stone-600 font-medium whitespace-nowrap pl-0.5 text-[11px] uppercase tracking-wide">
          Popular:
        </span>
        {POPULAR_TAGS.map((tag) => {
          const isActive = selectedTag === tag || query.toLowerCase() === tag.toLowerCase();
          return (
            <button
              key={tag}
              onClick={() => {
                if (isActive) {
                  onSelectTag(null);
                  onQueryChange('');
                } else {
                  onSelectTag(tag);
                  onQueryChange(tag);
                }
              }}
              className={`whitespace-nowrap px-2.5 py-1 rounded-full text-xs transition-colors shrink-0 ${
                isActive
                  ? 'bg-emerald-900 text-white font-medium shadow-xs'
                  : 'bg-stone-200/70 text-stone-800 hover:bg-stone-200 hover:text-stone-950 font-normal'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};
