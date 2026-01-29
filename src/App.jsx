import React, { useState } from 'react';
import chapterData from './data/chapter1.json';
import SentenceItem from './components/SentenceItem';
import { BookOpen } from 'lucide-react';

function App() {
  const [sentences] = useState(chapterData.content);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 shadow-md">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="text-orange-500 w-6 h-6" />
            <h1 className="text-lg font-bold tracking-tight text-white">
              The Martian <span className="text-slate-400 font-normal text-sm ml-2">Chapter 1</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-20 space-y-6">
        {sentences.map((sentence, index) => (
          <SentenceItem
            key={sentence.id}
            data={sentence}
            index={index}
          />
        ))}
      </main>

      {/* Footer / Controls (Optional placeholder) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-4">
        <div className="max-w-2xl mx-auto text-center text-slate-500 text-xs">
          Built for English Learning
        </div>
      </footer>
    </div>
  );
}

export default App;
