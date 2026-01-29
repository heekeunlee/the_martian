import React, { useState } from 'react';
import bookData from './data/chapter1.json';
import SentenceItem from './components/SentenceItem';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPage = bookData.pages[currentPageIndex];
  const totalPages = bookData.pages.length;

  const goToNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-orange-500 selection:text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 shadow-md">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="text-orange-500 w-6 h-6" />
            <h1 className="text-lg font-bold tracking-tight text-white line-clamp-1">
              {bookData.title} <span className="text-slate-400 font-normal text-sm ml-2">Page {currentPage.pageId}</span>
            </h1>
          </div>
          <div className="text-xs text-slate-500">
            {currentPageIndex + 1} / {totalPages}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {currentPage.sentences.map((sentence, index) => (
          <SentenceItem
            key={sentence.id}
            data={sentence}
            index={index}
          />
        ))}

        {/* Empty state or message if no sentences */}
        {currentPage.sentences.length === 0 && (
          <div className="text-center text-slate-500 py-10">
            No content on this page.
          </div>
        )}
      </main>

      {/* Pagination Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-3">
        <div className="max-w-2xl mx-auto flex justify-between items-center gap-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPageIndex === 0}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${currentPageIndex === 0
                ? 'text-slate-600 bg-slate-800 cursor-not-allowed'
                : 'text-white bg-slate-800 hover:bg-slate-700 active:bg-slate-600'
              }`}
          >
            <ChevronLeft size={20} />
            Prev
          </button>

          <button
            onClick={goToNextPage}
            disabled={currentPageIndex === totalPages - 1}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${currentPageIndex === totalPages - 1
                ? 'text-slate-600 bg-slate-800 cursor-not-allowed'
                : 'text-white bg-orange-600 hover:bg-orange-500 active:bg-orange-700'
              }`}
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
