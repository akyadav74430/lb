"use client";

import { useState } from "react";
import { reportCategories } from "@/lib/validation";

interface ReportModalProps {
  profileId: string;
  profileName: string;
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  FAKE_PROFILE: "Fake / Scammer Profile",
  STOLEN_PHOTOS: "Stolen / Copyrighted Photos",
  IMPERSONATION: "Impersonating Another Person",
  UNDERAGE_CONCERN: "Underage or Minor Suspected (Priority Escalation)",
  HARASSMENT: "Harassment or Abusive Behavior",
  SPAM: "Spam or Bot Activity",
  FRAUD: "Financial Fraud / Advance Payment Scam",
  NON_CONSENSUAL_CONTENT: "Non-Consensual Photo Publication",
  WRONG_INFORMATION: "Wrong Location, Phone, or Rates",
  OTHER: "Other Violation of Safety Terms",
};

export default function ReportModal({ profileId, profileName, isOpen, onClose }: ReportModalProps) {
  const [category, setCategory] = useState<string>("FAKE_PROFILE");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileId,
          category,
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (typeof data.error === "object") {
          const firstErr = Object.values(data.error)[0] as string[];
          setErrorMsg(firstErr?.[0] || "Validation failed");
        } else {
          setErrorMsg(data.error || "Failed to submit report");
        }
        setSubmitting(false);
        return;
      }

      setSuccessMsg("✓ Your report has been submitted to the lovebite.com Trust & Safety moderation team for investigation.");
      setSubmitting(false);
      setTimeout(() => {
        onClose();
        setSuccessMsg(null);
        setDescription("");
      }, 2500);
    } catch {
      setErrorMsg("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: 24,
          maxWidth: 520,
          width: "100%",
          color: "var(--text)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "var(--text)" }}>
            🚩 Report Profile: {profileName}
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              fontSize: 20,
              cursor: "pointer",
              padding: 4,
            }}
            aria-label="Close report modal"
          >
            ✕
          </button>
        </div>

        <div style={{ background: "rgba(225, 29, 72, 0.08)", border: "1px solid rgba(225, 29, 72, 0.2)", padding: "10px 14px", borderRadius: 8, fontSize: 12, color: "var(--text)", marginBottom: 16 }}>
          🔒 <strong>Reporter Confidentiality:</strong> Your report is 100% confidential. Your identity will never be disclosed to the reported profile owner.
        </div>

        {successMsg ? (
          <div style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", color: "#10b981", padding: 16, borderRadius: 8, textAlign: "center", fontWeight: 600 }}>
            {successMsg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {errorMsg && (
              <div style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid #ef4444", color: "#f87171", padding: "10px 14px", borderRadius: 8, fontSize: 13 }}>
                {errorMsg}
              </div>
            )}

            <div>
              <label htmlFor="report-category" style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-dark)" }}>
                Reason for report
              </label>
              <select
                id="report-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "var(--input-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--input-text)",
                  fontSize: 14,
                }}
              >
                {reportCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_LABELS[cat] || cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="report-description" style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--text-dark)" }}>
                Additional Details &amp; Evidence
              </label>
              <textarea
                id="report-description"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe why this profile violates safety guidelines. Provide links or specifics..."
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "var(--input-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--input-text)",
                  fontSize: 14,
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
              <span style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4, display: "block" }}>
                Minimum 10 characters ({description.length} / 2000)
              </span>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: "10px 18px",
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  borderRadius: 8,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || description.trim().length < 10}
                style={{
                  padding: "10px 20px",
                  background: submitting || description.trim().length < 10 ? "#6b21a8" : "#e11d48",
                  border: "none",
                  color: "#fff",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: submitting || description.trim().length < 10 ? "not-allowed" : "pointer",
                  opacity: submitting || description.trim().length < 10 ? 0.6 : 1,
                }}
              >
                {submitting ? "Submitting Report…" : "Submit Report"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
