'use client';

import React,{ useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '../../../context/UserContext';
import ThemeButton from './theme-button';

import { useSidebar } from "../../../context/SidebarContext";

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = useUser();
    const { toggle: toggleSidebar } = useSidebar();
    const pathname = usePathname();

    const isTasksRoute = pathname.startsWith('/tasks');

    const toggleMenu = () => setIsMobileMenuOpen(prev => !prev)


    return (
        <header className="px-6 py-4 bg-white shadow-md border-b border-gray-200 text-[#2B2B2B] 
            dark:bg-[#1E1E1E] dark:text-[#E0E0E0] dark:border-[#2C2C2C]">
            <div className="flex items-center justify-between ">

                {isTasksRoute && (<button
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                    className="lg:hidden p-3"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                    </svg>

                </button>)}
                
                

                <h1 className="text-xl font-bold text-[#3A86FF] dark:text-[#3B82F6] ">
                    {title}
                </h1>

                <nav className="hidden lg:flex flex-row items-center">
                    <ul className="flex space-x-6 text-sm font-medium">
                        <li>
                            <Link href={user ? "/tasks": "/"} className="hover:text-[#007AFF] dark:hover:text-[#3B82F6] transition-colors">
                                Home
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="/tasks" className="hover:text-white pr-2">
                                Tasks
                            </Link>
                        </li> */}
                        <li>
                            <Link href="/about" className="hover:text-[#007AFF] dark:hover:text-[#3B82F6] transition-colors">
                                About
                            </Link>
                        </li>
                        {!user && (
                            <li>
                                <Link href="/" className="hover:text-[#007AFF] dark:hover:text-[#3B82F6] transition-colors">
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>

                    <div className="pl-6 pr-2">
                        <ThemeButton />
                    </div>

                </nav>
                    
                <button
                    onClick={toggleMenu}
                    className="lg:hidden focus:outline-none"
                    aria-label="Toggle Menu">
                    {isMobileMenuOpen 
                        ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
) 
                        : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg> 
                        )}
                </button>
            </div>

            {isMobileMenuOpen && (
                <nav className="lg:hidden mt-4 flex flex-col space-y-4 text-sm font-medium">
                        
                    <Link href={user ? "/tasks": "/"} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#007AFF] dark:hover:text-[#3B82F6] transition-colors">
                        Home
                    </Link>
                    
                    {/* <li>
                        <Link href="/tasks" className="hover:text-white pr-2">
                            Tasks
                        </Link>
                    </li> */}
                    
                    <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#007AFF] dark:hover:text-[#3B82F6] transition-colors">
                        About
                    </Link>
                    
                    {!user && (
                        
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#007AFF] dark:hover:text-[#3B82F6] transition-colors">
                            Login
                        </Link>
                        
                    )}
                    <div className="lg:pl-6 pr-2">

                        <ThemeButton />
                    </div>

                
                </nav>
            )}

        </header>
    )
}

export default Header;