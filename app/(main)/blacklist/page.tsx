"use client";

import { useState } from "react";
import Link from "next/link";

interface BlacklistEntry {
  id: string;
  phoneOrContact: string;
  type: "Fake Advance Scam" | "No-Show / Time Waster" | "Blackmail / Extortion" | "Stolen Photos";
  city: string;
  dateReported: string;
  description: string;
  verifiedFraud: boolean;
}

const INITIAL_BLACKLIST: BlacklistEntry[] = [
  {
    id: "bl-1",
    phoneOrContact: "+91 98712 34567 / Telegram: @fake_deposit_kol",
    type: "Fake Advance Scam",
    city: "Kolkata",
    dateReported: "September 12, 2026",
    description: "Demands 2,000 INR advance hotel booking fee via UPI and blocks client immediately. Not an authentic escort. Never pay advance fees for independent escorts without in-person verification.",
    verifiedFraud: true,
  },
  {
    id: "bl-2",
    phoneOrContact: "+91 98200 99112 / WhatsApp",
    type: "Stolen Photos",
    city: "Mumbai / Kolkata",
    dateReported: "September 08, 2026",
    description: "Using pictures of Russian Instagram influencer pretending to offer in-call services in South Kolkata. Profile was reported and permanently removed.",
    verifiedFraud: true,
  },
  {
    id: "bl-3",
    phoneOrContact: "+44 7700 900123 / Fake Agency",
    type: "Fake Advance Scam",
    city: "London / International",
    dateReported: "August 30, 2026",
    description: "Sends fake WhatsApp confirmations asking for crypto deposits to release hotel room numbers. Pure phishing scam.",
    verifiedFraud: true,
  },
  {
    id: "bl-4",
    phoneOrContact: "+91 97110 55432 / Client Alias 'Rajiv'",
    type: "No-Show / Time Waster",
    city: "Kolkata",
    dateReported: "August 24, 2026",
    description: "Repeatedly makes outcall appointments at fake hotel addresses, wasting escort's travel time and safety.",
    verifiedFraud: true,
  },
];

