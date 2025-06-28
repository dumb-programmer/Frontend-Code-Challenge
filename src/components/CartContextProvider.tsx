import { useState } from "react";
import { CartContext } from "../context/CardContext";
import type { CartItems, Item } from "../utils/types";

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItems>({});

    const addItem = (item: Item) => {
        setItems(prevItems => {
            const existingItem = prevItems[item.id];

            if (existingItem) {
                return {
                    ...prevItems,
                    [item.id]: {
                        ...existingItem,
                        quantity: existingItem.quantity + 1
                    }
                };
            }

            return { ...prevItems, [item.id]: { ...item, quantity: 1 } };
        });
    };

    const removeItem = (itemId: string) => {
        setItems(prevItems => {
            const newItems = { ...prevItems };

            delete newItems[itemId];

            return newItems;
        });
    };

    const clearCart = () => {
        setItems({});
    };

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}