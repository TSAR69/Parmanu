/**
 * AXIOM Core — Units and dimensions foundation.
 *
 * Minimal, intentionally extensible. Historical theories such as Vaiśeṣika do
 * not use modern units, so this foundation is kept generic and theory-agnostic.
 */

export interface Dimension {
  id: string;
  name: string;
  baseUnit: string;
}

export interface Quantity {
  value: number;
  unit: string;
  dimension: string;
}

export interface UnitSystem {
  id: string;
  name: string;
  dimensions: Record<string, Dimension>;
}
