'use client';

interface ModelSelectorProps {
  models: string[];
  selectedModel: string;
  onSelect: (model: string) => void;
}

export default function ModelSelector({ models, selectedModel, onSelect }: ModelSelectorProps) {
  const getShortName = (model: string) => {
    const parts = model.split('/');
    return parts[parts.length - 1];
  };

  return (
    <select
      value={selectedModel}
      onChange={(e) => onSelect(e.target.value)}
      className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-shadow"
    >
      {models.map((model) => (
        <option key={model} value={model}>
          {getShortName(model)}
        </option>
      ))}
    </select>
  );
}
