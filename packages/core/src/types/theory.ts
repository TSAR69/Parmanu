/**
 * AXIOM Core — Theory model types.
 *
 * Model-independent interface. A theory provides its own implementation of
 * computation and its own output representation. Different theories may return
 * geometric configurations, particle positions, trajectories, energy levels,
 * wavefunctions, probability-density fields, or conceptual structures.
 */

import type { ResearchSource } from "./provenance";

export type EpistemicCategory =
  | "historical-philosophical"
  | "classical-physical"
  | "quantum-mechanical";

/**
 * How a computation result was produced. Must be disclosed in the interface;
 * a convincing visualization is not scientific validation.
 */
export type ComputationResultType =
  | "analytically-calculated"
  | "numerically-calculated"
  | "precomputed"
  | "conceptually-reconstructed";

export interface ApplicabilityDefinition {
  /**
   * Domains the theory can meaningfully address (per its own formulation).
   */
  applicableTo: string[];
  /**
   * Domains the theory explicitly does NOT support. E.g. modern chemical
   * elements for Vaiśeṣika paramāṇus.
   */
  notApplicableTo: string[];
  description: string;
}

export interface ScientificTheory {
  id: string;
  name: string;
  historicalPeriod: string;
  epistemicCategory: EpistemicCategory;
  description: string;
  sources: ResearchSource[];
  applicability: ApplicabilityDefinition;
  limitations: string[];
  compute(
    input: TheoryInput
  ): TheoryResult | Promise<TheoryResult>;
}

export interface TheoryInput {
  theoryId: string;
  parameters: Record<string, unknown>;
  [key: string]: unknown;
}

export interface TheoryOutputMeta {
  resultType: ComputationResultType;
  description: string;
}

export interface TheoryResult {
  theoryId: string;
  outputMeta: TheoryOutputMeta;
  data: unknown;
  timestamp: number;
}
