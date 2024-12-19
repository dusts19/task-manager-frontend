'use client'

import React, { useState } from 'react';

interface RegisterProps {
    handleRegister: (username: string, password: string, email: string) => void;
}


const RegisterPage: React.FC<RegisterProps> = ({handleRegister}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onSubmit= (e: React.FormEvent) => {
        e.preventDefault();
        handleRegister(username, password, email);
    }

    return (
        <div className="grid p-2 gap-2">
            {/* <h1 className="justify-self-center">Register</h1> */}
            <form onSubmit={onSubmit} className="grid p-2 gap-2">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    autoComplete='username'
                    className="p-1 rounded"
                />
                <input
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                    autoComplete="current-password"
                    className="p-1 rounded"
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    autoComplete="email"
                    className="p-1 rounded"
                />

                <button type="submit" className="border-black border-2 rounded-md justify-self-center px-2">Register</button>
            </form>
        </div>

    )
}

export default RegisterPage;