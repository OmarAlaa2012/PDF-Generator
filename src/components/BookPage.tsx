import React from 'react';
import { BookEntry } from '../types/book';

interface BookPageProps {
  entry: BookEntry;
  pageNumber: number;
  titleSize?: number;
}

export const BookPage: React.FC<BookPageProps> = ({ 
  entry, 
  pageNumber, 
  titleSize = 24 
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900 p-8 h-[700px] font-mono relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Header */}
      <div className="mb-8 relative z-10 text-center">
        <h1 
          className="text-white font-bold tracking-wider"
          style={{ fontSize: `${titleSize}px` }}
        >
          HTTP Errors
        </h1>
      </div>

      {/* Main Card */}
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 relative border border-slate-700 shadow-2xl mx-auto w-full max-w-lg h-[480px] flex flex-col justify-center">
        {/* Traffic Light Indicators */}
        <div className="flex space-x-2 absolute top-6 left-6">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>

        {/* Error Code Badge */}
        <div className="absolute top-6 right-6">
          <span className="text-slate-400 text-lg font-bold">
            {entry.errorCode}
          </span>
        </div>

        {/* Content */}
        <div className="pt-4 space-y-4 flex-1 flex flex-col justify-center">
          <div>
            <span className="text-emerald-400 font-semibold">Error Code:</span>
            <span className="text-white ml-2">{entry.errorCode}</span>
          </div>

          <div>
            <span className="text-emerald-400 font-semibold">Category:</span>
            <span className="text-white ml-2">{entry.category}</span>
          </div>

          <div>
            <span className="text-emerald-400 font-semibold">Meaning:</span>
            <span className="text-white ml-2">{entry.meaning}</span>
          </div>

          <div>
            <span className="text-emerald-400 font-semibold">Details:</span>
            <div className="text-white ml-2 mt-1 leading-relaxed">
              {entry.details}
            </div>
          </div>

          <div>
            <span className="text-emerald-400 font-semibold">Fix:</span>
            <div className="text-white ml-2 mt-1 leading-relaxed">
              {entry.fix}
            </div>
          </div>
        </div>
      </div>

      {/* Page Number */}
      <div className="text-center mt-8 relative z-10">
        <span className="text-slate-500 text-sm">Page {pageNumber}</span>
      </div>
    </div>
  );
};