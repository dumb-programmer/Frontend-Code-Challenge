import { useContext } from "react";
import { CartContext } from "../context/CardContext";

export default function useCartContext() {
    return useContext(CartContext);
}