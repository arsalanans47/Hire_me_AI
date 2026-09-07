import { User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AboutCard from "./AboutCard.jsx";
import ContactCard from "./ContactCard.jsx";
import ProjectsCard from "./ProjectsCard.jsx";
import AtsResultCard from "./AtsResultCard.jsx";

export default function MessageBubble({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      {!isUser && <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent font-display text-xs font-bold text-[#1a1305]">A</div>}
      <div className={`max-w-[78%] ${isUser ? "rounded-[14px_14px_4px_14px] bg-surface-2 px-3.5 py-2.5" : "pt-0.5"}`}>
        {msg.kind === "text" && (
          <div className="text-sm leading-[1.6] text-ink [&_h1]:my-4 [&_h1]:font-display [&_h1]:leading-tight [&_h2]:my-4 [&_h2]:font-display [&_h2]:leading-tight [&_h3]:my-4 [&_h3]:font-display [&_h3]:text-[15px] [&_h3]:leading-tight [&_li]:my-1 [&_ol]:my-2 [&_ol]:pl-5 [&_p]:my-2 [&_strong]:text-ink [&_ul]:my-2 [&_ul]:pl-5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.payload}</ReactMarkdown>
          </div>
        )}
        {msg.kind === "about" && <AboutCard resume={msg.payload} />}
        {msg.kind === "contact" && <ContactCard resume={msg.payload} />}
        {msg.kind === "projects" && <ProjectsCard resume={msg.payload} />}
        {msg.kind === "ats-result" && <AtsResultCard result={msg.payload} />}
      </div>
      {isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-3 text-muted">
          <User size={14} />
        </div>
      )}
    </div>
  );
}
