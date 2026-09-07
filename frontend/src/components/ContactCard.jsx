import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";

export default function ContactCard({ resume }) {
  const email = resume?.email || "";
  const phone = resume?.phone || "";
  const rows = [
    { icon: Mail, label: email, href: email ? `mailto:${email}` : null },
    { icon: Phone, label: phone, href: null },
    { icon: Linkedin, label: resume?.linkedin || "", href: resume?.linkedin || null },
    { icon: Github, label: resume?.github || "", href: resume?.github || null },
    { icon: MapPin, label: resume?.location || "", href: null },
  ];

  return (
    <div className="rounded-[14px] border border-line bg-surface px-[18px] py-4">
      <div className="flex flex-col gap-1">
        {rows.filter((r) => r.label).map((r) => {
          const Icon = r.icon;
          const content = (
            <>
              <Icon size={15} />
              <span>{r.label}</span>
            </>
          );
          return r.href ? (
              <a className="flex items-center gap-2.5 px-1 py-2 text-[13.5px] text-ink no-underline hover:text-accent" href={r.href} target="_blank" rel="noreferrer" key={r.label}>
              {content}
            </a>
          ) : (
            <div className="flex items-center gap-2.5 px-1 py-2 text-[13.5px] text-ink" key={r.label}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
