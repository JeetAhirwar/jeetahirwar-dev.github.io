import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, GitFork, Star, ExternalLink } from "lucide-react";
import { Section } from "./Section";
import { profile } from "@/lib/portfolio-data";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

type User = {
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
};

export function GitHubSection() {
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${profile.githubUser}`).then((res) => res.json()),
          fetch(
            `https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=6`,
          ).then((res) => res.json()),
        ]);
        if (cancelled) return;
        if (u && !u.message) setUser(u);
        if (Array.isArray(r)) setRepos(r);
        else setError(true);
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const languages = Array.from(
    new Set(repos.map((r) => r.language).filter(Boolean) as string[]),
  ).slice(0, 6);

  return (
    <Section
      id="github"
      eyebrow="GitHub"
      title="What I'm building publicly."
      description="Live data from the GitHub API — repositories, languages, and activity."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1 rounded-2xl glass p-6"
        >
          {user ? (
            <>
              <img
                src={user.avatar_url}
                alt={profile.githubUser}
                loading="lazy"
                className="h-20 w-20 rounded-2xl shadow-glow"
              />
              <h3 className="mt-4 font-display text-lg font-semibold">
                {user.name ?? profile.name}
              </h3>
              <p className="text-sm text-primary">@{profile.githubUser}</p>
              {user.bio && <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>}

              <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
                {[
                  ["Repos", user.public_repos],
                  ["Followers", user.followers],
                  ["Following", user.following],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-secondary p-3">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {k}
                    </dt>
                    <dd className="mt-0.5 font-display text-lg font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>

              {languages.length > 0 && (
                <div className="mt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Top languages
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {languages.map((l) => (
                      <li
                        key={l}
                        className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] text-primary"
                      >
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-brand px-3 py-2 text-xs font-medium text-brand-foreground"
              >
                <Github className="h-3.5 w-3.5" /> View profile
              </a>
            </>
          ) : error ? (
            <FallbackProfile />
          ) : (
            <SkeletonProfile />
          )}
        </motion.div>

        <div className="lg:col-span-2 grid gap-3 sm:grid-cols-2">
          {repos.length > 0
            ? repos.map((r, i) => (
                <motion.a
                  key={r.id}
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group flex flex-col rounded-2xl glass p-5 hover-lift"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="truncate font-mono text-sm font-medium text-primary">
                      {r.name}
                    </h4>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition group-hover:text-foreground" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                    {r.description ?? "No description provided."}
                  </p>
                  <div className="mt-auto flex items-center gap-3 pt-4 text-[11px] text-muted-foreground">
                    {r.language && (
                      <span className="rounded bg-secondary px-1.5 py-0.5 text-secondary-foreground">
                        {r.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3" /> {r.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3 w-3" /> {r.forks_count}
                    </span>
                  </div>
                </motion.a>
              ))
            : error
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-2xl glass p-5 text-sm text-muted-foreground">
                    GitHub data temporarily unavailable.
                  </div>
                ))
              : Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-36 animate-pulse rounded-2xl bg-secondary/40" />
                ))}
        </div>
      </div>
    </Section>
  );
}

function SkeletonProfile() {
  return (
    <div className="space-y-4">
      <div className="h-20 w-20 animate-pulse rounded-2xl bg-secondary/60" />
      <div className="h-5 w-32 animate-pulse rounded bg-secondary/60" />
      <div className="h-3 w-24 animate-pulse rounded bg-secondary/60" />
      <div className="h-16 w-full animate-pulse rounded bg-secondary/40" />
    </div>
  );
}

function FallbackProfile() {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold">@{profile.githubUser}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Couldn't load live data right now. Visit my profile directly to see the latest work.
      </p>
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-3 py-2 text-xs font-medium text-brand-foreground"
      >
        <Github className="h-3.5 w-3.5" /> Open GitHub
      </a>
    </div>
  );
}
