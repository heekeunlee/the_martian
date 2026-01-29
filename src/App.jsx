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

      {/* Floating Glass Footer Control */}
      {/* Added safe-area padding bottom to lift it up from home indicator */}
      <footer
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 pb-[calc(2.5rem+env(safe-area-inset-bottom))] ${showSubtitle ? 'translate-y-[-10px]' : 'translate-y-0'}`}
        style={{ pointerEvents: 'none' }} // Allow clicks to pass through the empty container area
      >
        <div
          className="flex flex-col items-center gap-3 pointer-events-auto" // Re-enable pointers for buttons
        >

          {/* Page Indicator - Detached and clean */}
          <span className="text-[10px] font-bold text-[#8E8E93]/80 uppercase tracking-[0.15em] mb-1">
            Page {currentPage.pageId} of {totalPages}
          </span>

          {/* Control Capsule */}
          <div className="bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] rounded-full px-4 py-2 flex items-center gap-3 group hover:scale-[1.02] transition-transform duration-300">

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); safeStopAutoPlay(); goToPrevPage(); }}
              disabled={currentPageIndex === 0}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${currentPageIndex === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-500 hover:bg-black/5 hover:text-black'
                }`}
            >
              <ChevronLeft size={22} strokeWidth={2} />
            </button>

            <div className="w-px h-6 bg-gray-300/50"></div>

            {/* Play/Pause Main Action */}
            <button
              onClick={toggleAutoRead}
              className={`w-12 h-12 flex items-center justify-center rounded-full shadow-sm transition-all transform active:scale-95 ${isAutoPlaying
                  ? 'bg-[#FF9500] text-white'
                  : 'bg-[#1C1C1E] text-white hover:bg-black'
                }`}
            >
              {isAutoPlaying ? (
                <Pause size={20} fill="currentColor" />
              ) : (
                <Play size={20} fill="currentColor" className="ml-1" />
              )}
            </button>

            {/* Translation Toggle (New Key) */}
            <button
              onClick={toggleTranslationMode}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all active:scale-95 ${showSubtitle
                  ? 'bg-[#007AFF] text-white shadow-md' // Active Blue
                  : 'bg-white text-gray-400 hover:text-[#007AFF] border border-gray-100' // Inactive
                }`}
              title="Toggle Translation"
            >
              <Languages size={20} />
            </button>

            <div className="w-px h-6 bg-gray-300/50"></div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); safeStopAutoPlay(); goToNextPage(); }}
              disabled={currentPageIndex === totalPages - 1}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${currentPageIndex === totalPages - 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-500 hover:bg-black/5 hover:text-black'
                }`}
            >
              <ChevronRight size={22} strokeWidth={2} />
            </button>
          </div>
        </div>
      </footer>

      {/* Cinema Subtitle Mode - Apple Style */}
      {/* Added safe-area padding bottom */}
      {showSubtitle && currentSentence && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1C1C1E]/95 backdrop-blur-xl border-t border-white/5 pt-12 pb-[calc(8rem+env(safe-area-inset-bottom))] px-6 animate-in slide-in-from-bottom-full duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_-20px_40px_rgba(0,0,0,0.3)]">
          <div className="max-w-[500px] mx-auto text-center">
            <p className="text-[#98989D] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">Korean Translation</p>
            <p className="text-[#F2F2F7] font-merriweather text-[1.3rem] leading-relaxed font-normal antialiased">
              {currentSentence.translation}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
