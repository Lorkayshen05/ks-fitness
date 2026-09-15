"use client";

import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { submitEnquiry } from "@/actions/submissions";
import { Button } from "@/components/button";
import { LIMITS } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { idleFormState, submissionTypes, type SubmissionType } from "@/types";

/** Every string the form renders, passed in so no dictionary reaches the bundle. */
export type FormCopy = {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  typeLabel: string;
  types: Record<SubmissionType, string>;
  messageLabel: string;
  messagePlaceholderGeneral: string;
  messagePlaceholderVolunteer: string;
  submit: string;
  submitting: string;
  required: string;
  privacyNote: string;
  privacyLinkLabel: string;
  feedback: Record<string, string>;
  errors: Record<string, string>;
};

const field =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-ink-900 placeholder:text-ink-400 " +
  "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500";

function SubmitButton({ copy }: { copy: FormCopy }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      <Send aria-hidden className={cn("h-4 w-4", pending && "animate-pulse")} />
      {pending ? copy.submitting : copy.submit}
    </Button>
  );
}

/**
 * The contact and volunteer form. One component, one server action: `type`
 * selects which enquiry it is, and the placeholder follows that choice.
 *
 * Errors come back from the server as dictionary keys and are resolved here, so
 * validation messages appear in the reader's language without the validator
 * knowing anything about languages.
 */
export function Form({
  copy,
  defaultType = "general",
}: {
  copy: FormCopy;
  defaultType?: SubmissionType;
}) {
  const [state, action] = useFormState(submitEnquiry, idleFormState);
  const [type, setType] = useState<SubmissionType>(defaultType);
  const formRef = useRef<HTMLFormElement>(null);

  const errorFor = (name: "name" | "email" | "message" | "type") => {
    const key = state.errors?.[name];
    return key ? copy.errors[key] : undefined;
  };

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center"
      >
        <CheckCircle2 aria-hidden className="mx-auto h-10 w-10 text-brand-600" />
        <p className="mt-4 text-lg font-medium text-ink-900">
          {copy.feedback[state.messageKey ?? "success"]}
        </p>
      </div>
    );
  }

  const feedback =
    state.status === "error" ? copy.feedback[state.messageKey ?? "error"] : undefined;

  return (
    <form ref={formRef} action={action} noValidate className="space-y-6">
      {feedback && (
        <p
          role="alert"
          className="flex gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          {feedback}
        </p>
      )}

      <fieldset>
        <legend className="text-sm font-semibold text-ink-900">{copy.typeLabel}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {submissionTypes.map((option) => (
            <label
              key={option}
              className={cn(
                "cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1 ring-inset transition",
                "focus-within:ring-2 focus-within:ring-brand-500",
                type === option
                  ? "bg-brand-700 text-white ring-brand-700"
                  : "bg-white text-ink-700 ring-ink-200 hover:bg-ink-50",
              )}
            >
              <input
                type="radio"
                name="type"
                value={option}
                checked={type === option}
                onChange={() => setType(option)}
                className="sr-only"
              />
              {copy.types[option]}
            </label>
          ))}
        </div>
        {errorFor("type") && (
          <p className="mt-2 text-sm text-red-700">{errorFor("type")}</p>
        )}
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-ink-900">
            {copy.nameLabel}{" "}
            <span className="font-normal text-ink-500">({copy.required})</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={LIMITS.name}
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={errorFor("name") ? "name-error" : undefined}
            className={cn(field, "mt-2", errorFor("name") ? "border-red-400" : "border-ink-200")}
          />
          {errorFor("name") && (
            <p id="name-error" className="mt-2 text-sm text-red-700">
              {errorFor("name")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink-900">
            {copy.emailLabel}{" "}
            <span className="font-normal text-ink-500">({copy.required})</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={LIMITS.email}
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={errorFor("email") ? "email-error" : undefined}
            className={cn(field, "mt-2", errorFor("email") ? "border-red-400" : "border-ink-200")}
          />
          {errorFor("email") && (
            <p id="email-error" className="mt-2 text-sm text-red-700">
              {errorFor("email")}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-ink-900">
          {copy.messageLabel}{" "}
          <span className="font-normal text-ink-500">({copy.required})</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={LIMITS.messageMin}
          maxLength={LIMITS.message}
          placeholder={
            type === "volunteer" ? copy.messagePlaceholderVolunteer : copy.messagePlaceholderGeneral
          }
          aria-invalid={Boolean(errorFor("message"))}
          aria-describedby={errorFor("message") ? "message-error" : undefined}
          className={cn(
            field,
            "mt-2 resize-y",
            errorFor("message") ? "border-red-400" : "border-ink-200",
          )}
        />
        {errorFor("message") && (
          <p id="message-error" className="mt-2 text-sm text-red-700">
            {errorFor("message")}
          </p>
        )}
      </div>

      {/* Honeypot: off-screen, not announced, and never focusable by keyboard. */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton copy={copy} />
        <p className="max-w-sm text-xs leading-relaxed text-ink-500">
          {copy.privacyNote}{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-ink-800">
            {copy.privacyLinkLabel}
          </Link>
        </p>
      </div>
    </form>
  );
}
