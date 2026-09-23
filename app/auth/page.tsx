"use client";

import Link from "next/link";
import Logo from "@/components/Logo";

export default function AuthPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Logo size="auth" />
        <h1 className="auth-card__title">Welcome</h1>
        <p className="auth-card__subtitle">Choose how you want to sign in.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Link href="/signin" className="auth-btn auth-btn--primary" style={{ textDecoration: "none" }}>
            👤 User Sign In
          </Link>
          <Link href="/signup" className="auth-btn auth-btn--secondary" style={{ textDecoration: "none" }}>
            ✨ Create User Account
          </Link>
        </div>

        <div className="auth-divider">
          <span className="auth-divider__line" />
          <span className="auth-divider__text">admin access</span>
          <span className="auth-divider__line" />
        </div>

        <Link href="/admin/signin" className="auth-btn auth-btn--secondary" style={{ textDecoration: "none" }}>
          🛡️ Admin Portal
        </Link>

        <div className="auth-footer" style={{ marginTop: 16 }}>
          <p className="auth-footer__text">
            Browse profiles without an account?{" "}
            <Link href="/" className="auth-footer__link">View Directory</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
