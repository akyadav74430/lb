"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";

export default function TopHeader() {
  const { data: session } = useSession();
  const { theme, toggle } = useTheme();
  const router = useRouter();

  const [headerEmail, setHeaderEmail] = useState("");
  const [headerPassword, setHeaderPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const handleHeaderLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!headerEmail || !headerPassword) {
      setLoginError("Please enter email & password");
      return;
    }
    setLoggingIn(true);
    setLoginError("");

    const res = await signIn("credentials", {
      email: headerEmail,
      password: headerPassword,
      redirect: false,
    });

    setLoggingIn(false);
    if (res?.error) {
      setLoginError("Invalid credentials");
    } else {
      router.refresh();
    }
  };

  const toggleMobileMenu = () => {
    const sidebar = document.getElementById("sidebar-left");
    let overlay = document.getElementById("sidebar-overlay");
    if (!sidebar) return;

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "sidebar-overlay";
      overlay.className = "sidebar-overlay";
      overlay.addEventListener("click", () => {
        sidebar.classList.remove("sidebar-left--open");
        overlay?.classList.remove("sidebar-overlay--visible");
        document.body.style.overflow = "";
      });
      document.body.appendChild(overlay);
    }

    const isOpen = sidebar.classList.contains("sidebar-left--open");
    if (isOpen) {
      sidebar.classList.remove("sidebar-left--open");
      overlay.classList.remove("sidebar-overlay--visible");
      document.body.style.overflow = "";
    } else {
      sidebar.classList.add("sidebar-left--open");
      overlay.classList.add("sidebar-overlay--visible");
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <header className="top-header">
      <button
        className="mobile-menu-btn"
        id="mobile-menu-btn"
        aria-label="Open menu"
        type="button"
        onClick={toggleMobileMenu}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <Link href="/" className="top-header__logo" title="lovebite.com — Home">
        <span className="top-header__logo-icon">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff4d79" />
                <stop offset="100%" stopColor="#c41e3a" />
              </linearGradient>
            </defs>
            <rect width="40" height="40" rx="10" fill="url(#lb-grad)" />
            <path
              d="M12 18.5C12 14.5 15.5 12 19 15C20 15.9 20 15.9 21 15C24.5 12 28 14.5 28 18.5C28 23.5 20 28 20 28C20 28 12 23.5 12 18.5Z"
              fill="#ffffff"
              opacity="0.95"
            />
            <path
              d="M24 16.5C25.5 17.5 26 19 25 20.5"
              stroke="#c41e3a"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="top-header__logo-text">
          <span className="brand-love">love</span>
          <span className="brand-bite">bite</span>
          <span className="brand-dot">.com</span>
        </span>
      </Link>

      <div className="top-header__right">
        <Link href="/contact" className="top-header__link">Contact</Link>
        <span className="top-header__sep" />

        {session ? (
          <>
            <Link href="/profile/edit" className="top-header__link">
              👤 {session.user?.name || "My Account"}
            </Link>
            <span className="top-header__sep" />
            <button
              className="top-header__btn-login"
              onClick={() => signOut({ callbackUrl: "/" })}
              type="button"
            >
              Sign Out
            </button>
          </>
        ) : (
          <form onSubmit={handleHeaderLogin} className="top-header__login-form">
            <Link href="/signup" className="top-header__link">Create account</Link>
            <span className="top-header__sep" />
            <div className="top-header__input-wrap">
              <input
                type="email"
                className="top-header__input"
                placeholder="Email"
                aria-label="Email"
                value={headerEmail}
                onChange={(e) => {
                  setHeaderEmail(e.target.value);
                  setLoginError("");
                }}
              />
              <input
                type="password"
                className="top-header__input"
                placeholder="Password"
                aria-label="Password"
                value={headerPassword}
                onChange={(e) => {
                  setHeaderPassword(e.target.value);
                  setLoginError("");
                }}
              />
              <button
                className="top-header__btn-login"
                type="submit"
                disabled={loggingIn}
              >
                {loggingIn ? "…" : "Login"}
              </button>
              {loginError && (
                <div className="top-header__error-tooltip">
                  {loginError}
                </div>
              )}
            </div>
            <Link href="/signin" className="top-header__link">Remind password</Link>
          </form>
        )}

        <span className="top-header__sep" />

        {/* Day / Night Toggle */}
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

        <span className="top-header__lang">
          EN
          <svg viewBox="0 0 16 16" fill="currentColor" width="10" height="10">
            <path d="M4 6l4 4 4-4z"/>
          </svg>
        </span>
      </div>
    </header>
  );
}
