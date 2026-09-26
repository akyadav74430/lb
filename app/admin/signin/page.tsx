"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import Logo from "@/components/Logo";

function AdminSignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setSubmitting(false);
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 420 }}>
        <Logo size="auth" />
        <h1 className="auth-card__title">Admin Sign In</h1>
        <p className="auth-card__subtitle">Superuser access to lovebite.com administration</p>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {error && <div className="auth-form__error-banner">{error}</div>}

          <div className="auth-form__group">
            <label htmlFor="admin-email" className="auth-form__label">Email</label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="auth-form__input"
              placeholder="admin@lovebite.com"
            />
          </div>

          <div className="auth-form__group">
            <label htmlFor="admin-password" className="auth-form__label">Password</label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="auth-form__input"
              placeholder="Enter admin password"
            />
          </div>

          <button type="submit" className="auth-btn auth-btn--primary" disabled={submitting}>
            {submitting ? (
              <>
                <span className="auth-btn__spinner" />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer__text">
            <Link href="/signin" className="auth-footer__link">← User Sign In</Link>
          </p>
        </div>

        <div className="auth-divider">
          <span className="auth-divider__line" />
          <span className="auth-divider__text">or</span>
          <span className="auth-divider__line" />
        </div>

        <Link href="/" className="auth-btn auth-btn--secondary" style={{ textDecoration: "none" }}>
          ← Back to Directory
        </Link>
      </div>
    </div>
  );
}

export default function AdminSignInPage() {
  return (
    <Suspense>
      <AdminSignInForm />
    </Suspense>
  );
}