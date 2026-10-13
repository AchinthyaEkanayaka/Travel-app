export type CategoryId = 'all' | 'hotels' | 'wild_safari' | 'traditional_items' | 'tour_guides';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  description: string;
  tagline: string;
  count: number;
  badgeColor?: string;
}

export interface ReviewBreakdown {
  guideKnowledge: number;
  sceneryWildlife: number;
  valueForMoney: number;
  punctuality: number;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorOrigin: string; // e.g. "Manchester, United Kingdom", "Munich, Germany"
  avatar: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  stayType: string; // "Traveled as a couple", "Family holiday", "Solo adventure"
  helpfulVotes: number;
}

export interface Experience {
  id: string;
  title: string;
  kicker: string;
  location: string;
  province: string;
  category: CategoryId;
  rating: number; // e.g. 4.95
  reviewCount: number;
  priceUsd: number;
  priceLkr: number;
  priceUnit: string; // "per person", "per night", "per vehicle"
  duration: string;
  image: string;
  travelerChoiceRank?: string; // e.g. "#1 of 42 Safaris in Yala"
  isTravelersChoice?: boolean;
  freeCancellation: boolean;
  highlights: string[];
  description: string;
  breakdown: ReviewBreakdown;
  recentReviews: ReviewItem[];
  expertGuide?: {
    name: string;
    license: string;
    languages: string[];
    experienceYears: number;
    avatar: string;
  };
}

export type Currency = 'USD' | 'LKR' | 'EUR' | 'GBP';
