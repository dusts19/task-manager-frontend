import React from 'react';
import Link from 'next/link'
import LogoutButton from '../components/Logout'

interface HeaderProps {
    title?: string,
}


const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className="flex py-1 px-2 bg-gradient-to-b from-sky-500 from-25% via-teal-500 via-65% ">

            {title && <h1 className="grid place-content-center w-lvw text-2xl">{title}</h1>}

            <nav className=" ">
                <ul>
                    <li>
                        <Link href="/" className="hover:text-white">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/tasks" className="hover:text-white">
                            Tasks
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:text-white">
                            About
                        </Link>
                    </li>
                    <li>
                        <LogoutButton />
                    </li>
                        
                    
                </ul>
            </nav>
        </header>
    )
}

export default Header;