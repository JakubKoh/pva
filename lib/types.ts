export type MenuCategory = "fit" | "fat";

export interface Extra {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  tags: string[];
  extras?: Extra[];
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedExtras: Extra[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  coordinates: [number, number];
}
