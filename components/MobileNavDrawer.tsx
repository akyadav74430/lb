"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { NAV_ITEMS } from "./SubNav";
import Logo from "./Logo";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

const ICONS: Record<string, string> = {
  vip: "🔥",
  girls: "💃",
  massages: "💆",
  pornstars: "⭐",
  citytour: "✈️",
  agencies: "🏢",
  boys: "🕺",
  trans: "🏳️‍⚧️",
  videos: "📹",
  advertise: "📢",
  reviews: "📝",
  blacklist: "🛡️",
};

export default function MobileNavDrawer({ isOpen, onClose, onOpenLogin }: MobileNavDrawerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const currentFilter = searchParams.get("filter");

  const isActive = (item: (typeof NAV_ITEMS)[0]) => {
    if (item.key === "advertise") return pathname === "/advertise";
    if (item.key === "reviews") return pathname === "/reviews";
    if (item.key === "blacklist") return pathname === "/blacklist";
    if (pathname === "/") {
      if (!currentFilter && item.key === "girls") return true;
      return currentFilter === item.key;
    }
    return false;
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="mobile-nav-drawer-portal"
      id="mobile-navigation-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop overlay */}
      <div
        className="mobile-nav-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside className="mobile-nav-panel">
        {/* Header with Brand & Close Button */}
        <div className="mobile-nav-panel__header">
          <Logo size="mobile" onClick={onClose} />
          <button
            type="button"
            className="mobile-nav-panel__close-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        {/* User Status / Account Bar */}
        <div className="mobile-nav-panel__user-box">
          {session ? (
            <div className="mobile-nav-panel__user-logged">
              <div className="mobile-nav-panel__user-info">
                <span className="mobile-nav-panel__user-avatar">👤</span>
                <span className="mobile-nav-panel__user-name">{session.user?.name || "Member"}</span>
              </div>
              <div className="mobile-nav-panel__user-actions">
                <Link
                  href="/profile/edit"
                  className="mobile-nav-panel__btn mobile-nav-panel__btn--secondary"
                  onClick={onClose}
                >
                  Edit Profile
                </Link>
                <button
                  type="button"
                  className="mobile-nav-panel__btn mobile-nav-panel__btn--danger"
                  onClick={() => {
                    onClose();
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="mobile-nav-panel__auth-cta">
              <p className="mobile-nav-panel__cta-text">Welcome to lovebite.com</p>
              <div className="mobile-nav-panel__auth-buttons">
                <button
                  type="button"
                  className="mobile-nav-panel__btn mobile-nav-panel__btn--primary"
                  onClick={() => {
                    onClose();
                    onOpenLogin();
                  }}
                >
                  🔑 Sign In
                </button>
                <Link
                  href="/signup"
                  className="mobile-nav-panel__btn mobile-nav-panel__btn--outline"
                  onClick={onClose}
                >
                  ✨ Create Account
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Categories */}
        <nav className="mobile-nav-panel__nav" aria-label="Mobile categories">
          <div className="mobile-nav-panel__section-title">Directory Categories</div>
          <ul className="mobile-nav-panel__list">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              const icon = ICONS[item.key] || "📍";
              return (
                <li key={item.key} className="mobile-nav-panel__item">
                  <Link
                    href={item.href}
                    className={`mobile-nav-panel__link ${active ? "mobile-nav-panel__link--active" : ""}`}
                    onClick={onClose}
                  >
                    <span className="mobile-nav-panel__link-icon">{icon}</span>
                    <span className="mobile-nav-panel__link-label">{item.label}</span>
                    {active && <span className="mobile-nav-panel__active-dot" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Secondary Utility Links */}
          <div className="mobile-nav-panel__section-title" style={{ marginTop: 20 }}>
            Support &amp; Safety
          </div>
          <ul className="mobile-nav-panel__sublist">
            <li>
              <Link href="/contact" className="mobile-nav-panel__sublink" onClick={onClose}>
                💬 Contact Support
              </Link>
            </li>
            <li>
              <Link href="/faq" className="mobile-nav-panel__sublink" onClick={onClose}>
                ❓ Help &amp; FAQ
              </Link>
            </li>
            <li>
              <Link href="/blacklist" className="mobile-nav-panel__sublink" onClick={onClose}>
                🛡️ Safety &amp; Blacklist
              </Link>
            </li>
            <li>
              <Link href="/advertise" className="mobile-nav-panel__sublink" onClick={onClose}>
                📢 Advertise on Lovebite
              </Link>
            </li>
            <li>
              <Link href="/dmca" className="mobile-nav-panel__sublink" onClick={onClose}>
                ⚖️ DMCA Notice
              </Link>
            </li>
            <li>
              <Link href="/terms" className="mobile-nav-panel__sublink" onClick={onClose}>
                📄 Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="mobile-nav-panel__sublink" onClick={onClose}>
                🔒 Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
