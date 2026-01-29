import React, { useState } from 'react';
import { Volume2, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

const SentenceItem = ({ data, index }) => {
    const [showTranslation, setShowTranslation] = useState(false);
    const [activeVocab, setActiveVocab] = useState(null);

    const handlePlayAudio = (e) => {
        e.stopPropagation();
        const utterance = new SpeechSynthesisUtterance(data.text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const toggleTranslation = () => {
        setShowTranslation(!showTranslation);
    };

    // Helper to highlight vocabulary in text
    const renderText = () => {
        if (!data.vocabulary || data.vocabulary.length === 0) {
            return <span>{data.text}</span>;
        }

        let textParts = [data.text];

        data.vocabulary.forEach(vocab => {
            const newParts = [];
            textParts.forEach(part => {
                if (typeof part !== 'string') {
                    newParts.push(part);
                    return;
                }

                // Case-insensitive matching, but careful with replacing
                const regex = new RegExp(`(${vocab.word})`, 'gi');
                const split = part.split(regex);

                split.forEach((str, i) => {
                    if (str.toLowerCase() === vocab.word.toLowerCase()) {
                        newParts.push(
                            <span
                                key={`${vocab.word}-${index}-${i}`}
                                className="font-bold text-orange-400 cursor-pointer border-b border-orange-400/30 hover:bg-orange-400/10 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveVocab(activeVocab === vocab ? null : vocab);
                                }}
                            >
                                {str}
                            </span>
                        );
                    } else {
                        newParts.push(str);
                    }
                });
            });
            textParts = newParts;
        });

        return textParts;
    };

    return (
        <div className="bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-700/50 hover:border-slate-600 transition-all">
            {/* Top Row: Audio & Vocab Indicator */}
            <div className="flex justify-between items-start mb-2">
                <button
                    onClick={handlePlayAudio}
                    className="p-2 rounded-full bg-slate-700 hover:bg-orange-500 hover:text-white text-slate-300 transition-colors"
                    aria-label="Play Audio"
                >
                    <Volume2 size={18} />
                </button>

                {data.vocabulary.length > 0 && (
                    <div className="flex gap-1">
                        {/* Small dots to indicate vocab available */}
                        {data.vocabulary.map((v, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-500/50"></div>
                        ))}
                    </div>
                )}
            </div>

            {/* English Sentence */}
            <div className="text-xl leading-relaxed text-slate-100 mb-4 font-medium" onClick={toggleTranslation}>
                {renderText()}
            </div>

            {/* Vocabulary Definition Popup (inline) */}
            {activeVocab && (
                <div className="mb-4 bg-slate-900/50 p-3 rounded-lg border border-orange-500/20 text-sm animate-in fade-in slide-in-from-top-1">
                    <span className="text-orange-400 font-bold">{activeVocab.word}</span>:
                    <span className="text-slate-300 ml-2">{activeVocab.definition}</span>
                </div>
            )}

            {/* Korean Translation (Toggled) */}
            <div
                onClick={toggleTranslation}
                className={`cursor-pointer transition-all duration-300 overflow-hidden ${showTranslation ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="text-slate-400 text-lg font-light pt-2 border-t border-slate-700/50">
                    {data.translation}
                </div>
            </div>

            {!showTranslation && (
                <div
                    onClick={toggleTranslation}
                    className="text-center mt-2 cursor-pointer"
                >
                    <span className="text-xs text-slate-600 font-medium uppercase tracking-wider hover:text-slate-400 transition-colors">
                        Tap to reveal translation
                    </span>
                </div>
            )}
        </div>
    );
};

export default SentenceItem;
