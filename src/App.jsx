import React, { useState, useEffect, useRef } from 'react';
import bookData from './data/chapter1.json';
import SentenceSegment from './components/SentenceSegment';
import HeroHeader from './components/HeroHeader';
import { ChevronLeft, ChevronRight, BookOpen, Play, Pause } from 'lucide-react';

function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [activeSentenceId, setActiveSentenceId] = useState(null);
  const [activeVocab, setActiveVocab] = useState(null);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Refs for auto-read management
  const utteranceRef = useRef(null);
  const currentSentenceRef = useRef(null); // To track which sentence is acting during async events

  const currentPage = bookData.pages[currentPageIndex];
  const totalPages = bookData.pages.length;
  const currentSentence = currentPage.sentences.find(s => s.id === activeSentenceId);

  // Reset active state when changing pages
  useEffect(() => {
    stopAutoPlay(); // Stop audio if page changes manually
    setActiveSentenceId(null);
    setActiveVocab(null);
    setShowSubtitle(false);
    window.scrollTo(0, 0);
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
      stopAutoPlay();
    }

    if (activeSentenceId === id) {
      // Clicking same sentence just toggles nothing for now
    } else {
      setActiveSentenceId(id);
      setActiveVocab(null);
      setShowSubtitle(false);
    }
  };

  const handleBackgroundClick = () => {
    stopAutoPlay();
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

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
  };

  const startAutoRead = () => {
    if (currentPage.sentences.length === 0) return;

    setIsAutoPlaying(true);

    // Start from the first sentence if none is active, or the current one
    let startIndex = 0;
    if (activeSentenceId) {
      startIndex = currentPage.sentences.findIndex(s => s.id === activeSentenceId);
      if (startIndex === -1) startIndex = 0;
    }

    playSentenceSequence(startIndex);
  };

  const playSentenceSequence = (index) => {
    if (index >= currentPage.sentences.length) {
      stopAutoPlay();
      return;
    }

    const sentence = currentPage.sentences[index];
    setActiveSentenceId(sentence.id);

    // Scroll into view if needed (simple implementation)
    // Note: A real implementation might use a ref map to scroll specifically to the element
    // For now, we rely on the user following along or simple behavior.

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(sentence.text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;

    utterance.onend = () => {
      if (isAutoPlaying) { // Check if still playing (user didn't pause)
        playSentenceSequence(index + 1);
      }
    };

    // Store ref to handle cleanup
    utteranceRef.current = utterance;

    // We need to verify isAutoPlaying again inside the functionscope because of closure captures?
    // Actually, we should check a ref or rely on state. 
    // However, since `playSentenceSequence` is called recursively, we need to be careful.
    // The easiest way is to trust `window.speechSynthesis.speak` queue, but we want highlighting synchronization.
    // So we use the recursive onend callback.

    window.speechSynthesis.speak(utterance);
  };

  // Wrap `playSentenceSequence` to use latest state if needed, but for recursion 
  // keeping it simple is best. We rely on `stopAutoPlay` cancelling synthesis to kill the `onend` recursion chain effect (mostly).
  // Actually, `onend` fires even on cancel. We need to check a flag.
  // We'll use a ref for the "mounted" status of the auto-play session.
  const autoPlaySessionRef = useRef(0);

  const toggleAutoRead = (e) => {
    e.stopPropagation();
    if (isAutoPlaying) {
      stopAutoPlay();
    } else {
      autoPlaySessionRef.current += 1; // Increment session ID
      setIsAutoPlaying(true);
      const startIndex = activeSentenceId
        ? Math.max(0, currentPage.sentences.findIndex(s => s.id === activeSentenceId))
        : 0;

      runAutoReadLoop(startIndex, autoPlaySessionRef.current);
    }
  };

  const runAutoReadLoop = (index, sessionId) => {
    if (sessionId !== autoPlaySessionRef.current) return; // Stop if session changed
    if (index >= currentPage.sentences.length) {
      setIsAutoPlaying(false);
      return;
    }

    const sentence = currentPage.sentences[index];
    setActiveSentenceId(sentence.id);

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(sentence.text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;

    utterance.onend = () => {
      // Continue only if session is still valid
      if (sessionId === autoPlaySessionRef.current) {
        runAutoReadLoop(index + 1, sessionId);
      }
    };

    utterance.onerror = (e) => {
      console.error("Speech error", e);
      setIsAutoPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Enhanced stop that updates session ref
  const safeStopAutoPlay = () => {
    autoPlaySessionRef.current = -1; // Invalidate current session
    setIsAutoPlaying(false);
    window.speechSynthesis.cancel();
  }


  return (
    <div
      className="min-h-screen bg-[#F3F4F6] flex justify-center items-start selection:bg-[#8B5CF6]/30 selection:text-[#1F2937]"
      onClick={handleBackgroundClick}
    >
      <div className="w-full max-w-[440px] min-h-screen relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-[#F9FAFB] border-x border-white/50">

        <HeroHeader title={bookData.title} />

        {/* Content Card */}
        <div
          className="relative z-10 mt-[20vh] min-h-[75vh] rounded-t-[2.5rem] pb-40 animate-in slide-in-from-bottom-16 duration-700 ease-out shadow-sm transition-all bg-[#F9FAFB]"
          style={{ marginBottom: showSubtitle ? '140px' : '0' }}
        >
          <main className="px-8 pt-10">
            {/* Intro Title Area - New Text */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-playfair font-black text-[#1F2937] mb-1">
                The Martian
              </h2>
              <p className="text-[#8B5CF6] font-medium tracking-widest text-xs uppercase font-sans">
                Andy Weir
              </p>
            </div>

            {/* Chapter Info - Page Info Moved Here */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-[#8B5CF6]" />
                <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-widest font-sans">Chapter 1</span>
              </div>
              {/* Page X of Y moved to header */}
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">
                Page <span className="text-[#1F2937]">{currentPage.pageId}</span> <span className="text-slate-300">/ {totalPages}</span>
              </span>
            </div>

            {/* Continuous Text Block */}
            <div className="font-merriweather text-[1.25rem] leading-[2.2] text-justify text-[#374151] tracking-normal mb-10">
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
                    safeStopAutoPlay(); // Stop auto play if clicking vocab
                    setActiveVocab(vocab);
                  }}
                  onVocabClose={() => setActiveVocab(null)}
                  onPlay={(e) => {
                    e.stopPropagation();
                    safeStopAutoPlay(); // Stop auto play if manually playing simple sentence
                    playAudio(sentence.text);
                  }}
                  onToggleSubtitle={(e) => {
                    e.stopPropagation();
                    setShowSubtitle(!showSubtitle);
                  }}
                />
              ))}

              {currentPage.sentences.length === 0 && (
                <p className="text-center text-slate-400 block py-10 italic font-merriweather">
                  (No content)
                </p>
              )}
            </div>
          </main>
        </div>

        {/* Footer Navigation - FIXED position to be always visible */}
        <footer className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[360px] transition-all duration-300 ${showSubtitle ? 'translate-y-[-10px] opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgba(139,92,246,0.15)] rounded-full px-6 py-4 flex items-center justify-between group hover:scale-[1.02] transition-all">
            {/* Prev Page */}
            <button
              onClick={(e) => { e.stopPropagation(); safeStopAutoPlay(); goToPrevPage(); }}
              disabled={currentPageIndex === 0}
              className={`transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 ${currentPageIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-500 hover:text-[#8B5CF6]'
                }`}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Play/Pause Auto-Read Button (Center) */}
            <button
              onClick={toggleAutoRead}
              className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all transform hover:scale-110 active:scale-95 ${isAutoPlaying
                  ? 'bg-[#FDBA74] text-[#1F2937]' // Orange when playing (Pause state)
                  : 'bg-[#8B5CF6] text-white'     // Violet when paused (Play state)
                }`}
            >
              {isAutoPlaying ? (
                <Pause size={24} fill="currentColor" />
              ) : (
                <Play size={24} fill="currentColor" className="ml-1" />
              )}
            </button>

            {/* Next Page */}
            <button
              onClick={(e) => { e.stopPropagation(); safeStopAutoPlay(); goToNextPage(); }}
              disabled={currentPageIndex === totalPages - 1}
              className={`transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 ${currentPageIndex === totalPages - 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-500 hover:text-[#8B5CF6]'
                }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </footer>

        {/* Cinema Subtitle Bar (Fixed Bottom) */}
        {showSubtitle && currentSentence && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1F2937]/95 backdrop-blur-md border-t border-white/10 p-8 pb-12 animate-in slide-in-from-bottom-full duration-300 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
            <div className="max-w-md mx-auto text-center">
              <h3 className="text-[#FDBA74] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 font-sans">Korean Translation</h3>
              <p className="text-white font-merriweather text-[1.15rem] leading-relaxed font-medium">
                {currentSentence.translation}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
