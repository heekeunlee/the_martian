import React from 'react';
import { Volume2, X } from 'lucide-react';

const ActionBubble = ({ translation, onPlay, onClose, vocab }) => {
    return (
        <div
            className="absolute left-1/2 -translate-x-1/2 -top-4 -translate-y-full z-50 w-max max-w-[90vw] md:max-w-md animate-in fade-in slide-in-from-bottom-2 duration-300"
            style={{ filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.25))' }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bg-[#1A202C]/90 backdrop-blur-md text-[#F9F7F1] rounded-xl p-5 flex flex-col gap-3 relative border border-white/10">
                {/* Triangle Arrow */}
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1A202C]/90 backdrop-blur-md rotate-45 border-r border-b border-white/10"></div>

                {/* Translation Text */}
                <div className="font-merriweather text-lg leading-snug text-center px-1 font-medium">
                    {translation}
                </div>

                {/* Controls / Vocab */}
                <div className="flex items-center justify-center gap-3 pt-3 border-t border-white/10">
                    <button
                        onClick={onPlay}
                        className="flex items-center gap-2 px-4 py-1.5 bg-[#C1440E] hover:bg-[#D95216] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-[#C1440E]/20"
                    >
                        <Volume2 size={14} />
                        Listen
                    </button>

                    {vocab && (
                        <div className="px-3 py-1.5 bg-white/5 rounded-lg text-sm border border-white/5">
                            <span className="font-bold text-[#C1440E] block text-xs uppercase tracking-wide mb-0.5">{vocab.word}</span>
                            <span className="text-[#E2E8F0] font-merriweather italic text-xs">{vocab.definition}</span>
                        </div>
                    )}

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="ml-auto p-1.5 text-white/40 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActionBubble;
