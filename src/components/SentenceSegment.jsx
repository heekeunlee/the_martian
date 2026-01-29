import React, { useState } from 'react';
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
                        const isVocabActive = currentVocab === vocab;
                        newParts.push(
                            <span
                                key={`${vocab.word}-${i}`}
                                className="relative inline-block"
                            >
                                <span
                                    className={`
                                font-medium cursor-pointer transition-all duration-200 px-1 py-0.5 rounded-md mx-0.5
                                ${isVocabActive
                                            ? 'bg-[#FDBA74] text-[#1F2937] shadow-sm' // Active: Solid Orange
                                            : 'bg-[#FDBA74]/30 text-[#1F2937] hover:bg-[#FDBA74]/50' // Inactive: Transparent Orange
                                        }
                            `}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onVocabClick(vocab);
                                    }}
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

        // Add a trailing space for layout flow
        parts.push(<span key="space"> </span>);
        return parts;
    };

    return (
        <span className="relative inline">
            <span
                onClick={onClick}
                className={`
            inline leading-[2.2] transition-all duration-300 cursor-pointer rounded-lg px-2 py-1 box-decoration-clone
            ${isActive
                        ? 'bg-[#8B5CF6]/20 text-[#1F2937] shadow-[0_0_0_2px_rgba(139,92,246,0.1)]' // Active: Violet Tint
                        : 'text-[#374151] hover:text-[#111827] hover:bg-black/5' // Default: Soft Black
                    }
        `}
            >
                {renderContent()}
            </span>

            {/* Action Bubble - Only shows for Active Sentence */}
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
