"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: [] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setServerError("");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      if (typeof data.error === "object") {
        setErrors(data.error);
      } else {
        setServerError(data.error || "Something went wrong");
      }
      setSubmitting(false);
      return;
    }

    const { signIn } = await import("next-auth/react");
    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/profile/edit?new=1");
    } else {
      router.push("/signin");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__icon">✨</div>
        <h1 className="auth-card__title">Create Account</h1>
        <p className="auth-card__subtitle">Join the community and share your profile.</p>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {serverError && <div className="auth-form__error-banner">{serverError}</div>}

          <div className="auth-form__group">
            <label htmlFor="name" className="auth-form__label">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={`auth-form__input ${errors.name?.length ? "auth-form__input--error" : ""}`}
              placeholder="Jane Doe"
            />
            {errors.name?.map((e) => <span key={e} className="auth-form__error">{e}</span>)}
          </div>

          <div className="auth-form__group">
            <label htmlFor="email" className="auth-form__label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`auth-form__input ${errors.email?.length ? "auth-form__input--error" : ""}`}
              placeholder="you@example.com"
            />
            {errors.email?.map((e) => <span key={e} className="auth-form__error">{e}</span>)}
          </div>

          <div className="auth-form__group">
            <label htmlFor="password" className="auth-form__label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`auth-form__input ${errors.password?.length ? "auth-form__input--error" : ""}`}
              placeholder="At least 8 characters"
            />
            {errors.password?.map((e) => <span key={e} className="auth-form__error">{e}</span>)}
          </div>

          <button type="submit" className="auth-btn auth-btn--primary" disabled={submitting}>
            {submitting ? (
              <>
                <span className="auth-btn__spinner" />
                Creating account…
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer__text">
            Already have an account?{" "}
            <Link href="/signin" className="auth-footer__link">Sign in</Link>
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
