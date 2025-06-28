import React from "react";
import type { CartItems, Item } from "../utils/types";

interface CardContext {
    items: CartItems;
    addItem: (item: Item) => void;
    updateItemQuantity: (itemId: string, newQty: number) => void;
    removeItem: (itemId: string) => void;
    clearCart: () => void;
}

const defaultState = { items: {}, addItem: () => { }, updateItemQuantity: () => { }, removeItem: () => { }, clearCart: () => { } }

export const CartContext = React.createContext<CardContext>(defaultState);