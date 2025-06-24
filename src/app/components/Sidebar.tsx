'use client'

import { useState, useEffect } from 'react';
import React from 'react';
import { useUser } from '../../../context/UserContext';
import { useTaskView } from '../../../context/TaskViewContext';
import { motion, AnimatePresence } from "framer-motion";
// import LogoutButton from '../components/Logout'
import { useEditingTask } from '../../../context/EditingTaskContext';
import { useTask } from "../../../context/TaskContext";
import { useSidebar } from '../../../context/SidebarContext';
import LogoutButton from './LogoutButton';

import { ChevronDownIcon, ChevronUpIcon, DocumentPlusIcon, BookOpenIcon } from '@heroicons/react/24/outline'


const Sidebar: React.FC = () => {
    const { user } = useUser();
    const { setView } = useTaskView();
    const { setEditingTask } = useEditingTask();
    const { isOpen: isSidebarOpen, close } = useSidebar();
    const { tasks } = useTask();
    const [isViewExpanded, setIsViewExpanded] = useState(false);
    const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    console.log(user)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1000);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [])
    
    const uniqueCategories = Array.from(new Set(tasks.map(t => t.taskcategory))).filter(Boolean);

    
    return (
        <motion.aside 
            initial={ false }
            animate={isMobile ? { x: isSidebarOpen ? 0 : '-100%'} : false}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed top-0 left-0 z-50 w-56 h-full bg-[#F9F9F9] p-4 border-r border-gray-300 shadow-sm flex flex-col
                        dark:bg-[#1E1E1E] dark:border-[#2C2C2C] lg:relative lg:translate-x-0
                        ${isMobile && !isSidebarOpen ? 'pointer-events-none invisible': 'pointer-events-auto visible'} pointer-events-auto`}
        >    
            <div className="lg:text-lg sm:text-xl border-b font-semibold text-[#2B2B2B] border-gray-300 dark:border-[#474646] pb-3 mb-4 dark:text-[#E0E0E0]">
                <button
                    onClick={close}
                    aria-label="Close sidebar"
                    className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 lg:hidden" 
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                Welcome, {user?.username || 'Guest'}
            </div>
            <div className="flex-1 overflow-y-auto h-full">
                <nav className="space-y-1 sm:text-md lg:text-sm text-[#2B2B2B]  dark:text-[#E0E0E0]">
                    <button
                        className="flex w-full text-left px-1 py-2 hover:bg-[#E6F0FF] rounded transition hover:dark:bg-[#252525]"
                        onClick= {() => {
                            setEditingTask(null)
                            setView('add')
                        }}
                    >
                        <DocumentPlusIcon className="size-4" /><span className="pl-2">Add Task</span>
                    </button>

                    <div className="flex-1 flex flex-col">
                        <button className="w-full text-left px-1 py-2 hover:bg-[#E6F0FF] rounded flex justify-between items-center transition hover:dark:bg-[#252525]"
                            onClick = {() => setIsViewExpanded(prev => !prev)}>
                            <span className="flex"><BookOpenIcon className="size-4"/> 
                                <p className="pl-2">View Tasks</p>
                            </span>
                            <span className="text-xs 2xl:text-lg">{isViewExpanded ? <ChevronUpIcon className="size-4"/> : <ChevronDownIcon className="size-4"/>}</span>
                        </button>
                        
                        <AnimatePresence initial={false}>

                            {isViewExpanded && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="mt-1 space-y-1 pl-2 flex flex-col"
                                >
                                    <button 
                                        onClick={() => {
                                            setEditingTask(null);
                                            setView('all');
                                        }} 
                                        className="block w-full text-left px-1 py-1 hover:bg-[#E6F0FF] rounded hover:dark:bg-[#252525]"
                                    >
                                        <span className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                            </svg>
                                            <span className="pl-2">All Tasks</span>
                                        </span>
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setEditingTask(null);
                                            setView('priority');
                                        }} 
                                        className="block w-full text-left px-1 py-1 hover:bg-[#E6F0FF] rounded hover:dark:bg-[#252525]"
                                    >
                                        <span className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 lucide lucide-file-warning-icon lucide-file-warning ">
                                                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>
                                            </svg>
                                            <span className="pl-2">By Priority</span>
                                        </span>
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setIsCategoryExpanded(prev => !prev)
                                            console.log(uniqueCategories)
                                        }} 
                                        className="flex w-full justify-between text-left px-1 py-1 hover:bg-[#E6F0FF] rounded items-center hover:dark:bg-[#252525]"
                                    >
                                        <span className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 lucide lucide-square-stack-icon lucide-square-stack">
                                                <path d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"/><path d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"/><rect width="8" height="8" x="14" y="14" rx="2"/>
                                            </svg>
                                            <span className="pl-2">By Category</span> 
                                        </span>
                                        <span>{isCategoryExpanded ? <ChevronUpIcon className="size-4"/> : <ChevronDownIcon className="size-4"/>}</span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isCategoryExpanded && (
                                            <motion.div
                                                initial={{opacity:0, height: 0}}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="pl-2 mt-1 flex flex-col overflow-hidden"
                                            >
                                                <div className="flex-1 min-h-0 overflow-y-auto max-h-[100px] xs:max-h-[140px] sm:max-h-[125px] md:max-h-[140px] lg:max-h-[140px] xl:max-h-[70px] 2xl:max-h-[180px] space-y-1 pr-1">
                                                    <div>
                                                        {uniqueCategories.map(cat => (
                                                            <button
                                                                key={cat}
                                                                onClick={() => {
                                                                    setEditingTask(null);
                                                                    setView(`category:${cat}`);
                                                                }}
                                                                className="block w-full text-left items-center px-2 py-1 hover:bg-[#E6F0FF] rounded hover:dark:bg-[#252525]"
                                                            >
                                                                <span>- {cat}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <button 
                                        onClick={() => {
                                            setEditingTask(null);
                                            setView('date');
                                        }} 
                                        className="w-full text-left px-1 py-1 hover:bg-[#E6F0FF] rounded hover:dark:bg-[#252525]"
                                    >
                                        <span className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 lucide lucide-calendar-days-icon lucide-calendar-days">
                                                <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>
                                            </svg>
                                            <span className="pl-2">By Date</span>
                                        </span>
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setEditingTask(null);
                                            setView('completed');
                                        }} 
                                        className="w-full text-left px-1 py-1 hover:bg-[#E6F0FF] rounded hover:dark:bg-[#252525]"
                                    >
                                        <span className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                                            </svg>


                                            <span className="pl-2">Completed</span>
                                        </span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </nav>
            </div>
            <div className="mt-auto pt-3 border-t border-gray-300 dark:border-[#474646]">
                <LogoutButton />
            </div>
        </motion.aside>
    )
}

export default Sidebar;