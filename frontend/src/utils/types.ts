export interface Item {
    id: string;
    name: string;
    price: string;
    img: string;
}

export interface CartItems {
    [key: string]: CartItem;
}

export interface CartItem extends Item {
    quantity: number;
}