import React, { useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  uploadedFile: File | null;
  onRemoveFile: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  uploadedFile,
  onRemoveFile,
}) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0 && files[0].type === 'text/csv') {
        onFileUpload(files[0]);
      }
    },
    [onFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileUpload(files[0]);
      }
    },
    [onFileUpload]
  );

  if (uploadedFile) {
    return (
      <div className="bg-slate-800 border-2 border-slate-600 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-emerald-400" />
            <div>
              <p className="text-white font-medium">{uploadedFile.name}</p>
              <p className="text-slate-400 text-sm">
                {(uploadedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button
            onClick={onRemoveFile}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center hover:border-emerald-400 transition-colors cursor-pointer group"
    >
      <Upload className="w-12 h-12 text-slate-400 group-hover:text-emerald-400 mx-auto mb-4 transition-colors" />
      <p className="text-white text-lg font-medium mb-2">
        Drop your CSV file here
      </p>
      <p className="text-slate-400 mb-4">or click to browse</p>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileInput}
        className="hidden"
        id="csv-upload"
      />
      <label
        htmlFor="csv-upload"
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors inline-block"
      >
        Choose CSV File
      </label>
    </div>
  );
};