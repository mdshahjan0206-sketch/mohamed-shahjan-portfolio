/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 * 
 * Navbar — sticky top navigation with:
 *   - Glassmorphism background (glass-nav)
 *   - Smooth scroll to sections
 *   - Active section indicator (cyan underline)
 *   - Mobile hamburger menu with Framer Motion
 *   - Keyboard accessible (focus-visible rings)
 *   - Uses navigation.ts config
 *   - Uses SocialLinks in mobile menu
 */

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { navLinks } from "@/config/navigation";
import { socialLinks } from "@/config/social";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/components/common/SocialLinks";

/* ============================================
   ANIMATION VARIANTS (inline to avoid polluting motion.ts)
   ============================================ */

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1] as const,
    },
  }),
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] as const },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] as const },
  },
};

/* ============================================
   NAVBAR COMPONENT
   ============================================ */

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  /* Track scroll for glass-nav opacity */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Intersection observer for active section indicator */
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-40% 0px -60% 0px",
        threshold: 0.3,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Smooth scroll handler */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMobileOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
        isScrolled ? "glass-nav" : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between h-16 sm:h-20" aria-label="Main navigation">
        {/* Logo / Brand */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2 group"
          aria-label="Go to top"
        >
          <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center transition-all duration-200 group-hover:bg-primary/20 group-hover:border-primary/40">
            <span className="text-primary font-bold text-sm font-[family-name:var(--font-display)]">
              MS
            </span>
          </div>
          <span className="hidden sm:block text-sm font-semibold text-foreground font-[family-name:var(--font-display)]">
            {siteConfig.name.split(" ")[0]}
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1" role="menubar">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.href}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              role="menuitem"
            >
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md",
                  activeSection === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {/* Active indicator underline */}
                {activeSection === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md",
              "border border-primary/30 text-primary",
              "transition-all duration-200",
              "hover:bg-primary/10 hover:border-primary/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            )}
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={cn(
            "lg:hidden flex items-center justify-center",
            "w-10 h-10 rounded-md",
            "bg-white/5 border border-white/10",
            "text-foreground",
            "transition-all duration-200",
            "hover:bg-white/10",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          )}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <AnimatePresence mode="wait">
            {isMobileOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <X className="size-5" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="size-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            role="menu"
            aria-label="Mobile navigation"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className={cn(
              "lg:hidden",
              "glass-nav",
              "border-t border-white/5",
              "px-4 pb-6 pt-4"
            )}
          >
            <ul className="flex flex-col gap-1" role="menubar">
              {navLinks.map((link) => (
                <li key={link.href} role="menuitem">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "block px-4 py-3 rounded-md text-base font-medium",
                      "transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                      activeSection === link.href
                        ? "text-primary bg-primary/5 border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social links in mobile menu */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 px-4">
                Connect
              </p>
              <SocialLinks className="px-2" iconSize="md" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
