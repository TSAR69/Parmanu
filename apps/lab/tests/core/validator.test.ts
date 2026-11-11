import { validateInput } from "@axiom/core";
import type { ValidationRule } from "@axiom/core";

describe("AXIOM Core — validateInput", () => {
  const nonEmpty: ValidationRule<string> = {
    id: "non-empty",
    name: "non-empty",
    validate: (input) =>
      input && input.length > 0
        ? { valid: true }
        : { valid: false, reason: "must not be empty" },
  };

  const maxLength: ValidationRule<string> = {
    id: "max-length",
    name: "max-length",
    validate: (input) =>
      input.length <= 10
        ? { valid: true }
        : { valid: false, reason: "must be at most 10 characters" },
  };

  it("passes when every rule is satisfied", () => {
    expect(validateInput("hello", [nonEmpty, maxLength])).toEqual({
      valid: true,
      reasons: [],
    });
  });

  it("fails and reports a reason when a rule is violated", () => {
    expect(validateInput("", [nonEmpty])).toEqual({
      valid: false,
      reasons: ["non-empty: must not be empty"],
    });
  });

  it("aggregates reasons across multiple violated rules", () => {
    expect(validateInput("this is way too long", [nonEmpty, maxLength])).toEqual({
      valid: false,
      reasons: ["max-length: must be at most 10 characters"],
    });
  });

  it("returns valid with no rules", () => {
    expect(validateInput("anything", [])).toEqual({ valid: true, reasons: [] });
  });
});
