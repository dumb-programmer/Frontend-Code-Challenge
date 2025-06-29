import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { LoaderCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import { addItem } from "../api/api";
import type { Item } from "../utils/types";

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.string().min(1, "Price is required").refine(value => !isNaN(parseInt(value)) && parseInt(value) > 0, {
        message: "Price must be a positive integer number"
    }),
    img: z.string().url("Image must be a valid URL")
})

export default function CreateItem() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: Omit<Item, "id">) => {
            const response = await addItem(data);
            if (!response.ok) {
                throw new Error("Failed to create item");
            }
            return response.json();
        },
        onSuccess: (data: Item) => {
            queryClient.setQueriesData<Item[]>({ queryKey: ["items"] }, (prev) => prev ? [...prev, data] : [data])

            toast.success(`Item added successfully`, {
                duration: 5000,
                position: "bottom-right",
            });
        },
        onError: (error: Error) => {
            toast.error(`${error.message}`, {
                duration: 5000,
                position: "bottom-right",
            });
        }
    });

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: z.infer<typeof schema>) => {
        mutate(data);
    }


    return <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex flex-col gap-8 p-8 shadow-md rounded-md max-w-3xl border border-gray-200">
        <h1 className="text-2xl font-bold">Create Item</h1>
        <div className="flex flex-col gap-2">
            <label htmlFor="name">Item Name</label>
            <input className={`input input-bordered w-full ${errors["name"]?.message ? "border-red-700" : ""}`} type="text" {...register("name")} />
            <p className="text-sm text-red-700">{errors["name"]?.message}</p>
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="price">Price</label>
            <input className={`input input-bordered w-full ${errors["price"]?.message ? "border-red-700" : ""}`} {...register("price")} />
            <p className="text-sm text-red-700">{errors["price"]?.message}</p>
        </div>
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <label htmlFor="name">Image URL</label>
                <input className={`input input-bordered w-full ${errors["img"]?.message ? "border-red-700" : ""}`} type="text" {...register("img")} />
                <p className="text-sm text-red-700">{errors["img"]?.message}</p>
            </div>
        </div>
        <button className="btn btn-primary" type="submit" disabled={isPending}>
            {
                isPending ? <LoaderCircleIcon className="animate-spin" /> : "Create Item"
            }
        </button>
    </form>;
}