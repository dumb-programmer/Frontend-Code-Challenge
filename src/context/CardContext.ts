import React from "react";
import type { CartItems, Item } from "../utils/types";

interface CardContext{
    items: CartItems;
    addItem: (item: Item) => void;
    removeItem: (itemId: string) => void;
    clearCart: () => void;
}

export const CartContext = React.createContext<CardContext | null>(null);