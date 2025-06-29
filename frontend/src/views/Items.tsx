import { useQuery } from "@tanstack/react-query";
import type { Item } from "../utils/types";
import ItemCard from "../components/ItemCard";
import { getAllItems } from "../api/api";
import { Loader2Icon } from "lucide-react";

export default function Items() {
    const { data: items, isFetching, isError, error } = useQuery<Item[]>({
        queryFn: async () => {
            const response = await getAllItems();
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
        queryKey: ["items"],
        staleTime: 1000 * 60 * 10 // 10 minutes in ms
    });

    if (isFetching) {
        return <div className="flex justify-center items-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2Icon className="animate-spin" height={40} width={40} />
                <p>Please wait while we load the data.</p>
            </div>
        </div>
    }

    if (isError) {
        return <div className="flex justify-center items-center">
            <div className="flex items-center flex-col gap-4">
                <h1 className="text-3xl">Something went wrong</h1>
                <p>{error.message}</p>
            </div>
        </div>
    }

    return <div className="flex gap-6 flex-wrap">
        {
            items?.map((item) => <ItemCard key={item.id} item={item} />)
        }
    </div>;
}