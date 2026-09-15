"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from "@/lib/i18n";
import { isLocale } from "@/types";

/**
 * Switches language by writing a first-party cookie and re-rendering.
 *
 * It is a form action rather than a click handler on purpose: the switcher
 * works with JavaScript disabled, and no dictionary is ever shipped to the
 * browser.
 */
export async function setLocale(formData: FormData) {
  const next = formData.get("locale");
  if (!isLocale(next)) return;

  cookies().set(LOCALE_COOKIE, next, {
    maxAge: LOCALE_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
  });

  // Every page reads the cookie, so the whole tree is re-rendered.
  revalidatePath("/", "layout");
}
