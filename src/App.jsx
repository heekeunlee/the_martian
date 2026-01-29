import React, { useState, useEffect } from 'react';
import bookData from './data/chapter1.json';
import SentenceSegment from './components/SentenceSegment';
import HeroHeader from './components/HeroHeader';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';

function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [activeSentenceId, setActiveSentenceId] = useState(null);
  const [activeVocab, setActiveVocab] = useState(null);

  const currentPage = bookData.pages[currentPageIndex];
  const totalPages = bookData.pages.length;

  // Reset active state when changing pages
  useEffect(() => {
    setActiveSentenceId(null);
    setActiveVocab(null);
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
      // Optional: toggle off if clicking same one
    } else {
      setActiveSentenceId(id);
      setActiveVocab(null);
    }
  };

  const handleBackgroundClick = () => {
    setActiveSentenceId(null);
    setActiveVocab(null);
  };

  const playAudio = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-indigo-200 selection:text-indigo-900"
      onClick={handleBackgroundClick}
    >
      <HeroHeader title={bookData.title} />

      {/* Overlapping Content Card */}
      <div className="relative z-10 mt-[35vh] min-h-[65vh] bg-[#FDFBF7] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pb-24">

        {/* Little Drag Handle Indicator (Visual only) */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-4 mb-2"></div>

        <main className="max-w-3xl mx-auto px-6 md:px-12 pt-4">
          {/* Header within the card */}
          <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
            <div className="text-slate-400 font-serif italic text-sm">
              Chapter 1
            </div>
            <div className="text-slate-400 font-serif text-sm">
              Page {currentPage.pageId}
            </div>
          </div>

          {/* Continuous Text Block */}
          <div className="font-serif text-xl md:text-2xl leading-[1.8] text-justify text-slate-800 tracking-wide">
            {currentPage.sentences.map((sentence) => (
              <SentenceSegment
                key={sentence.id}
                data={sentence}
                isActive={activeSentenceId === sentence.id}
                activeVocab={activeVocab}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSentenceClick(sentence.id);
                }}
                onVocabClick={(vocab) => {
                  setActiveVocab(vocab);
                  setActiveSentenceId(sentence.id);
                }}
                onPlay={(e) => {
                  e.stopPropagation();
                  playAudio(sentence.text);
                }}
                onClose={(e) => {
                  e.stopPropagation();
                  setActiveSentenceId(null);
                  setActiveVocab(null);
                }}
              />
            ))}

            {currentPage.sentences.length === 0 && (
              <p className="text-center text-slate-400 block py-10 italic">
                (No content)
              </p>
            )}
          </div>
        </main>
      </div>

      {/* Pagination Floating Bar */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-white/80 backdrop-blur-md border border-white/50 shadow-2xl rounded-full px-6 py-2 flex items-center gap-6">
        <button
          onClick={(e) => { e.stopPropagation(); goToPrevPage(); }}
          disabled={currentPageIndex === 0}
          className={`transition-colors flex items-center gap-1 ${currentPageIndex === 0
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-500 hover:text-indigo-600'
            }`}
        >
          <ChevronLeft size={24} />
          <span className="text-sm font-medium hidden sm:inline">Prev</span>
        </button>

        <div className="w-px h-6 bg-slate-200"></div>

        <button
          onClick={(e) => { e.stopPropagation(); goToNextPage(); }}
          disabled={currentPageIndex === totalPages - 1}
          className={`transition-colors flex items-center gap-1 ${currentPageIndex === totalPages - 1
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-indigo-600 hover:text-indigo-800'
            }`}
        >
          <span className="text-sm font-medium hidden sm:inline">Next</span>
          <ChevronRight size={24} />
        </button>
      </footer>
    </div>
  );
}

export default App;
