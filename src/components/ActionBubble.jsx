import React from 'react';
import { Volume2, Captions } from 'lucide-react';

const ActionBubble = ({ onPlay, onToggleSubtitle, isSubtitleActive }) => {
    return (
        <div
            className="absolute left-1/2 -translate-x-1/2 -top-4 -translate-y-full z-50 w-max animate-in fade-in slide-in-from-bottom-2 duration-300"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(139, 92, 246, 0.4))' }} // Violet shadow
            onClick={(e) => e.stopPropagation()}
        >
            {/* Violet Pill Shape */}
            <div className="bg-[#8B5CF6] text-white rounded-2xl px-3 py-2 flex items-center gap-1">
                {/* Sharp Triangle Arrow */}
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#8B5CF6] rotate-45"></div>

                {/* Listen Button */}
                <button
                    onClick={onPlay}
                    className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors"
                >
                    <Volume2 size={18} fill="currentColor" />
                    <span>Listen</span>
                </button>

                <div className="w-px h-4 bg-white/20 mx-1"></div>

                {/* Translation Toggle */}
                <button
                    onClick={onToggleSubtitle}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold transition-colors ${isSubtitleActive
                            ? 'bg-white text-[#8B5CF6]'
                            : 'hover:bg-white/20'
                        }`}
                >
                    <Captions size={18} />
                    <span>{isSubtitleActive ? 'Hide' : 'Trans'}</span>
                </button>
            </div>
        </div>
    );
};

export default ActionBubble;
