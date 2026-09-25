"use client";

import { useState, useRef } from "react";
import { PRESET_COLORS } from "@/lib/colors";
import type { ProfileInput } from "@/lib/validation";

interface PhotoItem {
  id?: string;
  url: string;
  sha256Hash?: string | null;
  order: number;
  isPrimary: boolean;
}

interface ProfileFormProps {
  initialData?: Partial<
    ProfileInput & {
      photoUrl?: string | null;
      photos?: PhotoItem[];
      status?: string;
      rejectionReason?: string | null;
    }
  >;
  userName?: string;
  onSuccess?: () => void;
}

export default function ProfileForm({ initialData = {}, onSuccess }: ProfileFormProps) {
  const [form, setForm] = useState<
    ProfileInput & {
      photoUrl?: string | null;
      photos: PhotoItem[];
      status?: string;
      rejectionReason?: string | null;
    }
  >({
    bio: initialData.bio || "",
    address: initialData.address || "",
    city: initialData.city || "",
    region: initialData.region || "",
    district: initialData.district || "",
    localArea: initialData.localArea || "",
    country: initialData.country || "India",
    favColor: initialData.favColor || "",
    phone: initialData.phone || "",
    whatsapp: initialData.whatsapp || "",
    photoUrl: initialData.photoUrl || null,
    photos:
      initialData.photos && initialData.photos.length > 0
        ? initialData.photos
        : initialData.photoUrl
        ? [{ url: initialData.photoUrl, order: 0, isPrimary: true }]
        : [],
    rates: initialData.rates || [],
    visibility: (initialData.visibility as "PUBLIC" | "REGISTERED_USERS_ONLY" | "PRIVATE" | "UNPUBLISHED") || "PUBLIC",
    hidePhoneFromPublic: Boolean(initialData.hidePhoneFromPublic),
    ageConfirmed: Boolean(initialData.ageConfirmed),
    consentRecorded: Boolean(initialData.consentRecorded),
    status: initialData.status || "DRAFT",
    rejectionReason: initialData.rejectionReason || null,
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
    setErrors((prev) => ({ ...prev, [target.name]: [] }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (form.photos.length + files.length > 6) {
      alert("You can upload a maximum of 6 profile photos.");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const newPhotos: PhotoItem[] = [...form.photos];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();

        if (res.ok) {
          const isFirst = newPhotos.length === 0;
          newPhotos.push({
            url: data.url,
            sha256Hash: data.sha256,
            order: newPhotos.length,
            isPrimary: isFirst,
          });
        } else {
          setUploadError(data.error || "Failed to upload image. Please ensure valid JPG/PNG/WebP format.");
        }
      }

      const primary = newPhotos.find((p) => p.isPrimary)?.url || newPhotos[0]?.url || null;
      setForm((prev) => ({
        ...prev,
        photos: newPhotos,
        photoUrl: primary,
      }));
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "An unexpected error occurred during upload.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleSetPrimary = (index: number) => {
    const updated = form.photos.map((p, idx) => ({
      ...p,
      isPrimary: idx === index,
    }));
    setForm((prev) => ({
      ...prev,
      photos: updated,
      photoUrl: updated[index].url,
    }));
  };

  const handleRemovePhoto = (index: number) => {
    const remaining = form.photos.filter((_, idx) => idx !== index);
    if (remaining.length > 0 && !remaining.some((p) => p.isPrimary)) {
      remaining[0].isPrimary = true;
    }
    const updated = remaining.map((p, idx) => ({ ...p, order: idx }));
    setForm((prev) => ({
      ...prev,
      photos: updated,
      photoUrl: updated.find((p) => p.isPrimary)?.url || updated[0]?.url || null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setErrors({});

    // Client validation for adult eligibility & consent
    if (form.photos.length > 0) {
      if (!form.ageConfirmed) {
        setErrors((prev) => ({ ...prev, ageConfirmed: ["You must declare that you are 18 years or older."] }));
        setSubmitting(false);
        return;
      }
      if (!form.consentRecorded) {
        setErrors((prev) => ({ ...prev, consentRecorded: ["You must consent to publishing these photos."] }));
        setSubmitting(false);
        return;
      }
    }

    const body = {
      bio: form.bio,
      address: form.address,
      city: form.city,
      region: form.region,
      district: form.district,
      localArea: form.localArea,
      country: form.country,
      favColor: form.favColor,
      phone: form.phone,
      whatsapp: form.whatsapp,
      photoUrl: form.photoUrl,
      photos: form.photos,
      rates: form.rates,
      visibility: form.visibility,
      hidePhoneFromPublic: form.hidePhoneFromPublic,
      ageConfirmed: form.ageConfirmed,
      consentRecorded: form.consentRecorded,
    };

    const res = await fetch("/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      if (typeof data.error === "object") setErrors(data.error);
      else alert(data.error || "Failed to save profile");
      setSubmitting(false);
      return;
    }

    setSuccess(true);
    setSubmitting(false);
    setForm((prev) => ({
      ...prev,
      status: data.status,
      rejectionReason: data.rejectionReason,
    }));
    onSuccess?.();
  };

  const REGIONS = [
    "Andhra Pradesh", "Delhi", "Gujarat", "Karnataka", "Kerala",
    "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
    "Uttar Pradesh", "West Bengal", "Goa", "Other",
  ];

  return (
    <form onSubmit={handleSubmit} className="profile-form" noValidate>
      {/* Moderation Status Banner */}
      {form.status === "UNDER_REVIEW" && (
        <div style={{ background: "rgba(245, 158, 11, 0.12)", border: "1px solid #f59e0b", padding: "14px 18px", borderRadius: 8, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#d97706", fontWeight: 700 }}>
            <span>⏳ Profile Under Review</span>
          </div>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--text)" }}>
            Our moderation team is reviewing your profile photos &amp; details. Once approved, your advertisement will appear on the lovebite.com directory.
          </p>
        </div>
      )}

      {form.status === "REJECTED" && (
        <div style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid #ef4444", padding: "14px 18px", borderRadius: 8, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#dc2626", fontWeight: 700 }}>
            <span>⚠️ Action Required: Profile Not Approved</span>
          </div>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--text)" }}>
            <strong>Reason:</strong> {form.rejectionReason || "Please update your photos or text to meet lovebite.com quality standards."}
          </p>
        </div>
      )}

      {/* 5-6 Photos Gallery Section */}
      <div className="form-group" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <label className="form-label" style={{ fontWeight: 700, margin: 0 }}>
            Profile Photos ({form.photos.length} / 6)
          </label>
          <span style={{ fontSize: 12, color: form.photos.length >= 5 ? "#10b981" : "var(--text-muted)", fontWeight: 600 }}>
            {form.photos.length >= 5 ? "✓ Recommended 5–6 photos reached" : "Upload 5–6 photos for best visibility"}
          </span>
        </div>

        <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 0 12px" }}>
          All photos are automatically stripped of GPS &amp; EXIF metadata on server. Allowed formats: JPG, PNG, WebP (max 8MB).
        </p>

        {uploadError && (
          <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", padding: "8px 12px", borderRadius: 6, marginBottom: 12, color: "#dc2626", fontSize: 13 }}>
            {uploadError}
          </div>
        )}

        {/* Gallery Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 12, marginBottom: 12 }}>
          {form.photos.map((photo, idx) => (
            <div
              key={idx}
              style={{
                position: "relative",
                borderRadius: 8,
                overflow: "hidden",
                border: photo.isPrimary ? "2px solid var(--primary)" : "1px solid var(--border)",
                aspectRatio: "3/4",
                background: "var(--input-bg)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={`Photo ${idx + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              {photo.isPrimary && (
                <span
                  style={{
                    position: "absolute",
                    top: 6,
                    left: 6,
                    background: "var(--primary)",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 6px",
                    borderRadius: 4,
                  }}
                >
                  PRIMARY
                </span>
              )}

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "rgba(0,0,0,0.7)",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 4,
                }}
              >
                {!photo.isPrimary && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(idx)}
                    style={{ background: "none", border: "none", color: "#fff", fontSize: 10, cursor: "pointer", padding: "2px 4px" }}
                  >
                    ★ Set Main
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(idx)}
                  style={{ background: "none", border: "none", color: "#ef4444", fontSize: 10, cursor: "pointer", padding: "2px 4px", marginLeft: "auto" }}
                >
                  ✕ Remove
                </button>
              </div>
            </div>
          ))}

          {/* Upload Button */}
          {form.photos.length < 6 && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              style={{
                borderRadius: 8,
                border: "2px dashed var(--border)",
                aspectRatio: "3/4",
                background: "var(--input-bg)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                cursor: "pointer",
                color: "var(--text-dark)",
              }}
            >
              <span style={{ fontSize: 24 }}>{uploading ? "⏳" : "+"}</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{uploading ? "Processing…" : "Add Photo"}</span>
            </button>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handlePhotoUpload}
          hidden
          aria-label="Upload gallery photos"
        />
      </div>

      <div className="form-grid">
        {/* Bio */}
        <div className="form-group">
          <label htmlFor="bio" className="form-label">About / Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="form-input form-textarea"
            placeholder="Describe your services, companion experience, and availability..."
            rows={4}
            maxLength={1000}
          />
          {errors.bio?.map((e) => <span key={e} className="form-field-error">{e}</span>)}
        </div>

        {/* Location Navigation Fields (State -> District -> City -> Local Area) */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="region" className="form-label">State / Union Territory</label>
            <select
              id="region"
              name="region"
              value={form.region}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select State…</option>
              {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="city" className="form-label">City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Mumbai, Delhi, Bangalore"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="district" className="form-label">District (Optional)</label>
            <input
              id="district"
              name="district"
              type="text"
              value={form.district}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Mumbai Suburban, South Delhi"
            />
          </div>

          <div className="form-group">
            <label htmlFor="localArea" className="form-label">Local Area / Locality</label>
            <input
              id="localArea"
              name="localArea"
              type="text"
              value={form.localArea}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Bandra West, Connaught Place, Koramangala"
            />
          </div>
        </div>

        {/* Confidential Address (Privacy by Design) */}
        <div className="form-group">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="address" className="form-label">Internal Address / In-call Landmark</label>
            <span style={{ fontSize: 11, color: "var(--accent-color, #e11d48)", fontWeight: 600 }}>🔒 Kept Confidential</span>
          </div>
          <input
            id="address"
            name="address"
            type="text"
            value={form.address}
            onChange={handleChange}
            className="form-input"
            placeholder="Exact street address is never displayed publicly on directory"
          />
        </div>

        {/* Favorite Theme Color */}
        <div className="form-group">
          <label className="form-label">Profile Accent Color</label>
          <div className="color-picker">
            {PRESET_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                className={`color-swatch color-swatch--lg ${form.favColor === c.value ? "color-swatch--active" : ""}`}
                style={{ backgroundColor: c.value }}
                onClick={() => setForm((p) => ({ ...p, favColor: p.favColor === c.value ? "" : c.value }))}
                title={c.name}
                aria-label={c.name}
                aria-pressed={form.favColor === c.value}
              />
            ))}
          </div>
        </div>

        {/* Pricing & Rates */}
        <div className="form-group" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 12px", color: "var(--text)" }}>💰 Rates &amp; Pricing (INR)</h3>
          <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 0 12px" }}>Enter rates in numbers (e.g. 12500). Leave blank if not applicable.</p>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 8, paddingBottom: 6, borderBottom: "1px solid var(--border)", fontSize: 12, fontWeight: 700, color: "var(--text-muted)" }}>
              <span>Duration</span>
              <span>Standard Rate</span>
              <span>Premium Rate</span>
            </div>
            {[
              { duration: "1 Hour", stdPlaceholder: "12,500", premPlaceholder: "16,500" },
              { duration: "2 Hours", stdPlaceholder: "22,000", premPlaceholder: "28,000" },
              { duration: "3 Hours", stdPlaceholder: "30,000", premPlaceholder: "38,000" },
              { duration: "Dinner Date (4 Hours)", stdPlaceholder: "40,000", premPlaceholder: "50,000" },
              { duration: "Overnight (10 Hours)", stdPlaceholder: "75,000", premPlaceholder: "90,000" },
              { duration: "Weekend Getaway", stdPlaceholder: "1,50,000", premPlaceholder: "1,80,000" },
            ].map(({ duration, stdPlaceholder, premPlaceholder }, i) => {
              const currentRate = form.rates?.find((r) => r.duration === duration) || { duration, incall: 0, outcall: 0, order: i };
              return (
                <div key={duration} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{duration}</span>
                  <input
                    type="number"
                    className="form-input"
                    placeholder={`₹${stdPlaceholder}`}
                    value={currentRate.incall || ""}
                    onChange={(e) => {
                      const newRates = [...(form.rates || [])];
                      const val = e.target.value ? Number(e.target.value) : 0;
                      const idx = newRates.findIndex((r) => r.duration === duration);
                      if (idx >= 0) newRates[idx] = { ...newRates[idx], incall: val };
                      else newRates.push({ duration, incall: val, outcall: 0, order: i });
                      setForm((p) => ({ ...p, rates: newRates }));
                    }}
                  />
                  <input
                    type="number"
                    className="form-input"
                    placeholder={`₹${premPlaceholder}`}
                    value={currentRate.outcall || ""}
                    onChange={(e) => {
                      const newRates = [...(form.rates || [])];
                      const val = e.target.value ? Number(e.target.value) : 0;
                      const idx = newRates.findIndex((r) => r.duration === duration);
                      if (idx >= 0) newRates[idx] = { ...newRates[idx], outcall: val };
                      else newRates.push({ duration, incall: 0, outcall: val, order: i });
                      setForm((p) => ({ ...p, rates: newRates }));
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Numbers & Privacy Toggle */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="form-group">
            <label htmlFor="whatsapp" className="form-label">WhatsApp number</label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              value={form.whatsapp}
              onChange={handleChange}
              className="form-input"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        {/* Privacy & Visibility Settings (Phase 4) */}
        <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", padding: 16, borderRadius: 8 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 12px", color: "var(--text)" }}>
            🛡️ Privacy &amp; Visibility Controls
          </h3>

          <div className="form-group" style={{ marginBottom: 12 }}>
            <label htmlFor="visibility" className="form-label">Directory Visibility</label>
            <select
              id="visibility"
              name="visibility"
              value={form.visibility}
              onChange={handleChange}
              className="form-input"
            >
              <option value="PUBLIC">Public — Visible to all visitors</option>
              <option value="REGISTERED_USERS_ONLY">Members Only — Visible only to registered lovebite.com users</option>
              <option value="PRIVATE">Private — Visible only to you</option>
              <option value="UNPUBLISHED">Unpublished (Draft)</option>
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
            <input
              type="checkbox"
              id="hidePhoneFromPublic"
              name="hidePhoneFromPublic"
              checked={form.hidePhoneFromPublic}
              onChange={handleChange}
              style={{ width: 18, height: 18, cursor: "pointer", accentColor: "var(--primary)" }}
            />
            <label htmlFor="hidePhoneFromPublic" style={{ fontSize: 13, cursor: "pointer", color: "var(--text)" }}>
              Require visitors to sign in before seeing phone / WhatsApp numbers
            </label>
          </div>
        </div>

        {/* Age & Consent Declarations (Phase 5.2 & 5.3 - Unchecked by default) */}
        <div style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", padding: 16, borderRadius: 8 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 12px", color: "var(--primary)" }}>
            ⚖️ Legal Eligibility &amp; Consent Declarations
          </h3>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
            <input
              type="checkbox"
              id="ageConfirmed"
              name="ageConfirmed"
              checked={form.ageConfirmed}
              onChange={handleChange}
              style={{ width: 18, height: 18, marginTop: 2, cursor: "pointer", accentColor: "var(--primary)" }}
            />
            <label htmlFor="ageConfirmed" style={{ fontSize: 13, cursor: "pointer", color: "var(--text)" }}>
              <strong>Adult Age Verification:</strong> I confirm and declare under penalty of law that I am at least 18 years of age.
            </label>
          </div>
          {errors.ageConfirmed?.map((e) => <span key={e} className="form-field-error" style={{ display: "block", marginBottom: 8 }}>{e}</span>)}

          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <input
              type="checkbox"
              id="consentRecorded"
              name="consentRecorded"
              checked={form.consentRecorded}
              onChange={handleChange}
              style={{ width: 18, height: 18, marginTop: 2, cursor: "pointer", accentColor: "var(--primary)" }}
            />
            <label htmlFor="consentRecorded" style={{ fontSize: 13, cursor: "pointer", color: "var(--text)" }}>
              <strong>Photo Rights &amp; Consent Declaration:</strong> I confirm that I have the lawful right to upload these photos and that all depicted individuals have provided explicit, voluntary consent to publish these images on lovebite.com.
            </label>
          </div>
          {errors.consentRecorded?.map((e) => <span key={e} className="form-field-error" style={{ display: "block", marginTop: 4 }}>{e}</span>)}
        </div>
      </div>

      {success && (
        <div style={{ background: "rgba(16, 185, 129, 0.12)", border: "1px solid #10b981", color: "#10b981", padding: "12px 16px", borderRadius: 8, marginTop: 16, fontWeight: 600 }}>
          ✓ Profile and privacy settings successfully saved!
        </div>
      )}

      <button
        type="submit"
        className="btn btn--primary"
        style={{ marginTop: 20 }}
        disabled={submitting || uploading}
      >
        {submitting ? "Saving & Validating…" : "Save Profile & Photos"}
      </button>
    </form>
  );
}

