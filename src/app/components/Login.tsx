'use client';

import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface LoginProps {
    handleLogin: (username: string, password: string) => void;
    errorMessage: string | null;
}

const LoginPage: React.FC<LoginProps> = ({handleLogin, errorMessage}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin(username, password);
    }


    return (
        <div className="grid p-2 gap-2">
            <form onSubmit={onSubmit} className="grid p-2 gap-2">
                <div className="text-sm text-gray-600 bg-gray-100 border border-gray-400 rounded p-2
                                dark:bg-[#C3C3C3] dark:text-[#2F2F2F]"
                >
                    <p className="font-normal"><span className="font-semibold">Demo Login:</span> Demo</p>
                    <p className="font-normal"><span className="font-semibold">Password:</span> demo</p>
                </div>

                {errorMessage && (
                    <div className={`text-sm mb-2 ${
                        errorMessage.toLowerCase().includes('success') || errorMessage.toLowerCase().includes('created')
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>{errorMessage}</div>
                )}
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    autoComplete="username"
                    required
                    className="border border-gray-300 px-3 py-2 pr-10 rounded"
                />
                <div className="relative w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                        className="border border-gray-300 px-3 py-2 pr-10 rounded"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600"
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                        ) : (
                            <EyeIcon  className="w-5 h-5 text-gray-600 dark:text-gray-200"/>
                        )}
                    </button>
                </div>

                <button type="submit" className="border-black border-2 rounded-md justify-self-center px-2 dark:border-[#929292]"> Login</button>
            </form>
        </div>
    );
};

export default LoginPage;