import useCartContext from "../hooks/useCartContext";
import type { Item } from "../utils/types";

interface ItemCardProps {
    item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
    const { addItem } = useCartContext();

    const handleBuyNow = () => {
        addItem(item);
    };

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={item.img.includes("http") ? item.img : `${import.meta.env.VITE_BASE_URL}/${item.img}`}
                    alt={item.name}
                    className="h-[240px] w-[384px] object-cover"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p>PKR {item.price}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={handleBuyNow}>Buy Now</button>
                </div>
            </div>
        </div>
    );
}