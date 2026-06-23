import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { Section } from "./Section";
import { profile } from "@/lib/portfolio-data";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(200),
  subject: z.string().trim().min(2, "Add a short subject").max(120),
  message: z.string().trim().min(10, "Message is a bit short").max(2000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form) as Record<string, string>;
    const result = schema.safeParse(data);

    if (!result.success) {
      const errs: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");

    // Placeholder integration. Replace with Formspree/EmailJS/serverless endpoint.
    await new Promise((r) => setTimeout(r, 900));

    // Fallback: open mail client with the composed message.
    const body = `${result.data.message}\n\n— ${result.data.name} (${result.data.email})`;
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
      result.data.subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    setStatus("success");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something."
      description="Open to full-time roles, internships, and collaboration. The fastest way is the form below or a direct email."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-3"
        >
          {[
            { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
            { Icon: Github, label: "GitHub", value: `@${profile.githubUser}`, href: profile.github },
            { Icon: Linkedin, label: "LinkedIn", value: "/in/jeetahirwar", href: profile.linkedin },
            { Icon: MapPin, label: "Based in", value: profile.location },
          ].map(({ Icon, label, value, href }) => {
            const inner = (
              <div className="flex items-center gap-4 rounded-2xl glass p-4 transition hover:bg-secondary">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-brand-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {label}
                  </p>
                  <p className="truncate text-sm">{value}</p>
                </div>
              </div>
            );
            return href ? (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {inner}
              </a>
            ) : (
              <div key={label}>{inner}</div>
            );
          })}
        </motion.aside>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={onSubmit}
          noValidate
          className="lg:col-span-3 rounded-2xl glass p-6 space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" error={errors.name} placeholder="Your name" />
            <Field label="Email" name="email" type="email" error={errors.email} placeholder="you@example.com" />
          </div>
          <Field label="Subject" name="subject" error={errors.subject} placeholder="Quick hello / role opportunity" />
          <div>
            <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell me about what you're building…"
              className="mt-2 w-full resize-y rounded-xl border border-input bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-ring"
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-medium text-brand-foreground shadow-glow transition hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
          >
            {status === "loading" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-foreground/30 border-t-brand-foreground" />
                Sending…
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> Sent — check your mail client
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Send message
              </>
            )}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-input bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-ring"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
