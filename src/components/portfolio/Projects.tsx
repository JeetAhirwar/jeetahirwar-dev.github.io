import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, ArrowRight } from "lucide-react";
import { Section } from "./Section";
import { projects, type Project } from "@/lib/portfolio-data";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title="Things I've built end-to-end."
      description="Two full-stack applications covering realtime messaging and role-based platforms — open source and live."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl glass p-6 hover-lift"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-brand opacity-60" />

            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
                Live
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{p.tagline}</p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-border bg-background/40 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                Architecture
              </p>
              <p className="mt-1.5 font-mono text-xs text-foreground/80">
                {p.architecture}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium transition hover:bg-secondary"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium transition hover:bg-secondary"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Live Demo
              </a>
              <button
                onClick={() => setActive(p)}
                className="ml-auto inline-flex items-center gap-1 rounded-lg bg-gradient-brand px-3 py-2 text-xs font-medium text-brand-foreground"
              >
                Case study <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-background/70 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85dvh] w-full max-w-2xl overflow-y-auto rounded-2xl glass-strong p-6 sm:p-8 shadow-elegant"
            >
              <button
                aria-label="Close"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                Case Study
              </p>
              <h3 className="mt-2 text-2xl font-semibold">{active.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{active.tagline}</p>

              <div className="mt-6 grid gap-5 text-sm">
                {[
                  ["Problem", active.caseStudy.problem],
                  ["Approach & Architecture", active.caseStudy.approach],
                  ["Challenges", active.caseStudy.challenges],
                  ["Lessons Learned", active.caseStudy.lessons],
                  ["Future Improvements", active.caseStudy.future],
                ].map(([h, body]) => (
                  <div key={h}>
                    <p className="font-display text-sm font-semibold text-foreground">{h}</p>
                    <p className="mt-1.5 leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                ))}

                <div className="rounded-xl border border-border bg-background/40 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                    Stack
                  </p>
                  <p className="mt-1.5 font-mono text-xs">{active.tech.join(" · ")}</p>
                </div>

                <div className="mt-2 flex gap-2">
                  <a
                    href={active.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-secondary"
                  >
                    <Github className="h-3.5 w-3.5" /> View Code
                  </a>
                  <a
                    href={active.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-brand px-3 py-2 text-xs font-medium text-brand-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Open Live
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
