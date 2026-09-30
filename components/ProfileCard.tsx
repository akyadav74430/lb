"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { buildContactLinks } from "@/lib/contact-visibility";

interface ProfileCardProps {
  name: string;
  location: string;
  photoUrl?: string;
  topBadge?: "top" | "new" | null;
  badges: string[];
  href?: string;
  phone?: string | null;
  whatsapp?: string | null;
  /** Owner hid the numbers — show a sign-in prompt instead of live links. */
  hidePhone?: boolean;
}

/* SVG silhouette for cards with no photo */
function SilhouettePlaceholder({ name }: { name: string }) {
  return (
    <div className="profile-card__placeholder">
      <svg viewBox="0 0 64 80" fill="currentColor" opacity="0.35">
        <circle cx="32" cy="20" r="14" />
        <ellipse cx="32" cy="62" rx="24" ry="18" />
      </svg>
      <span className="profile-card__placeholder-name">{name}</span>
    </div>
  );
}

function CallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.4 21 3 13.6 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24a8.2 8.2 0 015.81 2.41 8.16 8.16 0 012.41 5.83c0 4.54-3.7 8.24-8.23 8.24z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a5 5 0 00-5 5v2H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2v-9a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm-3 7V7a3 3 0 116 0v2H9z" />
    </svg>
  );
}

export default function ProfileCard({
  name,
  location,
  photoUrl,
  topBadge,
  badges,
  href = "#",
  phone,
  whatsapp,
  hidePhone,
}: ProfileCardProps) {
  const [imgError, setImgError] = useState(false);

  const contact = buildContactLinks({ phone, whatsapp, profileName: name, gated: hidePhone });
  const signInHref = `/signin?callbackUrl=${encodeURIComponent(href)}`;

  return (
    <article className="profile-card" id={`profile-card-${name.toLowerCase().replace(/\s+/g, "-")}`}>
      {/* Image area */}
      <div className="profile-card__media">
        {photoUrl && !imgError ? (
          <Image
            src={photoUrl}
            alt={`${name} profile photo`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            loading="lazy"
            style={{ objectFit: "cover" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <SilhouettePlaceholder name={name} />
        )}

        {/* TOP / NEW badge */}
        {topBadge && (
          <span className={`profile-card__top-badge profile-card__top-badge--${topBadge}`}>
            {topBadge === "top" ? "★ TOP" : "NEW"}
          </span>
        )}
      </div>

      {/* Fav heart (appears on hover) */}
      <button
        className="profile-card__fav"
        aria-label={`Add ${name} to favorites`}
        type="button"
        onClick={(e) => e.preventDefault()}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      </button>

      {/* Whole-card link — stretched over the media via ::after in CSS */}
      <Link
        href={href}
        className="profile-card__link"
        aria-label={`View ${name}'s profile in ${location}`}
      >
        <div className="profile-card__content">
          <div className="profile-card__name">{name}</div>
          <div className="profile-card__location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </div>
          {badges.length > 0 && (
            <div className="profile-card__badges">
              {badges.map((b) => {
                const key = b.toLowerCase().replace(/\s+/g, "-");
                let cls = "badge ";
                if (key === "independent") cls += "badge--independent";
                else if (key === "video") cls += "badge--video";
                else if (key === "verified") cls += "badge--verified";
                else if (key === "duo") cls += "badge--duo";
                else if (key === "reviews") cls += "badge--reviews";
                else cls += "badge--verified";
                return <span key={b} className={cls}>{b}</span>;
              })}
            </div>
          )}
        </div>
      </Link>

      {/* Call / WhatsApp actions */}
      {contact.gated ? (
        <div className="profile-card__actions">
          <Link href={signInHref} className="profile-card__action profile-card__action--locked">
            <LockIcon />
            <span className="profile-card__action-label">Sign in</span>
          </Link>
        </div>
      ) : (
        <div className="profile-card__actions">
          <a
            href={contact.callHref}
            className="profile-card__action profile-card__action--call"
            aria-label={`Call ${name}`}
            title={`Call ${contact.displayPhone}`}
          >
            <CallIcon />
            <span className="profile-card__action-label">Call</span>
          </a>
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-card__action profile-card__action--wa"
            aria-label={`WhatsApp ${name}`}
            title={`WhatsApp ${contact.displayPhone}`}
          >
            <WhatsAppIcon />
            <span className="profile-card__action-label">WhatsApp</span>
          </a>
        </div>
      )}
    </article>
  );
}
