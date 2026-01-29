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
                                className={`font-bold text-[#C1440E] cursor-pointer border-b border-[#C1440E]/30 hover:bg-[#C1440E]/5 transition-colors mx-0.5 ${activeVocab === vocab ? 'bg-[#C1440E]/10' : ''}`}
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
                className={`inline leading-loose transition-all duration-300 cursor-pointer rounded-sm px-1 py-0.5 box-decoration-clone ${isActive
                        ? 'bg-[#C1440E]/15 text-[#1A202C] decoration-clone'
                        : 'text-[#2C2C2C] hover:text-[#1A202C] hover:bg-[#C1440E]/5'
                    }`}
            >
                {renderContent()}
            </span>

            {/* Action Bubble */}
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
