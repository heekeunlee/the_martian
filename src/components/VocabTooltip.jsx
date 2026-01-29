import React from 'react';
import { X } from 'lucide-react';

const VocabTooltip = ({ vocab, onClose }) => {
    return (
        <div
            className="absolute left-1/2 -translate-x-1/2 -top-3 -translate-y-full z-[60] w-max max-w-[200px] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bg-[#E9D5FF]/80 backdrop-blur-md text-[#1F2937] rounded-xl px-4 py-2 shadow-lg border border-[#8B5CF6]/10 relative">
                {/* Triangle Arrow */}
                <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#E9D5FF]/80 backdrop-blur-md rotate-45 rounded-sm"></div>

                <div className="flex items-start gap-2">
                    <div>
                        <span className="font-bold text-[#7C3AED] text-[10px] uppercase tracking-wide block mb-0.5">{vocab.word}</span>
                        <span className="font-sans text-xs leading-snug text-[#4C1D95] font-medium block">{vocab.definition}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#7C3AED]/40 hover:text-[#7C3AED] shrink-0 -mt-0.5 -mr-1 p-1 rounded-full hover:bg-white/30 transition-colors"
                    >
                        <X size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VocabTooltip;
