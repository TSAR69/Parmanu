import { defaultRegistry } from "@axiom/core";
import type { TheoryResult } from "@axiom/core";
import { VAISHESHIKA_THEORY } from "@axiom/module-atomic";

describe("Atomic Model Engine — Vaiśeṣika theory", () => {
  it("is registered in the default theory registry", () => {
    expect(defaultRegistry.has("vaisheshika")).toBe(true);
    expect(defaultRegistry.get("vaisheshika")).toBe(VAISHESHIKA_THEORY);
  });

  it("exposes historical metadata", () => {
    expect(VAISHESHIKA_THEORY.id).toBe("vaisheshika");
    expect(VAISHESHIKA_THEORY.name).toBe("Vaiśeṣika Atomic Theory");
    expect(VAISHESHIKA_THEORY.epistemicCategory).toBe(
      "historical-philosophical"
    );
    expect(VAISHESHIKA_THEORY.sources.length).toBeGreaterThan(0);
  });

  it("returns a conceptually-reconstructed result (not a simulation)", () => {
    const result = VAISHESHIKA_THEORY.compute({
      theoryId: "vaisheshika",
      parameters: {},
    }) as TheoryResult;

    expect(result.outputMeta.resultType).toBe("conceptually-reconstructed");
    const data = result.data as { substances: Array<{ id: string }> };
    expect(data.substances.length).toBe(4);
    expect(result.timestamp).toBeGreaterThan(0);
  });

  it("declares non-applicability to modern chemical elements", () => {
    expect(VAISHESHIKA_THEORY.applicability.notApplicableTo).toContain(
      "modern-chemical-elements"
    );
    expect(VAISHESHIKA_THEORY.applicability.notApplicableTo).toContain(
      "isotopes"
    );
  });

  it("discloses limitations and source verification statuses", () => {
    expect(VAISHESHIKA_THEORY.limitations.length).toBeGreaterThan(0);
    expect(
      VAISHESHIKA_THEORY.limitations.some((l) =>
        l.includes("NOT modern chemical atoms")
      )
    ).toBe(true);

    for (const source of VAISHESHIKA_THEORY.sources) {
      expect([
        "verified",
        "partially-verified",
        "unverified",
      ]).toContain(source.verificationStatus);
    }
  });
});
