import { useEffect, useLayoutEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import type { CartItems, Item } from "../utils/types";

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItems>({});

    useLayoutEffect(() => {
        const storedItems = localStorage.getItem("cartItems");
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    }, [])

    useEffect(() => {
        if (Object.keys(items).length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(items));
        }
    }, [items]);

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

    const updateItemQuantity = (itemId: string, newQty: number) => {
        setItems(prevItems => {
            const newItem = { ...prevItems[itemId], quantity: newQty }

            const newItems = { ...prevItems };

            newItems[itemId] = newItem;

            return newItems;
        })
    }

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateItemQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}