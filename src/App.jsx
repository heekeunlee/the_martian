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
      className="min-h-screen bg-[#1A202C] flex justify-center items-start selection:bg-[#C1440E]/30 selection:text-[#1A202C] overflow-hidden"
      onClick={handleBackgroundClick}
    >
      <div className="w-full max-w-[430px] min-h-screen relative shadow-[0_0_80px_-20px_rgba(0,0,0,0.5)] bg-[#1A202C]">

        <HeroHeader title={bookData.title} />

        {/* Content Card */}
        <div
          className="relative z-10 mt-[42vh] min-h-[60vh] rounded-t-[2.5rem] pb-40 animate-in slide-in-from-bottom-16 duration-700 ease-out shadow-[0_-15px_40px_rgba(0,0,0,0.3)] transition-all"
          style={{ backgroundColor: '#F9F7F1', marginBottom: showSubtitle ? '120px' : '0' }}
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
              <div className="flex items-center gap-2">
                <BookOpen size={12} className="text-[#C1440E]" />
                <span className="text-[10px] font-bold text-[#C1440E] uppercase tracking-[0.2em] font-inter">Chapter 1</span>
              </div>
              <span className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-[0.2em] font-inter">
                Page <span className="text-[#2C2C2C]">{currentPage.pageId}</span> <span className="text-[#CBD5E0]">/ {totalPages + 8}</span>
              </span>
            </div>

            {/* Continuous Text Block */}
            <div className="font-merriweather text-[1.15rem] leading-[2.0] text-justify text-[#4A5568] tracking-normal mb-10">
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
                    // Don't change active sentence if just checking vocab
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

        {/* Footer Navigation */}
        <footer className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-[85%] max-w-[340px] transition-all duration-300 ${showSubtitle ? 'translate-y-[-10px] opacity-0 pointer-events-none' : 'opacity-100'}`}>
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

        {/* Cinema Subtitle Bar (Fixed Bottom) */}
        {showSubtitle && currentSentence && (
          <div className="absolute bottom-0 left-0 right-0 z-40 bg-[#1A202C]/95 backdrop-blur-md border-t border-white/10 p-6 pb-10 animate-in slide-in-from-bottom-full duration-300">
            <div className="max-w-md mx-auto text-center">
              <h3 className="text-[#C1440E] text-[10px] font-bold uppercase tracking-[0.2em] mb-3 font-inter">Korean Translation</h3>
              <p className="text-[#F9F7F1] font-merriweather text-lg leading-relaxed font-medium">
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
