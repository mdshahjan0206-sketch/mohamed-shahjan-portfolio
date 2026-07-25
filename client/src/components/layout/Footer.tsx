/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 * 
 * Footer — closing section with:
 *   - Left: Logo (MS) + Name + Tagline
 *   - Center: Quick navigation links (from navigation.ts)
 *   - Right: SocialLinks + Copyright
 *   - Back to Top button (appears after 500px scroll)
 * 
 * Data: navigation.ts (links), site.ts (name, role), social.ts (SocialLinks)
 * Animations: fadeUp, staggerContainer (from motion.ts)
 * Accessibility: semantic <footer>, ARIA labels, keyboard accessible
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { SocialLinks } from "@/components/common/SocialLinks";
import { navLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center backdrop-blur-sm hover:bg-primary/20 hover:border-primary/50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ChevronUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ============================================
   FOOTER
   ============================================ */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer
        className="relative z-10 border-t border-border/30 bg-background/80 backdrop-blur-sm"
        aria-label="Site footer"
      >
        <div className="container py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16">
            {/* Left — Logo + Name + Tagline */}
            <div className="flex-1 lg:max-w-xs">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-background text-sm font-bold font-[family-name:var(--font-display)] shrink-0">
                  MS
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {siteConfig.name}
                  </p>
                  <p className="text-xs text-primary font-medium">
                    {siteConfig.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {siteConfig.tagline}
              </p>
            </div>

            {/* Center — Quick Navigation */}
            <nav
              aria-label="Footer navigation"
              className="flex-1"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Quick Links
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right — Social Links + Copyright */}
            <div className="flex-1 lg:max-w-xs">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Connect
              </p>
              <SocialLinks />
            </div>
          </div>

          {/* Divider */}
          <div className="mt-10 pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground/60">
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/40">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
}
