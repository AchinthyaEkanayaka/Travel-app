import React, { useState, useMemo } from 'react';
import {
  Header,
} from './components/Header';
import { SideDrawer } from './components/SideDrawer';
import { SearchBar } from './components/SearchBar';
import { QuickCategories } from './components/QuickCategories';
import { ExperienceCard } from './components/ExperienceCard';
import { DestinationScroller } from './components/DestinationScroller';
import { TravelInspirationGallery } from './components/TravelInspirationGallery';
import { ExperienceModal } from './components/ExperienceModal';
import { WishlistModal } from './components/WishlistModal';
import { WriteReviewModal } from './components/WriteReviewModal';
import { TravelerReviewSpotlight } from './components/TravelerReviewSpotlight';
import { LocalTipsBanner } from './components/LocalTipsBanner';
import { WeatherForecast } from './components/WeatherForecast';
import { InteractiveMapDiscovery } from './components/InteractiveMapDiscovery';
import {
  QUICK_CATEGORIES,
  EXPERIENCES,
} from './data/travelData';
import { CategoryId, Experience, Currency } from './types/travel';
import {
  Sparkles,
  Smartphone,
  Monitor,
  CheckCircle2,
  ChevronRight,
  Filter,
} from 'lucide-react';

export default function App() {
  // Navigation & Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  // Selected Experience Modal
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // User State
  const [currency, setCurrency] = useState<Currency>('USD');
  const [savedExperienceIds, setSavedExperienceIds] = useState<string[]>([
    'exp-yala-safari',
    'exp-sigiriya-sunrise',
  ]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Device frame toggle for testing/showcasing
  const [viewMode, setViewMode] = useState<'mobile' | 'responsive'>('mobile');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Toggle currency
  const handleCurrencyToggle = () => {
    const list: Currency[] = ['USD', 'LKR', 'EUR', 'GBP'];
    const nextIdx = (list.indexOf(currency) + 1) % list.length;
    setCurrency(list[nextIdx]);
    showToast(`Currency updated to ${list[nextIdx]}`);
  };

  // Toggle wishlist save
  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedExperienceIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from saved wishlist');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to your Sri Lanka wishlist');
        return [...prev, id];
      }
    });
  };

  const handleRemoveFromSaved = (id: string) => {
    setSavedExperienceIds((prev) => prev.filter((item) => item !== id));
    showToast('Removed from saved wishlist');
  };

  // Filtered experiences
  const filteredExperiences = useMemo(() => {
    return EXPERIENCES.filter((exp) => {
      // Category match
      if (selectedCategory !== 'all' && exp.category !== selectedCategory) {
        return false;
      }

      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = exp.title.toLowerCase().includes(q);
        const matchesLocation = exp.location.toLowerCase().includes(q);
        const matchesProvince = exp.province.toLowerCase().includes(q);
        const matchesHighlights = exp.highlights.some((h) => h.toLowerCase().includes(q));
        const matchesDesc = exp.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLocation && !matchesProvince && !matchesHighlights && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  const savedExperiencesList = useMemo(() => {
    return EXPERIENCES.filter((exp) => savedExperienceIds.includes(exp.id));
  }, [savedExperienceIds]);

  return (
    <div className="min-h-screen bg-stone-100/90 text-stone-900 flex flex-col items-center">
      {/* Top viewport simulator control bar (for desktop presentation) */}
      <div className="w-full bg-stone-900 text-stone-300 px-4 py-1.5 text-xs flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-stone-100">Sri Lanka Tourism Mobile App</span>
          <span className="hidden sm:inline text-stone-500">· Home Dashboard (TripAdvisor UX)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-stone-400 hidden xs:inline">Preview Mode:</span>
          <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700">
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                viewMode === 'mobile'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile Phone</span>
            </button>
            <button
              onClick={() => setViewMode('responsive')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                viewMode === 'responsive'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>Expanded</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container / Mobile Device Enclosure */}
      <main
        className={`w-full transition-all duration-200 ${
          viewMode === 'mobile'
            ? 'max-w-[420px] my-0 sm:my-6 sm:rounded-[40px] sm:shadow-2xl sm:ring-8 sm:ring-stone-800/80 sm:overflow-hidden bg-[#FAFAF9]'
            : 'max-w-2xl bg-[#FAFAF9] min-h-screen shadow-md'
        }`}
      >
        {/* Mobile Phone Mock Status Bar (when in mobile preview mode) */}
        {viewMode === 'mobile' && (
          <div className="hidden sm:flex items-center justify-between px-6 pt-2.5 pb-1 text-[11px] font-semibold text-stone-700 bg-stone-50">
            <span>9:41</span>
            <div className="w-20 h-4 bg-stone-900 rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* 1. Header (Hamburger menu, greeting, profile thumbnail) */}
        <Header
          onOpenMenu={() => setIsDrawerOpen(true)}
          currency={currency}
          onCurrencyToggle={handleCurrencyToggle}
          savedCount={savedExperienceIds.length}
        />

        {/* Home Dashboard Body */}
        <div className="px-4 py-4 space-y-6">
          {/* 2. Search Section: Large, prominent, minimalist search bar */}
          <SearchBar
            query={searchQuery}
            onQueryChange={setSearchQuery}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
          />

          {/* 3. Quick Categories: Hotels, Wild Safari, Traditional Items, Tour Guides */}
          <QuickCategories
            categories={QUICK_CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* 4. Weather Forecast & Microclimates for Major Cities */}
          <WeatherForecast
            onCitySelect={(cityName) => {
              showToast(`Checking weather for ${cityName}`);
            }}
          />

          {/* 5. Featured Section: Top Rated Experiences (Horizontally Scrolling Cards) */}
          <section className="w-full">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>TripAdvisor Verified</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                  Top Rated Experiences
                </h2>
              </div>

              {filteredExperiences.length > 0 && (
                <span className="text-xs text-stone-500 font-medium">
                  {filteredExperiences.length} curated
                </span>
              )}
            </div>

            {filteredExperiences.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 border border-stone-200 text-center">
                <p className="text-xs text-stone-600 font-medium">
                  No experiences matching "{searchQuery}" in this category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedTag(null);
                  }}
                  className="mt-2 text-xs font-bold text-emerald-800 hover:underline"
                >
                  Reset search & filters
                </button>
              </div>
            ) : (
              <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
                {filteredExperiences.map((exp) => (
                  <ExperienceCard
                    key={exp.id}
                    experience={exp}
                    currency={currency}
                    isSaved={savedExperienceIds.includes(exp.id)}
                    onToggleSave={handleToggleSave}
                    onClick={() => setSelectedExperience(exp)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 6. Interactive Island Map Discovery (Map & List View Toggle) */}
          <InteractiveMapDiscovery
            onSelectExperienceById={(expId) => {
              const found = EXPERIENCES.find((e) => e.id === expId);
              if (found) {
                setSelectedExperience(found);
              } else {
                showToast(`Viewing details for landmark`);
              }
            }}
            onExploreLandmark={(name) => {
              setSearchQuery(name);
              showToast(`Searching for experiences around ${name}`);
            }}
          />

          {/* 7. Featured Section: Popular Destinations (Horizontally Scrolling Cards) */}
          <DestinationScroller
            onSelectDestination={(dest) => {
              setSearchQuery(dest);
              showToast(`Filtering for ${dest}`);
            }}
          />

          {/* 6. Traveler Photography Showcase */}
          <TravelInspirationGallery
            onSelectPhotoLocation={(loc) => {
              setSearchQuery(loc);
              showToast(`Searching for experiences in ${loc}`);
            }}
          />

          {/* 7. Traveler Review Spotlight (TripAdvisor Community) */}
          <TravelerReviewSpotlight
            onWriteReview={() => setIsWriteReviewOpen(true)}
          />

          {/* 7. Foreign Traveler Essentials & Safety Tips */}
          <LocalTipsBanner />

          {/* Clean minimalist footer - NO bottom navigation bar per user instructions */}
          <footer className="pt-4 pb-8 text-center text-stone-400 text-xs border-t border-stone-200/80">
            <div className="font-semibold text-stone-700">Sri Lanka Tourism Promotion Bureau</div>
            <div className="text-[11px] text-stone-500 mt-0.5">
              Official Traveler Partner · Verified Reviews & Certified Guides
            </div>
          </footer>
        </div>
      </main>

      {/* Side Navigation Drawer (Opened via top-left Hamburger Menu) */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        savedCount={savedExperienceIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        currency={currency}
        onCurrencyChange={(c) => {
          setCurrency(c);
          showToast(`Switched currency to ${c}`);
        }}
        onWriteReviewClick={() => setIsWriteReviewOpen(true)}
      />

      {/* Detailed TripAdvisor Experience Modal */}
      <ExperienceModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
        currency={currency}
        isSaved={
          selectedExperience ? savedExperienceIds.includes(selectedExperience.id) : false
        }
        onToggleSave={handleToggleSave}
        onBookSuccess={(title, date, guests) => {
          showToast(`Inquiry sent for ${title} (${guests} guests on ${date})!`);
        }}
      />

      {/* Saved Places Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedExperiences={savedExperiencesList}
        currency={currency}
        onSelectExperience={(exp) => setSelectedExperience(exp)}
        onRemoveFromSaved={handleRemoveFromSaved}
      />

      {/* Write a Review Modal */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmitSuccess={(title) => {
          showToast(`Review submitted: "${title}". Thank you!`);
        }}
      />

      {/* Interactive Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 inset-x-4 max-w-sm mx-auto z-50 flex items-center gap-2.5 px-4 py-2.5 bg-stone-900 text-white rounded-xl shadow-xl text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="flex-1 truncate">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
