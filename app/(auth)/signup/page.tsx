"use client";

import Link from "next/link";
import Logo from "@/components/Logo";

export default function SignUpPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Logo size="auth" />
        <h1 className="auth-card__title">Registration Disabled</h1>
        <p className="auth-card__subtitle">User registration has been disabled on this site.</p>

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
            <Link href="/" className="auth-footer__link">← Back to Directory</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
