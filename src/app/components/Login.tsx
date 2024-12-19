'use client';

import React, { useState } from 'react';
// import { redirect } from 'next/navigation';

interface LoginProps {
    handleLogin: (username: string, password: string) => void;
}

const LoginPage: React.FC<LoginProps> = ({handleLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin(username, password);
    }


    return (
        <div className="grid p-2 gap-2">
            {/* <h1 className="justify-self-center">Login</h1> */}
            <form onSubmit={onSubmit} className="grid p-2 gap-2">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    autoComplete="username"
                    required
                    className="p-1 rounded"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    className="p-1 rounded"
                />

                <button type="submit" className="border-black border-2 rounded-md justify-self-center px-2"> Login</button>

            </form>
        </div>
    );
};

export default LoginPage;