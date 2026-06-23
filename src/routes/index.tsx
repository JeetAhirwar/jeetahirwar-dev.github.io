import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { TechStack } from "@/components/portfolio/TechStack";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { GitHubSection } from "@/components/portfolio/GitHubSection";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { profile } from "@/lib/portfolio-data";

const title = `${profile.name} — Full Stack Developer (MERN)`;
const description =
  "Full Stack Developer (MERN) based in Bhopal. MCA student building scalable, user-focused web applications with React, Node.js, Express and MongoDB.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: "Full Stack Developer, MERN Developer, React Developer, Node.js Developer, Software Engineer, Jeet Ahirwar, Bhopal" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: "Full Stack Developer",
          email: `mailto:${profile.email}`,
          url: "https://jeetahirwar-dev.github.io/",
          sameAs: [profile.github, profile.linkedin],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bhopal",
            addressRegion: "MP",
            addressCountry: "IN",
          },
          knowsAbout: ["React", "Node.js", "Express", "MongoDB", "MERN Stack", "JavaScript", "TypeScript"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-dvh">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <GitHubSection />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
