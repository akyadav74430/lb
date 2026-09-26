"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface LogoProps {
  /** Size variant tailored for different UI locations */
  size?: "header" | "mobile" | "auth" | "footer" | "compact" | "nav";
  /** Optional custom CSS class name */
  className?: string;
  /** Link target (defaults to "/") */
  href?: string;
  /** Whether to prioritize image loading */
  priority?: boolean;
  /** Optional click handler (e.g. for closing mobile menu) */
  onClick?: () => void;
  /** Custom image source override if needed */
  src?: string;
  /** Custom emblem source override */
  emblemSrc?: string;
  /** Whether to show text next to the emblem */
  showText?: boolean;
}

const SIZE_CONFIGS = {
  header: {
    emblemSize: 34,
    height: 38,
    textSize: "22px",
    className: "lovebite-logo--header",
  },
  mobile: {
    emblemSize: 28,
    height: 30,
    textSize: "19px",
    className: "lovebite-logo--mobile",
  },
  auth: {
    emblemSize: 52,
    height: 52,
    textSize: "26px",
    className: "lovebite-logo--auth",
  },
  footer: {
    emblemSize: 32,
    height: 36,
    textSize: "22px",
    className: "lovebite-logo--footer",
  },
  compact: {
    emblemSize: 24,
    height: 26,
    textSize: "17px",
    className: "lovebite-logo--compact",
  },
  nav: {
    emblemSize: 28,
    height: 32,
    textSize: "19px",
    className: "lovebite-logo--compact",
  },
};

export default function Logo({
  size = "header",
  className = "",
  href = "/",
  priority = false,
  onClick,
  src,
  emblemSrc = "/images/logo-emblem.png",
  showText = true,
}: LogoProps) {
  const config = SIZE_CONFIGS[size] || SIZE_CONFIGS.header;
  const [imgError, setImgError] = useState(false);

  // If a specific custom src (e.g., full SVG or horizontal PNG) is passed, render that directly
  if (src) {
    const customContent = (
      <div
        className={`lovebite-logo ${config.className} ${className}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: size === "auth" ? "center" : "flex-start",
          height: "auto",
          maxHeight: config.height,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="lovebite.com"
          height={config.height}
          style={{
            height: config.height,
            width: "auto",
            maxWidth: "100%",
            objectFit: "contain",
            display: "block",
          }}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
    );

    if (href) {
      return (
        <Link
          href={href}
          className="lovebite-logo__link"
          onClick={onClick}
          title="lovebite.com — Verified Escorts & Companions"
          aria-label="lovebite.com Home"
        >
          {customContent}
        </Link>
      );
    }
    return customContent;
  }

  const content = (
    <div
      className={`lovebite-logo ${config.className} ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: size === "auth" ? "center" : "flex-start",
        gap: size === "compact" ? 6 : size === "auth" ? 12 : 9,
        height: "auto",
        lineHeight: 1,
      }}
    >
      {/* Primary Brand Emblem derived from Logo.jpeg */}
      {!imgError ? (
        <span
          className="lovebite-logo__emblem-frame"
          style={{
            width: config.emblemSize,
            height: config.emblemSize,
            flexShrink: 0,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={emblemSrc}
            alt="lovebite emblem"
            width={config.emblemSize}
            height={config.emblemSize}
            onError={() => setImgError(true)}
            className="lovebite-logo__emblem"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            loading={priority ? "eager" : "lazy"}
          />
        </span>
      ) : (
        /* Fallback SVG badge if image is missing */
        <span
          className="lovebite-logo__emblem-frame lovebite-logo__emblem-frame--fallback"
          style={{
            width: config.emblemSize,
            height: config.emblemSize,
            flexShrink: 0,
          }}
        >
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%" }}
          >
            <defs>
              <linearGradient id="lb-logo-grad-fb" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff4d79" />
                <stop offset="100%" stopColor="#c41e3a" />
              </linearGradient>
            </defs>
            <rect width="36" height="36" rx="9" fill="url(#lb-logo-grad-fb)" />
            <path
              d="M10.8 16.65C10.8 13.05 13.95 10.8 17.1 13.5C18 14.31 18 14.31 18.9 13.5C22.05 10.8 25.2 13.05 25.2 16.65C25.2 21.15 18 25.2 18 25.2C18 25.2 10.8 21.15 10.8 16.65Z"
              fill="#ffffff"
              opacity="0.95"
            />
          </svg>
        </span>
      )}

      {/* Styled Brand Typography */}
      {showText && (
        <span
          className="lovebite-logo__text"
          style={{ fontSize: config.textSize }}
        >
          <span className="brand-love">love</span>
          <span className="brand-bite">bite</span>
          <span className="brand-dot">.com</span>
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="lovebite-logo__link"
        onClick={onClick}
        title="lovebite.com — Verified Escorts & Companions"
        aria-label="lovebite.com Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}

