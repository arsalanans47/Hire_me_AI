export default function Chip({ label, tone = "neutral" }) {
  const toneClasses = tone === "good"
    ? "border-good/30 bg-good-dim text-good"
    : tone === "bad"
      ? "border-bad/30 bg-bad-dim text-bad"
      : "border-line bg-surface-2 text-muted";

  return <span className={`rounded-md border px-2 py-1 text-[11px] ${toneClasses}`}>{label}</span>;
}
