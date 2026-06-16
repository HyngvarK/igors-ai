'use client';

import { useState } from 'react';

interface SettingsProps {
  maxTokens: number;
  onMaxTokensChange: (value: number) => void;
}

export default function Settings({ maxTokens, onMaxTokensChange }: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const presets = [
    { label: '512', value: 512 },
    { label: '1K', value: 1024 },
    { label: '2K', value: 2048 },
    { label: '4K', value: 4096 },
    { label: '8K', value: 8192 },
    { label: '16K', value: 16384 },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        title="Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-zinc-500">
          <path fillRule="evenodd" d="M8.34 1.804A1 1 0 0 1 9.32 1h1.36a1 1 0 0 1 .98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 0 1 1.262.125l.962.962a1 1 0 0 1 .125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.295a1 1 0 0 1 .804.98v1.36a1 1 0 0 1-.804.98l-1.473.295a6.95 6.95 0 0 1-.587 1.416l.834 1.25a1 1 0 0 1-.125 1.262l-.962.962a1 1 0 0 1-1.262.125l-1.25-.834a6.953 6.953 0 0 1-1.416.587l-.295 1.473a1 1 0 0 1-.98.804H9.32a1 1 0 0 1-.98-.804l-.295-1.473a6.957 6.957 0 0 1-1.416-.587l-1.25.834a1 1 0 0 1-1.262-.125l-.962-.962a1 1 0 0 1-.125-1.262l.834-1.25a6.957 6.957 0 0 1-.587-1.416l-1.473-.295A1 1 0 0 1 1 10.68V9.32a1 1 0 0 1 .804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 0 1 .125-1.262l.962-.962A1 1 0 0 1 5.38 3.03l1.25.834a6.957 6.957 0 0 1 1.416-.587l.295-1.473ZM13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 p-4 z-20">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">
              Settings
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-500 dark:text-zinc-400 block mb-2">
                  Max Response Length
                </label>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => onMaxTokensChange(preset.value)}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        maxTokens === preset.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-500 dark:text-zinc-400 block mb-2">
                  Custom Value
                </label>
                <input
                  type="number"
                  value={maxTokens}
                  onChange={(e) => onMaxTokensChange(Math.max(1, parseInt(e.target.value) || 1024))}
                  min="1"
                  max="32768"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-zinc-400 mt-1">
                  tokens (~{Math.round(maxTokens * 0.75)} words)
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
