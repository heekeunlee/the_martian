import React from 'react';
import { X } from 'lucide-react';

const VocabTooltip = ({ vocab, onClose }) => {
    return (
        <div
            className="absolute left-1/2 -translate-x-1/2 -top-3 -translate-y-full z-[60] w-max max-w-[240px] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bg-[#E9D5FF] text-[#1F2937] rounded-2xl px-4 py-3 shadow-[0_4px_20px_rgba(139,92,246,0.25)] border border-[#8B5CF6]/20 relative">
                {/* Triangle Arrow */}
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#E9D5FF] rotate-45 border-r border-b border-[#8B5CF6]/20 rounded-sm"></div>

                <div className="flex items-start gap-3">
                    <div>
                        <span className="font-bold text-[#7C3AED] text-xs uppercase tracking-wider block mb-1">{vocab.word}</span>
                        <span className="font-sans text-sm leading-relaxed text-[#4C1D95] font-medium block">{vocab.definition}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#7C3AED]/40 hover:text-[#7C3AED] shrink-0 -mt-1 -mr-2 p-1.5 rounded-full hover:bg-white/30 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VocabTooltip;
