export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string | null;
  image_url: string | null;
  in_stock: boolean;
  created_at?: string;
}

export interface CartLine {
  id: string;
  qty: number;
}
