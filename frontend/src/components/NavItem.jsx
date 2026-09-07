export default function NavItem({ icon: Icon, label, onClick, active }) {
  return (
    <button className={`flex w-full items-center gap-2.5 rounded-lg border-0 bg-transparent px-2.5 py-2 text-left text-[13.5px] text-muted transition hover:bg-surface-2 hover:text-ink ${active ? "bg-surface-2 text-ink" : ""}`} onClick={onClick}>
      <Icon size={16} />
      <span>{label}</span>
    </button>
  );
}
