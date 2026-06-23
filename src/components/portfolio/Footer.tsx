import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Built with React, Vite & Tailwind.
        </p>
        <div className="flex items-center gap-2">
          {[
            { href: profile.github, Icon: Github, label: "GitHub" },
            { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn" },
            { href: `mailto:${profile.email}`, Icon: Mail, label: "Email" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              aria-label={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
