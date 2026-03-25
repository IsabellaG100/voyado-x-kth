export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  tags: string[];
  imageUrl: string;
  inStock: boolean;
  rating: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  productCount: number;
}
