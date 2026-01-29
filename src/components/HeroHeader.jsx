import React from 'react';

const HeroHeader = ({ title }) => {
    return (
        <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-b-3xl shadow-lg mb-8">
            {/* Background Image */}
            <img
                src="/the_martian/mars-cover.png"
                alt="The Martian Cover"
                className="w-full h-full object-cover opacity-80"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

            {/* Title Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide shadow-black drop-shadow-lg text-center">
                    {title}
                </h1>
                <p className="text-orange-400 font-medium tracking-widest text-sm mt-2 uppercase">
                    Andy Weir
                </p>
            </div>
        </div>
    );
};

export default HeroHeader;
