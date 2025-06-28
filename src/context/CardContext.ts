import React from "react";
import type { Item } from "../utils/types";

interface CardContext{
    items: Item[];
    addItem: (item: Item) => void;
    removeItem: (itemId: string) => void;
    clearCart: () => void;
}

export const CartContext = React.createContext<CardContext | null>(null);