'use client';

import { defaultRegistry } from "@axiom/core";
import type { ScientificTheory } from "@axiom/core";

/**
 * Hook to look up a registered theory by id. The registry is the single source
 * of truth for available theories; rendering never determines scientific truth.
 */
export function useTheory(id: string) {
  const theory = defaultRegistry.get(id);
  return {
    theory,
    isRegistered: !!theory,
  };
}

export function useRegisteredTheories(): ScientificTheory[] {
  return defaultRegistry.list();
}
