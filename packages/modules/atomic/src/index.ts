/**
 * AXIOM Atomic Model Engine public API.
 */

export { VAISHESHIKA_THEORY } from "./theories/vaisheshika";
export type { ScientificTheory } from "@axiom/core";
export { SUBSTANCES, QUALITIES, getSubstance, getQuality } from "./models/substances";
export {
  COMBINATIONS,
  listCombinations,
  getCombination,
} from "./calculations/combinations";
export { VAISHESHIKA_SOURCES } from "./data/sources";
export { VAISHESHIKA_LIMITATIONS } from "./theories/vaisheshika";
