import React from 'react';
import { Hotel, Compass, Sparkles, UserCheck, CheckCircle2 } from 'lucide-react';
import { CategoryId, Category } from '../types/travel';

interface QuickCategoriesProps {
  categories: Category[];
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

export const QuickCategories: React.FC<QuickCategoriesProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string, isSelected: boolean) => {
    const iconClass = `w-6 h-6 transition-transform group-hover:scale-105 ${
      isSelected ? 'text-white' : 'text-stone-700'
    }`;

    switch (iconName) {
      case 'Hotel':
        return <Hotel className={iconClass} strokeWidth={1.9} />;
      case 'Compass':
        return <Compass className={iconClass} strokeWidth={1.9} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} strokeWidth={1.9} />;
      case 'UserCheck':
        return <UserCheck className={iconClass} strokeWidth={1.9} />;
      default:
        return <Compass className={iconClass} strokeWidth={1.9} />;
    }
  };

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-sm font-bold text-stone-900 tracking-tight">
          Explore by Category
        </h2>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold transition-colors"
          >
            Show All Categories
          </button>
        )}
      </div>

      {/* Grid of the 4 requested categories */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          // Palette styling for each category according to user requirements:
          // Wild Safari & Hotels: Emerald green / Earthy brown base
          // Traditional Items: Heritage Earthy Teak / Golden accent
          // Tour Guides: Coastal Blue / Emerald blend
          const getActiveColors = () => {
            if (cat.id === 'wild_safari') {
              return 'bg-emerald-900 text-white shadow-md shadow-emerald-950/20';
            }
            if (cat.id === 'hotels') {
              return 'bg-[#5C3D2E] text-white shadow-md shadow-stone-900/20'; // Earthy brown
            }
            if (cat.id === 'traditional_items') {
              return 'bg-amber-600 text-white shadow-md shadow-amber-600/20'; // Golden/warm amber
            }
            if (cat.id === 'tour_guides') {
              return 'bg-sky-700 text-white shadow-md shadow-sky-900/20'; // Ocean Blue
            }
            return 'bg-stone-900 text-white';
          };

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
              className="flex flex-col items-center text-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-2xl p-1"
            >
              {/* Minimalist icon bubble */}
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all ${
                  isSelected
                    ? getActiveColors()
                    : 'bg-white border border-stone-200/90 shadow-2xs hover:border-stone-300 hover:bg-stone-100/50'
                }`}
              >
                {getIcon(cat.icon, isSelected)}
              </div>

              {/* Minimalist category label */}
              <span
                className={`mt-2 text-xs leading-tight transition-colors ${
                  isSelected
                    ? 'font-bold text-stone-900'
                    : 'font-medium text-stone-700 group-hover:text-stone-950'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
