import ScoreRing from "./ScoreRing.jsx";
import Chip from "./Chip.jsx";

export default function AtsResultCard({ result }) {
  if (result.detectedCount === 0) {
    return (
      <div className="rounded-[14px] border border-line bg-surface px-[18px] py-4">
        <p className="text-[13.5px] leading-[1.6] text-ink">{result.verdict}</p>
      </div>
    );
  }

  const tierText =
    result.tier === "strong" ? "Strong Fit" : result.tier === "moderate" ? "Moderate Fit" : "Limited Fit";

  return (
    <div className="rounded-[14px] border border-line bg-surface px-[18px] py-4">
      <div className="flex items-center gap-4">
        <ScoreRing score={result.score} tier={result.tier} />
        <div>
          <span className={`text-xs font-semibold ${result.tier === "strong" ? "text-good" : result.tier === "moderate" ? "text-accent" : "text-bad"}`}>{tierText}</span>
          <p className="text-[13.5px] leading-[1.6] text-ink">{result.verdict}</p>
        </div>
      </div>

      {result.matched.length > 0 && (
        <div className="mt-4">
          <span className="text-[11px] uppercase tracking-[0.04em] text-faint">Matched requirements</span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {result.matched.map((k) => (
              <Chip key={k} label={k} tone="good" />
            ))}
          </div>
        </div>
      )}

      {result.missing.length > 0 && (
        <div className="mt-4">
          <span className="text-[11px] uppercase tracking-[0.04em] text-faint">Not covered on file</span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {result.missing.map((k) => (
              <Chip key={k} label={k} tone="bad" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
