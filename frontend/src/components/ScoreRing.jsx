export default function ScoreRing({ score, tier }) {
  const color =
    tier === "strong" ? "var(--good)" : tier === "moderate" ? "var(--warn)" : "var(--bad)";

  return (
    <div
      className="flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-full"
      style={{ background: `conic-gradient(${color} ${score * 3.6}deg, var(--surface-3) 0deg)` }}
    >
      <div className="flex h-[58px] w-[58px] items-baseline justify-center rounded-full bg-surface">
        <span className="font-display text-lg font-bold">{score}</span>
        <span className="ml-px text-[11px] text-faint">%</span>
      </div>
    </div>
  );
}
