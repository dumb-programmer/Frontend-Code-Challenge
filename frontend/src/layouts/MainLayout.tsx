import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Toaster />
            <Header />
            <main className="flex-grow p-4">
                <Outlet />
            </main>
        </div>
    );

}