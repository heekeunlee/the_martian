import React from 'react';
import { Volume2, X } from 'lucide-react';

const ActionBubble = ({ translation, onPlay, onClose, vocab }) => {
    return (
        <div
            className="absolute left-1/2 -translate-x-1/2 -top-4 -translate-y-full z-20 w-max max-w-[90vw] md:max-w-md animate-in fade-in zoom-in-95 duration-200"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
            <div className="bg-slate-800 text-slate-100 rounded-2xl p-4 border border-orange-500/30 flex flex-col gap-3 relative">
                {/* Triangle Arrow */}
                <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 border-b border-r border-orange-500/30 rotate-45"></div>

                {/* Translation Text */}
                <div className="text-lg font-medium leading-normal text-white text-center px-2">
                    {translation}
                </div>

                {/* Controls / Vocab */}
                <div className="flex items-center justify-center gap-3 pt-2 border-t border-slate-700/50">
                    <button
                        onClick={onPlay}
                        className="flex items-center gap-2 px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-full text-sm font-medium transition-colors"
                    >
                        <Volume2 size={16} />
                        Listen
                    </button>

                    {vocab && (
                        <div className="px-3 py-1.5 bg-slate-700 rounded-full text-sm text-orange-300">
                            <span className="font-bold">{vocab.word}</span>: {vocab.definition}
                        </div>
                    )}

                    {/* Close Button (Optional, but good for UX) */}
                    <button
                        onClick={onClose}
                        className="ml-auto p-1 text-slate-400 hover:text-white"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActionBubble;
