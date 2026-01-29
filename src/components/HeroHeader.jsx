import React from 'react';

const HeroHeader = ({ title }) => {
    return (
        <div className="fixed top-0 left-0 right-0 h-[50vh] z-0 bg-slate-900">
            {/* Background Image */}
            <img
                src={`${import.meta.env.BASE_URL}mars-cover.png`}
                alt="The Martian Cover"
                className="w-full h-full object-cover opacity-90"
            />

            {/* Dark Gradient from bottom for text pop */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent"></div>

            {/* Title Overlay */}
            <div className="absolute bottom-20 left-0 right-0 text-center px-6">
                <h1 className="font-sans font-bold text-4xl text-white tracking-widest uppercase drop-shadow-xl mb-1">
                    The Martian
                </h1>
                <p className="text-orange-200 font-medium text-sm tracking-[0.2em] uppercase opacity-90">
                    Andy Weir
                </p>
            </div>
        </div>
    );
};

export default HeroHeader;
