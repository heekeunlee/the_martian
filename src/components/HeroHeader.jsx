import React from 'react';

const HeroHeader = ({ title }) => {
    return (
        <div className="fixed top-0 left-0 right-0 h-[45vh] z-0">
            {/* Background Image */}
            <img
                src="/the_martian/mars-cover.png"
                alt="The Martian Cover"
                className="w-full h-full object-cover brightness-90"
            />

            {/* Overlay Gradient for Text Readability (Top) */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent"></div>
        </div>
    );
};

export default HeroHeader;
