/**
 * CONTACT TYPES
 * 
 * TypeScript interfaces for contact information and form data.
 * All contact information flows through these types.
 */

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  github?: string;
  linkedin?: string;
  resume?: string;
}
