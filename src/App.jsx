import React, { useState, useEffect } from 'react';
import bookData from './data/chapter1.json';
import SentenceSegment from './components/SentenceSegment';
import HeroHeader from './components/HeroHeader';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    // Toggle active state
    if (activeSentenceId === id) {
      // Do nothing if clicking same sentence, let user click X to close or click another
    } else {
      setActiveSentenceId(id);
      setActiveVocab(null); // Reset vocab when switching sentences
    }
  };

  const handleBackgroundClick = () => {
    // Dismiss popup when clicking background
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
      className="min-h-screen bg-slate-900 text-slate-200 font-sans pb-20 selection:bg-orange-500 selection:text-white"
      onClick={handleBackgroundClick}
    >
      <HeroHeader title={bookData.title} />

      {/* Main Content Area (Book Page) */}
      <main className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Page Indicator */}
        <div className="text-center text-slate-500 font-serif italic mb-6 text-sm">
          Page {currentPage.pageId}
        </div>

        {/* Continuous Text Block */}
        <div className="font-serif text-lg md:text-xl leading-9 md:leading-10 text-justify">
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
                setActiveSentenceId(sentence.id); // Ensure sentence is active too
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
            <p className="text-center text-slate-600 block py-10">
              (No text on this page)
            </p>
          )}
        </div>
      </main>

      {/* Pagination Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur border-t border-slate-800 p-4 z-30">
        <div className="max-w-md mx-auto flex justify-between items-center px-4">
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevPage(); }}
            disabled={currentPageIndex === 0}
            className={`p-2 rounded-full transition-colors ${currentPageIndex === 0
                ? 'text-slate-700 cursor-not-allowed'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
          >
            <ChevronLeft size={28} />
          </button>

          <span className="text-sm font-medium text-slate-500">
            {currentPageIndex + 1} / {totalPages}
          </span>

          <button
            onClick={(e) => { e.stopPropagation(); goToNextPage(); }}
            disabled={currentPageIndex === totalPages - 1}
            className={`p-2 rounded-full transition-colors ${currentPageIndex === totalPages - 1
                ? 'text-slate-700 cursor-not-allowed'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
