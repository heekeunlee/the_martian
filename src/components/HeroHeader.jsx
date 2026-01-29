import React from 'react';

const HeroHeader = ({ title }) => {
    return (
        <div className="absolute top-0 left-0 right-0 h-[30vh] z-0 overflow-hidden opacity-90 pointer-events-none">
            {/* Background Image - Fades out at the bottom to blend with page */}
            <img
                src={`${import.meta.env.BASE_URL}mars-cover.png`}
                alt="The Martian Cover"
                className="w-full h-full object-cover object-top"
                style={{ maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }}
            />
        </div>
    );
};

export default HeroHeader;
