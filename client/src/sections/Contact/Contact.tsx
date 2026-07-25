/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 * 
 * Contact Section — two-column layout:
 *   - Left: Contact info, social links, resume download
 *   - Right: Contact form (Name, Email, Subject, Message)
 * 
 * Data-driven from src/config/site.ts (contactInfo)
 * Animations: fadeLeft, fadeRight, staggerContainer (from motion.ts)
 * Accessibility: ARIA labels, keyboard navigation, autocomplete, semantic form
 * Submission: EmailJS (@emailjs/browser) — sends directly to Gmail, no backend
 */

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SocialLinks } from "@/components/common/SocialLinks";
import { Card } from "@/components/ui/Card";
import { contactInfo } from "@/config/site";
import { fadeLeft, fadeRight, staggerContainer } from "@/lib/motion";

/* ============================================
   EMAILJS CONFIGURATION
   ============================================ */

const EMAILJS_SERVICE_ID = "service_jay3fjq";
const EMAILJS_TEMPLATE_ID = "template_6g33yaf";
const EMAILJS_PUBLIC_KEY = "6oKBTS1TqUGBuiyVf";

/* ============================================
   FORM TYPES
   ============================================ */

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

/* ============================================
   FORM VALIDATION
   ============================================ */

function validate(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.subject.trim()) {
    errors.subject = "Subject is required.";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

/* ============================================
   SUBMISSION HANDLER
   ============================================
   Emails are sent client-side via EmailJS (@emailjs/browser) —
   see the handleSubmit function inside ContactForm below.
   No backend required.
   ============================================ */

/* ============================================
   INPUT FIELD COMPONENT
   ============================================ */

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  autocomplete,
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  autocomplete?: string;
  rows?: number;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foreground mb-2"
      >
        {label}
      </label>
      {rows ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`w-full rounded-lg bg-background/50 border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none ${
            error
              ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
              : "border-border/50"
          }`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autocomplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`w-full rounded-lg bg-background/50 border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
            error
              ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
              : "border-border/50"
          }`}
        />
      )}
      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400"
        >
          <AlertCircle className="size-3" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ============================================
   CONTACT INFO PANEL (Left Column)
   ============================================ */

function ContactInfoPanel() {
  return (
    <motion.div
      variants={fadeLeft}
      className="flex flex-col gap-6"
    >
      <div>
        <h3 className="text-xl font-bold text-foreground font-[family-name:var(--font-display)] mb-3">
          Let's Connect
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Have a project in mind, a question, or just want to say hello?
          I'm always open to new opportunities and conversations.
        </p>
      </div>

      {/* Contact details */}
      <div className="space-y-4">
        {/* Email */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Mail className="size-4 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Email
            </p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-sm text-foreground hover:text-primary transition-colors duration-200"
            >
              {contactInfo.email}
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <MapPin className="size-4 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Location
            </p>
            <p className="text-sm text-foreground">{contactInfo.location}</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Find me on
        </p>
        <SocialLinks />
      </div>

      {/* Resume Download — only if URL exists */}
      {contactInfo.resume && (
        <Button
          variant="outline"
          size="md"
          asChild
          className="w-full sm:w-auto"
        >
          <a href={contactInfo.resume} download>
            <Download className="size-4" />
            Download Resume
          </a>
        </Button>
      )}
    </motion.div>
  );
}

/* ============================================
   CONTACT FORM (Right Column)
   ============================================ */

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error on change
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const newErrors = validate(formData);
      if (newErrors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
      }
    },
    [formData]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validate(formData);
      setErrors(validationErrors);
      setTouched({ name: true, email: true, subject: true, message: true });

      if (Object.keys(validationErrors).length > 0) return;

      if (!formRef.current) return;

      setStatus("submitting");
      try {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current!,
          EMAILJS_PUBLIC_KEY
        );

        setStatus("success");
        toast.success("Message sent successfully!", {
          description: "Thank you for reaching out — I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTouched({});
        formRef.current.reset();
      } catch (error) {
        console.error("EmailJS submission failed:", error);
        setStatus("error");
        toast.error("Failed to send message", {
          description: "Something went wrong. Please try again or email me directly.",
        });
      }
    },
    [formData]
  );

  return (
    <motion.div variants={fadeRight} className="w-full">
      <Card variant="glass" className="p-6 sm:p-8">
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
              <CheckCircle className="size-7 text-green-400" />
            </div>
            <h3 className="text-lg font-bold text-foreground font-[family-name:var(--font-display)] mb-2">
              Message Sent!
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Thank you for reaching out. I'll get back to you soon.
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => setStatus("idle")}
            >
              Send Another Message
            </Button>
          </motion.div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              <FormField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name ? errors.name : undefined}
                placeholder="Your name"
                autocomplete="name"
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? errors.email : undefined}
                placeholder="your@email.com"
                autocomplete="email"
              />

              <FormField
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.subject ? errors.subject : undefined}
                placeholder="What's this about?"
              />

              <FormField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.message ? errors.message : undefined}
                placeholder="Tell me about your project, idea, or question..."
                rows={5}
              />

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="size-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* Error state */}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
          >
            <AlertCircle className="size-4 text-red-400 shrink-0" />
            <p className="text-sm text-red-400">
              Something went wrong. Please try again.
            </p>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}

/* ============================================
   CONTACT SECTION
   ============================================ */

export function Contact() {
  return (
    <SectionWrapper id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Get in Touch"
        description="Whether you have a question, a project idea, or just want to connect — my inbox is always open."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
      >
        <ContactInfoPanel />
        <ContactForm />
      </motion.div>
    </SectionWrapper>
  );
}
