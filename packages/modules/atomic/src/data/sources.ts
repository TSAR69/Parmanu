/**
 * AXIOM Atomic Model Engine — Vaiśeṣika research sources.
 *
 * Initial curated research references. Metadata that cannot be established is
 * deliberately left missing; no publication years, DOIs, or URLs are
 * fabricated. Verification statuses are honest: the texts named are real
 * traditions, but their precise chronology, authorship, and textual
 * transmission remain subjects of scholarship.
 */

import type { ResearchSource } from "@axiom/core";

export const VAISHESHIKA_SOURCES: ResearchSource[] = [
  {
    id: "vaisheshika-sutra",
    title: "Vaiśeṣika Sūtra",
    author: "Kaṇāda (traditional attribution)",
    originalLanguage: "Sanskrit",
    sourceType: "primary",
    verificationStatus: "partially-verified",
    notes:
      "Foundational textual tradition of the Vaiśeṣika school. Precise chronology " +
      "and authorship are debated; no publication date asserted here.",
  },
  {
    id: "prashastapada-padarthadharmasangraha",
    title: "Padārthadharmasaṅgraha",
    author: "Praśastapāda",
    originalLanguage: "Sanskrit",
    sourceType: "secondary",
    verificationStatus: "partially-verified",
    notes:
      "Important later systematic exposition of Vaiśeṣika doctrine. Date and " +
      "textual transmission remain matters of scholarship.",
  },
  {
    id: "nyaya-vaisheshika-commentarial-traditions",
    title: "Nyāya-Vaiśeṣika commentarial traditions",
    sourceType: "scholarly-interpretation",
    verificationStatus: "unverified",
    notes:
      "Relevant commentarial traditions. No single canonical text or date is " +
      "cited here; treat as a tradition rather than a specific source.",
  },
];
