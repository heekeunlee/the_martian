import React from 'react';
import { Volume2, X } from 'lucide-react';

const ActionBubble = ({ translation, onPlay, onClose, vocab }) => {
    return (
        <div
            className="absolute left-1/2 -translate-x-1/2 -top-3 -translate-y-full z-50 w-max max-w-[90vw] md:max-w-md animate-in fade-in slide-in-from-bottom-2 duration-300"
            style={{ filter: 'drop-shadow(0 8px 16px rgba(100, 80, 200, 0.2))' }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
            <div className="bg-[#5B46F4] text-white rounded-2xl p-4 flex flex-col gap-3 relative shadow-xl">
                {/* Triangle Arrow */}
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#5B46F4] rotate-45"></div>

                {/* Translation Text */}
                <div className="text-lg font-bold leading-snug text-center px-1">
                    {translation}
                </div>

                {/* Controls / Vocab */}
                <div className="flex items-center justify-center gap-3 pt-2 border-t border-white/20">
                    <button
                        onClick={onPlay}
                        className="flex items-center gap-2 px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-bold transition-colors"
                    >
                        <Volume2 size={16} />
                        Listen
                    </button>

                    {vocab && (
                        <div className="px-3 py-1.5 bg-white/20 rounded-full text-sm text-yellow-200 font-medium">
                            <span className="font-bold text-white">{vocab.word}</span>: {vocab.definition}
                        </div>
                    )}

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="ml-auto p-1 text-white/50 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActionBubble;
