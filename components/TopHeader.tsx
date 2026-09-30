"use client";

import { useState, Suspense } from "react";
import { useTheme } from "./ThemeProvider";
import MobileNavDrawer from "./MobileNavDrawer";
import Logo from "./Logo";

function TopHeaderContent() {
  const { theme, toggle } = useTheme();

  // Mobile navigation drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
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
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
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
