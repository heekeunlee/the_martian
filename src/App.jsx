import React, { useState, useEffect } from 'react';
import bookData from './data/chapter1.json';
import SentenceSegment from './components/SentenceSegment';
import HeroHeader from './components/HeroHeader';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [activeSentenceId, setActiveSentenceId] = useState(null);
  const [activeVocab, setActiveVocab] = useState(null);
  const [showSubtitle, setShowSubtitle] = useState(false);

  const currentPage = bookData.pages[currentPageIndex];
  const totalPages = bookData.pages.length;
  const currentSentence = currentPage.sentences.find(s => s.id === activeSentenceId);

  // Reset active state when changing pages
  useEffect(() => {
    setActiveSentenceId(null);
    setActiveVocab(null);
    setShowSubtitle(false);
    window.scrollTo(0, 0);
  }, [currentPageIndex]);

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
    if (activeSentenceId === id) {
      // Clicking same sentence just toggles nothing for now, maybe ensure subtitle is kept?
    } else {
      setActiveSentenceId(id);
      setActiveVocab(null); // Clear vocab when switching sentence
      setShowSubtitle(false); // Reset subtitle default
    }
  };

  const handleBackgroundClick = () => {
    setActiveSentenceId(null);
    setActiveVocab(null);
    setShowSubtitle(false);
  };

  const playAudio = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className="min-h-screen bg-[#F3F4F6] flex justify-center items-start selection:bg-[#8B5CF6]/30 selection:text-[#1F2937]"
      onClick={handleBackgroundClick}
    >
      <div className="w-full max-w-[440px] min-h-screen relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-[#F9FAFB] border-x border-white/50">

        <HeroHeader title={bookData.title} />

        {/* Content Card */}
        <div
          className="relative z-10 mt-[28vh] min-h-[60vh] rounded-t-[2.5rem] pb-40 animate-in slide-in-from-bottom-16 duration-700 ease-out shadow-sm transition-all bg-[#F9FAFB]"
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

            {/* Chapter Info */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-[#8B5CF6]" />
                <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-widest font-sans">Chapter 1</span>
              </div>
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
                    setActiveVocab(vocab);
                  }}
                  onVocabClose={() => setActiveVocab(null)}
                  onPlay={(e) => {
                    e.stopPropagation();
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
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevPage(); }}
              disabled={currentPageIndex === 0}
              className={`transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 ${currentPageIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-500 hover:text-[#8B5CF6]'
                }`}
            >
              <ChevronLeft size={24} />
            </button>

            <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] font-sans">
              <span className="text-[#1F2937] text-sm">{currentPageIndex + 1}</span> / {totalPages}
            </span>

            <button
              onClick={(e) => { e.stopPropagation(); goToNextPage(); }}
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
