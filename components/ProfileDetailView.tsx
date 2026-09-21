"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EscortProfile, ProfileReview } from "@/lib/profiles-data";
import ReportModal from "./ReportModal";

interface Props {
  profile: EscortProfile;
  similarProfiles: EscortProfile[];
  allProfileIds?: string[];
}

export default function ProfileDetailView({ profile, similarProfiles, allProfileIds = [] }: Props) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reviews, setReviews] = useState<ProfileReview[]>(profile.reviews);
  const [newReview, setNewReview] = useState({ author: "", rating: 5, comment: "", city: profile.city });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const gallery = profile.gallery.length > 0 ? profile.gallery : [profile.photoUrl];
  const activePhoto = gallery[photoIndex] || profile.photoUrl;

  const handlePrevPhoto = useCallback(() => {
    setPhotoIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  }, [gallery.length]);

  const handleNextPhoto = useCallback(() => {
    setPhotoIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  }, [gallery.length]);

  // Keyboard navigation for gallery & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevPhoto();
      } else if (e.key === "ArrowRight") {
        handleNextPhoto();
      } else if (e.key === "Escape" && lightboxOpen) {
        setLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevPhoto, handleNextPhoto, lightboxOpen]);

  const currentIndex = allProfileIds.indexOf(profile.id);
  const prevId = currentIndex > 0 ? allProfileIds[currentIndex - 1] : null;
  const nextId = currentIndex < allProfileIds.length - 1 ? allProfileIds[currentIndex + 1] : null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.comment.trim()) return;
    const review: ProfileReview = {
      id: `user-${Date.now()}`,
      author: newReview.author.trim(),
      rating: newReview.rating,
      date: "Just now",
      city: newReview.city || profile.city,
      verified: true,
      comment: newReview.comment.trim(),
    };
    setReviews([review, ...reviews]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewModalOpen(false);
      setNewReview({ author: "", rating: 5, comment: "", city: profile.city });
    }, 1500);
  };

  // Build attribute rows for the table
  const attrRows: { label: string; value: React.ReactNode }[] = [
    { label: "Gender", value: profile.gender === "female" ? "Female" : profile.gender === "male" ? "Male" : "Trans" },
    { label: "Age", value: `${profile.age}` },
    {
      label: "Location",
      value: (
        <Link href={`/?city=${encodeURIComponent(profile.city)}`} className="profile-attr-link">
          {profile.localArea ? `${profile.localArea}, ` : ""}{profile.city}{profile.state ? `, ${profile.state}` : ""}
        </Link>
      ),
    },
    { label: "Eyes", value: profile.eyes },
    { label: "Hair color", value: profile.hairColor || profile.hair },
    { label: "Hair length", value: profile.hairLength || "—" },
    { label: "Pubic hair", value: profile.pubicHair || "—" },
    { label: "Bust size", value: profile.bustSize || profile.bust },
    { label: "Bust type", value: profile.bustType || "—" },
    { label: "Travel", value: profile.travel ? profile.travel.join(", ") : "—" },
    { label: "Weight", value: profile.weight },
    { label: "Height", value: profile.height },
    { label: "Ethnicity", value: profile.ethnicity },
    { label: "Orientation", value: profile.orientation || "—" },
    { label: "Smoker", value: profile.smoker || "—" },
    { label: "Tattoo", value: profile.tattoo || "—" },
    { label: "Piercing", value: profile.piercing || "—" },
    { label: "Nationality", value: profile.nationality || profile.country },
    { label: "Languages", value: profile.languages.join(", ") },
    { label: "Available for", value: profile.availableFor ? profile.availableFor.join(" + ") : "Incall + Outcall" },
    { label: "Meeting with", value: profile.meetingWith ? profile.meetingWith.join(", ") : "Man" },
  ];

  return (
    <div className="pdv-wrapper">
      {/* Breadcrumb */}
      <nav className="profile-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/" className="profile-breadcrumb__link">Home</Link>
        <span className="profile-breadcrumb__sep">›</span>
        {profile.state && (
          <>
            <Link href={`/?state=${encodeURIComponent(profile.state)}`} className="profile-breadcrumb__link">
              {profile.state}
            </Link>
            <span className="profile-breadcrumb__sep">›</span>
          </>
        )}
        <Link href={`/?city=${encodeURIComponent(profile.city)}`} className="profile-breadcrumb__link">
          {profile.city} Escorts
        </Link>
        <span className="profile-breadcrumb__sep">›</span>
        <span className="profile-breadcrumb__current">{profile.name}</span>
      </nav>

      {/* Two-column Main Layout */}
      <div className="pdv-layout">
        {/* ══════════════════════════════════════
            LEFT COLUMN — Photo Gallery + Contact
            ══════════════════════════════════════ */}
        <div className="pdv-media-col">

          {/* Main Photo with badge overlays */}
          <div
            className="pdv-main-photo"
            onClick={() => setLightboxOpen(true)}
            role="button"
            tabIndex={0}
            aria-label={`Open full gallery for ${profile.name}`}
          >
            <div className="pdv-main-photo__inner">
              <Image
                src={activePhoto}
                alt={`${profile.name} primary photo`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                className="pdv-main-photo__img"
                onError={() => setImgErrors((p) => ({ ...p, [activePhoto]: true }))}
              />

              {/* Top-left stacked circular badges */}
              <div className="pdv-circle-badges">
                {profile.badges.includes("NEW") || profile.topBadge === "new" ? (
                  <span className="pdv-circle-badge pdv-circle-badge--new">NEW</span>
                ) : null}
                {profile.badges.includes("Independent") || profile.status === "Independent" ? (
                  <span className="pdv-circle-badge pdv-circle-badge--independent">INDEP</span>
                ) : null}
                {profile.badges.includes("Video") ? (
                  <span className="pdv-circle-badge pdv-circle-badge--video">VIDEO</span>
                ) : null}
              </div>

              {/* Bottom-left: VERIFIED diagonal ribbon */}
              {profile.badges.includes("Verified") && (
                <div className="pdv-ribbon pdv-ribbon--verified pdv-ribbon--bottom-left">
                  <span>VERIFIED</span>
                </div>
              )}

              {/* Top-right: VIP diagonal ribbon */}
              {profile.badges.includes("VIP") && (
                <div className="pdv-ribbon pdv-ribbon--vip pdv-ribbon--top-right">
                  <span>VIP</span>
                </div>
              )}

              {/* Bottom-right: PREMIUM TOP gold ribbon */}
              {(profile.topBadge === "top" || profile.badges.includes("PREMIUM TOP")) && (
                <div className="pdv-ribbon pdv-ribbon--premium pdv-ribbon--bottom-right">
                  <span>PREMIUM</span>
                </div>
              )}

              {/* Online indicator */}
              <div className="pdv-online-pill">
                <span className="pdv-online-dot" />
                Online Now
              </div>

              {/* Zoom hint */}
              <div className="pdv-zoom-hint">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span>Click to zoom ({photoIndex + 1}/{gallery.length})</span>
              </div>
            </div>
          </div>

          {/* 6-Photo Thumbnail Gallery Grid */}
          {gallery.length > 1 && (
            <div className="pdv-gallery-container">
              <div className="pdv-thumbs-grid">
                {gallery.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    id={`thumb-${idx}`}
                    onClick={() => setPhotoIndex(idx)}
                    className={`pdv-thumb-item ${photoIndex === idx ? "pdv-thumb-item--active" : ""}`}
                    aria-label={`Select photo ${idx + 1}`}
                  >
                    <Image
                      src={photo}
                      alt={`${profile.name} photo ${idx + 1}`}
                      fill
                      sizes="120px"
                      className="pdv-thumb-img"
                      loading="lazy"
                    />
                    <span className="pdv-thumb-number">{idx + 1}</span>
                  </button>
                ))}
              </div>

              {/* Navigation Controls: Previous | Next | View Gallery */}
              <div className="pdv-gallery-nav-bar">
                <button
                  type="button"
                  id="btn-gallery-prev"
                  className="pdv-gallery-nav-btn"
                  onClick={handlePrevPhoto}
                  aria-label="Previous image"
                >
                  ‹ Previous
                </button>
                <button
                  type="button"
                  id="btn-gallery-view"
                  className="pdv-gallery-view-btn"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Open full gallery view"
                >
                  🔍 View Gallery ({photoIndex + 1}/{gallery.length})
                </button>
                <button
                  type="button"
                  id="btn-gallery-next"
                  className="pdv-gallery-nav-btn"
                  onClick={handleNextPhoto}
                  aria-label="Next image"
                >
                  Next ›
                </button>
              </div>
            </div>
          )}

          {/* Contact Card */}
          <div className="pdv-contact-box">
            <h3 className="pdv-contact-box__title">Contact {profile.name}</h3>
            <p className="pdv-contact-box__desc">Mention lovebite.com when contacting for VIP rate</p>

            <div className="pdv-contact-btns">
              <a
                href={`tel:${profile.phone}`}
                id="btn-call"
                className="pdv-cta-btn pdv-cta-btn--call"
                onClick={() => setPhoneRevealed(true)}
              >
                <span className="pdv-cta-icon">📞</span>
                <span className="pdv-cta-text">
                  <strong>Call Now</strong>
                  <span>{phoneRevealed ? profile.phone : "Show Phone Number"}</span>
                </span>
              </a>

              <a
                href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
                  `Hi ${profile.name}, I saw your profile on lovebite.com and would like to inquire about your availability.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-whatsapp"
                className="pdv-cta-btn pdv-cta-btn--wa"
              >
                <span className="pdv-cta-icon">💬</span>
                <span className="pdv-cta-text">
                  <strong>WhatsApp</strong>
                  <span>Instant Chat &amp; Booking</span>
                </span>
              </a>

              <a
                href={`https://t.me/${profile.telegram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-telegram"
                className="pdv-cta-btn pdv-cta-btn--tg"
              >
                <span className="pdv-cta-icon">✈️</span>
                <span className="pdv-cta-text">
                  <strong>Telegram</strong>
                  <span>{profile.telegram}</span>
                </span>
              </a>
            </div>

            {/* Quick action bar */}
            <div className="pdv-contact-actions">
              <button
                type="button"
                className="pdv-action-link"
                onClick={handleCopyPhone}
                id="btn-copy-phone"
              >
                {copied ? "✓ Number Copied!" : "📋 Copy Number"}
              </button>
              <button
                type="button"
                className="pdv-action-link"
                onClick={() => setReviewModalOpen(true)}
                id="btn-write-review"
              >
                ⭐ Write Review
              </button>
              <button
                type="button"
                className="pdv-action-link"
                onClick={() => setReportModalOpen(true)}
                id="btn-report-profile"
                style={{ color: "#ef4444" }}
              >
                🚩 Report
              </button>
            </div>
          </div>

          {/* Safety & Moderation Trust Notice */}
          <div className="pdv-verified-card">
            <div className="pdv-verified-card__icon">🛡️</div>
            <div className="pdv-verified-card__content">
              <strong>100% Real Photos Verified</strong>
              <p>Real photographs verified by India directory moderators in {profile.verifiedAt}.</p>
            </div>
          </div>

          {/* Trust & Safety Direct Report Box */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed #3f3f46", borderRadius: 8, padding: 12, marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
              Suspicious activity or stolen images?
            </span>
            <button
              type="button"
              onClick={() => setReportModalOpen(true)}
              style={{
                background: "none",
                border: "1px solid #ef4444",
                color: "#ef4444",
                fontSize: 11,
                fontWeight: 600,
                borderRadius: 4,
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              🚩 Report Profile
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════
            RIGHT COLUMN — Details, Attributes & Rates
            ══════════════════════════════════════ */}
        <div className="pdv-info-col">
          {/* Header Card */}
          <div className="pdv-profile-header">
            <div className="pdv-header-top">
              <div>
                <h1 className="pdv-name">
                  {profile.name}
                  {profile.badges.includes("Verified") && (
                    <span className="pdv-verified-check" title="Verified Profile">✓</span>
                  )}
                </h1>
                <p className="pdv-tagline">{profile.tagline}</p>
              </div>

              {/* Previous / Next profile navigation */}
              <div className="pdv-profile-nav">
                {prevId ? (
                  <Link href={`/profile/${prevId}`} className="pdv-nav-btn" title="Previous profile">
                    ‹ Prev
                  </Link>
                ) : (
                  <span className="pdv-nav-btn pdv-nav-btn--disabled">‹ Prev</span>
                )}
                <span className="pdv-nav-sep" />
                {nextId ? (
                  <Link href={`/profile/${nextId}`} className="pdv-nav-btn" title="Next profile">
                    Next ›
                  </Link>
                ) : (
                  <span className="pdv-nav-btn pdv-nav-btn--disabled">Next ›</span>
                )}
              </div>
            </div>

            {/* Meta Row: Views, Working Hours, Status */}
            <div className="pdv-meta-row">
              <span className="pdv-meta-item">
                <span className="pdv-meta-icon">👁</span>
                <strong>{profile.views.toLocaleString()}</strong> views
              </span>
              <span className="pdv-meta-dot">•</span>
              <span className="pdv-meta-item">
                <span className="pdv-meta-icon">🕒</span>
                {profile.workingHours}
              </span>
              <span className="pdv-meta-dot">•</span>
              <span className="pdv-meta-item pdv-meta-item--online">
                <span className="pdv-status-dot" />
                {profile.lastSeen || "Online today"}
              </span>
            </div>
          </div>

          {/* Full Two-Column Attribute Table */}
          <div className="pdv-card-section">
            <h2 className="pdv-card-section__title">Physical &amp; Personal Attributes</h2>
            <table className="pdv-attr-table">
              <tbody>
                {attrRows.map((row, i) => (
                  <tr key={i} className="pdv-attr-row">
                    <td className="pdv-attr-label">{row.label}</td>
                    <td className="pdv-attr-value">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rates Table (INR) */}
          <div className="pdv-card-section">
            <h2 className="pdv-card-section__title">Rates &amp; Pricing (INR)</h2>
            {(() => {
              const hasTwoTiers = profile.rates && profile.rates.some(
                (r) => r.outcall && r.outcall !== "—" && r.outcall.trim() !== "" && r.outcall !== r.incall
              );
              return (
                <div className="rates-table-wrap">
                  <table className="rates-table">
                    <thead>
                      <tr>
                        <th scope="col">Duration</th>
                        <th scope="col">{hasTwoTiers ? "Standard Rate" : "Rate (INR)"}</th>
                        {hasTwoTiers && <th scope="col">Premium Rate</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {profile.rates.map((rate, i) => (
                        <tr key={i}>
                          <td className="rate-duration">{rate.duration}</td>
                          <td className="rate-price">{rate.incall}</td>
                          {hasTwoTiers && (
                            <td className="rate-price rate-price--outcall rate-price--premium">{rate.outcall}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>

          {/* About Me */}
          <div className="pdv-card-section">
            <h2 className="pdv-card-section__title">About {profile.name}</h2>
            <div className="profile-about-text">
              {profile.about.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Services Checklist */}
          <div className="pdv-card-section">
            <h2 className="pdv-card-section__title">Services &amp; Specialities</h2>
            <div className="services-grid">
              {profile.services.map((svc, i) => (
                <div
                  key={i}
                  className={`service-item ${svc.available ? "service-item--available" : "service-item--unavailable"}`}
                >
                  <span className="service-icon">{svc.available ? "✓" : "✕"}</span>
                  <span className="service-name">{svc.name}</span>
                  {svc.extraCharge && (
                    <span className="service-extra">({svc.extraCharge})</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="pdv-card-section">
            <div className="reviews-header">
              <h2 className="pdv-card-section__title" style={{ margin: 0 }}>
                Verified Client Reviews ({reviews.length})
              </h2>
              <button
                type="button"
                className="btn-leave-review"
                onClick={() => setReviewModalOpen(true)}
              >
                + Write a Review
              </button>
            </div>

            {reviews.length === 0 ? (
              <p className="no-reviews-text">No reviews yet. Be the first to leave a verified review for {profile.name}!</p>
            ) : (
              <div className="reviews-list">
                {reviews.map((r) => (
                  <div key={r.id} className="review-card">
                    <div className="review-card__top">
                      <div className="review-author">
                        <span className="review-avatar">👤</span>
                        <div>
                          <strong>{r.author}</strong>
                          <span className="review-city"> in {r.city}</span>
                        </div>
                      </div>
                      <div className="review-meta">
                        <div className="review-stars">
                          {"★".repeat(r.rating)}
                          {"☆".repeat(5 - r.rating)}
                        </div>
                        <span className="review-date">{r.date}</span>
                      </div>
                    </div>
                    {r.verified && (
                      <span className="review-verified-badge">✓ Verified Meeting</span>
                    )}
                    <p className="review-comment">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Profiles Section */}
      {similarProfiles.length > 0 && (
        <section className="similar-section">
          <h3 className="similar-title">Similar Escorts in {profile.city}</h3>
          <div className="similar-grid">
            {similarProfiles.map((p) => (
              <Link key={p.id} href={`/profile/${p.id}`} className="similar-card">
                <div className="similar-card__img-wrap">
                  <Image
                    src={p.photoUrl || gallery[0]}
                    alt={p.name}
                    fill
                    sizes="180px"
                    className="similar-card__img"
                  />
                  {p.badges.includes("VIP") && (
                    <span className="similar-badge similar-badge--vip">VIP</span>
                  )}
                </div>
                <div className="similar-card__body">
                  <h4 className="similar-card__name">{p.name}</h4>
                  <p className="similar-card__loc">{p.location}</p>
                  <span className="similar-card__rate">{p.rates[0]?.incall} / hr</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Zoom / Full Gallery Modal */}
      {lightboxOpen && (
        <div className="lightbox-backdrop" onClick={() => setLightboxOpen(false)}>
          <button
            type="button"
            className="lightbox-close-btn"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close image zoom"
          >
            ✕
          </button>

          {/* Lightbox Navigation Buttons */}
          <button
            type="button"
            className="lightbox-nav-btn lightbox-nav-btn--prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevPhoto();
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>

          <button
            type="button"
            className="lightbox-nav-btn lightbox-nav-btn--next"
            onClick={(e) => {
              e.stopPropagation();
              handleNextPhoto();
            }}
            aria-label="Next photo"
          >
            ›
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <Image
              src={activePhoto}
              alt={`${profile.name} gallery photo ${photoIndex + 1}`}
              width={900}
              height={1100}
              priority
              style={{ objectFit: "contain", maxHeight: "82vh", maxWidth: "90vw" }}
            />
            <div className="lightbox-counter">
              Photo {photoIndex + 1} of {gallery.length} · {profile.name}
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="modal-backdrop" onClick={() => setReviewModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close-btn" onClick={() => setReviewModalOpen(false)}>✕</button>
            <h3 className="modal-title">Write a Review for {profile.name}</h3>
            <p className="modal-subtitle">Share your experience with other gentlemen. Authentic reviews only.</p>

            {reviewSubmitted ? (
              <div className="review-success-banner">🎉 Thank you! Your review has been submitted and verified.</div>
            ) : (
              <form onSubmit={handleSubmitReview} className="modal-form">
                <div className="modal-form-group">
                  <label className="modal-form-label">Your Nickname</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus_Gent"
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    className="modal-form-input"
                  />
                </div>
                <div className="modal-form-group">
                  <label className="modal-form-label">Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="modal-form-input"
                  >
                    <option value={5}>★★★★★ (5/5) Exceptional Experience</option>
                    <option value={4}>★★★★☆ (4/5) Very Good</option>
                    <option value={3}>★★★☆☆ (3/5) Average</option>
                  </select>
                </div>
                <div className="modal-form-group">
                  <label className="modal-form-label">Review Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe her appearance, attitude, massage, and overall experience..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="modal-form-textarea"
                  />
                </div>
                <button type="submit" className="modal-submit-btn">Submit Review</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Report Profile Modal */}
      <ReportModal
        profileId={profile.id}
        profileName={profile.name}
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />

      {/* Sticky Mobile Bar */}
      <div className="mobile-sticky-bar">
        <a href={`tel:${profile.phone}`} className="mobile-bar-btn mobile-bar-btn--call">📞 Call</a>
        <a
          href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
            `Hi ${profile.name}, saw your profile on lovebite.com.`
          )}`}
          target="_blank" rel="noopener noreferrer"
          className="mobile-bar-btn mobile-bar-btn--wa"
        >💬 WhatsApp</a>
        <a
          href={`https://t.me/${profile.telegram.replace("@", "")}`}
          target="_blank" rel="noopener noreferrer"
          className="mobile-bar-btn mobile-bar-btn--tg"
        >✈️ Telegram</a>
      </div>
    </div>
  );
}
