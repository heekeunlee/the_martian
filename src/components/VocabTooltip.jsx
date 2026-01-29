import React from 'react';
import { X } from 'lucide-react';

const VocabTooltip = ({ vocab, onClose }) => {
    return (
        <div
            className="absolute left-1/2 -translate-x-1/2 -top-3 -translate-y-full z-[60] w-max max-w-[260px] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Light Yellow Glass Container */}
            <div className="bg-[#FFF9C4]/95 backdrop-blur-xl text-[#374151] rounded-2xl px-5 py-3.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-[#FDE047]/30 relative">
                {/* Triangle Arrow - Matching Yellow */}
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FFF9C4]/95 backdrop-blur-xl rotate-45 border-r border-b border-[#FDE047]/30 rounded-sm"></div>

                <div className="flex items-start gap-4">
                    <div>
                        {/* Word Title - Darker for contrast */}
                        <span className="font-sans font-bold text-[#854D0E] text-sm tracking-tight block mb-1">
                            {vocab.word}
                        </span>

                        {/* Definition - Dark Gray */}
                        <span className="font-sans text-[13px] leading-relaxed text-[#4B5563] block font-medium">
                            {vocab.definition}
                        </span>
                    </div>

                    {/* Close Button - Amber tint */}
                    <button
                        onClick={onClose}
                        className="text-[#B45309]/50 hover:text-[#B45309] shrink-0 -mt-1 -mr-2 p-1.5 rounded-full hover:bg-black/5 transition-colors"
                    >
                        <X size={14} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VocabTooltip;
