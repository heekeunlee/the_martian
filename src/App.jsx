import React, { useState, useEffect, useRef } from 'react';
import bookData from './data/chapter1.json';
import SentenceSegment from './components/SentenceSegment';
import HeroHeader from './components/HeroHeader';
import { ChevronLeft, ChevronRight, BookOpen, Play, Pause, Languages } from 'lucide-react';

function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [activeSentenceId, setActiveSentenceId] = useState(null);
  const [activeVocab, setActiveVocab] = useState(null);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Refs for auto-read management
  const utteranceRef = useRef(null);
  const autoPlaySessionRef = useRef(0);

  const currentPage = bookData.pages[currentPageIndex];
  const totalPages = bookData.pages.length;
  const currentSentence = currentPage.sentences.find(s => s.id === activeSentenceId);

  // Reset active state when changing pages
  useEffect(() => {
    safeStopAutoPlay();
    setActiveSentenceId(null);
    setActiveVocab(null);
    setShowSubtitle(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPageIndex]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const goToNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const handleSentenceClick = (id) => {
    if (isAutoPlaying) {
      safeStopAutoPlay();
    }

    if (activeSentenceId === id) {
      // Toggle logic if needed
    } else {
      setActiveSentenceId(id);
      setActiveVocab(null);
      setShowSubtitle(false);
    }
  };

  const handleBackgroundClick = () => {
    safeStopAutoPlay();
    setActiveSentenceId(null);
    setActiveVocab(null);
    setShowSubtitle(false);
  };

  const playAudio = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // --- Auto Read Logic ---

  const safeStopAutoPlay = () => {
    autoPlaySessionRef.current = -1; // Invalidate current session
    setIsAutoPlaying(false);
    window.speechSynthesis.cancel();
  };

  const toggleAutoRead = (e) => {
    e.stopPropagation();
    if (isAutoPlaying) {
      safeStopAutoPlay();
    } else {
      autoPlaySessionRef.current += 1; // Increment session ID
      setIsAutoPlaying(true);
      const startIndex = activeSentenceId
        ? Math.max(0, currentPage.sentences.findIndex(s => s.id === activeSentenceId))
        : 0;

      runAutoReadLoop(startIndex, autoPlaySessionRef.current);
    }
  };

  const toggleTranslationMode = (e) => {
    e.stopPropagation();
    setShowSubtitle(!showSubtitle);
  };

  const runAutoReadLoop = (index, sessionId) => {
    if (sessionId !== autoPlaySessionRef.current) return; // Stop if session changed
    if (index >= currentPage.sentences.length) {
      setIsAutoPlaying(false);
      return;
    }

    const sentence = currentPage.sentences[index];
    setActiveSentenceId(sentence.id);

    // Simple scroll into view logic could go here

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(sentence.text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Slightly slower for clarity

    utterance.onend = () => {
      // Continue only if session is still valid
      if (sessionId === autoPlaySessionRef.current) {
        runAutoReadLoop(index + 1, sessionId);
      }
    };

    utterance.onerror = (e) => {
      console.error("Speech error", e);
      safeStopAutoPlay();
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className="min-h-[100dvh] bg-[#FBFBFD] text-[#1C1C1E] font-sans selection:bg-[#007AFF]/20 pb-40"
      onClick={handleBackgroundClick}
    >
      {/* Apple-style Seamless Header */}
      <HeroHeader title={bookData.title} />

      {/* Main Content Area - Immersive Layout (No Card) */}
      {/* Added safe-area padding to bottom to avoid content hiding behind home bar */}
      <main className="relative z-10 max-w-[580px] mx-auto px-6 sm:px-8 pt-[20dvh] pb-[env(safe-area-inset-bottom)] transition-opacity duration-500 ease-out">

        {/* Title & Author - Fade in */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-4xl font-playfair font-black text-[#1C1C1E] mb-3 tracking-tight leading-tight">
            The Martian
          </h1>
          <p className="text-[#8E8E93] font-medium tracking-[0.2em] text-xs uppercase">
            Andy Weir
          </p>
        </div>

        {/* Chapter Indicator */}
        <div className="flex items-center justify-center gap-3 mb-10 opacity-60">
          <div className="h-px w-8 bg-[#C7C7CC]"></div>
          <div className="flex items-center gap-1.5">
            <BookOpen size={12} className="text-[#8E8E93]" />
            <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-[0.15em]">Chapter 1</span>
          </div>
          <div className="h-px w-8 bg-[#C7C7CC]"></div>
        </div>

        {/* Text Content - Immersive Typography */}
        <div className="font-merriweather text-[1.4rem] leading-[2.1] text-[#1C1C1E] tracking-tight antialiased">
          {currentPage.sentences.map((sentence) => (
            <SentenceSegment
              key={sentence.id}
              data={sentence}
              isActive={activeSentenceId === sentence.id}
              isSubtitleActive={showSubtitle}
              currentVocab={activeVocab}
              onClick={(e) => {
                e.stopPropagation();
                handleSentenceClick(sentence.id);
              }}
              onVocabClick={(vocab) => {
                safeStopAutoPlay();
                setActiveVocab(vocab);
              }}
              onVocabClose={() => setActiveVocab(null)}
              onPlay={(e) => {
                e.stopPropagation();
                safeStopAutoPlay();
                playAudio(sentence.text);
              }}
              onToggleSubtitle={(e) => {
                e.stopPropagation();
                setShowSubtitle(!showSubtitle);
              }}
            />
          ))}

          {currentPage.sentences.length === 0 && (
            <p className="text-center text-gray-300 py-20 italic">
              (End of Chapter)
            </p>
          )}
        </div>
      </main>

      {/* Floating Glass Footer Control - Premium Apple Dock Style */}
      <footer
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-700 pb-[calc(2rem+env(safe-area-inset-bottom))] ${showSubtitle ? 'translate-y-[-10px]' : 'translate-y-0'}`}
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="flex flex-col items-center gap-4 pointer-events-auto"
        >

          {/* Page Indicator - Minimalist text above dock */}
          <span className="text-[10px] font-bold text-[#8E8E93]/60 uppercase tracking-[0.2em] mb-0 backdrop-blur-sm">
            Page {currentPage.pageId} / {totalPages}
          </span>

          {/* The "Island" Control Dock */}
          <div className="bg-[#1C1C1E]/85 backdrop-blur-3xl border border-white/5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] rounded-full pl-6 pr-2 py-2 flex items-center justify-between gap-6 group scale-[0.95] hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]">

            {/* Navigation Group */}
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); safeStopAutoPlay(); goToPrevPage(); }}
                disabled={currentPageIndex === 0}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${currentPageIndex === 0
                    ? 'text-white/20 cursor-not-allowed'
                    : 'text-white hover:bg-white/10 active:scale-90'
                  }`}
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); safeStopAutoPlay(); goToNextPage(); }}
                disabled={currentPageIndex === totalPages - 1}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${currentPageIndex === totalPages - 1
                    ? 'text-white/20 cursor-not-allowed'
                    : 'text-white hover:bg-white/10 active:scale-90'
                  }`}
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Play/Pause Main Action - Floating separate circle effect visually */}
            <button
              onClick={toggleAutoRead}
              className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 ease-out transform hover:scale-105 active:scale-90 shadow-lg ${isAutoPlaying
                  ? 'bg-[#FF9500] text-black shadow-[#FF9500]/30' // Active: Warm Orange
                  : 'bg-white text-black shadow-white/20' // Inactive: Pure White
                }`}
            >
              {isAutoPlaying ? (
                <Pause size={22} fill="currentColor" className="ml-0.5" />
              ) : (
                <Play size={22} fill="currentColor" className="ml-1" />
              )}
            </button>


            {/* Translation Toggle (New Key) - Pushed to right with own background */}
            <button
              onClick={toggleTranslationMode}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 active:scale-90 ml-2 ${showSubtitle
                  ? 'bg-[#0A84FF] text-white' // iOS Blue
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white' // Ghost
                }`}
              title="Toggle Translation"
            >
              <Languages size={18} strokeWidth={2.5} />
            </button>

          </div>
        </div>
      </footer>

      {/* Cinema Subtitle Mode - Updated for Floating Look */}
      {showSubtitle && currentSentence && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-3xl border-t border-white/10 pt-10 pb-[calc(10rem+env(safe-area-inset-bottom))] px-8 animate-in slide-in-from-bottom-full duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_-20px_60px_rgba(0,0,0,0.5)]">
          <div className="max-w-[500px] mx-auto text-center">
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6"></div>
            <p className="text-[#F5F5F7] font-merriweather text-[1.3rem] leading-relaxed font-normal antialiased tracking-wide">
              {currentSentence.translation}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
