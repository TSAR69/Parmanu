/**
 * AXIOM Atomic Model Engine — Conceptual combination structures.
 *
 * Vaiśeṣika describes composite bodies formed by combining paramāṇus. The
 * dyad (dvyaṇuka) and triad (tryaṇuka) are referenced in the textual /
 * commentarial tradition as stages of combination.
 *
 * These are conceptual reconstructions of the described combinatory logic,
 * not measurements of physical particles. The precise geometry, motion, and
 * physical properties of combinations are uncertain and are disclosed as such.
 */

export type CombinationEpistemic =
  | "historically-documented-fact"
  | "historical-scholarly-interpretation"
  | "mathematical-reconstruction"
  | "computational-approximation"
  | "unverified-or-disputed";

export interface ConceptualCombination {
  id: string;
  name: string;
  sanskrit?: string;
  description: string;
  constituents: string[]; // substance ids
  constituentCount: number;
  epistemicClassification: CombinationEpistemic;
  resultType: "conceptually-reconstructed";
  uncertainDetails: string[];
}

export const COMBINATIONS: ConceptualCombination[] = [
  {
    id: "dvyanuka",
    name: "Dyad (dvyaṇuka)",
    sanskrit: "द्व्यणुक",
    description:
      "A conceptual combination of two paramāṇus into a dyad, described in " +
      "the Vaiśeṣika textual and commentarial tradition as an early stage of " +
      "composite formation.",
    constituents: ["prithvi"],
    constituentCount: 2,
    epistemicClassification: "historical-scholarly-interpretation",
    resultType: "conceptually-reconstructed",
    uncertainDetails: [
      "The precise physical arrangement of the two constituents is not specified.",
      "Whether dyads form only within a single substance or across substances " +
        "is not settled in the surviving sources.",
      "No geometric configuration, spacing, or motion is documented.",
    ],
  },
  {
    id: "tryanuka",
    name: "Triad (tryaṇuka)",
    sanskrit: "त्रयणुक",
    description:
      "A conceptual combination of three paramāṇus into a triad, described in " +
      "the Vaiśeṣika tradition as a further stage of composite formation.",
    constituents: ["prithvi"],
    constituentCount: 3,
    epistemicClassification: "historical-scholarly-interpretation",
    resultType: "conceptually-reconstructed",
    uncertainDetails: [
      "The precise physical arrangement of the three constituents is not specified.",
      "No geometric configuration, spacing, or motion is documented.",
    ],
  },
  {
    id: "gross-body",
    name: "Gross composite body (material form)",
    sanskrit: "",
    description:
      "Further combination of dyads and triads into perceptible gross bodies, " +
      "as described in the Vaiśeṣika account of material composite formation.",
    constituents: ["prithvi", "apas", "tejas", "vayu"],
    constituentCount: 0, // variable / composite
    epistemicClassification: "historical-scholarly-interpretation",
    resultType: "conceptually-reconstructed",
    uncertainDetails: [
      "The combinatory rules from paramāṇu to gross body are not fully specified " +
        "in the surviving sources.",
      "The role of Ākāśa in composite bodies is part of the broader five-element " +
        "framework but is not treated as an atomic constituent here.",
    ],
  },
];

export function getCombination(id: string): ConceptualCombination | undefined {
  return COMBINATIONS.find((c) => c.id === id);
}

export function listCombinations(): ConceptualCombination[] {
  return COMBINATIONS;
}
