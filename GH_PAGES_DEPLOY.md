# Deploying to GitHub Pages (`jeetahirwar-dev.github.io`)

This portfolio runs on **TanStack Start** inside Lovable (great for preview and
Lovable hosting). GitHub Pages, however, serves **static files only** and
expects a plain Vite SPA build. The cleanest path is to keep this Lovable
project as your source of truth and export the UI into a standalone Vite + React
SPA repo for GitHub Pages.

Because your repo is a **user site** (`jeetahirwar-dev.github.io`), the
Vite `base` is `/` — no project-page prefix needed.

---

## 1. Create a fresh Vite SPA repo

```bash
npm create vite@latest jeetahirwar-dev.github.io -- --template react-ts
cd jeetahirwar-dev.github.io
npm install
npm install tailwindcss @tailwindcss/vite framer-motion lucide-react zod react-icons
```

## 2. Copy these files from this Lovable project

```
src/styles.css                          →  src/index.css   (rename import in main.tsx)
src/lib/portfolio-data.ts               →  src/lib/portfolio-data.ts
src/components/portfolio/*              →  src/components/portfolio/*
public/favicon.svg
public/robots.txt
public/resume/Jeet-Ahirwar-FullStack-Resume.pdf
```

The components have **zero TanStack-specific imports** — they're plain React +
framer-motion + lucide-react + Tailwind, so they drop in cleanly.

## 3. `src/App.tsx`

```tsx
import { Navbar } from "./components/portfolio/Navbar";
import { Hero } from "./components/portfolio/Hero";
import { About } from "./components/portfolio/About";
import { TechStack } from "./components/portfolio/TechStack";
import { Projects } from "./components/portfolio/Projects";
import { Experience } from "./components/portfolio/Experience";
import { GitHubSection } from "./components/portfolio/GitHubSection";
import { Education } from "./components/portfolio/Education";
import { Contact } from "./components/portfolio/Contact";
import { Footer } from "./components/portfolio/Footer";
import { ScrollProgress } from "./components/portfolio/ScrollProgress";
import { BackToTop } from "./components/portfolio/BackToTop";

export default function App() {
  return (
    <div className="relative min-h-dvh dark">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero /><About /><TechStack /><Projects />
        <Experience /><GitHubSection /><Education /><Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
```

## 4. `src/main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

## 5. `index.html` — add fonts + SEO

```html
<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>Jeet Ahirwar — Full Stack Developer (MERN)</title>
    <meta name="description" content="Full Stack Developer (MERN) based in Bhopal. MCA student building scalable, user-focused web applications with React, Node.js, Express and MongoDB." />
    <meta property="og:title" content="Jeet Ahirwar — Full Stack Developer (MERN)" />
    <meta property="og:description" content="MCA student building scalable web applications with the MERN stack." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## 6. `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: "/", // user site → root path
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: { outDir: "dist" },
});
```

## 7. SPA 404 fallback

Copy `public/404.html` from this repo into your Vite repo's `public/` folder.
GitHub Pages serves it for any unknown path, and it bounces back to `/` so
your SPA boots correctly on direct links and refreshes.

## 8. GitHub Actions deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then in GitHub: **Settings → Pages → Source: GitHub Actions.**

## 9. Push & deploy

```bash
git init
git remote add origin git@github.com:JeetAhirwar/jeetahirwar-dev.github.io.git
git add . && git commit -m "feat: portfolio site"
git push -u origin main
```

Wait ~1 minute → site is live at **https://jeetahirwar-dev.github.io/**.

---

## Updating later

- **Resume** — replace `public/resume/Jeet-Ahirwar-FullStack-Resume.pdf`, push.
- **Add a project** — edit `src/lib/portfolio-data.ts` → `projects` array.
- **Tweak colors / fonts** — edit `src/index.css` tokens.
- **Anything else** — edit a component in `src/components/portfolio/`.
