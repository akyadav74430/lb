"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { RecaptchaWidget, RecaptchaWidgetRef } from "@/components/RecaptchaWidget";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  recaptcha?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  const recaptchaRef = useRef<RecaptchaWidgetRef>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = "You must enter the name";
    } else if (trimmedName.length > 100) {
      newErrors.name = "Name cannot exceed 100 characters";
    }

    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address";
    } else if (trimmedEmail.length > 150) {
      newErrors.email = "Email cannot exceed 150 characters";
    }

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) {
      newErrors.message = "Please enter your message";
    } else if (trimmedMessage.length > 5000) {
      newErrors.message = "Message cannot exceed 5000 characters";
    }

    if (!recaptchaToken) {
      newErrors.recaptcha = "Please complete the reCAPTCHA verification";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: "name" | "email" | "message",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error as user types
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
    if (apiError) setApiError("");
  };

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token);
    if (errors.recaptcha) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.recaptcha;
        return updated;
      });
    }
  };

  const handleRecaptchaExpire = () => {
    setRecaptchaToken("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setApiError("");

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          recaptchaToken: recaptchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setRecaptchaToken("");
        recaptchaRef.current?.reset();
      } else {
        setApiError(data.message || "Something went wrong. Please try again later.");
        recaptchaRef.current?.reset();
        setRecaptchaToken("");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setApiError("Something went wrong. Please try again later.");
      recaptchaRef.current?.reset();
      setRecaptchaToken("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: "", email: "", message: "" });
    setRecaptchaToken("");
    setErrors({});
    setApiError("");
    recaptchaRef.current?.reset();
  };

  return (
    <main className="info-page-main">
      <div className="info-page-container">
        {/* Breadcrumbs */}
        <nav className="profile-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/" className="profile-breadcrumb__link">
            Home
          </Link>
          <span className="profile-breadcrumb__sep">›</span>
          <span className="profile-breadcrumb__current">Contact Support</span>
        </nav>

        {/* Hero Section */}
        <div className="info-page-hero">
          <h1 className="info-page-title">Contact Support</h1>
          <p className="info-page-subtitle">
            Need help or have questions about lovebite.com? Reach out to our customer support team.
          </p>
        </div>

        {/* Directory Notice / Disclaimer Banner */}
        <div className="contact-disclaimer-card" role="note">
          <div className="contact-disclaimer-icon">ℹ️</div>
          <div className="contact-disclaimer-body">
            <h3 className="contact-disclaimer-title">Important Notice for Visitors</h3>
            <p className="contact-disclaimer-text">
              Dear visitors, we are an escort directory (an advertising platform), not an escort agency. 
              If you want to book a profile, it is necessary to contact the person directly through their 
              advertisement on our website. We do not arrange meetings between profiles and clients.
            </p>
          </div>
        </div>

        <div className="contact-grid">
          {/* Contact Form Card */}
          <div className="contact-form-card">
            <h2 className="contact-form-card__title">Send a Message</h2>
            <p className="contact-form-card__desc">
              Fill out the form below to contact our administration desk. All submissions are sent directly to support.
            </p>

            {apiError && (
              <div className="contact-error-alert" role="alert">
                <span className="contact-error-icon">⚠️</span>
                <span>{apiError}</span>
              </div>
            )}

            {submitted ? (
              <div className="contact-success-box" role="status">
                <div className="contact-success-icon">✓</div>
                <h3 className="contact-success-title">Message Received!</h3>
                <p className="contact-success-text">
                  Your message has been sent successfully!<br />
                  Our support team will get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  className="contact-btn-reset"
                  onClick={handleReset}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {/* Name Field */}
                <div className="contact-form-group">
                  <label htmlFor="contact-name" className="contact-label">
                    Name <span className="contact-required-mark">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`contact-input ${errors.name ? "contact-input--error" : ""}`}
                    disabled={submitting}
                  />
                  {errors.name && (
                    <span className="contact-field-error" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className="contact-form-group">
                  <label htmlFor="contact-email" className="contact-label">
                    Your Email <span className="contact-required-mark">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`contact-input ${errors.email ? "contact-input--error" : ""}`}
                    disabled={submitting}
                  />
                  {errors.email && (
                    <span className="contact-field-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Message Field */}
                <div className="contact-form-group">
                  <label htmlFor="contact-message" className="contact-label">
                    Message <span className="contact-required-mark">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className={`contact-textarea ${errors.message ? "contact-textarea--error" : ""}`}
                    disabled={submitting}
                  />
                  {errors.message && (
                    <span className="contact-field-error" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* reCAPTCHA Section */}
                <div className="contact-form-group">
                  <label className="contact-label">
                    Verification <span className="contact-required-mark">*</span>
                  </label>
                  <RecaptchaWidget
                    ref={recaptchaRef}
                    onVerify={handleRecaptchaVerify}
                    onExpire={handleRecaptchaExpire}
                    hasError={Boolean(errors.recaptcha)}
                  />
                  {errors.recaptcha && (
                    <span className="contact-field-error" role="alert">
                      {errors.recaptcha}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className={`contact-submit-btn ${submitting ? "contact-submit-btn--loading" : ""}`}
                  id="contact-submit-btn"
                >
                  {submitting ? (
                    <span className="btn-loading-wrapper">
                      <span className="btn-spinner" />
                      <span>Sending...</span>
                    </span>
                  ) : (
                    "SEND"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Information Column */}
          <div className="contact-info-col">
            {/* Information Card */}
            <div className="contact-channel-card">
              <h3 className="contact-channel-card__title">Support Information</h3>
              
              {/* FAQ Link */}
              <div className="contact-info-block">
                <div className="contact-info-icon">❓</div>
                <div className="contact-info-text">
                  <h4 className="contact-info-title">Frequently Asked Questions</h4>
                  <p className="contact-info-desc">
                    Looking for quick answers? Check our FAQ section first:
                  </p>
                  <Link href="/faq" className="contact-info-link">
                    Visit FAQ Page →
                  </Link>
                </div>
              </div>

              {/* Support Response */}
              <div className="contact-info-block">
                <div className="contact-info-icon">⏱️</div>
                <div className="contact-info-text">
                  <h4 className="contact-info-title">Support Response Time</h4>
                  <p className="contact-info-desc">
                    Our support team reviews inquiries daily. We aim to respond within 24 to 48 hours.
                  </p>
                </div>
              </div>

              {/* Contact Email */}
              <div className="contact-info-block">
                <div className="contact-info-icon">✉️</div>
                <div className="contact-info-text">
                  <h4 className="contact-info-title">Support Email</h4>
                  <p className="contact-info-desc">
                    You can also reach our desk directly at:
                  </p>
                  <a href="mailto:neha38982425@gmail.com" className="contact-info-email">
                    neha38982425@gmail.com
                  </a>
                </div>
              </div>

              {/* Suggestions & Feedback */}
              <div className="contact-info-block">
                <div className="contact-info-icon">💡</div>
                <div className="contact-info-text">
                  <h4 className="contact-info-title">Suggestions &amp; Feedback</h4>
                  <p className="contact-info-desc">
                    We are always looking to improve our platform. We warmly welcome your feedback, ideas, and feature requests.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="contact-channel-card">
              <h3 className="contact-channel-card__title">Direct Channels</h3>
              
              <div className="contact-channel-item">
                <div className="channel-icon channel-icon--tg">✈️</div>
                <div className="channel-details">
                  <span className="channel-name">Telegram Support</span>
                  <span className="channel-val">@lovebite_Official</span>
                  <span className="channel-status">Fastest Response (under 15 mins)</span>
                </div>
                <a
                  href="https://t.me/lovebite_Official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-action-btn"
                >
                  Open
                </a>
              </div>

              <div className="contact-channel-item">
                <div className="channel-icon channel-icon--email">✉️</div>
                <div className="channel-details">
                  <span className="channel-name">Official Email</span>
                  <span className="channel-val">neha38982425@gmail.com</span>
                  <span className="channel-status">For legal, DMCA &amp; support</span>
                </div>
                <a
                  href="mailto:neha38982425@gmail.com"
                  className="channel-action-btn"
                >
                  Email
                </a>
              </div>

              <div className="contact-channel-item">
                <div className="channel-icon channel-icon--wa">💬</div>
                <div className="channel-details">
                  <span className="channel-name">Model Emergency WhatsApp</span>
                  <span className="channel-val">+44 7911 882200</span>
                  <span className="channel-status">Safety &amp; Urgent Assistance</span>
                </div>
                <a
                  href="https://wa.me/447911882200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-action-btn"
                >
                  Chat
                </a>
              </div>
            </div>

            {/* Verification Notice Card */}
            <div className="contact-verify-banner">
              <div className="verify-badge-icon">🛡️</div>
              <h4 className="verify-title">Are you an Escort or Agency?</h4>
              <p className="verify-desc">
                Get the <strong>✓ Verified</strong> badge on your profile to gain 4x more calls and appear at the top of your city listings. Verification is 100% free.
              </p>
              <Link href="/signup" className="verify-btn">
                Register as Model Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
