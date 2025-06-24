'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon } from '@heroicons/react/24/outline';
import { MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeButton() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg lg:border border-black bg-blue-500 text-yellow-500 hover:bg-gray-200 dark:bg-slate-500 dark:border-white hover:dark:bg-[#252525]"
        >
            {theme ==='dark' 
            ? <SunIcon className=" fill-yellow-500 size-3 scale-150 lg:size-6 lg:scale-100"/> 
            : <MoonIcon className=" fill-yellow-500 size-3 scale-150 lg:size-6 lg:scale-100"/>}
        </button>
    )
}