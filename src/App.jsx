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
      className="min-h-screen bg-[#1A202C] flex justify-center items-start selection:bg-[#C1440E]/30 selection:text-[#1A202C]"
      onClick={handleBackgroundClick}
    >
      {/* Container - constrained to mobile max-width, mimicking a high-end reader app */}
      <div className="w-full max-w-[430px] min-h-screen relative shadow-[0_0_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden bg-[#1A202C]">

        <HeroHeader title={bookData.title} />

        {/* Content Card - slides over header */}
        <div
          className="relative z-10 mt-[42vh] min-h-[60vh] rounded-t-[2.5rem] pb-32 animate-in slide-in-from-bottom-16 duration-700 ease-out shadow-[0_-15px_40px_rgba(0,0,0,0.3)]"
          style={{ backgroundColor: '#F9F7F1' }}
        >

          <main className="px-7 pt-10">
            {/* Intro Tagline Area */}
            <div className="text-center mb-10">
              <h2 className="text-lg font-bold text-[#2C2C2C] leading-snug mb-3 break-keep font-inter tracking-tight">
                하루에 단 10분만 투자하여 좋아하는<br />책으로 영어를 정복하세요
              </h2>
              <div className="w-12 h-1 bg-[#C1440E] rounded-full mx-auto opacity-80"></div>
            </div>

            {/* Chapter Info */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C1440E]/10">
              <span className="text-[10px] font-bold text-[#C1440E] uppercase tracking-[0.2em] font-inter">Chapter 1</span>
              <span className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-[0.2em] font-inter">Page {currentPage.pageId}</span>
            </div>

            {/* Continuous Text Block */}
            <div className="font-merriweather text-[1.15rem] leading-[2.0] text-justify text-[#4A5568] tracking-normal mb-10">
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
                <p className="text-center text-slate-400 block py-10 italic font-merriweather">
                  (No content)
                </p>
              )}
            </div>
          </main>
        </div>

        {/* Floating Navigation Bar - Glassmorphism */}
        <footer className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-[85%] max-w-[340px]">
          <div className="bg-[#1A202C]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-full px-6 py-3.5 flex items-center justify-between group hover:bg-[#1A202C]/90 transition-all">
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevPage(); }}
              disabled={currentPageIndex === 0}
              className={`transition-colors flex items-center gap-1 ${currentPageIndex === 0
                  ? 'text-white/20 cursor-not-allowed'
                  : 'text-white/70 hover:text-[#C1440E]'
                }`}
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] font-inter">
              <span className="text-white">{currentPageIndex + 1}</span> / {totalPages}
            </span>

            <button
              onClick={(e) => { e.stopPropagation(); goToNextPage(); }}
              disabled={currentPageIndex === totalPages - 1}
              className={`transition-colors flex items-center gap-1 ${currentPageIndex === totalPages - 1
                  ? 'text-white/20 cursor-not-allowed'
                  : 'text-white/70 hover:text-[#C1440E]'
                }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;
