"use client";

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement | string,
        parameters: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark";
        }
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
    onRecaptchaLoad?: () => void;
  }
}

export interface RecaptchaWidgetRef {
  reset: () => void;
}

interface RecaptchaWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  hasError?: boolean;
}

export const RecaptchaWidget = forwardRef<RecaptchaWidgetRef, RecaptchaWidgetProps>(
  function RecaptchaWidget({ onVerify, onExpire, hasError }, ref) {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<number | null>(null);

    // Fallback mode state (when no site key is provided)
    const [fallbackChecked, setFallbackChecked] = useState(false);
    const [fallbackLoading, setFallbackLoading] = useState(false);

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (typeof window !== "undefined" && window.grecaptcha && widgetIdRef.current !== null) {
          try {
            window.grecaptcha.reset(widgetIdRef.current);
          } catch (e) {
            console.error("Error resetting grecaptcha:", e);
          }
        }
        setFallbackChecked(false);
        setFallbackLoading(false);
      },
    }));

    useEffect(() => {
      if (!siteKey) return;

      const renderWidget = () => {
        if (window.grecaptcha && containerRef.current && widgetIdRef.current === null) {
          try {
            widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
              sitekey: siteKey,
              callback: (token: string) => {
                onVerify(token);
              },
              "expired-callback": () => {
                onExpire?.();
              },
              theme: "light",
            });
          } catch (e) {
            console.error("Error rendering reCAPTCHA:", e);
          }
        }
      };

      if (window.grecaptcha) {
        renderWidget();
      } else {
        window.onRecaptchaLoad = renderWidget;
        if (!document.getElementById("recaptcha-script")) {
          const script = document.createElement("script");
          script.id = "recaptcha-script";
          script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
          script.async = true;
          script.defer = true;
          document.body.appendChild(script);
        }
      }
    }, [siteKey, onVerify, onExpire]);

    const handleFallbackClick = () => {
      if (fallbackChecked || fallbackLoading) return;
      setFallbackLoading(true);
      setTimeout(() => {
        setFallbackLoading(false);
        setFallbackChecked(true);
        const devToken = "dev-pass-" + Math.random().toString(36).substring(2) + Date.now();
        onVerify(devToken);
      }, 500);
    };

    if (siteKey) {
      return (
        <div className={`recaptcha-container ${hasError ? "recaptcha-container--error" : ""}`}>
          <div ref={containerRef} id="recaptcha-google-element" />
        </div>
      );
    }

    // Interactive fallback checkbox widget that looks authentic and works reliably
    return (
      <div className={`recaptcha-fallback-card ${hasError ? "recaptcha-container--error" : ""}`}>
        <div className="recaptcha-fallback-left">
          <button
            type="button"
            className={`recaptcha-fallback-checkbox ${fallbackChecked ? "recaptcha-fallback-checkbox--checked" : ""} ${fallbackLoading ? "recaptcha-fallback-checkbox--loading" : ""}`}
            onClick={handleFallbackClick}
            aria-label="reCAPTCHA verification checkbox"
          >
            {fallbackLoading ? (
              <span className="recaptcha-spinner" />
            ) : fallbackChecked ? (
              <svg className="recaptcha-check-icon" viewBox="0 0 24 24" fill="none" stroke="#00a65a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : null}
          </button>
          <span className="recaptcha-fallback-label" onClick={handleFallbackClick}>
            I&apos;m not a robot
          </span>
        </div>
        <div className="recaptcha-fallback-brand">
          <img
            src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
            alt="reCAPTCHA logo"
            className="recaptcha-logo-img"
          />
          <span className="recaptcha-brand-name">reCAPTCHA</span>
          <div className="recaptcha-brand-links">
            <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer">Privacy</a>
            <span> - </span>
            <a href="https://www.google.com/intl/en/policies/terms/" target="_blank" rel="noopener noreferrer">Terms</a>
          </div>
        </div>
      </div>
    );
  }
);
