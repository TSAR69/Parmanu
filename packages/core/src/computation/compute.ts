/**
 * AXIOM Core — Computation interface.
 *
 * Separates rendering from computation. The computation layer returns
 * TheoryResult objects; the visualization layer interprets them for display
 * without altering scientific meaning.
 */

import type { TheoryInput, TheoryResult } from "../types/theory";

export interface ComputationEngine {
  execute(input: TheoryInput): Promise<TheoryResult>;
}
