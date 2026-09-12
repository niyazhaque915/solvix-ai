import { useRef, useState } from 'react';
import { ArrowUp, Link2, Paperclip, Sparkles } from 'lucide-react';

type PromptBoxProps = {
  onSubmit: (value: string) => void;
  disabled?: boolean;
};

export function PromptBox({ onSubmit, disabled }: PromptBoxProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSubmit(value.trim());
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  };

  return (
    <div className="relative">
      <div
        className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-brand-500/40 to-accent-500/40 opacity-0 blur-md transition-opacity duration-500"
        style={{ opacity: value.trim() ? 1 : 0 }}
      />
      <div className="relative rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/40 transition-all dark:border-slate-700 dark:bg-slate-800 dark:shadow-none">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={2}
          placeholder="What do you need today? Type your request, prompt, or paste your Facebook/Website link here..."
          className="block max-h-40 w-full resize-none bg-transparent px-4 py-3 text-[0.95rem] leading-relaxed text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        <div className="flex items-center justify-between px-2 pb-1">
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200">
              <Link2 className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200">
              <Paperclip className="h-4 w-4" />
            </button>
            <span className="ml-1 hidden items-center gap-1 rounded-full bg-brand-50 px-2 py-1 text-[0.65rem] font-semibold text-brand-600 dark:bg-brand-950/50 dark:text-brand-400 sm:inline-flex">
              <Sparkles className="h-3 w-3" /> AI Ready
            </span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!value.trim() || disabled}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 text-white shadow-lg shadow-brand-500/30 transition-all hover:shadow-brand-500/50 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
