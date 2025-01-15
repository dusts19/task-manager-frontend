import React from 'react';
import Link from 'next/link'
import LogoutButton from '../components/Logout'

interface HeaderProps {
    title?: string,
}


const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className="flex pt-2 pb-4 px-4 bg-gradient-to-b from-sky-500 from-25% via-teal-500 via-65% w-full">

            {title && <h1 className="text-center w-full text-2xl pl-64">{title}</h1>}

            <nav>
                <ul className="md:flex md:justify-center md:space-x-4">
                    <li>
                        <Link href="/" className="hover:text-white pr-2">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/tasks" className="hover:text-white pr-2">
                            Tasks
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:text-white pr-2">
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