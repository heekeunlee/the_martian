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
                                className={`font-semibold text-orange-400 cursor-pointer border-b-2 border-orange-400/30 hover:bg-orange-400/10 transition-colors mx-0.5 ${activeVocab === vocab ? 'bg-orange-400/20' : ''}`}
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
                className={`inline leading-loose transition-colors duration-200 cursor-pointer rounded px-0.5 box-decoration-clone ${isActive
                        ? 'bg-orange-500/15 text-white'
                        : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800'
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
