import React from 'react';
import { X } from 'lucide-react';

const VocabTooltip = ({ vocab, onClose }) => {
    return (
        <div
            className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full z-[60] w-max max-w-[200px] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bg-[#1A202C] text-[#F9F7F1] rounded-lg px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-white/10 relative">
                {/* Triangle Arrow */}
                <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1A202C] rotate-45 border-r border-b border-white/10"></div>

                <div className="flex items-start gap-2">
                    <div>
                        <span className="font-bold text-[#C1440E] text-xs uppercase tracking-wide block mb-0.5">{vocab.word}</span>
                        <span className="font-merriweather text-sm leading-snug block">{vocab.definition}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/30 hover:text-white shrink-0 -mt-1 -mr-2 p-1"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VocabTooltip;
