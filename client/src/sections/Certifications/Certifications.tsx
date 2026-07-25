/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 * 
 * Certifications Section — responsive grid with:
 *   - Certificate image or clean placeholder
 *   - Title, issuer, issued date
 *   - Skills badges
 *   - Credential button (only if URL exists)
 *   - Featured ribbon (only when featured = true)
 *   - Data-driven from src/data/certificates.ts
 *   - Animations: staggerContainer, fadeUp, hover lift (from motion.ts)
 *   - Accessibility: semantic <article>, ARIA labels, keyboard accessible
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/Card";
import { certificates } from "@/data/certificates";
import { fadeUp, staggerContainer } from "@/lib/motion";

/* ============================================
   CERTIFICATE IMAGE / PLACEHOLDER
   ============================================ */

function CertificateImage({
  title,
  issuer,
  image,
  featured,
}: {
  title: string;
  issuer: string;
  image?: string;
  featured?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  if (image && !imgError) {
    return (
      <img
        src={image}
        alt={`${title} certificate`}
        loading="lazy"
        decoding="async"
        className="w-full h-40 sm:h-48 object-cover"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={`w-full h-40 sm:h-48 flex flex-col items-center justify-center gap-3 border-b border-border/50 ${
        featured
          ? "bg-gradient-to-br from-primary/10 to-secondary/5"
          : "bg-gradient-to-br from-card to-muted/30"
      }`}
      role="img"
      aria-label={`${title} certificate placeholder`}
    >
      <div className="w-12 h-12 rounded-xl bg-background/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
        <Award className="size-6 text-primary" />
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-foreground">{title}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{issuer}</p>
      </div>
    </div>
  );
}

/* ============================================
   CERTIFICATE CARD (Memoized)
   ============================================ */

function CertificateCard({
  cert,
  index,
}: {
  cert: (typeof certificates)[number];
  index: number;
}) {
  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group"
      aria-label={`${cert.title} by ${cert.issuer}`}
    >
      <Card
        variant={cert.featured ? "featured" : "hover"}
        className="h-full flex flex-col overflow-hidden"
      >
        {/* Image or Placeholder */}
        <CertificateImage
          title={cert.title}
          issuer={cert.issuer}
          image={cert.image}
          featured={cert.featured}
        />

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Featured ribbon */}
          {cert.featured && (
            <div className="mb-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                Featured
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-base font-bold text-foreground font-[family-name:var(--font-display)] group-hover:text-primary transition-colors duration-200">
            {cert.title}
          </h3>

          {/* Issuer */}
          <div className="flex items-center gap-2 mt-2">
            <Building2 className="size-3.5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {cert.issuer}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 mt-1.5">
            <Calendar className="size-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {cert.issuedDate}
            </span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-4 flex-1">
            {cert.skills.map((skill) => (
              <Badge key={skill} variant="skill">
                {skill}
              </Badge>
            ))}
          </div>

          {/* Credential Button — only if URL exists */}
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Verify ${cert.title} credential`}
              className="inline-flex items-center gap-2 mt-4 pt-3 border-t border-border/50 text-sm text-primary hover:text-accent transition-colors duration-200"
            >
              <ExternalLink className="size-3.5" />
              <span>View Credential</span>
            </a>
          )}

          {/* Credential ID — if no URL but ID exists */}
          {!cert.credentialUrl && cert.credentialId && (
            <div className="mt-4 pt-3 border-t border-border/50">
              <p className="text-[10px] text-muted-foreground">
                ID: {cert.credentialId}
              </p>
            </div>
          )}
        </div>
      </Card>
    </motion.article>
  );
}

/* ============================================
   CERTIFICATIONS SECTION
   ============================================ */

export function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <SectionHeading
        eyebrow="Certifications"
        title="Credentials & Achievements"
        description="Professional certifications and verified credentials that validate my technical expertise."
      />

      {/* Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {certificates.map((cert, index) => (
          <CertificateCard key={cert.id} cert={cert} index={index} />
        ))}
      </motion.div>

      {/* Empty state */}
      {certificates.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-center mb-4">
            <Award className="size-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">
            Certifications coming soon.
          </p>
        </motion.div>
      )}
    </SectionWrapper>
  );
}
