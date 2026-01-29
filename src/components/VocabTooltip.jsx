import React from 'react';
import { X } from 'lucide-react';

const VocabTooltip = ({ vocab, onClose }) => {
    return (
        <div
            className="absolute left-1/2 -translate-x-1/2 -top-3 -translate-y-full z-[60] w-max max-w-[240px] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="bg-[#1F2937] text-white rounded-xl px-4 py-3 shadow-xl border border-white/5 relative">
                {/* Triangle Arrow */}
                <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1F2937] rotate-45"></div>

                <div className="flex items-start gap-3">
                    <div>
                        <span className="font-bold text-[#FDBA74] text-xs uppercase tracking-wider block mb-1">{vocab.word}</span>
                        <span className="font-sans text-sm leading-relaxed text-slate-200 block">{vocab.definition}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/40 hover:text-white shrink-0 -mt-1 -mr-2 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VocabTooltip;
