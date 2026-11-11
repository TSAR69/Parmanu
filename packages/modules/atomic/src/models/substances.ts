/**
 * AXIOM Atomic Model Engine — Vaiśeṣika atomic substances.
 *
 * Four material substances associated with atomic constituents (paramāṇu):
 * Pṛthvī (Earth), Āpas (Water), Tejas (Fire), Vāyu (Air). Ākāśa is part of the
 * broader five-element framework but is not treated as an atomic substance in
 * the same manner.
 *
 * CRITICAL: These are NOT modern chemical atoms. No proton counts, neutron
 * counts, electron configurations, atomic masses, or modern chemical properties
 * are assigned. Philosophical descriptions are not assumed to correspond to
 * experimentally measured physical properties.
 */

export type EpistemicClassification =
  | "historically-documented-fact"
  | "historical-scholarly-interpretation"
  | "mathematical-reconstruction"
  | "modern-scientific-interpretation"
  | "computational-approximation"
  | "unverified-or-disputed";

export interface AtomicQuality {
  id: string;
  name: string;
  sanskrit?: string;
  description: string;
  epistemicClassification: EpistemicClassification;
}

export interface AtomicSubstance {
  id: string;
  name: string;
  sanskrit: string;
  element: "earth" | "water" | "fire" | "air";
  qualities: string[]; // quality ids
  isAtomic: true;
  epistemicClassification: EpistemicClassification;
  notes?: string;
}

export const QUALITIES: Record<string, AtomicQuality> = {
  smell: {
    id: "smell",
    name: "Smell (gandha)",
    sanskrit: "gandha",
    description:
      "Attributed to Pṛthvī (Earth) as a distinctive quality; absent from the " +
      "other three atomic substances in the classical presentation.",
    epistemicClassification: "historically-documented-fact",
  },
  taste: {
    id: "taste",
    name: "Taste (rasa)",
    sanskrit: "rasa",
    description:
      "Attributed to Pṛthvī (Earth) and Āpas (Water); absent from Tejas and " +
      "Vāyu in the classical presentation.",
    epistemicClassification: "historically-documented-fact",
  },
  form: {
    id: "form",
    name: "Form / colour (rūpa)",
    sanskrit: "rūpa",
    description:
      "Attributed to Pṛthvī, Āpas, and Tejas; absent from Vāyu in the " +
      "classical presentation.",
    epistemicClassification: "historically-documented-fact",
  },
  touch: {
    id: "touch",
    name: "Touch (sparśa)",
    sanskrit: "sparśa",
    description:
      "Attributed to all four atomic substances (Pṛthvī, Āpas, Tejas, Vāyu).",
    epistemicClassification: "historically-documented-fact",
  },
};

export const SUBSTANCES: AtomicSubstance[] = [
  {
    id: "prithvi",
    name: "Pṛthvī",
    sanskrit: "पृथ्वी",
    element: "earth",
    qualities: ["smell", "taste", "form", "touch"],
    isAtomic: true,
    epistemicClassification: "historically-documented-fact",
    notes:
      "Earth is associated with all four qualities including smell, its " +
      "distinguishing attribute in the Vaiśeṣika presentation.",
  },
  {
    id: "apas",
    name: "Āpas",
    sanskrit: "आपः",
    element: "water",
    qualities: ["taste", "form", "touch"],
    isAtomic: true,
    epistemicClassification: "historically-documented-fact",
    notes:
      "Water is associated with taste, form, and touch; smell is not attributed.",
  },
  {
    id: "tejas",
    name: "Tejas",
    sanskrit: "तेजस्",
    element: "fire",
    qualities: ["form", "touch"],
    isAtomic: true,
    epistemicClassification: "historically-documented-fact",
    notes:
      "Fire is associated with form/colour and touch; taste and smell are not attributed.",
  },
  {
    id: "vayu",
    name: "Vāyu",
    sanskrit: "वायुः",
    element: "air",
    qualities: ["touch"],
    isAtomic: true,
    epistemicClassification: "historically-documented-fact",
    notes:
      "Air is associated with touch alone; taste, smell, and form are not attributed.",
  },
];

export function getSubstance(id: string): AtomicSubstance | undefined {
  return SUBSTANCES.find((s) => s.id === id);
}

export function getQuality(id: string): AtomicQuality | undefined {
  return QUALITIES[id];
}
