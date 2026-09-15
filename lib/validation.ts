import { sanitizeEmail, sanitizeLine, sanitizeText } from "@/lib/sanitize";
import { isSubmissionType, type FieldErrors, type SubmissionType } from "@/types";

export const LIMITS = {
  name: 100,
  email: 200,
  message: 4000,
  messageMin: 10,
} as const;

/**
 * Deliberately permissive: the only reliable test of an address is sending to
 * it. This rejects the shapes that are certainly wrong without turning away
 * valid addresses.
 */
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

export type SubmissionInput = {
  name: string;
  email: string;
  message: string;
  type: SubmissionType;
};

export type ValidationResult =
  | { ok: true; data: SubmissionInput }
  | { ok: false; errors: FieldErrors };

/**
 * Sanitises first, then validates what survived — so a message made entirely of
 * markup fails as empty rather than passing on its raw length. Error values are
 * dictionary keys under `dict.form.errors`, resolved in whichever locale the
 * reader is using.
 */
export function validateSubmission(form: {
  name: unknown;
  email: unknown;
  message: unknown;
  type: unknown;
}): ValidationResult {
  const name = sanitizeLine(form.name, LIMITS.name + 1);
  const email = sanitizeEmail(form.email);
  const message = sanitizeText(form.message, LIMITS.message + 1);

  const errors: FieldErrors = {};

  if (!name) errors.name = "nameRequired";
  else if (name.length > LIMITS.name) errors.name = "nameTooLong";

  if (!email) errors.email = "emailRequired";
  else if (email.length > LIMITS.email) errors.email = "emailTooLong";
  else if (!EMAIL.test(email)) errors.email = "emailInvalid";

  if (!message) errors.message = "messageRequired";
  else if (message.length < LIMITS.messageMin) errors.message = "messageTooShort";
  else if (message.length > LIMITS.message) errors.message = "messageTooLong";

  if (!isSubmissionType(form.type)) errors.type = "typeInvalid";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: { name, email, message, type: form.type as SubmissionType },
  };
}
