"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface MobileLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileLoginModal({ isOpen, onClose }: MobileLoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setError("");
    onClose();
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        emailInputRef.current?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email: email.trim(),
      password: password.trim(),
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password. Please check your credentials.");
    } else {
      handleClose();
      router.refresh();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="mobile-login-portal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-login-title"
    >
      {/* Backdrop overlay */}
      <div
        className="mobile-login-backdrop"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="mobile-login-card">
        {/* Header */}
        <div className="mobile-login-card__header">
          <div className="mobile-login-card__title-row">
            <span className="mobile-login-card__icon">🔐</span>
            <h2 id="mobile-login-title" className="mobile-login-card__title">
              Sign In to <span className="brand-love">love</span><span className="brand-bite">bite</span>
            </h2>
          </div>
          <button
            type="button"
            className="mobile-login-card__close-btn"
            onClick={handleClose}
            aria-label="Close sign in dialog"
          >
            ✕
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mobile-login-card__error" role="alert">
            <span className="mobile-login-card__error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mobile-login-card__form" noValidate>
          <div className="mobile-login-card__field">
            <label htmlFor="mobile-login-email" className="mobile-login-card__label">
              Email Address
            </label>
            <input
              ref={emailInputRef}
              id="mobile-login-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              className="mobile-login-card__input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="mobile-login-card__field">
            <div className="mobile-login-card__label-row">
              <label htmlFor="mobile-login-password" className="mobile-login-card__label">
                Password
              </label>
              <Link
                href="/signin"
                className="mobile-login-card__forgot-link"
                onClick={handleClose}
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="mobile-login-password"
              type="password"
              autoComplete="current-password"
              required
              className="mobile-login-card__input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>

          <button
            type="submit"
            className="mobile-login-card__submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="mobile-login-card__loading-wrap">
                <span className="mobile-login-card__spinner" />
                Signing In…
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Card Footer / Signup link */}
        <div className="mobile-login-card__footer">
          <span className="mobile-login-card__footer-text">Don&apos;t have an account?</span>
          <Link
            href="/signup"
            className="mobile-login-card__signup-link"
            onClick={handleClose}
          >
            Create free account →
          </Link>
        </div>
      </div>
    </div>
  );
}
