"use server";

import { headers } from "next/headers";

import { prisma } from "@/lib/db";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { validateSubmission } from "@/lib/validation";
import type { FormState } from "@/types";

/**
 * The single submission action. Both the general contact form and the volunteer
 * form post here; `type` decides which they are, so there is one validation
 * path, one limiter and one table rather than two of each.
 *
 * Returned strings are dictionary keys, never prose — the client resolves them
 * in the reader's language, and a server error never leaks its detail to the
 * browser.
 */
export async function submitEnquiry(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  // Honeypot: a field hidden from people and left blank by them, filled in by
  // naive bots. Answer as though it succeeded so the bot learns nothing.
  if (typeof formData.get("website") === "string" && formData.get("website") !== "") {
    return { status: "success", messageKey: "success" };
  }

  const limit = rateLimit(clientKey(headers()));
  if (!limit.allowed) {
    return { status: "error", messageKey: "rateLimited" };
  }

  const result = validateSubmission({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    type: formData.get("type"),
  });

  if (!result.ok) {
    return { status: "error", messageKey: "error", errors: result.errors };
  }

  try {
    await prisma.contactSubmission.create({ data: result.data });
  } catch (error) {
    // The detail stays in the server log; the reader gets a generic message.
    console.error("submitEnquiry: failed to store submission", error);
    return { status: "error", messageKey: "server" };
  }

  return { status: "success", messageKey: "success" };
}
