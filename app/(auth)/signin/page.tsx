"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import Logo from "@/components/Logo";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
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
      <div className="auth-card">
        <Logo size="auth" />
        <h1 className="auth-card__title">User Sign In</h1>
        <p className="auth-card__subtitle">Welcome back — sign in to your account.</p>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {error && <div className="auth-form__error-banner">{error}</div>}

          <div className="auth-form__group">
            <label htmlFor="signin-email" className="auth-form__label">Email</label>
            <input
              id="signin-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="auth-form__input"
              placeholder="you@example.com"
            />
          </div>

          <div className="auth-form__group">
            <label htmlFor="signin-password" className="auth-form__label">Password</label>
            <input
              id="signin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="auth-form__input"
              placeholder="Enter your password"
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
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="auth-footer__link">Create one</Link>
          </p>
        </div>

        <div className="auth-divider">
          <span className="auth-divider__line" />
          <span className="auth-divider__text">or</span>
          <span className="auth-divider__line" />
        </div>

        <Link href="/admin/signin" className="auth-btn auth-btn--secondary" style={{ textDecoration: "none" }}>
          🛡️ Admin Login
        </Link>

        <div className="auth-footer" style={{ marginTop: 12 }}>
          <Link href="/" className="auth-footer__link" style={{ fontSize: 12 }}>← Back to Directory</Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
