import React from 'react';
import { Volume2, Captions } from 'lucide-react';

const ActionBubble = ({ onPlay, onToggleSubtitle, isSubtitleActive }) => {
    return (
        <div
            className="absolute left-1/2 -translate-x-1/2 -top-3 -translate-y-full z-50 w-max animate-in fade-in slide-in-from-bottom-2 duration-300"
            style={{ filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))' }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bg-[#1A202C]/90 backdrop-blur-md text-[#F9F7F1] rounded-full px-2 py-2 flex items-center gap-1 border border-white/10">
                {/* Triangle Arrow */}
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1A202C]/90 backdrop-blur-md rotate-45 border-r border-b border-white/10"></div>

                {/* Listen Button */}
                <button
                    onClick={onPlay}
                    className="flex items-center gap-2 px-4 py-2 bg-[#C1440E] hover:bg-[#D95216] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-[#C1440E]/20"
                >
                    <Volume2 size={14} />
                    Listen
                </button>

                <div className="w-px h-4 bg-white/10 mx-1"></div>

                {/* Translation Toggle (CC style) */}
                <button
                    onClick={onToggleSubtitle}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${isSubtitleActive
                            ? 'bg-white text-[#1A202C]'
                            : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    <Captions size={16} />
                    {isSubtitleActive ? 'Hide' : 'Trans'}
                </button>
            </div>
        </div>
    );
};

export default ActionBubble;
