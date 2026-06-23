import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Section } from "./Section";
import { education } from "@/lib/portfolio-data";

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic background.">
      <div className="grid gap-5 sm:grid-cols-2">
        {education.map((e, i) => (
          <motion.div
            key={e.degree}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl glass p-6 hover-lift"
          >
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-brand-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{e.degree}</h3>
            <p className="text-sm text-primary">{e.school}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">{e.period}</p>
            <p className="mt-3 text-sm text-muted-foreground">{e.detail}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
