export interface CamperReview {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  coverImage: string;
  gallery: string[];
  reviews: CamperReview[];
}

export interface CampersResponse {
  items: Camper[];
  total: number;
}

export interface CamperFilters {
  location?: string;
  form?: string;
  transmission?: string;
  engine?: string;
}

export interface BookingData {
  camperId: string;
  name: string;
  email: string;
  date: string;
  comment?: string;
}
