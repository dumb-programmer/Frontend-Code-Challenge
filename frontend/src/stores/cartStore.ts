import { create } from "zustand";
import { persist } from "zustand/middleware"
import type { CartItems, Item } from "../utils/types";

interface CartStore {
    items: CartItems;
    addItem: (item: Item) => void;
    updateItemQuantity: (itemId: string, newQty: number) => void;
    removeItem: (itemId: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist((set) => ({
        items: {},
        addItem: (item: Item) => set(state => {
            const existingItem = state.items[item.id];

            if (existingItem) {
                return {
                    items: {
                        ...state.items,
                        [item.id]: {
                            ...existingItem,
                            quantity: existingItem.quantity + 1
                        }
                    }
                };
            }

            return { items: { ...state.items, [item.id]: { ...item, quantity: 1 } } };
        }),
        removeItem: (itemId: string) => set(state => {
            const newItems = { ...state.items };

            delete newItems[itemId];

            return { items: newItems };
        }),
        updateItemQuantity: (itemId: string, newQty: number) => set(state => {
            const newItem = { ...state.items[itemId], quantity: newQty }

            const newItems = { ...state.items };

            newItems[itemId] = newItem;

            return { items: newItems };
        }),
        clearCart: () => set({ items: {} }),
    }), { name: "cart-items" })
)