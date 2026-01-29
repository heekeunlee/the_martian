import React from 'react';
import ActionBubble from './ActionBubble';

const SentenceSegment = ({
    data,
    isActive,
    onClick,
    onPlay,
    onClose,
    activeVocab,
    onVocabClick
}) => {

    // Highlighting logic helper
    const renderContent = () => {
        if (!data.vocabulary || data.vocabulary.length === 0) {
            return data.text + " ";
        }

        let parts = [data.text];
        data.vocabulary.forEach(vocab => {
            const newParts = [];
            parts.forEach(part => {
                if (typeof part !== 'string') {
                    newParts.push(part);
                    return;
                }
                const regex = new RegExp(`(${vocab.word})`, 'gi');
                const split = part.split(regex);
                split.forEach((str, i) => {
                    if (str.toLowerCase() === vocab.word.toLowerCase()) {
                        newParts.push(
                            <span
                                key={`${vocab.word}-${i}`}
                                className={`font-bold text-indigo-700 cursor-pointer border-b-2 border-indigo-200 hover:bg-indigo-50 transition-colors mx-0.5 ${activeVocab === vocab ? 'bg-indigo-100 text-indigo-900' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onVocabClick(vocab);
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
            parts = newParts;
        });

        // Add a trailing space for layout flow
        parts.push(<span key="space"> </span>);
        return parts;
    };

    return (
        <span className="relative inline">
            <span
                onClick={onClick}
                className={`inline leading-loose transition-all duration-300 cursor-pointer rounded-sm px-1 box-decoration-clone ${isActive
                        ? 'bg-[#FFD54F]/40 text-slate-900 decoration-clone'
                        : 'text-slate-800 hover:text-slate-900 hover:bg-slate-100'
                    }`}
            >
                {renderContent()}
            </span>

            {/* Action Bubble (Rendered as a sibling to the text span, but absolutely positioned) */}
            {isActive && (
                <ActionBubble
                    translation={data.translation}
                    onPlay={onPlay}
                    onClose={onClose}
                    vocab={activeVocab}
                />
            )}
        </span>
    );
};

export default SentenceSegment;
