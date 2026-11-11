/**
 * AXIOM Core — Provenance types.
 *
 * Structured research records so every historical statement is traceable to a
 * source record. Metadata that is unknown is deliberately left missing and
 * marked for research rather than fabricated.
 */

export type VerificationStatus = "verified" | "partially-verified" | "unverified";

export type SourceType = "primary" | "secondary" | "scholarly-interpretation";

export interface ResearchSource {
  id: string;
  title: string;
  author?: string;
  publicationDate?: string;
  originalLanguage?: string;
  translation?: string;
  sourceType: SourceType;
  url?: string;
  doi?: string;
  verificationStatus: VerificationStatus;
  notes?: string;
}

export interface ProvenanceRecord {
  source: ResearchSource;
  claim: string;
  epistemicClassification:
    | "historically-documented-fact"
    | "historical-scholarly-interpretation"
    | "mathematical-reconstruction"
    | "modern-scientific-interpretation"
    | "computational-approximation"
    | "unverified-or-disputed";
}
