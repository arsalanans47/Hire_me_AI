import Chip from "./Chip.jsx";

export default function AboutCard({ resume }) {
  return (
    <div className="rounded-[14px] border border-line bg-surface px-[18px] py-4">
      <p className="text-[13.5px] leading-[1.6] text-ink">Software developer focused on building reliable, useful software.</p>
      <div className="mt-4">
        <span className="text-[11px] uppercase tracking-[0.04em] text-faint">Core skills</span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {(resume?.skills || []).map((s) => (
            <Chip key={s} label={s} tone="neutral" />
          ))}
        </div>
      </div>
    </div>
  );
}
