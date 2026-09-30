"use client";

import Link from "next/link";
import type { AuthSessionUser } from "@/lib/rbac";
import {
  getContactVisibility,
  telHref,
  whatsappHref,
  type ContactVisibilityInput,
} from "@/lib/contact-visibility";

interface ContactActionsProps {
  profileName: string;
  /** Destination of the generic "Contact" action (the profile page). */
  profileHref: string;
  contact: ContactVisibilityInput;
  requester?: AuthSessionUser | null;
  className?: string;
}

/**
 * Contact action area shared by directory cards and profile pages so both
 * surfaces apply the exact same privacy rules.
 */
export default function ContactActions({
  profileName,
  profileHref,
  contact,
  requester,
  className,
}: ContactActionsProps) {
  const v = getContactVisibility(contact, requester);

  if (!v.showContact) return null;

  return (
    <div className={`contact-actions${className ? ` ${className}` : ""}`}>
      <Link
        href={profileHref}
        className="contact-action contact-action--primary"
        aria-label={`Contact ${profileName}`}
        title="Contact"
      >
        <span className="contact-action__icon" aria-hidden="true">✉️</span>
        <span className="contact-action__label">Contact</span>
      </Link>

      {v.showCall && v.phone && (
        <a
          href={telHref(v.phone)}
          className="contact-action contact-action--call"
          aria-label={`Call ${profileName}`}
          title="Call"
        >
          <span className="contact-action__icon" aria-hidden="true">📞</span>
          <span className="contact-action__label">Call</span>
        </a>
      )}

      {v.showWhatsApp && v.whatsapp && (
        <a
          href={whatsappHref(v.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-action contact-action--whatsapp"
          aria-label={`Message ${profileName} on WhatsApp`}
          title="WhatsApp"
        >
          <span className="contact-action__icon" aria-hidden="true">💬</span>
          <span className="contact-action__label">WhatsApp</span>
        </a>
      )}
    </div>
  );
}
