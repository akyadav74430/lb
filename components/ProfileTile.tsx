"use client";

import Link from "next/link";
import { PRESET_COLORS } from "@/lib/colors";

interface Profile {
  id: string;
  photoUrl: string | null;
  bio: string | null;
  city: string | null;
  region: string | null;
  favColor: string | null;
  phone: string | null;
  whatsapp: string | null;
  user: { id: string; name: string };
}

interface ProfileTileProps {
  profile: Profile;
  isSignedIn: boolean;
}

export default function ProfileTile({ profile, isSignedIn }: ProfileTileProps) {
  const { user, photoUrl, bio, city, region, favColor, phone, whatsapp } = profile;
  const colorLabel = PRESET_COLORS.find((c) => c.value === favColor)?.name;
  const location = [city, region].filter(Boolean).join(", ");

  return (
    <Link
      href={`/profile/${profile.id}`}
      className="profile-tile"
      aria-label={`View ${user.name}'s profile`}
    >
      {/* Star badge */}
      <span className="profile-tile__star" aria-hidden="true">⭐</span>

      {/* Photo */}
      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photoUrl} alt={user.name} className="profile-tile__photo" />
      ) : (
        <div className="profile-tile__photo-placeholder">
          <div
            className="avatar--initials"
            style={{ width: 80, height: 80, fontSize: "2rem",
              background: "#f5e6f0", color: "#d6007f" }}
          >
            {user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
          </div>
        </div>
      )}

      {/* Name + bio */}
      <div className="profile-tile__body">
        <h2 className="profile-tile__name">{user.name}</h2>
        {bio && <p className="profile-tile__bio">{bio}</p>}
      </div>

      {/* Tags */}
      <div className="profile-tile__tags">
        {location && <span className="profile-tile__tag">{location}</span>}
        {favColor && (
          <span className="profile-tile__tag profile-tile__tag--color">
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: favColor,
                border: "1px solid rgba(0,0,0,0.15)",
                flexShrink: 0,
              }}
            />
            {colorLabel}
          </span>
        )}
      </div>

      {/* Contact buttons */}
      <div
        className="profile-tile__contacts"
        onClick={(e) => e.preventDefault()}
      >
        {isSignedIn ? (
          <>
            {phone && (
              <a
                href={`tel:${phone}`}
                className="contact-btn contact-btn--phone"
                title="Call"
                aria-label={`Call ${user.name}`}
                onClick={(e) => e.stopPropagation()}
              >
                📞
              </a>
            )}
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn contact-btn--wa"
                title="WhatsApp"
                aria-label={`WhatsApp ${user.name}`}
                onClick={(e) => e.stopPropagation()}
              >
                💬
              </a>
            )}
          </>
        ) : (
          <span className="contact-btn contact-btn--lock" title="Sign in to see contact">
            🔒
          </span>
        )}
      </div>
    </Link>
  );
}
