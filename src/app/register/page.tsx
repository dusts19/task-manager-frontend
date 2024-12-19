'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '../../../services/authService';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await register({ username, password, email });
            console.log(`Registration Response: ${response}`);
            router.push('/login');
        } catch (error) {
            console.error(`Error registering user:${error}`)
            setError('Registration failed');
        }
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    autoComplete='username'
                />
                <input
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                    autoComplete="current-password"
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    autoComplete="email"
                />

                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>

    )
}

export default RegisterPage;