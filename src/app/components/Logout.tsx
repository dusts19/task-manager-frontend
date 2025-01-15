"use client"


import React from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '../../../services/authService';

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <button className="border-black border-2 rounded-lg bg-gradient-to-t from-sky-500 from-20% via-teal-500 via-50% p-0.5 hover:text-white mr-4" onClick={ handleLogout}>Logout</button>
    );
};

export default LogoutButton;