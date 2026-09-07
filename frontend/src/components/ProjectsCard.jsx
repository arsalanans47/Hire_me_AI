import { Github, ExternalLink } from "lucide-react";

export default function ProjectsCard({ resume }) {
  const githubLinks = (resume?.links || [])
    .filter((link) => link.type === "github")
    .slice(1);

  return (
    <div className="rounded-[14px] border border-line bg-surface px-[18px] py-4">
      <p className="text-[13.5px] leading-[1.6] text-ink">
        A few things I've built recently — mostly small, self-contained tools I wanted to exist.
        Open a project badge to view its source.
      </p>
      <div className="mt-3.5 flex flex-col gap-3.5">
        {(resume?.projects || []).map((project, projectIndex) => {
          const [name, ...details] = project.split(":");
          const githubUrl = githubLinks[projectIndex]?.url;

          return (
            <div className="border-t border-line pt-3.5 first:border-t-0 first:pt-0" key={name}>
              <div className="mb-1 flex items-center justify-between gap-3">
                <span className="font-display text-sm font-semibold">{name}</span>
                {githubUrl ? (
                  <a
                    href={githubUrl}
                    className="flex items-center gap-1 text-xs text-muted no-underline hover:text-accent"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${name} on GitHub`}
                  >
                    <Github size={14} />
                    GitHub <ExternalLink size={11} />
                  </a>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-faint">
                    <Github size={14} />
                    GitHub
                  </span>
                )}
              </div>
              <p className="m-0 text-[13px] leading-[1.5] text-muted">{details.join(":")}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
