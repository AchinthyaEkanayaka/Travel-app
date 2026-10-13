import React, { useState } from 'react';
import { X, Star, CheckCircle, Send } from 'lucide-react';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (reviewTitle: string) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('Wild Safari');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [country, setCountry] = useState('United Kingdom');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    onSubmitSuccess(title);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-stone-50 rounded-3xl shadow-2xl overflow-hidden border border-stone-200 z-10 flex flex-col max-h-[90vh]">
        <div className="px-5 py-4 border-b border-stone-200/80 bg-white flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-900">Write a Review</h2>
            <p className="text-xs text-stone-500">Share tips for foreign travelers in Sri Lanka</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Star rating selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Your Overall Rating
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(s)}
                  className="p-1 text-stone-300 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      s <= (hoverRating || rating)
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-stone-700">
                {rating === 5 ? 'Excellent' : rating === 4 ? 'Very Good' : 'Average'}
              </span>
            </div>
          </div>

          {/* Category selection */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Experience Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="Hotels">Hotels & Eco-Villas</option>
              <option value="Wild Safari">Wild Safari (Yala / Minneriya)</option>
              <option value="Traditional Items">Traditional Items & Handicrafts</option>
              <option value="Tour Guides">National Tourist Guides</option>
            </select>
          </div>

          {/* Traveler Origin */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Your Home Country
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. United Kingdom, Germany, Australia"
              className="w-full p-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Review Headline
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Unforgettable sunrise climb at Sigiriya"
              className="w-full p-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* Detailed Review */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Your Experience & Advice for Foreign Visitors
            </label>
            <textarea
              required
              rows={3}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What made this memorable? Any tips on timing, guides, or weather?"
              className="w-full p-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div className="pt-2">
            {/* Golden CTA Button as requested */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Verified Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
