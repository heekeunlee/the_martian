import React from 'react';

const HeroHeader = ({ title }) => {
    return (
        <div className="absolute top-0 left-0 right-0 h-[25vh] z-0 bg-[#1A202C]">
            {/* Background Image */}
            <img
                src={`${import.meta.env.BASE_URL}mars-cover.png`}
                alt="The Martian Cover"
                className="w-full h-full object-cover opacity-90"
            />

            {/* Gradient Overlay for seamless blend */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F9FAFB] to-transparent"></div>
        </div>
    );
};

export default HeroHeader;
