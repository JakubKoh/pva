import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, MenuItem, Extra } from "@/lib/types";

interface CartState {
  items: CartItem[];
  addItem: (menuItem: MenuItem, selectedExtras?: Extra[]) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

function generateCartItemId(menuItem: MenuItem, extras: Extra[]): string {
  const extraIds = extras.map((e) => e.id).sort().join("-");
  return `${menuItem.id}-${extraIds || "no-extras"}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (menuItem: MenuItem, selectedExtras: Extra[] = []) => {
        const id = generateCartItemId(menuItem, selectedExtras);
        set((state) => {
          const existingItem = state.items.find((item) => item.id === id);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id,
                menuItem,
                quantity: 1,
                selectedExtras,
              },
            ],
          };
        });
      },

      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce((total, item) => {
          const extrasTotal = item.selectedExtras.reduce(
            (sum, extra) => sum + extra.price,
            0
          );
          return total + (item.menuItem.price + extrasTotal) * item.quantity;
        }, 0);
      },
    }),
    {
      name: "fit-fat-cart",
    }
  )
);
