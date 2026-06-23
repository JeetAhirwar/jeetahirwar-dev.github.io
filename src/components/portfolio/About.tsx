import { motion } from "framer-motion";
import { MapPin, GraduationCap, Code2, Sparkles } from "lucide-react";
import { Section } from "./Section";
import { profile } from "@/lib/portfolio-data";

const highlights = [
  { Icon: Code2, label: "MERN Stack" },
  { Icon: Sparkles, label: "Clean architecture" },
  { Icon: GraduationCap, label: "MCA — Cyber Security" },
  { Icon: MapPin, label: profile.location },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A developer who builds end-to-end.">
      <div className="grid gap-10 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3 space-y-5 text-pretty leading-relaxed text-muted-foreground"
        >
          {profile.about.map((p, i) => (
            <p key={i} className={i === 0 ? "text-foreground/90 text-lg" : ""}>{p}</p>
          ))}
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 grid grid-cols-2 gap-3 self-start"
        >
          {highlights.map(({ Icon, label }) => (
            <li
              key={label}
              className="rounded-2xl glass p-4 hover-lift"
            >
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-brand-foreground">
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-3 text-sm font-medium">{label}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}
