/**
 * AXIOM Core public API.
 */

export type { VerificationStatus, SourceType } from "./types/provenance";
export type { ResearchSource, ProvenanceRecord } from "./types/provenance";
export type {
  EpistemicCategory,
  ComputationResultType,
  ApplicabilityDefinition,
  ScientificTheory,
  TheoryInput,
  TheoryOutputMeta,
  TheoryResult,
} from "./types/theory";
export type { Dimension, Quantity, UnitSystem } from "./types/units";
export { TheoryRegistry, defaultRegistry } from "./registry/theoryRegistry";
export type {
  ValidationRule,
  ValidationResult,
} from "./validation/validator";
export { validateInput } from "./validation/validator";
export type { ComputationEngine } from "./computation/compute";