export default function BlacklistPage() {
  const [entries, setEntries] = useState<BlacklistEntry[]>(INITIAL_BLACKLIST);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [reportedNumber, setReportedNumber] = useState("");
  const [reportedType, setReportedType] = useState<BlacklistEntry["type"]>("Fake Advance Scam");
  const [reportedCity, setReportedCity] = useState("Kolkata");
  const [reportedDesc, setReportedDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filtered = entries.filter(
    (e) =>
      e.phoneOrContact.toLowerCase().includes(search.toLowerCase()) ||
      e.city.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportedNumber.trim() || !reportedDesc.trim()) return;

    const newEntry: BlacklistEntry = {
      id: `bl-${Date.now()}`,
      phoneOrContact: reportedNumber.trim(),
      type: reportedType,
      city: reportedCity,
      dateReported: "Just now",
      description: reportedDesc.trim(),
      verifiedFraud: false,
    };

    setEntries([newEntry, ...entries]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setReportedNumber("");
      setReportedDesc("");
    }, 1200);
  };

  return (
    <main className="info-page-main">
      <div className="info-page-container">
        {/* Breadcrumb */}
        <nav className="profile-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/" className="profile-breadcrumb__link">Home</Link>
          <span className="profile-breadcrumb__sep">›</span>
          <span className="profile-breadcrumb__current">Safety &amp; Blacklist Registry</span>
        </nav>

        {/* Hero */}
        <div className="blacklist-hero">
          <div className="blacklist-badge-pill">🛡️ Community Fraud Defense</div>
          <h1 className="info-page-title">Community Scam &amp; Fraud Blacklist</h1>
          <p className="info-page-subtitle">
            A public safety registry maintained by lovebite.com moderators to protect escorts, agencies, and genuine clients from advance fee fraudsters and abusive individuals.
          </p>
          <div className="blacklist-cta-row">
            <button
              type="button"
              className="blacklist-report-btn"
              onClick={() => setModalOpen(true)}
            >
              🚨 Report a Scammer / Fake Profile
            </button>
          </div>
        </div>

        {/* Golden Safety Rules Card */}
        <div className="safety-rules-card">
          <h3 className="safety-rules-title">⚠️ 4 Essential Rules to Prevent Escort Scams:</h3>
          <div className="safety-rules-grid">
            <div className="safety-rule-item">
              <span className="safety-num">1</span>
              <div>
                <strong>Never Pay Advance Fees</strong>
                <p>Legitimate independent escorts accept cash or immediate payment upon in-person arrival. Never wire money, gift cards, or UPI advances beforehand.</p>
              </div>
            </div>
            <div className="safety-rule-item">
              <span className="safety-num">2</span>
              <div>
                <strong>Look for the Verified Badge</strong>
                <p>Profiles marked with <strong>✓ Verified</strong> have submitted real photo timestamps and ID to our moderator team.</p>
              </div>
            </div>
            <div className="safety-rule-item">
              <span className="safety-num">3</span>
              <div>
                <strong>Direct WhatsApp / Phone Verification</strong>
                <p>Always request a quick 10-second voice note or casual selfie via WhatsApp before traveling to an unfamiliar outcall.</p>
              </div>
            </div>
            <div className="safety-rule-item">
              <span className="safety-num">4</span>
              <div>
                <strong>Meet in Safe, Public Venues</strong>
                <p>For initial meetings, 4-star or 5-star hotel lobbies and reputable lounges guarantee maximum security for both parties.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Blacklist */}
        <div className="blacklist-search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search blacklist by phone number, WhatsApp, Telegram, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="blacklist-search-input"
          />
        </div>

        {/* Blacklist Items */}
        <div className="blacklist-feed">
          {filtered.length === 0 ? (
            <div className="reviews-empty">
              <p>No blacklist entries match your search.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div key={item.id} className="blacklist-item-card">
                <div className="blacklist-card-top">
                  <div>
                    <span className="blacklist-contact-val">{item.phoneOrContact}</span>
                    <div className="blacklist-meta-row">
                      <span className="blacklist-city-pill">{item.city}</span>
                      <span className="blacklist-date">{item.dateReported}</span>
                    </div>
                  </div>
                  <div className="blacklist-status-col">
                    <span className="blacklist-type-pill">{item.type}</span>
                    {item.verifiedFraud ? (
                      <span className="fraud-confirmed-badge">🛑 Confirmed Fraud</span>
                    ) : (
                      <span className="fraud-pending-badge">⏳ Under Review</span>
                    )}
                  </div>
                </div>
                <p className="blacklist-desc">{item.description}</p>
              </div>
            ))
          )}
        </div>

        {/* Report Scammer Modal */}
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
              <h3 className="modal-title">Report a Scammer or Fake Profile</h3>
              <p className="modal-subtitle">
                Reports are verified by our trust &amp; safety team within 12 hours.
              </p>

              {submitted ? (
                <div className="review-success-banner">
                  🛡️ Report recorded. Thank you for helping keep the lovebite.com community safe!
                </div>
              ) : (
                <form onSubmit={handleReport} className="modal-form">
                  <div className="modal-form-group">
                    <label className="modal-form-label">Phone Number / WhatsApp / Telegram *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +91 98000 00000 or @scam_handle"
                      value={reportedNumber}
                      onChange={(e) => setReportedNumber(e.target.value)}
                      className="modal-form-input"
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-form-label">Fraud Category *</label>
                    <select
                      value={reportedType}
                      onChange={(e) => setReportedType(e.target.value as BlacklistEntry["type"])}
                      className="modal-form-input"
                    >
                      <option value="Fake Advance Scam">Fake Advance Fee Scam</option>
                      <option value="Stolen Photos">Stolen / Fake Photos</option>
                      <option value="No-Show / Time Waster">No-Show / Time Waster</option>
                      <option value="Blackmail / Extortion">Blackmail / Extortion</option>
                    </select>
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-form-label">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kolkata, Delhi, Barcelona..."
                      value={reportedCity}
                      onChange={(e) => setReportedCity(e.target.value)}
                      className="modal-form-input"
                    />
                  </div>

                  <div className="modal-form-group">
                    <label className="modal-form-label">Incident Description &amp; Proof *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe what happened, payment handles requested, fake hotel details, or stolen image sources..."
                      value={reportedDesc}
                      onChange={(e) => setReportedDesc(e.target.value)}
                      className="modal-form-textarea"
                    />
                  </div>

                  <button type="submit" className="modal-submit-btn">
                    Submit Blacklist Report
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
