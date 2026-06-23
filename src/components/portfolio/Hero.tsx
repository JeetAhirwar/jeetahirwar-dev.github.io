import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Github, Linkedin } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "React Engineer",
  "Node.js Developer",
];

function useTyping(words: readonly string[], speed = 80, hold = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next === word) setTimeout(() => setDel(true), hold);
        } else {
          const next = word.slice(0, Math.max(0, text.length - 1));
          setText(next);
          if (next === "") {
            setDel(false);
            setI((v) => v + 1);
          }
        }
      },
      del ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, hold]);

  return text;
}

export function Hero() {
  const typed = useTyping(roles);

  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10 grid-pattern opacity-40" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]"
        style={{ background: "var(--gradient-hero)" }}
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="pointer-events-none absolute left-1/2 top-32 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "var(--gradient-brand)" }}
      />

      <div className="mx-auto max-w-5xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-emerald-400/50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open to Full Stack Opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Hi, I'm <span className="text-gradient">Jeet Ahirwar</span>
          <br />
          <span className="font-mono text-2xl text-muted-foreground sm:text-3xl md:text-4xl">
            {typed}
            <span className="ml-0.5 inline-block w-[2px] animate-blink bg-foreground align-middle" style={{ height: "0.9em" }} />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
        >
          {profile.headline}{" "}
          <span className="text-foreground/80">{profile.subheadline}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground shadow-glow transition hover:scale-[1.02]"
          >
            View Projects
          </a>
          <a
            href={profile.resumePath}
            download
            className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            <Mail className="h-4 w-4" /> Contact Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
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
              className="grid h-10 w-10 place-items-center rounded-xl glass text-muted-foreground transition hover:text-foreground hover:shadow-glow"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>

        <motion.a
          href="#about"
          aria-label="Scroll down"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ opacity: { delay: 1 }, y: { duration: 2, repeat: Infinity } }}
          className="mx-auto mt-16 grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.a>
      </div>
    </section>
  );
}
