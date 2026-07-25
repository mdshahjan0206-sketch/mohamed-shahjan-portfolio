/**
 * CERTIFICATE TYPES
 * 
 * TypeScript interfaces for certificate data.
 * All certificate information flows through these types.
 */

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  skills: string[];
  featured: boolean;
}
