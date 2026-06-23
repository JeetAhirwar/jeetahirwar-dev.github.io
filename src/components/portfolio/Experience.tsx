import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Section } from "./Section";
import { experience } from "@/lib/portfolio-data";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Early internships, real shipping."
    >
      <div className="relative">
        <div
          aria-hidden
          className="absolute left-4 top-2 bottom-2 w-px bg-border sm:left-5"
        />
        <ul className="space-y-6">
          {experience.map((e, i) => (
            <motion.li
              key={e.role}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative pl-12 sm:pl-16"
            >
              <span className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-brand-foreground shadow-glow sm:h-10 sm:w-10">
                <Briefcase className="h-4 w-4" />
              </span>
              <div className="rounded-2xl glass p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">{e.role}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
                </div>
                <p className="text-sm text-primary">{e.company}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
