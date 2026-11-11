/**
 * AXIOM Core — Validation interface.
 *
 * Validation logic is kept separate from rendering. A model must never be
 * marked scientifically validated merely because its visualization looks
 * convincing.
 */

export interface ValidationRule<Input = unknown> {
  id: string;
  name: string;
  validate(input: Input): { valid: true } | { valid: false; reason: string };
}

export interface ValidationResult {
  valid: boolean;
  reasons: string[];
}

export function validateInput<Input>(
  input: Input,
  rules: ValidationRule<Input>[]
): ValidationResult {
  const reasons: string[] = [];
  for (const rule of rules) {
    const outcome = rule.validate(input);
    if (!outcome.valid) {
      reasons.push(`${rule.name}: ${outcome.reason}`);
    }
  }
  return { valid: reasons.length === 0, reasons };
}
