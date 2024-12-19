'use client';

import React, { useState } from 'react';
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { login } from '../../../services/authService';


const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    // const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = await login({ username, password });
            console.log(`Login successful: ${token}`)
            // redirect('/home')
            router.push('/tasks');

            // const token = await login({ username, password });
            // // console.log('JWT Token:', token);
            // if (token){
            //     localStorage.setItem('token', token);
            //     // navigate('/tasks');
            // } else {
            //     setError('Invalid credentials');
            // }
        } catch (error) {
            setError(`Login failed. Please check your credentials and try again.`);
            console.log(`Login error: ${error}`)
        }
    };


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    autoComplete="username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                />

                <button type="submit">Login</button>

            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default LoginPage;