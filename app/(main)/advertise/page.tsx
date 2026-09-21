"use client";

import { useState } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/india-locations";

export default function AdvertisePage() {
  const [selectedFormat, setSelectedFormat] = useState("vip");
  const [duration, setDuration] = useState("1");
  const [city, setCity] = useState("Kolkata");
  const [state, setState] = useState("West Bengal");
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryWhatsapp, setInquiryWhatsapp] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const formats: Record<string, { title: string; pricePerMonth: number; desc: string; badge: string }> = {
    vip: {
      title: "Top VIP Profile Pin",
      pricePerMonth: 4999,
      desc: "Pinned to the first row of your chosen Indian state or city with glowing VIP border and verified badge.",
      badge: "Most Popular",
    },
    top_banner: {
      title: "Header Mega Banner (970x90)",
      pricePerMonth: 14999,
      desc: "Prime position at the top of every Indian directory page above category navigation.",
      badge: "Maximum Visibility",
    },
    sidebar_ad: {
      title: "Right Sidebar Premium Showcase",
      pricePerMonth: 7999,
      desc: "High-CTR animated card on the right desktop column, shown on all Indian city pages.",
      badge: "High Conversion",
    },
    city_priority: {
      title: "City Category Sponsor Slot",
      pricePerMonth: 2999,
      desc: "Featured slot with custom badge within your specific category tab across India.",
      badge: "Best Value",
    },
    telegram_blast: {
      title: "Telegram Channel Broadcast (35K+)",
      pricePerMonth: 1999,
      desc: "Dedicated announcement sent to our active Indian subscriber channel with direct WhatsApp links.",
      badge: "Instant Push",
    },
  };

  const currentFormat = formats[selectedFormat] || formats.vip;
  const months = parseInt(duration, 10);
  const discount = months >= 6 ? 0.2 : months >= 3 ? 0.1 : 0;
  const totalPrice = Math.round(currentFormat.pricePerMonth * months * (1 - discount));

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="info-page-main">
      <div className="info-page-container">
        {/* Breadcrumb */}
        <nav className="profile-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/" className="profile-breadcrumb__link">Home</Link>
          <span className="profile-breadcrumb__sep">›</span>
          <span className="profile-breadcrumb__current">Advertise in India (INR)</span>
        </nav>

        {/* Hero Header */}
        <div className="info-page-hero">
          <span className="ad-hero-tag">Media Kit &amp; Advertising 2026</span>
          <h1 className="info-page-title">Promote Your Escort Agency or Profile in India</h1>
          <p className="info-page-subtitle">
            Connect with over 2.8 million monthly verified clients across Mumbai, Delhi NCR, Bangalore, Kolkata, Odisha, Goa, and all Indian metropolitan areas.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="ad-stats-row">
          <div className="ad-stat-box">
            <span className="ad-stat-val">2.8M+</span>
            <span className="ad-stat-lbl">Monthly Active Visitors</span>
          </div>
          <div className="ad-stat-box">
            <span className="ad-stat-val">42M+</span>
            <span className="ad-stat-lbl">Monthly Pageviews</span>
          </div>
          <div className="ad-stat-box">
            <span className="ad-stat-val">85%</span>
            <span className="ad-stat-lbl">High-Intent Indian Traffic</span>
          </div>
          <div className="ad-stat-box">
            <span className="ad-stat-val">#1</span>
            <span className="ad-stat-lbl">lovebite.com Directory Ranking</span>
          </div>
        </div>

        {/* Ad Packages Grid */}
        <div className="ad-packages-section">
          <h2 className="ad-section-title">Available Advertising Placements (INR)</h2>
          <div className="ad-packages-grid">
            {Object.entries(formats).map(([key, item]) => (
              <div
                key={key}
                className={`ad-package-card ${selectedFormat === key ? "ad-package-card--selected" : ""}`}
                onClick={() => setSelectedFormat(key)}
              >
                {item.badge && <span className="ad-package-badge">{item.badge}</span>}
                <h3 className="ad-package-title">{item.title}</h3>
                <div className="ad-package-price">
                  <span className="ad-package-amount">{formatINR(item.pricePerMonth)}</span>
                  <span className="ad-package-period">/ month</span>
                </div>
                <p className="ad-package-desc">{item.desc}</p>
                <button
                  type="button"
                  className={`ad-select-btn ${selectedFormat === key ? "ad-select-btn--active" : ""}`}
                >
                  {selectedFormat === key ? "✓ Selected" : "Select Format"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Instant Cost Calculator */}
        <div className="ad-calculator-card">
          <h3 className="ad-calc-title">Instant Campaign Calculator &amp; Inquiry</h3>
          <div className="ad-calc-grid">
            <div className="ad-calc-controls">
              <div className="ad-calc-group">
                <label className="ad-calc-label">Chosen Placement</label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="ad-calc-select"
                >
                  {Object.entries(formats).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.title} ({formatINR(v.pricePerMonth)}/mo)
                    </option>
                  ))}
                </select>
              </div>

              <div className="ad-calc-group">
                <label className="ad-calc-label">Duration</label>
                <div className="ad-duration-pills">
                  {[
                    { val: "1", label: "1 Month" },
                    { val: "3", label: "3 Months (10% OFF)" },
                    { val: "6", label: "6 Months (20% OFF)" },
                  ].map((dur) => (
                    <button
                      key={dur.val}
                      type="button"
                      className={`duration-pill ${duration === dur.val ? "duration-pill--active" : ""}`}
                      onClick={() => setDuration(dur.val)}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ad-calc-group">
                <label className="ad-calc-label">Target State &amp; City in India</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="ad-calc-select"
                  >
                    <option value="All India">All India</option>
                    <option value="Odisha">Odisha</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Goa">Goa</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>

                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="ad-calc-select"
                  >
                    <option value="All Cities">All Cities</option>
                    <option value="Cuttack">Cuttack</option>
                    <option value="Bhubaneswar">Bhubaneswar</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="New Delhi">New Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Panaji (Goa)">Panaji (Goa)</option>
                    <option value="Pune">Pune</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Noida">Noida</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Price Output & Contact Form */}
            <div className="ad-calc-summary">
              <div className="ad-price-display">
                <div className="ad-price-breakdown">
                  <span>{currentFormat.title}</span>
                  <span>{formatINR(currentFormat.pricePerMonth)} × {duration} mo</span>
                </div>
                {discount > 0 && (
                  <div className="ad-price-discount">
                    <span>Campaign Discount</span>
                    <span className="ad-discount-val">-{discount * 100}%</span>
                  </div>
                )}
                <div className="ad-price-total">
                  <span>Total (INR):</span>
                  <span className="ad-total-num">{formatINR(totalPrice)}</span>
                </div>
              </div>

              {submitted ? (
                <div className="ad-inquiry-success">
                  <div style={{ fontSize: 32 }}>✅</div>
                  <h4 style={{ margin: "8px 0 4px", color: "var(--accent-green)" }}>Inquiry Received!</h4>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
                    Our India advertising team will contact you on WhatsApp/Email within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="ad-inquiry-form">
                  <input
                    type="text"
                    className="ad-form-input"
                    placeholder="Your Name / Agency Name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    className="ad-form-input"
                    placeholder="Email Address"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    className="ad-form-input"
                    placeholder="WhatsApp Number (e.g. +91 98300 12345)"
                    value={inquiryWhatsapp}
                    onChange={(e) => setInquiryWhatsapp(e.target.value)}
                    required
                  />
                  <button type="submit" className="ad-submit-btn">
                    Book Placement for {formatINR(totalPrice)} →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
