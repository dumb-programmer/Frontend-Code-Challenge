import { useState } from "react";
import { CartContext } from "../context/CardContext";
import type { Item } from "../utils/types";

export default function CartContextProvider({children}: {children: React.ReactNode}) {
    const [items, setItems] = useState<Item[]>([]);

    const addItem = (item: Item) => {
        setItems(prevItems => [...prevItems, item]);
    };

    const removeItem = (itemId: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}