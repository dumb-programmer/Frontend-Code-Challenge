import { useQuery } from "@tanstack/react-query";
import type { Item } from "../utils/types";
import ItemCard from "../components/ItemCard";
import { getAllItems } from "../api/api";

export default function Items() {
    const { data: items, isLoading } = useQuery<Item[]>({
        queryFn: async () => {
            const response = await getAllItems();
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
        queryKey: ["items"],
    });

    return <div className="flex gap-6 flex-wrap">
        {
            items?.map((item) => <ItemCard key={item.id} item={item} />)
        }
    </div>;
}