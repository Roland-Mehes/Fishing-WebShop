import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  variantId: string;
  productId: string;

  name: string;
  slug: string;

  sku: string;

  price: number;
  quantity: number;

  image?: string;
  variantName?: string;

  attributes?: {
    name: string;
    value: string;
  }[];
};

type CartState = {
  items: CartItem[];

  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (variantId: string) => void;

  updateQuantity: (variantId: string, quantity: number) => void;

  increaseQuantity: (variantId: string) => void;
  decreaseQuantity: (variantId: string) => void;

  clearCart: () => void;

  getItemCount: () => number;
  getSubtotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        if (quantity <= 0) return;

        set((state) => {
          const existingItem = state.items.find(
            (cartItem) => cartItem.variantId === item.variantId,
          );

          if (existingItem) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.variantId === item.variantId
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + quantity,
                    }
                  : cartItem,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity,
              },
            ],
          };
        });
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== variantId),
        }));
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter((item) => item.variantId !== variantId),
          }));

          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === variantId
              ? {
                  ...item,
                  quantity,
                }
              : item,
          ),
        }));
      },

      increaseQuantity: (variantId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === variantId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        }));
      },

      decreaseQuantity: (variantId) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.variantId === variantId
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => {
        set({
          items: [],
        });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: 'shop-cart',
    },
  ),
);
