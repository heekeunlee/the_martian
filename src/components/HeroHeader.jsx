import React from 'react';

const HeroHeader = ({ title }) => {
    return (
        <div className="absolute top-0 left-0 right-0 h-[22vh] z-0 bg-[#1A202C]">
            {/* Background Image */}
            <img
                src={`${import.meta.env.BASE_URL}mars-cover.png`}
                alt="The Martian Cover"
                className="w-full h-full object-cover object-bottom opacity-100" // Changed directly to object-bottom and full opacity for vibrancy
            />

            {/* Gradient Overlay for seamless blend - reduced height */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F9FAFB] to-transparent"></div>
        </div>
    );
};

export default HeroHeader;
