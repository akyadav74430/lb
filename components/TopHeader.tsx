"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import MobileNavDrawer from "./MobileNavDrawer";
import MobileLoginModal from "./MobileLoginModal";
import Logo from "./Logo";

function TopHeaderContent() {
  const { data: session } = useSession();
  const { theme, toggle } = useTheme();
  const router = useRouter();

  // Mobile drawers & modal states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Desktop quick inline login state
  const [desktopEmail, setDesktopEmail] = useState("");
  const [desktopPassword, setDesktopPassword] = useState("");
  const [desktopError, setDesktopError] = useState("");
  const [desktopLoggingIn, setDesktopLoggingIn] = useState(false);

  const handleDesktopLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!desktopEmail || !desktopPassword) {
      setDesktopError("Please enter email & password");
      return;
    }
    setDesktopLoggingIn(true);
    setDesktopError("");

    const res = await signIn("credentials", {
      email: desktopEmail,
      password: desktopPassword,
      redirect: false,
    });

    setDesktopLoggingIn(false);
    if (res?.error) {
      setDesktopError("Invalid credentials");
    } else {
      router.refresh();
    }
  };

  const toggleMobileMenu = () => {
    setIsLoginOpen(false);
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleMobileLogin = () => {
    setIsMobileMenuOpen(false);
    setIsLoginOpen((prev) => !prev);
  };

  return (
    <>
      <header className="top-header">
        {/* Hamburger Menu Button (Mobile & Tablet) */}
        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? "mobile-menu-btn--open" : ""}`}
          id="mobile-menu-btn"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation-drawer"
          type="button"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Brand Logo */}
        <Logo size="header" priority />

        {/* Header Right Content */}
        <div className="top-header__right">
          {/* Desktop-only: Contact Link */}
          <Link href="/contact" className="top-header__link top-header__link--desktop">
            Contact
          </Link>
          <span className="top-header__sep top-header__sep--desktop" />

          {session ? (
            /* Logged-in State (Both Desktop & Mobile) */
            <div className="top-header__auth-logged">
              <Link href="/profile/edit" className="top-header__account-link" title="My Account">
                <span className="top-header__account-avatar">👤</span>
                <span className="top-header__account-name">{session.user?.name || "My Account"}</span>
              </Link>
              <button
                className="top-header__btn-signout"
                onClick={() => signOut({ callbackUrl: "/" })}
                type="button"
                aria-label="Sign out"
                title="Sign out of lovebite"
              >
                Sign Out
              </button>
            </div>
          ) : (
            /* Logged-out State */
            <>
              {/* Desktop Inline Login Form (Screens >= 1024px) */}
              <form onSubmit={handleDesktopLogin} className="top-header__desktop-login" noValidate>
                <Link href="/signup" className="top-header__link">
                  Create account
                </Link>
                <span className="top-header__sep" />
                <div className="top-header__input-wrap">
                  <input
                    type="email"
                    className="top-header__input"
                    placeholder="Email"
                    aria-label="Email"
                    autoComplete="email"
                    value={desktopEmail}
                    onChange={(e) => {
                      setDesktopEmail(e.target.value);
                      setDesktopError("");
                    }}
                  />
                  <input
                    type="password"
                    className="top-header__input"
                    placeholder="Password"
                    aria-label="Password"
                    autoComplete="current-password"
                    value={desktopPassword}
                    onChange={(e) => {
                      setDesktopPassword(e.target.value);
                      setDesktopError("");
                    }}
                  />
                  <button
                    className="top-header__btn-login"
                    type="submit"
                    disabled={desktopLoggingIn}
                  >
                    {desktopLoggingIn ? "…" : "Login"}
                  </button>
                  {desktopError && (
                    <div className="top-header__error-tooltip" role="alert">
                      {desktopError}
                    </div>
                  )}
                </div>
                <Link href="/signin" className="top-header__link">
                  Remind password
                </Link>
              </form>

              {/* Mobile / Tablet Login Button (Screens < 1024px) */}
              <button
                type="button"
                className="top-header__mobile-login-btn"
                onClick={toggleMobileLogin}
                aria-label="Open sign in panel"
                aria-haspopup="dialog"
              >
                <span className="top-header__mobile-login-icon">🔑</span>
                <span>LOGIN</span>
              </button>
            </>
          )}

          <span className="top-header__sep" />

          {/* Day / Night Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            type="button"
            title={theme === "light" ? "Switch to night mode" : "Switch to day mode"}
          >
            <span className="theme-toggle__track" />
            <span className="theme-toggle__thumb">
              {theme === "light" ? "☀️" : "🌙"}
            </span>
          </button>

          {/* Desktop Language Selector */}
          <span className="top-header__lang top-header__lang--desktop">
            EN
            <svg viewBox="0 0 16 16" fill="currentColor" width="10" height="10">
              <path d="M4 6l4 4 4-4z" />
            </svg>
          </span>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* Mobile Login Modal / Drawer */}
      <MobileLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}

export default function TopHeader() {
  return (
    <Suspense fallback={<header className="top-header" style={{ height: "var(--header-h)" }} />}>
      <TopHeaderContent />
    </Suspense>
  );
}
