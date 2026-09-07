import { Plus, User, Mail, FolderGit2, Target, Download } from "lucide-react";
import NavItem from "./NavItem.jsx";

export default function Sidebar({
  sidebarOpen,
  activeMode,
  resume,
  onNewChat,
  onAbout,
  onContact,
  onProjects,
  onCheckAts,
  onDownloadResume,
}) {
  return (
    <aside className={`z-10 flex w-[268px] shrink-0 flex-col border-r border-line bg-sidebar p-[14px_12px] transition-all max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:shadow-xl ${sidebarOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"}`}>
      <div className="flex items-baseline gap-2 px-2 pb-[18px] pt-1.5">
        <span className="font-display text-base font-bold">Ask Arsalan AI</span>
      </div>

      <button className="mb-[18px] flex w-full items-center gap-2 rounded-[9px] border border-line bg-transparent px-2.5 py-[9px] text-[13.5px] text-ink transition hover:bg-surface-2" onClick={onNewChat}>
        <Plus size={15} />
        New chat
      </button>

      <span className="px-2.5 pb-1.5 text-[11px] uppercase tracking-[0.04em] text-faint">Menu</span>
      <NavItem icon={User} label="About Me" onClick={onAbout} active={activeMode === "about"} />
      <NavItem icon={Mail} label="Contact Me" onClick={onContact} active={activeMode === "contact"} />
      <NavItem icon={FolderGit2} label="Projects" onClick={onProjects} active={activeMode === "projects"} />
      <NavItem icon={Target} label="Check ATS" onClick={onCheckAts} active={activeMode === "ats"} />

      <div className="flex-1" />

      <button className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-[9px] bg-accent px-3 py-2.5 text-[13.5px] font-semibold text-[#1a1305] transition hover:brightness-110" onClick={onDownloadResume}>
        <Download size={15} />
        Download Resume
      </button>

      <div className="mt-3 flex items-center gap-2 border-t border-line px-2 py-2.5">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-surface-3 font-display text-xs font-semibold">{resume?.name?.charAt(0) || "A"}</div>
        <div>
          <div className="text-[12.5px]">{resume?.name || "Loading profile..."}</div>
          <div className="text-[11px] text-faint">Software Developer</div>
        </div>
      </div>
    </aside>
  );
}
