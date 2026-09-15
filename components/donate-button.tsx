"use client";

import { ExternalLink, Heart, ShieldAlert } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { fill, hostnameOf } from "@/lib/utils";

export type DonateCopy = {
  trigger: string;
  title: string;
  body: string;
  checklistTitle: string;
  checklist: string[];
  confirm: string;
  cancel: string;
  unverifiedWarning: string;
  close: string;
};

/**
 * An interstitial before any money conversation begins. It exists so nobody can
 * mistake this site for the payment step: the destination hostname is shown
 * before the click, and the link opens the organisation's own page.
 *
 * The copy is passed in rather than read from a context so no dictionary is
 * shipped to the browser — only the handful of strings this control uses.
 */
export function DonateButton({
  name,
  donationUrl,
  verified,
  copy,
  variant = "primary",
  size = "sm",
  className,
}: {
  name: string;
  donationUrl: string;
  verified: boolean;
  copy: DonateCopy;
  variant?: "primary" | "secondary" | "inverse";
  size?: "sm" | "md";
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <Heart aria-hidden className="h-4 w-4" />
        {copy.trigger}
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={copy.title}
        closeLabel={copy.close}
      >
        <p className="text-sm leading-relaxed text-ink-600">{copy.body}</p>

        {!verified && (
          <p className="mt-4 flex gap-2 rounded-xl bg-sand-100 p-3 text-sm text-sand-700">
            <ShieldAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            {copy.unverifiedWarning}
          </p>
        )}

        <h3 className="mt-6 text-sm font-semibold text-ink-900">{copy.checklistTitle}</h3>
        <ul className="mt-2 space-y-2 text-sm text-ink-600">
          {copy.checklist.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-6 break-all rounded-xl bg-ink-50 px-3 py-2 font-mono text-xs text-ink-600">
          {hostnameOf(donationUrl)}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
            {copy.cancel}
          </Button>
          <Button href={donationUrl} external size="sm" onClick={() => setOpen(false)}>
            {fill(copy.confirm, { name })}
            <ExternalLink aria-hidden className="h-4 w-4" />
          </Button>
        </div>
      </Modal>
    </>
  );
}
