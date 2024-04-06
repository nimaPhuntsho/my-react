import { Product } from "./../components/Products";
import { create } from "zustand";

interface Counter {
  count: number;
  increment: () => void;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (item: CartItem) => void;
  incrementQuantity: (product: Product) => void;
  decrementQuantity: (product: Product) => void;
  reset: () => void;
}

export const useCartStore = create<CartStore>()((set) => ({
  items: [],
  add: (item) => set((state) => ({ items: [...state.items, item] })),
  remove: (item) =>
    set((state) => ({
      items: state.items.filter((element) => element.id !== item.id),
    })),
  incrementQuantity: (product) =>
    set((state) => ({
      items: state.items.map((element) =>
        element.id === product.id
          ? { ...element, quantity: element.quantity + 1 }
          : element
      ),
    })),
  decrementQuantity: (product) =>
    set((state) => ({
      items: state.items.map((element) =>
        element.id === product.id
          ? {
              ...element,
              quantity: element.quantity > 1 ? element.quantity - 1 : 1,
            }
          : element
      ),
    })),
  reset: () => {
    set(() => ({ items: [] }));
  },
}));

export const useCountStore = create<Counter>()((set) => ({
  count: 0,
  increment: () => {
    set((state) => ({ count: state.count + 1 }));
  },
}));
