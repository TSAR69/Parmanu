/**
 * AXIOM Core — Theory registry.
 *
 * Central registry of scientific theories. Theories self-register; the Lab
 * consumes the registry to build the theory selector and route computations.
 */

import type { ScientificTheory } from "../types/theory";

export class TheoryRegistry {
  private theories = new Map<string, ScientificTheory>();

  register(theory: ScientificTheory): void {
    if (this.theories.has(theory.id)) {
      throw new Error(`Theory with id "${theory.id}" is already registered.`);
    }
    this.theories.set(theory.id, theory);
  }

  get(id: string): ScientificTheory | undefined {
    return this.theories.get(id);
  }

  list(): ScientificTheory[] {
    return Array.from(this.theories.values());
  }

  has(id: string): boolean {
    return this.theories.has(id);
  }
}

export const defaultRegistry = new TheoryRegistry();
