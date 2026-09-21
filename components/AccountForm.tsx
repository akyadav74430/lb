"use client";

import { useState } from "react";

interface AccountFormProps {
  initialName: string;
  initialEmail: string;
}

export default function AccountForm({ initialName, initialEmail }: AccountFormProps) {
  const [form, setForm] = useState({ name: initialName, email: initialEmail });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: [] }));
    setSuccess(false);
    setServerError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setServerError("");

    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      if (typeof data.error === "object") {
        setErrors(data.error);
      } else {
        setServerError(data.error || "Failed to update account");
      }
      setSubmitting(false);
      return;
    }

    setSuccess(true);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="account-form" noValidate>
      <h2 className="section-heading">Account details</h2>

      {serverError && <p className="form-error-banner">{serverError}</p>}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="account-name" className="form-label">Full name</label>
          <input
            id="account-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={`form-input ${errors.name?.length ? "form-input--error" : ""}`}
            placeholder="Jane Doe"
            required
          />
          {errors.name?.map((e) => <span key={e} className="form-field-error">{e}</span>)}
        </div>

        <div className="form-group">
          <label htmlFor="account-email" className="form-label">Email address</label>
          <input
            id="account-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={`form-input ${errors.email?.length ? "form-input--error" : ""}`}
            placeholder="jane@example.com"
            required
          />
          {errors.email?.map((e) => <span key={e} className="form-field-error">{e}</span>)}
        </div>
      </div>

      {success && <p className="form-success">Account details updated!</p>}

      <button type="submit" className="btn btn--primary btn--sm" disabled={submitting}>
        {submitting ? "Saving…" : "Update account"}
      </button>
    </form>
  );
}
