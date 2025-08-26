import React from 'react';
import { Settings } from 'lucide-react';

interface BookSettingsProps {
  titleSize: number;
  onTitleSizeChange: (size: number) => void;
}

export const BookSettings: React.FC<BookSettingsProps> = ({
  titleSize,
  onTitleSizeChange,
}) => {
  const titleSizes = [
    { label: 'Small', value: 20 },
    { label: 'Medium', value: 24 },
    { label: 'Large', value: 28 },
    { label: 'Extra Large', value: 32 },
  ];

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Settings className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-semibold text-white">Book Settings</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Title Size
          </label>
          <div className="grid grid-cols-2 gap-2">
            {titleSizes.map((size) => (
              <button
                key={size.value}
                onClick={() => onTitleSizeChange(size.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  titleSize === size.value
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
          
          <div className="mt-3">
            <input
              type="range"
              min="16"
              max="40"
              value={titleSize}
              onChange={(e) => onTitleSizeChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>16px</span>
              <span className="text-emerald-400 font-mono">{titleSize}px</span>
              <span>40px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};