/**
 * AXIOM Visualization public API.
 */

export {
  createConceptualAtom,
  createConceptualCombination,
  SUBSTANCE_COLORS,
} from "./three-dimensional/conceptualGeometry";
export type { ConceptualAtomOptions, ConceptualCombinationOptions } from "./three-dimensional/conceptualGeometry";
export { projectToTopDown } from "./two-dimensional/topDownProjection";
export type { ProjectedAtom } from "./two-dimensional/topDownProjection";
