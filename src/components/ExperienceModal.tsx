import React, { useState } from 'react';
import {
  X,
  Star,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  Heart,
  ThumbsUp,
  Share2,
  Calendar,
  Users,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Experience, Currency } from '../types/travel';

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
  currency: Currency;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onBookSuccess: (title: string, date: string, guests: number) => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  experience,
  onClose,
  currency,
  isSaved,
  onToggleSave,
  onBookSuccess,
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-18');
  const [guestCount, setGuestCount] = useState(2);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});

  if (!experience) return null;

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

  const toggleHelpful = (reviewId: string) => {
    setHelpfulVoted((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  const handleConfirmBooking = () => {
    onBookSuccess(experience.title, selectedDate, guestCount);
    setIsBookingOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog (Slide up on mobile, centered modal on tablet/desktop) */}
      <div className="relative w-full max-w-lg max-h-[92vh] sm:max-h-[88vh] bg-stone-50 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden border border-stone-200">
        {/* Mobile drag affordance */}
        <div className="sm:hidden w-12 h-1.5 bg-stone-300 rounded-full mx-auto my-2" />

        {/* Top sticky controls */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="pointer-events-auto min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-white/90 backdrop-blur-xs text-stone-800 hover:text-stone-950 hover:bg-white shadow-md transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={(e) => onToggleSave(experience.id, e)}
              aria-label="Save to wishlist"
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-white/90 backdrop-blur-xs text-stone-800 hover:text-rose-600 hover:bg-white shadow-md transition-all active:scale-95"
            >
              <Heart
                className={`w-5 h-5 ${
                  isSaved ? 'fill-rose-600 text-rose-600' : 'text-stone-800'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Scrollable content body */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Main Hero Image */}
          <div className="relative aspect-[16/10] w-full bg-stone-900">
            <img
              src={experience.image}
              alt={experience.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-3 left-4 right-4 text-white">
              {experience.isTravelersChoice && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-800/90 backdrop-blur-xs text-emerald-100 rounded-md text-xs font-semibold mb-2 shadow-xs">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Travelers' Choice Best of the Best 2026</span>
                </div>
              )}
              <h1 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {experience.title}
              </h1>
              <div className="flex items-center gap-2 text-xs text-stone-200 mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{experience.location}</span>
                <span>·</span>
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{experience.duration}</span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 space-y-5">
            {/* TripAdvisor Rating Score Card */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-11 h-11 rounded-xl bg-emerald-900 text-white flex items-center justify-center font-extrabold text-lg tabular-nums">
                    {experience.rating.toFixed(1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className="w-4 h-4 fill-amber-500 text-amber-500"
                        />
                      ))}
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      <span className="font-bold text-stone-900">Exceptional</span> ·{' '}
                      {experience.reviewCount.toLocaleString()} traveler reviews
                    </div>
                  </div>
                </div>
                {experience.travelerChoiceRank && (
                  <span className="text-right text-[11px] font-semibold text-emerald-800 max-w-[110px] leading-tight">
                    {experience.travelerChoiceRank}
                  </span>
                )}
              </div>

              {/* Sub-ratings breakdown */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-3 text-xs">
                <div>
                  <div className="flex justify-between text-stone-600 mb-1">
                    <span>Guide Knowledge</span>
                    <span className="font-bold text-stone-900">
                      {experience.breakdown.guideKnowledge.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-800 rounded-full"
                      style={{
                        width: `${(experience.breakdown.guideKnowledge / 5) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-600 mb-1">
                    <span>Scenery & Wildlife</span>
                    <span className="font-bold text-stone-900">
                      {experience.breakdown.sceneryWildlife.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-800 rounded-full"
                      style={{
                        width: `${(experience.breakdown.sceneryWildlife / 5) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-600 mb-1">
                    <span>Value for Money</span>
                    <span className="font-bold text-stone-900">
                      {experience.breakdown.valueForMoney.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-800 rounded-full"
                      style={{
                        width: `${(experience.breakdown.valueForMoney / 5) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-600 mb-1">
                    <span>Punctuality</span>
                    <span className="font-bold text-stone-900">
                      {experience.breakdown.punctuality.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-800 rounded-full"
                      style={{
                        width: `${(experience.breakdown.punctuality / 5) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Overview / Description */}
            <div>
              <h2 className="text-sm font-bold text-stone-900 mb-1.5">Experience Overview</h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {experience.description}
              </p>
            </div>

            {/* Experience Highlights */}
            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-900/10">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-950 mb-2.5">
                Key Highlights
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                {experience.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Licensed Guide Card */}
            {experience.expertGuide && (
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200/90 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={experience.expertGuide.avatar}
                    alt={experience.expertGuide.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-800/20"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-stone-900">
                        {experience.expertGuide.name}
                      </span>
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-700" />
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono">
                      {experience.expertGuide.license}
                    </div>
                    <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                      {experience.expertGuide.experienceYears} Years Experience ·{' '}
                      {experience.expertGuide.languages.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Verified Traveler Reviews */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-stone-900">
                  Verified Traveler Reviews ({experience.recentReviews.length})
                </h2>
                <span className="text-xs text-stone-500">TripAdvisor Verified</span>
              </div>

              <div className="space-y-3">
                {experience.recentReviews.map((rev) => {
                  const hasVoted = helpfulVoted[rev.id];
                  return (
                    <div
                      key={rev.id}
                      className="bg-white p-3.5 rounded-2xl border border-stone-200/90 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={rev.avatar}
                            alt={rev.authorName}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-xs font-bold text-stone-900">
                              {rev.authorName}
                            </div>
                            <div className="text-[10px] text-stone-500">
                              {rev.authorOrigin} · {rev.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className="w-3 h-3 fill-amber-500 text-amber-500"
                            />
                          ))}
                        </div>
                      </div>

                      <h3 className="text-xs font-bold text-stone-900 leading-snug">
                        "{rev.title}"
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {rev.comment}
                      </p>

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                        <span>{rev.stayType}</span>
                        <button
                          onClick={() => toggleHelpful(rev.id)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                            hasVoted
                              ? 'bg-emerald-100 text-emerald-900 font-semibold'
                              : 'hover:bg-stone-100 text-stone-600'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>Helpful ({rev.helpfulVotes + (hasVoted ? 1 : 0)})</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Booking Form drawer if opened */}
            {isBookingOpen && (
              <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-2xl space-y-3 animate-in fade-in duration-150">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Select Date & Travelers
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full text-xs font-semibold p-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">
                      Guests
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full text-xs font-semibold p-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value={1}>1 Traveler</option>
                      <option value={2}>2 Travelers</option>
                      <option value={3}>3 Travelers</option>
                      <option value={4}>4 Travelers</option>
                      <option value={6}>Group (6+)</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleConfirmBooking}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-sm transition-transform active:scale-98"
                >
                  Confirm Reservation Inquiry
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Bottom Booking Bar with Golden / Orange CTA */}
        <div className="p-3.5 sm:p-4 bg-white border-t border-stone-200/90 flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
              Total from
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-extrabold text-stone-900 tabular-nums">
                {formatPrice(experience.priceUsd, experience.priceLkr)}
              </span>
              <span className="text-xs text-stone-500">{experience.priceUnit}</span>
            </div>
          </div>

          {/* Golden/Orange Call-to-Action button as required by prompt */}
          <button
            onClick={() => {
              if (!isBookingOpen) {
                setIsBookingOpen(true);
              } else {
                handleConfirmBooking();
              }
            }}
            className="flex-1 max-w-[200px] h-11 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-stone-950" />
            <span>Check Availability</span>
          </button>
        </div>
      </div>
    </div>
  );
};
