import React from 'react';

interface FooterProps {
    title?: string,
}


const Footer: React.FC<FooterProps> = () => {
    return (
        <footer>
            <nav className="px-2 bg-sky-500 w-full max-w-full sm:w-full text-white">
                <p className=" pr-4">Copyright © Dustin Shin 2024</p>
            
            </nav>

        </footer>
    )
}

export default Footer;