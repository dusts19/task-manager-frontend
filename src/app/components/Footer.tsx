import React from 'react';

interface FooterProps {
    title?: string,
}


const Footer: React.FC<FooterProps> = () => {
    return (
        <footer>
            <nav className="bg-[#F9F9F9] border-t border-gray-200 py-1.5 mt-auto dark:bg-[#1E1E1E] dark:border-[#3c3b3b]">
                <p className="w-screen mx-auto px-4 text-right text-sm text-[#2B2B2B] dark:text-[#A0A0A0]">Copyright © Dustin Shin 2025</p>
            
            </nav>

        </footer>
    )
}

export default Footer;