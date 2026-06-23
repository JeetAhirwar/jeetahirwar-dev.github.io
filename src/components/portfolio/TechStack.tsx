import { motion } from "framer-motion";
import { Section } from "./Section";
import { techStack } from "@/lib/portfolio-data";

export function TechStack() {
  const groups = Object.entries(techStack);
  return (
    <Section
      id="stack"
      eyebrow="Tech Stack"
      title="Tools I use to ship."
      description="The MERN core plus the supporting cast — chosen to build, secure, and deploy real applications."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map(([group, items], idx) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: idx * 0.07 }}
            className="rounded-2xl glass p-5 hover-lift"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              {group}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
