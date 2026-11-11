/**
 * AXIOM Atomic Model Engine — Vaiśeṣika theory definition.
 *
 * Model-independent ScientificTheory implementation. Its compute() returns a
 * conceptual structure (substances, qualities, combinations) marked as
 * conceptually-reconstructed — never as a physical simulation.
 */

import type {
  ScientificTheory,
  TheoryInput,
  TheoryResult,
  ComputationResultType,
} from "@axiom/core";
import { defaultRegistry } from "@axiom/core";
import { SUBSTANCES } from "../models/substances";
import { QUALITIES } from "../models/substances";
import { listCombinations } from "../calculations/combinations";
import { VAISHESHIKA_SOURCES } from "../data/sources";

export const VAISHESHIKA_LIMITATIONS: string[] = [
  "Paramāṇus are NOT modern chemical atoms. No proton counts, neutron counts, " +
    "electron configurations, atomic masses, or modern chemical properties " +
    "apply.",
  "Vaiśeṣika paramāṇus must not be assumed to correspond to experimentally " +
    "measured physical properties.",
  "Ākāśa is part of the broader five-element framework but is not treated as " +
    "an atomic constituent in this model.",
  "Precise geometry, spacing, motion, and physical properties of combinations " +
    "are not documented in the surviving sources.",
  "Chronology, authorship, and textual transmission of the source traditions " +
    "are debated and are not asserted as settled fact.",
  "This is a conceptual historical reconstruction, not a physical simulation.",
];

export const VAISHESHIKA_THEORY: ScientificTheory = {
  id: "vaisheshika",
  name: "Vaiśeṣika Atomic Theory",
  historicalPeriod: "Ancient India — chronology and authorship debated",
  epistemicCategory: "historical-philosophical",
  description:
    "Vaiśeṣika philosophical tradition associated with Kaṇāda. Investigates " +
    "categories of existence including substance (dravya), quality (guṇa), " +
    "motion (karma), and relation. Proposes indivisible atomic constituents " +
    "(paramāṇu) associated with four material substances: Pṛthvī (Earth), " +
    "Āpas (Water), Tejas (Fire), and Vāyu (Air). Composite bodies are described " +
    "in terms of dyads (dvyaṇuka) and triads (tryaṇuka).",
  sources: VAISHESHIKA_SOURCES,
  applicability: {
    applicableTo: [
      "conceptual-atomic-substances",
      "historical-atomism-study",
      "philosophical-atomism-comparison",
    ],
    notApplicableTo: [
      "modern-chemical-elements",
      "isotopes",
      "subatomic-particles",
      "quantum-mechanical-systems",
      "chemical-bonding",
      "nuclear-physics",
    ],
    description:
      "Applies only to the conceptual study of Vaiśeṣika paramāṇus as a " +
      "historical-philosophical atomism. Not applicable to modern chemical " +
      "elements or any experimentally measurable physical system.",
  },
  limitations: VAISHESHIKA_LIMITATIONS,
  compute(input: TheoryInput): TheoryResult {
    const includeCombinations =
      input.parameters.includeCombinations !== false;

    const data = {
      theoryId: "vaisheshika",
      substances: SUBSTANCES.map((s) => {
        const substanceQualities = s.qualities.map((qId) => QUALITIES[qId]).filter(Boolean);
        return {
          id: s.id,
          name: s.name,
          sanskrit: s.sanskrit,
          element: s.element,
          qualities: substanceQualities,
          epistemicClassification: s.epistemicClassification,
          notes: s.notes,
        };
      }),
      combinations: includeCombinations ? listCombinations() : [],
      epistemicNote:
        "All geometry, motion, and physical properties are conceptually " +
        "reconstructed. No physical simulation is performed.",
    };

    const result: TheoryResult = {
      theoryId: "vaisheshika",
      outputMeta: {
        resultType: "conceptually-reconstructed" as ComputationResultType,
        description:
          "Conceptual reconstruction of Vaiśeṣika paramāṇus, their qualities, " +
          "and described combination structures. Not a physical simulation.",
      },
      data,
      timestamp: Date.now(),
    };

    return result;
  },
};

// Self-register with the default theory registry so the Lab can discover it.
defaultRegistry.register(VAISHESHIKA_THEORY);

export default VAISHESHIKA_THEORY;
