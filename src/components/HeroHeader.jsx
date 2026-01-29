import React from 'react';

const HeroHeader = ({ title }) => {
    return (
        <div className="absolute top-0 left-0 right-0 h-[50vh] z-0 bg-[#1A202C]">
            {/* Background Image */}
            <img
                src={`${import.meta.env.BASE_URL}mars-cover.png`}
                alt="The Martian Cover"
                className="w-full h-full object-cover opacity-80"
            />

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1A202C]/60 to-transparent mix-blend-multiply"></div>
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#1A202C] via-[#1A202C]/60 to-transparent"></div>

            {/* Title Overlay */}
            <div className="absolute bottom-20 left-0 right-0 text-center px-6 z-10">
                <h1 className="font-playfair font-bold text-4xl md:text-5xl text-[#F9F7F1] tracking-wider drop-shadow-2xl mb-2">
                    The Martian
                </h1>
                <div className="flex items-center justify-center gap-3 opacity-90">
                    <div className="h-px w-8 bg-[#C1440E]"></div>
                    <p className="font-inter text-[#E2E8F0] font-medium text-xs tracking-[0.25em] uppercase">
                        Andy Weir
                    </p>
                    <div className="h-px w-8 bg-[#C1440E]"></div>
                </div>
            </div>
        </div>
    );
};

export default HeroHeader;
