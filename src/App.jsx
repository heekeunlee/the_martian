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
      className="min-h-screen font-sans selection:bg-indigo-200 selection:text-indigo-900 overflow-x-hidden bg-slate-900"
      onClick={handleBackgroundClick}
    >
      {/* Maximum width container to mimic mobile app on desktop */}
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl overflow-hidden" style={{ backgroundColor: '#FDFBF7' }}>

        <HeroHeader title={bookData.title} />

        {/* Overlapping Content Card */}
        <div
          className="relative z-10 mt-[42vh] min-h-[60vh] rounded-t-[2rem] pb-24 animate-in slide-in-from-bottom-10 duration-500"
          style={{ backgroundColor: '#FDFBF7' }}
        >

          <main className="px-6 pt-8">
            {/* Intro Tagline Area (Matches reference) */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-slate-900 leading-snug mb-2 break-keep">
                하루에 단 10분만 투자하여 좋아하는<br />책으로 영어를 정복하세요
              </h2>
              <div className="w-10 h-1 bg-indigo-500 rounded-full mx-auto opacity-50"></div>
            </div>

            {/* Chapter Info */}
            <div className="flex items-center justify-between mb-6 text-xs font-serif text-slate-400 uppercase tracking-widest">
              <span>Chapter 1</span>
              <span>Page {currentPage.pageId}</span>
            </div>

            {/* Continuous Text Block */}
            <div className="font-serif text-[1.125rem] leading-[1.8] text-justify text-slate-800 tracking-wide mb-10">
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
        <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-[360px]">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl rounded-full px-5 py-3 flex items-center justify-between">
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevPage(); }}
              disabled={currentPageIndex === 0}
              className={`transition-colors flex items-center gap-1 ${currentPageIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:text-indigo-600'
                }`}
            >
              <ChevronLeft size={22} />
              <span className="text-sm font-bold">Prev</span>
            </button>

            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              {currentPageIndex + 1} / {totalPages}
            </span>

            <button
              onClick={(e) => { e.stopPropagation(); goToNextPage(); }}
              disabled={currentPageIndex === totalPages - 1}
              className={`transition-colors flex items-center gap-1 ${currentPageIndex === totalPages - 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-indigo-600 hover:text-indigo-800'
                }`}
            >
              <span className="text-sm font-bold">Next</span>
              <ChevronRight size={22} />
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;
