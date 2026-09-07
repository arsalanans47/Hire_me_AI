import MessageBubble from "./MessageBubble.jsx";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3" role="status" aria-label="Assistant is typing">
      <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent font-display text-xs font-bold text-[#1a1305] shadow-[0_0_0_4px_rgba(242,184,75,0.08)]">
        <span className="absolute inset-0 rounded-lg border border-accent/70 animate-ping" />
        A
      </div>
      <div className="flex items-center gap-2 rounded-full border border-line/80 bg-surface px-3.5 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.14)]">
        <span className="text-xs font-medium tracking-wide text-muted">Typing</span>
        <span className="flex items-center gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.25s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.12s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" />
        </span>
      </div>
    </div>
  );
}

export default function MessageList({ messages, isTyping }) {
  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col gap-[22px] px-5 pb-3 pt-7">
      {messages.map((m) => (
        <MessageBubble key={m.id} msg={m} />
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  );
}
