'use client';

import { useSidebar } from "../../../../context/SidebarContext";
import Sidebar from '../../components/Sidebar';

export default function ClientSidebarLayout({ children }: {children: React.ReactNode }) {
    const { isOpen, close } = useSidebar();

    return (
        <div className="relative flex flex-1 min-h-0">
            {isOpen && (
                <div
                    onClick={close}
                    className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
                />
            )}
            <Sidebar />
            <main className="flex-1 h-full overflow-y-auto lg:overflow-auto p-4 bg-slate-100 dark:bg-[#121212]">
                {children}
            </main>
        </div>
    );
}