import React, { useState } from 'react';
import { Square as BookSquare, AlertCircle } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { BookPreview } from './components/BookPreview';
import { BookSettings } from './components/BookSettings';
import { parseCSV } from './utils/csvParser';
import { downloadPDF } from './utils/pdfGenerator.tsx';
import { BookEntry } from './types/book';

function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [bookEntries, setBookEntries] = useState<BookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [titleSize, setTitleSize] = useState(24);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const entries = await parseCSV(file);
      setUploadedFile(file);
      setBookEntries(entries);
    } catch (err) {
      setError('Failed to parse CSV file. Please check the format.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setBookEntries([]);
    setError(null);
  };

  const handleDownloadPDF = async () => {
    if (bookEntries.length === 0) return;
    
    try {
      await downloadPDF(bookEntries, 'http-errors-reference.pdf', titleSize);
    } catch (err) {
      setError('Failed to generate PDF. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-3">
            <BookSquare className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Book Generator</h1>
              <p className="text-slate-400">Transform your CSV data into beautiful reference books</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Upload & Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Upload CSV</h2>
              <FileUpload
                onFileUpload={handleFileUpload}
                uploadedFile={uploadedFile}
                onRemoveFile={handleRemoveFile}
              />
              
              {isLoading && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center space-x-2 text-emerald-400">
                    <div className="animate-spin w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full"></div>
                    <span>Processing CSV...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-900/20 border border-red-700 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* CSV Format Info */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Expected CSV Format</h3>
              <div className="space-y-2 text-sm">
                <p className="text-slate-300">Your CSV should include these columns:</p>
                <ul className="space-y-1 text-slate-400 font-mono text-xs">
                  <li>• errorCode (or code)</li>
                  <li>• category</li>
                  <li>• meaning</li>
                  <li>• details</li>
                  <li>• fix (or solution)</li>
                </ul>
                <p className="text-slate-500 text-xs mt-3">
                  Column names are case-insensitive and support variations.
                </p>
              </div>
            </div>

            {bookEntries.length > 0 && (
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Book Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Pages:</span>
                    <span className="text-white font-mono">{bookEntries.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">File Size:</span>
                    <span className="text-white font-mono">
                      {uploadedFile ? (uploadedFile.size / 1024).toFixed(1) : 0} KB
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Settings Panel */}
          <BookSettings
            titleSize={titleSize}
            onTitleSizeChange={setTitleSize}
          />

          {/* Right Panel - Preview */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Book Preview</h2>
              <BookPreview 
                entries={bookEntries}
                onDownloadPDF={handleDownloadPDF}
                titleSize={titleSize}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;