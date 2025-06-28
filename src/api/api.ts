import type { Item } from "../utils/types";

export function getAllItems() {
    return fetch(`${import.meta.env.VITE_BASE_URL}/items`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export function getItem(itemId: string) {
    return fetch(`${import.meta.env.VITE_BASE_URL}/items/${itemId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export function addItem(item: Item) {
    return fetch(`${import.meta.env.VITE_BASE_URL}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    });
}

export function deleteItem(itemId: string) {
    return fetch(`${import.meta.env.VITE_BASE_URL}/items/${itemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
}
