import { IMAGES } from './travelData';

export type LandmarkCategory = 'all' | 'wildlife' | 'heritage' | 'coast' | 'highlands';

export interface MapLandmark {
  id: string;
  name: string;
  region: string;
  category: 'wildlife' | 'heritage' | 'coast' | 'highlands';
  xPercent: number; // percentage coordinate on SVG map (0 - 100)
  yPercent: number; // percentage coordinate on SVG map (0 - 100)
  rating: number;
  reviewCount: number;
  shortDesc: string;
  image: string;
  experienceId?: string; // links to modal experience
  highlights: string[];
  bestSeason: string;
}

export const MAP_LANDMARKS: MapLandmark[] = [
  {
    id: 'lm-sigiriya',
    name: 'Sigiriya Lion Rock',
    region: 'Cultural Triangle',
    category: 'heritage',
    xPercent: 49,
    yPercent: 37,
    rating: 4.98,
    reviewCount: 3820,
    shortDesc: '5th-century royal sky citadel, mirror wall & ancient water gardens',
    image: IMAGES.sigiriya,
    experienceId: 'exp-sigiriya-sunrise',
    highlights: ['UNESCO Heritage', 'Sunrise Climb', 'Frescoes'],
    bestSeason: 'Jan – Sep (Dry mornings)',
  },
  {
    id: 'lm-minneriya',
    name: 'Minneriya National Park',
    region: 'Elephant Corridors',
    category: 'wildlife',
    xPercent: 54,
    yPercent: 34,
    rating: 4.97,
    reviewCount: 3120,
    shortDesc: 'The Great Asian Elephant Gathering around the 3rd-century reservoir',
    image: IMAGES.minneriyaElephants,
    experienceId: 'exp-minneriya-elephants',
    highlights: ['200+ Elephants', 'Waterhole Safari', 'Birdwatching'],
    bestSeason: 'Jun – Oct (Peak gathering)',
  },
  {
    id: 'lm-kandy',
    name: 'Temple of the Tooth Relic',
    region: 'Sacred Hill Country',
    category: 'heritage',
    xPercent: 48,
    yPercent: 54,
    rating: 4.93,
    reviewCount: 3410,
    shortDesc: 'Sacred Buddhist sanctuary & royal palace on mist-shrouded Kandy Lake',
    image: IMAGES.kandyTemple,
    experienceId: 'exp-kandy-temple-tooth',
    highlights: ['Sacred Relic', 'Evening Puja Drumming', 'Kandy Lake Walk'],
    bestSeason: 'Year-round (Evening prayers)',
  },
  {
    id: 'lm-nuwara-eliya',
    name: 'Nuwara Eliya Tea Estates',
    region: 'Central Highlands',
    category: 'highlands',
    xPercent: 51,
    yPercent: 62,
    rating: 4.95,
    reviewCount: 1890,
    shortDesc: 'Colonial tea planter bungalows, Pedro estate & misty green peaks',
    image: IMAGES.teaBungalow,
    experienceId: 'exp-luxury-tea-bungalow',
    highlights: ['1,868 m Altitude', 'Single Estate Tea', 'Cool Climate'],
    bestSeason: 'Feb – Apr & Aug – Sep',
  },
  {
    id: 'lm-ella',
    name: 'Ella & Nine Arch Bridge',
    region: 'Highland Gap',
    category: 'highlands',
    xPercent: 61,
    yPercent: 66,
    rating: 4.94,
    reviewCount: 2190,
    shortDesc: 'Iconic viaduct bridge, scenic blue train ride & Little Adam’s Peak',
    image: IMAGES.ceylonTeaElla,
    experienceId: 'exp-ella-tea-trail',
    highlights: ['Scenic Train', 'Ella Rock Hike', 'Tea Terraces'],
    bestSeason: 'Jan – May (Clear views)',
  },
  {
    id: 'lm-yala',
    name: 'Yala National Park',
    region: 'Wild Coast Reserve',
    category: 'wildlife',
    xPercent: 69,
    yPercent: 78,
    rating: 4.96,
    reviewCount: 2410,
    shortDesc: 'Highest leopard density in Asia, Asian elephants & spotted deer',
    image: IMAGES.yalaLeopard,
    experienceId: 'exp-yala-safari',
    highlights: ['Leopard Tracking', 'Sloth Bears', 'Beach Lagoons'],
    bestSeason: 'May – Sep (Peak sightings)',
  },
  {
    id: 'lm-galle',
    name: 'Galle Dutch Fort',
    region: 'Southern Coast',
    category: 'coast',
    xPercent: 32,
    yPercent: 84,
    rating: 4.94,
    reviewCount: 2840,
    shortDesc: '17th-century coral stone ramparts, white lighthouse & ocean sunset',
    image: IMAGES.galleFort,
    experienceId: 'exp-galle-fort-sunset',
    highlights: ['Dutch Ramparts', 'Lighthouse', 'Boutique Cafes'],
    bestSeason: 'Nov – Apr (Calm ocean)',
  },
  {
    id: 'lm-mirissa',
    name: 'Mirissa Coastal Bay',
    region: 'Southern Coast',
    category: 'coast',
    xPercent: 43,
    yPercent: 88,
    rating: 4.88,
    reviewCount: 1640,
    shortDesc: 'Blue whale watching safaris, coconut tree hill & surfing beaches',
    image: IMAGES.mirissaCoast,
    experienceId: 'exp-mirissa-coast',
    highlights: ['Blue Whales', 'Secret Beach', 'Surf Breaks'],
    bestSeason: 'Nov – Apr (Whale season)',
  },
  {
    id: 'lm-colombo',
    name: 'Colombo & Galle Face Green',
    region: 'Western Province',
    category: 'coast',
    xPercent: 27,
    yPercent: 58,
    rating: 4.91,
    reviewCount: 1520,
    shortDesc: 'Vibrant street food, Lotus Tower, Pettah bazaars & colonial hotels',
    image: IMAGES.colomboStreetFood,
    experienceId: 'exp-colombo-street-food',
    highlights: ['Street Food Kottu', 'Pettah Market', 'Ocean Promenade'],
    bestSeason: 'Nov – Apr',
  },
];
