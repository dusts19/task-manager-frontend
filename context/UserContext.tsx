'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/userService';
import { login, logout } from '../services/authService';
import { User } from '../types/users';

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loginAndSetUser: (credentials: {username: string, password: string }) => Promise<string>;
    logoutAndClearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children } : { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const loginAndSetUser = async (credentials: { username:string; password: string }) => {
        const token = await login(credentials);
        const fetchedUser = await getCurrentUser();
        setUser(fetchedUser);
        return token;
    }

    const logoutAndClearUser = () => {
        logout();
        setUser(null);
    }

    useEffect(() => {
        getCurrentUser().then(setUser).catch(() => setUser(null));
    }, []);

    return (

        <UserContext.Provider value={{ user, setUser, loginAndSetUser, logoutAndClearUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}