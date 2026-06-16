'use client';

import { useState } from 'react';

interface ModelSelectorProps {
  models: string[];
  selectedModel: string;
  loadedModel: string | null;
  onSelect: (model: string) => void;
  onSwitch: (model: string) => Promise<void>;
}

export default function ModelSelector({ models, selectedModel, loadedModel, onSelect, onSwitch }: ModelSelectorProps) {
  const [isSwitching, setIsSwitching] = useState(false);

  const getShortName = (model: string) => {
    const parts = model.split('/');
    return parts[parts.length - 1];
  };

  const handleSwitch = async () => {
    if (selectedModel === loadedModel || isSwitching) return;
    setIsSwitching(true);
    try {
      await onSwitch(selectedModel);
    } finally {
      setIsSwitching(false);
    }
  };

  const needsSwitch = selectedModel !== loadedModel && loadedModel !== null;

  return (
    <div className="flex items-center gap-2">
      <select
        value={selectedModel}
        onChange={(e) => onSelect(e.target.value)}
        disabled={isSwitching}
        className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-shadow disabled:opacity-50"
      >
        {models.map((model) => (
          <option key={model} value={model}>
            {getShortName(model)} {model === loadedModel ? '(loaded)' : ''}
          </option>
        ))}
      </select>
      {needsSwitch && (
        <button
          onClick={handleSwitch}
          disabled={isSwitching}
          className="px-3 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          {isSwitching ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading...
            </>
          ) : (
            'Load Model'
          )}
        </button>
      )}
    </div>
  );
}
