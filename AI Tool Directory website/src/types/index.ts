export interface AITool {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  pricing: 'Free' | 'Freemium' | 'Paid';
  priceDetails?: string;
  website: string;
  image?: string;
  rating: number;
  reviews: number;
  features: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export type SortOption = 'name' | 'rating' | 'reviews' | 'newest';
export type FilterOption = 'all' | 'free' | 'freemium' | 'paid';

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  image: string;
  category: string;
  tags: string[];
  lessons: number;
  certificate: boolean;
  lastUpdated: string;
  isFeatured?: boolean;
  isPopular?: boolean;
}