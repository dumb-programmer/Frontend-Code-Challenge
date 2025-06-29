import { XIcon } from "lucide-react";
import { useCartStore } from "../stores/cartStore";
import { useMemo } from "react";

export default function Checkout() {
    const { items, removeItem, updateItemQuantity } = useCartStore();

    const totalPrice = useMemo(() => Object.values(items).reduce((total, item) => total + (+item.price * item.quantity), 0), [items]);

    const handleQuantityChange = (itemId: string, qty: number) => updateItemQuantity(itemId, qty)

    return <div className="flex flex-wrap items-start gap-4 overflow-x-auto">
        <table className="table xl:max-w-3/4">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.values(items).map(item => (
                        <tr key={item.id}>
                            <td className="flex items-center gap-4">
                                <figure>
                                    <img
                                        src={item.img.includes("http") ? item.img : `${import.meta.env.VITE_BASE_URL}/${item.img}`}
                                        alt={item.name}
                                        className="h-[140px] w-[284px] object-cover"
                                    />
                                </figure>
                                <p className="font-bold">{item.name}</p>
                            </td>
                            <td className="font-bold">PKR {item.price}</td>
                            <td>
                                <input type="number" className="peer input input-bordered w-20 invalid:border-red-700"
                                    onChange={(e) => {
                                        if (e.target.validity.valid) {
                                            handleQuantityChange(item.id, +e.target.value)
                                        }
                                    }}
                                    defaultValue={item.quantity} min={1}
                                />
                                <p className="mt-1 text-sm text-red-700 invisible peer-invalid:visible">Quantity cannot be less than one</p>
                            </td>
                            <td className="font-bold">PKR {+item.price * item.quantity}</td>
                            <td>
                                <button className="btn btn-ghost btn-circle" onClick={() => removeItem(item.id)}>
                                    <XIcon className="stroke-gray-400" height={18} width={18} />
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <div className="card flex flex-col gap-8 border border-gray-200 min-w-[300px] rounded-md p-8 w-full xl:w-auto">
            <h1 className="text-xl font-bold">Summary</h1>
            <p>Subtotal <span className="ml-4 font-bold">PKR {totalPrice}</span></p>
            <p>Total <span className="ml-10 font-bold">PKR {totalPrice}</span></p>
            <button className="btn btn-primary w-full">Checkout</button>
        </div>
    </div>;
}