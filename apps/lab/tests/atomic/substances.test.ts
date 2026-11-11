import { SUBSTANCES, QUALITIES, getSubstance, getQuality } from "@axiom/module-atomic";

describe("Atomic Model Engine — Vaiśeṣika substances", () => {
  it("defines exactly four atomic substances", () => {
    expect(SUBSTANCES.length).toBe(4);
    expect(SUBSTANCES.every((s) => s.isAtomic === true)).toBe(true);
  });

  it("covers earth, water, fire and air", () => {
    const elements = SUBSTANCES.map((s) => s.element);
    expect(elements).toEqual([
      "earth",
      "water",
      "fire",
      "air",
    ]);
  });

  it("assigns no modern atomic or chemical properties", () => {
    for (const substance of SUBSTANCES) {
      expect(substance).not.toHaveProperty("protonCount");
      expect(substance).not.toHaveProperty("neutronCount");
      expect(substance).not.toHaveProperty("electronCount");
      expect(substance).not.toHaveProperty("atomicMass");
    }
  });

  it("looks up a substance and its qualities by id", () => {
    const earth = getSubstance("prithvi");
    expect(earth?.name).toBe("Pṛthvī");
    expect(earth?.qualities).toContain("smell");

    const smell = getQuality("smell");
    expect(smell?.name).toBe("Smell (gandha)");
    expect(smell?.sanskrit).toBe("gandha");
  });

  it("keeps honest epistemic classifications for every quality", () => {
    for (const quality of Object.values(QUALITIES)) {
      expect([
        "historically-documented-fact",
        "historical-scholarly-interpretation",
        "mathematical-reconstruction",
        "modern-scientific-interpretation",
        "computational-approximation",
        "unverified-or-disputed",
      ]).toContain(quality.epistemicClassification);
    }
  });
});
