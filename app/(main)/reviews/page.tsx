"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllProfiles } from "@/lib/profiles-data";

interface ReviewItem {
  id: string;
  profileId: string;
  profileName: string;
  profilePhoto: string;
  profileLocation: string;
  author: string;
  rating: number;
  date: string;
  city: string;
  verified: boolean;
  comment: string;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    profileId: "1",
    profileName: "Saloni Nandi",
    profilePhoto: "/profiles/saloni.jpg",
    profileLocation: "Escorts Kolkata",
    author: "Markus_EXP",
    rating: 5,
    date: "September 14, 2026",
    city: "Kolkata",
    verified: true,
    comment:
      "Saloni is even more gorgeous in person than her pictures. Extremely polite, speaks fluent English, and her massage was incredible. Total GFE experience without any clock-watching. Highly recommended for gentlemen who appreciate class.",
  },
  {
    id: "rev-2",
    profileId: "2",
    profileName: "Ipshita",
    profilePhoto: "/profiles/ipshita.jpg",
    profileLocation: "Escorts Kolkata",
    author: "Alex_Traveller",
    rating: 5,
    date: "September 11, 2026",
    city: "Kolkata",
    verified: true,
    comment:
      "Ipshita is a sweetheart! Sparkling personality, gorgeous natural figure, and great conversation. We had a lovely dinner in Salt Lake followed by unhurried intimacy. 10/10 hygiene and beauty.",
  },
  {
    id: "rev-3",
    profileId: "3",
    profileName: "Piya",
    profilePhoto: "/profiles/piya.jpg",
    profileLocation: "Escorts Kolkata",
    author: "Robert_L",
    rating: 5,
    date: "September 02, 2026",
    city: "Kolkata",
    verified: true,
    comment:
      "Piya is pure luxury. Elegant, intelligent, speaking multiple languages fluently. Spent an entire evening together and every minute was flawless. Worth every rupee.",
  },
  {
    id: "rev-4",
    profileId: "1",
    profileName: "Saloni Nandi",
    profilePhoto: "/profiles/saloni.jpg",
    profileLocation: "Escorts Kolkata",
    author: "Dev_K",
    rating: 5,
    date: "August 29, 2026",
    city: "Kolkata",
    verified: true,
    comment:
      "Booked a 2-hour incall at her luxury apartment in South Kolkata. She made me feel at ease immediately. Sensual touch and incredible massage. True independent companion.",
  },
  {
    id: "rev-5",
    profileId: "7",
    profileName: "Rhea Sen",
    profilePhoto: "/profiles/saloni.jpg",
    profileLocation: "Escorts Kolkata",
    author: "David_C",
    rating: 5,
    date: "September 08, 2026",
    city: "Kolkata",
    verified: true,
    comment:
      "Her video verified badge was the reason I booked, and she looked 100% identical to the clips. Flawless skin and enthusiastic lovemaking. Will return soon.",
  },
  {
    id: "rev-6",
    profileId: "8",
    profileName: "Priya Sharma",
    profilePhoto: "/profiles/ipshita.jpg",
    profileLocation: "Escorts Kolkata",
    author: "Sunil_T",
    rating: 5,
    date: "September 12, 2026",
    city: "Kolkata",
    verified: true,
    comment:
      "Priya is delightful! Super sweet, completely down to earth, zero attitude. Felt like having a real affectionate girlfriend over. Outstanding experience.",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [models] = useState(getAllProfiles());
  const [formModel, setFormModel] = useState("1");
  const [formAuthor, setFormAuthor] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      r.profileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = ratingFilter === "all" || r.rating === parseInt(ratingFilter, 10);
    return matchesSearch && matchesRating;
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor.trim() || !formComment.trim()) return;

    const chosen = models.find((m) => m.id === formModel) || models[0];
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      profileId: chosen.id,
      profileName: chosen.name,
      profilePhoto: chosen.photoUrl,
      profileLocation: chosen.location,
      author: formAuthor.trim(),
      rating: formRating,
      date: "Just now",
      city: chosen.city,
      verified: true,
      comment: formComment.trim(),
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setFormAuthor("");
      setFormComment("");
    }, 1200);
  };

  return (
    <main className="info-page-main">
      <div className="info-page-container">
        {/* Breadcrumb */}
        <nav className="profile-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/" className="profile-breadcrumb__link">Home</Link>
          <span className="profile-breadcrumb__sep">›</span>
          <span className="profile-breadcrumb__current">Client Reviews</span>
        </nav>

        {/* Hero */}
        <div className="reviews-hero-row">
          <div>
            <h1 className="info-page-title">Verified Escort Reviews</h1>
            <p className="info-page-subtitle">
              Authentic, uncensored experiences shared by verified gentlemen on lovebite.com.
            </p>
          </div>
          <button
            type="button"
            className="btn-leave-review btn-leave-review--hero"
            onClick={() => setModalOpen(true)}
          >
            ✍️ Submit a Review
          </button>
        </div>

        {/* Filter Bar */}
        <div className="reviews-filter-bar">
          <div className="reviews-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by escort name, city, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="reviews-search-input"
            />
          </div>

          <div className="reviews-rating-filter">
            <label className="rating-filter-label">Filter Rating:</label>
            <div className="rating-pills">
              {["all", "5", "4"].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  className={`rating-pill ${ratingFilter === rate ? "rating-pill--active" : ""}`}
                  onClick={() => setRatingFilter(rate)}
                >
                  {rate === "all" ? "All Stars" : `${rate} ★ Only`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-feed">
          {filtered.length === 0 ? (
            <div className="reviews-empty">
              <p>No reviews match your search. Try different keywords or clear filters.</p>
            </div>
          ) : (
            filtered.map((rev) => (
              <div key={rev.id} className="review-feed-card">
                <div className="review-feed-card__header">
                  {/* Escort badge & link */}
                  <Link href={`/profile/${rev.profileId}`} className="review-model-link">
                    <div className="review-model-avatar">
                      <Image
                        src={rev.profilePhoto}
                        alt={rev.profileName}
                        width={50}
                        height={50}
                        className="review-model-img"
                      />
                    </div>
                    <div>
                      <div className="review-model-name">
                        {rev.profileName}
                        <span className="review-model-arrow">→</span>
                      </div>
                      <div className="review-model-loc">{rev.profileLocation}</div>
                    </div>
                  </Link>

                  {/* Rating Stars */}
                  <div className="review-feed-rating">
                    <span className="stars-glow">{"★".repeat(rev.rating)}</span>
                    <span className="review-feed-score">{rev.rating}.0</span>
                  </div>
                </div>

                <p className="review-feed-text">“{rev.comment}”</p>

                <div className="review-feed-card__footer">
                  <div className="reviewer-info">
                    <span className="reviewer-name">{rev.author}</span>
                    {rev.verified && <span className="verified-pill">✓ Verified Client</span>}
                  </div>
                  <div className="reviewer-meta">{rev.date} • {rev.city}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Write Review Modal */}
        {modalOpen && (
          <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
              <h3 className="modal-title">Share Your Review</h3>
              <p className="modal-subtitle">
                Help fellow gentlemen choose the right companion. Real feedback only.
              </p>

              {submitted ? (
                <div className="review-success-banner">
                  🎉 Thank you! Your review has been submitted and published.
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="modal-form">
                  <div className="modal-form-group">
                    <label className="modal-form-label">Select Escort *</label>
                    <select
                      value={formModel}
                      onChange={(e) => setFormModel(e.target.value)}
                      className="modal-form-input"
                    >
                      {models.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.city})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-form-label">Your Nickname *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. VIP_Member"
                      value={formAuthor}
                      onChange={(e) => setFormAuthor(e.target.value)}
                      className="modal-form-input"
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-form-label">Rating *</label>
                    <select
                      value={formRating}
                      onChange={(e) => setFormRating(Number(e.target.value))}
                      className="modal-form-input"
                    >
                      <option value={5}>★★★★★ (5 Stars - Outstanding)</option>
                      <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                      <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                    </select>
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-form-label">Review Details *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe the meeting, hygiene, services delivered, and overall atmosphere..."
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      className="modal-form-textarea"
                    />
                  </div>

                  <button type="submit" className="modal-submit-btn">
                    Submit Review Now
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
