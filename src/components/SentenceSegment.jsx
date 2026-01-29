import React from 'react';
import ActionBubble from './ActionBubble';
import VocabTooltip from './VocabTooltip';

const SentenceSegment = ({
    data,
    isActive,
    isSubtitleActive,
    onClick,
    onPlay,
    onToggleSubtitle,
    currentVocab,
    onVocabClick,
    onVocabClose
}) => {

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
                // Case insensitive matching, global replacement for phrase support
                // We escape special regex chars just in case, though simple text usually fine
                const escapedWord = vocab.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`(${escapedWord})`, 'gi');
                const split = part.split(regex);

                split.forEach((str, i) => {
                    if (str.toLowerCase() === vocab.word.toLowerCase()) {
                        const isVocabActive = currentVocab === vocab;
                        newParts.push(
                            <span
                                key={`${vocab.word}-${i}`}
                                className="relative inline-block whitespace-nowrap" // whitespace-nowrap keeps phrases together if possible
                            >
                                <span
                                    className={`
                                cursor-pointer transition-all duration-300 rounded-sm px-0.5 box-decoration-clone
                                ${isVocabActive
                                            ? 'bg-[#FFD60A] text-black' // Apple Highlight Yellow (Active)
                                            : 'bg-[linear-gradient(to_top,#FFD60A_40%,transparent_40%)] hover:bg-[#FFD60A]' // Marker Pen Style (Inactive)
                                        }
                            `}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onVocabClick(vocab);
                                    }}
                                    title="Tap for definition"
                                >
                                    {str}
                                </span>
                                {isVocabActive && (
                                    <VocabTooltip
                                        vocab={vocab}
                                        onClose={(e) => {
                                            e.stopPropagation();
                                            onVocabClose();
                                        }}
                                    />
                                )}
                            </span>
                        );
                    } else {
                        newParts.push(str);
                    }
                });
            });
            parts = newParts;
        });

        parts.push(<span key="space"> </span>);
        return parts;
    };

    return (
        <span className="relative inline">
            <span
                onClick={onClick}
                className={`
            inline leading-[2.1] transition-all duration-500 cursor-pointer rounded-lg px-2 py-1 -mx-2 box-decoration-clone
            ${isActive
                        ? 'bg-[#007AFF]/10 text-black' // Apple System Blue Tint
                        : 'text-[#1C1C1E] hover:text-black hover:bg-black/5'
                    }
        `}
            >
                {renderContent()}
            </span>

            {isActive && (
                <ActionBubble
                    onPlay={onPlay}
                    onToggleSubtitle={onToggleSubtitle}
                    isSubtitleActive={isSubtitleActive}
                />
            )}
        </span>
    );
};

export default SentenceSegment;
