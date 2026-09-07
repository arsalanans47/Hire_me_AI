export default function Welcome({ onAbout, onProjects, onCheckAts, onContact }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
      <div>
        <p className="max-w-[480px] text-center font-display text-[30px] font-semibold leading-tight">What would you like to know?</p>
        <p className="mt-2 max-w-[420px] text-center text-[13.5px] text-faint">
          Ask about my background, or use the menu to jump straight to a section.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
        <button className="w-[220px] rounded-xl border border-line bg-surface px-3.5 py-3 text-left text-[12.5px] text-muted transition hover:border-surface-3 hover:bg-surface-2 max-sm:w-full" onClick={onAbout}>
          <strong className="mb-0.5 block text-[13px] font-semibold text-ink">About Me</strong>
          Background &amp; core skills
        </button>
        <button className="w-[220px] rounded-xl border border-line bg-surface px-3.5 py-3 text-left text-[12.5px] text-muted transition hover:border-surface-3 hover:bg-surface-2 max-sm:w-full" onClick={onProjects}>
          <strong className="mb-0.5 block text-[13px] font-semibold text-ink">Projects</strong>
          Things I've shipped, with source
        </button>
        <button className="w-[220px] rounded-xl border border-line bg-surface px-3.5 py-3 text-left text-[12.5px] text-muted transition hover:border-surface-3 hover:bg-surface-2 max-sm:w-full" onClick={onCheckAts}>
          <strong className="mb-0.5 block text-[13px] font-semibold text-ink">Check ATS</strong>
          Paste a JD, get a fit score
        </button>
        <button className="w-[220px] rounded-xl border border-line bg-surface px-3.5 py-3 text-left text-[12.5px] text-muted transition hover:border-surface-3 hover:bg-surface-2 max-sm:w-full" onClick={onContact}>
          <strong className="mb-0.5 block text-[13px] font-semibold text-ink">Contact Me</strong>
          Email, GitHub, LinkedIn
        </button>
      </div>
    </div>
  );
}
