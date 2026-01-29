import React from 'react';
import { Volume2, Captions } from 'lucide-react';

const ActionBubble = ({ onPlay, onToggleSubtitle, isSubtitleActive }) => {
    return (
        <div
            className="absolute left-1/2 -translate-x-1/2 -top-5 -translate-y-full z-50 w-max animate-in fade-in slide-in-from-bottom-3 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.15))' }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Glass Pill */}
            <div className="bg-[#1C1C1E]/90 backdrop-blur-xl text-white rounded-full px-1.5 py-1.5 flex items-center gap-1 border border-white/10">

                {/* Listen Button */}
                <button
                    onClick={onPlay}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-white/20 rounded-full transition-colors active:scale-95"
                >
                    <Volume2 size={18} className="text-[#0A84FF]" fill="currentColor" />
                    <span className="text-sm font-semibold tracking-tight">Listen</span>
                </button>

                <div className="w-px h-4 bg-white/20 mx-1"></div>

                {/* Translation Toggle */}
                <button
                    onClick={onToggleSubtitle}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors active:scale-95 ${isSubtitleActive
                            ? 'bg-white text-black'
                            : 'hover:bg-white/20'
                        }`}
                >
                    <Captions size={18} className={isSubtitleActive ? "text-black" : "text-[#0A84FF]"} />
                    <span className="text-sm font-semibold tracking-tight">Korean</span>
                </button>
            </div>

            {/* Down Arrow */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1C1C1E]/90 backdrop-blur-xl rotate-45 rounded-sm border-r border-b border-white/10 z-[-1]"></div>
        </div>
    );
};

export default ActionBubble;
