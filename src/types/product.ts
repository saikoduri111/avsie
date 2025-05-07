export interface PriceTier {
  minQuantity: number;
  pricePerUnit: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number; // Base price for single unit or if no tiers apply
  priceTiers: PriceTier[];
  minOrderQuantity: number;
  description: string;
  images: string[]; // URLs to images
  fabricDetails: string;
  leadTime: string; // e.g., "2-3 weeks"
  category?: string; // Optional: for potential filtering
  colors?: string[]; // Optional: for potential filtering
}
