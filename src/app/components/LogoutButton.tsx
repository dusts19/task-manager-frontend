"use client"


import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../context/UserContext';

const LogoutButton: React.FC = () => {
    const router = useRouter();
    const { logoutAndClearUser } = useUser();

    const handleLogout = () => {
        logoutAndClearUser();
        router.push('/');
    };

    return (
        <button 
            className="border-black border-2 rounded-lg bg-[#3A86FF] hover:bg-[#2EC486] py-1 px-4 transition-colors duration-200 text-white shadow-md dark:text-[#E0E0E0]" 
            onClick={ handleLogout }
        >
            Logout
        </button>
    );
};

export default LogoutButton;