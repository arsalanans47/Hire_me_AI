import { useEffect, useRef } from "react";
import { Send } from "lucide-react";

export default function InputBar({ input, setInput, onSend, awaitingJD }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <>
      <div className="border-t border-line bg-canvas px-5 pb-2 pt-3">
        <div className="mx-auto flex max-w-[760px] items-end rounded-xl border border-line bg-surface px-3 py-2">
          <textarea
            ref={textareaRef}
            className="max-h-[200px] min-h-[24px] flex-1 resize-none border-0 bg-transparent text-sm leading-6 text-ink outline-none placeholder:text-faint"
            rows={1}
            placeholder={awaitingJD ? "Paste the job description here…" : "Ask anything, or paste a job description"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="rounded-lg bg-accent p-2 text-[#1a1305] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40" onClick={onSend} disabled={!input.trim()}>
            <Send size={14} />
          </button>
        </div>
      </div>
      <div className="bg-canvas px-5 pb-3 text-center text-[11px] text-faint">
        {awaitingJD
          ? "Paste a job description and press Enter to get your ATS score."
          : "This is a portfolio demo, not a general-purpose AI chatbot."}
      </div>
    </>
  );
}
