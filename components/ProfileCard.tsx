"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProfileCardProps {
  name: string;
  location: string;
  photoUrl?: string;
  topBadge?: "top" | "new" | null;
  badges: string[];
  href?: string;
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

export default function ProfileCard({
  name,
  location,
  photoUrl,
  topBadge,
  badges,
  href = "#",
}: ProfileCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={href} className="profile-card" id={`profile-card-${name.toLowerCase().replace(/\s+/g, "-")}`}>
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

        {/* Fav heart (appears on hover) */}
        <button
          className="profile-card__fav"
          aria-label="Add to favorites"
          type="button"
          onClick={(e) => e.preventDefault()}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>

      {/* Content under photo */}
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
  );
}
