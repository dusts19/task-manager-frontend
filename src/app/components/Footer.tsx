import React from 'react';

interface FooterProps {
    title?: string,
}


const Footer: React.FC<FooterProps> = () => {
    return (
        <footer>
            <nav className="flex justify-end px-2 bg-blue-200">
                <p>Copyright © Dustin Shin 2024</p>
            
            </nav>

        </footer>
    )
}

export default Footer;