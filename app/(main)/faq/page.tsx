"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  q: string;
  a: string;
  category: "clients" | "models" | "safety" | "advertising";
}

const FAQS: FAQItem[] = [
  {
    category: "clients",
    q: "How do I contact an escort on lovebite.live?",
    a: "Every escort profile provides direct contact details—such as phone number, WhatsApp link, and Telegram handle. You communicate directly with the companion or her direct booking assistant. There are no middleman fees paid to our directory.",
  },
  {
    category: "clients",
    q: "Are the photos real?",
    a: "Profiles with the green '✓ Verified' or 'Video' badge have submitted official photo timestamp proofs inspected by our staff. If you ever suspect a profile is using stolen or misleading photos, use the Report option on the profile to notify moderators immediately.",
  },
  {
    category: "clients",
    q: "Should I pay an advance deposit before meeting?",
    a: "NEVER pay advance booking deposits via bank transfer, gift cards, or UPI to unknown independent escorts. Independent companions accept payment in person when you meet. Advance fee requests are the #1 indicator of scammers.",
  },
  {
    category: "models",
    q: "How can I get my profile Verified?",
    a: "Sign up for an account, fill out your profile details, and click 'Verify Profile'. You will be asked to upload a quick selfie holding a handwritten note with your name and today's date. Verification is 100% free and takes less than 2 hours.",
  },
  {
    category: "models",
    q: "Can I hide my profile from certain countries or regions?",
    a: "Yes! In your profile edit panel, you can specify geo-blocking preferences to prevent users from your home region or certain IP ranges from viewing your photos.",
  },
  {
    category: "advertising",
    q: "What advertising options are available?",
    a: "We offer Top VIP Profile Pins, Header Mega Banners (970x90), Sidebar Ad Showcases, and Telegram Channel Broadcasts to 35,000+ members. Contact our team for instant quotes and packages.",
  },
  {
    category: "safety",
    q: "How does lovebite.live protect user privacy?",
    a: "We never store browsing history, logs of contact link clicks, or personal messages. All connections are secured via 256-bit TLS encryption.",
  },
];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<"all" | "clients" | "models" | "safety" | "advertising">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = activeTab === "all" ? FAQS : FAQS.filter((f) => f.category === activeTab);

  return (
    <main className="info-page-main">
      <div className="info-page-container">
        <nav className="profile-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/" className="profile-breadcrumb__link">Home</Link>
          <span className="profile-breadcrumb__sep">›</span>
          <span className="profile-breadcrumb__current">Frequently Asked Questions</span>
        </nav>

        <div className="info-page-hero">
          <h1 className="info-page-title">Frequently Asked Questions (FAQ)</h1>
          <p className="info-page-subtitle">
            Find answers to common questions about booking companions, verification, safety guidelines, and advertising on lovebite.live.
          </p>
        </div>

        {/* Category Pills */}
        <div className="faq-tabs-row">
          {[
            { id: "all", label: "All Questions" },
            { id: "clients", label: "For Clients" },
            { id: "models", label: "For Escorts & Models" },
            { id: "safety", label: "Safety & Scams" },
            { id: "advertising", label: "Advertising" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`faq-tab-pill ${activeTab === tab.id ? "faq-tab-pill--active" : ""}`}
              onClick={() => {
                setActiveTab(tab.id as "all" | "clients" | "models" | "safety" | "advertising");
                setOpenIndex(null);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="faq-accordion">
          {filtered.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-q-toggle">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer-body">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need more help banner */}
        <div className="faq-help-banner">
          <div className="faq-help-icon">💬</div>
          <div>
            <h4 className="faq-help-title">Still have questions?</h4>
            <p className="faq-help-desc">Our 24/7 customer support desk is ready to help via Telegram or email.</p>
          </div>
          <Link href="/contact" className="faq-help-btn">
            Contact Support →
          </Link>
        </div>
      </div>
    </main>
  );
}
