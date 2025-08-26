import React, { useState } from 'react';
import { BookEntry } from '../types/book';
import { BookPage } from './BookPage';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface BookPreviewProps {
  entries: BookEntry[];
  onDownloadPDF: () => void;
  titleSize: number;
}

export const BookPreview: React.FC<BookPreviewProps> = ({
  entries,
  onDownloadPDF,
  titleSize,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, entries.length - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  if (entries.length === 0) {
    return (
      <div className="text-center text-slate-400 py-12">
        <p>No entries to preview. Please upload a CSV file first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex justify-between items-center bg-slate-800 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="p-2 text-white hover:bg-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-white font-mono">
            Page {currentPage + 1} of {entries.length}
          </span>
          
          <button
            onClick={nextPage}
            disabled={currentPage === entries.length - 1}
            className="p-2 text-white hover:bg-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={onDownloadPDF}
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Download className="w-5 h-5" />
          <span>Download PDF</span>
        </button>
      </div>

      {/* Page Preview */}
      <div className="border border-slate-700 rounded-lg overflow-hidden">
        <BookPage 
          entry={entries[currentPage]} 
          pageNumber={currentPage + 1}
          titleSize={titleSize}
        />
      </div>

      {/* Page Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {entries.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`flex-shrink-0 w-16 h-20 border-2 rounded-lg flex items-center justify-center text-xs transition-colors ${
              currentPage === index
                ? 'border-emerald-400 bg-emerald-400/10 text-emerald-400'
                : 'border-slate-600 text-slate-400 hover:border-slate-500'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};