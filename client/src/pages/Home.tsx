import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundEffects } from "@/components/common/BackgroundEffects";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Certifications } from "@/sections/Certifications";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed background layer */}
      <BackgroundEffects />

      {/* Navigation */}
      <Navbar />

      {/* Page content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
