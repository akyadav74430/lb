"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import Logo from "@/components/Logo";
import IndiaLocationSelector from "@/components/IndiaLocationSelector";
import LeftSidebar from "@/components/LeftSidebar";
import SidebarMobileWrapper from "@/components/SidebarMobileWrapper";
import { getAllProfiles, dbProfileToEscortProfile, EscortProfile } from "@/lib/profiles-data";

function MainDirectoryContent() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter") || "";
  const stateParam = searchParams.get("state") || "";
  const districtParam = searchParams.get("district") || "";
  const cityParam = searchParams.get("city") || "";
  const localAreaParam = searchParams.get("localArea") || "";

  const [activeGenderTab, setActiveGenderTab] = useState<"female" | "male" | "trans">("female");
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 12;

  const [allProfiles, setAllProfiles] = useState<EscortProfile[]>(() => getAllProfiles());

  useEffect(() => {
    let isMounted = true;
    fetch("/api/profiles?page=1")
      .then((r) => r.json())
      .then((data) => {
        if (isMounted && data.profiles && Array.isArray(data.profiles) && data.profiles.length > 0) {
          const dbMapped: EscortProfile[] = data.profiles.map(dbProfileToEscortProfile);
          setAllProfiles((prev) => {
            const dbIds = new Set(dbMapped.map((p) => p.id));
            const filteredPrev = prev.filter((p) => !dbIds.has(p.id));
            return [...dbMapped, ...filteredPrev];
          });
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter profiles based on Indian location params and category filters
  const filteredProfiles = useMemo(() => {
    return allProfiles.filter((p) => {
      // Gender tab
      if (p.gender !== activeGenderTab) return false;

      // URL Filter (vip, massages, etc.)
      if (filterParam === "vip" && !p.badges.includes("VIP") && p.topBadge !== "top") return false;
      if (filterParam === "massages" && p.category !== "massages") return false;
      if (filterParam === "citytour" && p.category !== "citytour") return false;
      if (filterParam === "videos" && !p.badges.includes("Video")) return false;
      if (filterParam === "boys" && p.gender !== "male") return false;
      if (filterParam === "trans" && p.gender !== "trans") return false;

      // Indian Location Filter
      if (stateParam && p.state && p.state.toLowerCase() !== stateParam.toLowerCase()) return false;
      if (districtParam && p.district && p.district.toLowerCase() !== districtParam.toLowerCase()) return false;
      if (cityParam && p.city.toLowerCase() !== cityParam.toLowerCase()) return false;
      if (localAreaParam && p.localArea && p.localArea.toLowerCase() !== localAreaParam.toLowerCase()) return false;

      return true;
    });
  }, [allProfiles, activeGenderTab, filterParam, stateParam, districtParam, cityParam, localAreaParam]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProfiles.length / profilesPerPage));
  const displayedProfiles = filteredProfiles.slice(
    (currentPage - 1) * profilesPerPage,
    currentPage * profilesPerPage
  );

  // Dynamic Page Title
  const dynamicTitle = useMemo(() => {
    if (localAreaParam && cityParam) return `${localAreaParam}, ${cityParam} Escorts`;
    if (cityParam) return `${cityParam} Escorts`;
    if (districtParam) return `${districtParam} Escorts`;
    if (stateParam) return `${stateParam} Escorts`;
    if (filterParam === "vip") return "VIP Escorts Directory India";
    if (filterParam === "massages") return "Sensual Massage & Wellness India";
    if (filterParam === "citytour") return "Escorts on City Tour";
    if (filterParam === "videos") return "Video Verified Indian Escorts";
    return "All India Escorts Directory";
  }, [localAreaParam, cityParam, districtParam, stateParam, filterParam]);

  const femaleCount = allProfiles.filter((p) => p.gender === "female").length;
  const maleCount = allProfiles.filter((p) => p.gender === "male").length;
  const transCount = allProfiles.filter((p) => p.gender === "trans").length;

  return (
    <>
      <div className="page-body">
        {/* LEFT SIDEBAR — Indian Location Nav */}
        <SidebarMobileWrapper>
          <LeftSidebar />
        </SidebarMobileWrapper>

        {/* MAIN CONTENT */}
        <main className="main-content">
          {/* Top Indian Location Filter Bar */}
          <IndiaLocationSelector />

          {/* Page Title */}
          <h1 className="page-title">{dynamicTitle}</h1>

          {/* Category Tabs */}
          <div className="category-tabs">
            <button
              className={`category-tab ${activeGenderTab === "female" ? "category-tab--active" : ""}`}
              type="button"
              onClick={() => {
                setActiveGenderTab("female");
                setCurrentPage(1);
              }}
            >
              Female escorts<span className="category-tab__count">({femaleCount})</span>
            </button>
            <button
              className={`category-tab ${activeGenderTab === "male" ? "category-tab--active" : ""}`}
              type="button"
              onClick={() => {
                setActiveGenderTab("male");
                setCurrentPage(1);
              }}
            >
              Male escorts<span className="category-tab__count">({maleCount})</span>
            </button>
            <button
              className={`category-tab ${activeGenderTab === "trans" ? "category-tab--active" : ""}`}
              type="button"
              onClick={() => {
                setActiveGenderTab("trans");
                setCurrentPage(1);
              }}
            >
              Trans escorts<span className="category-tab__count">({transCount})</span>
            </button>
          </div>

          {/* Profile Cards Grid */}
          {displayedProfiles.length === 0 ? (
            <div className="profiles-empty-state">
              <div style={{ fontSize: 36, marginBottom: 8 }}>🔍</div>
              <h3 style={{ fontSize: 18, color: "var(--text-heading)", marginBottom: 6 }}>
                No escorts found for this location or filter
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
                Try selecting &ldquo;All India&rdquo; or clearing your location/category filters.
              </p>
              <Link href="/" className="btn-leave-review" style={{ display: "inline-block" }}>
                🇮🇳 Show All India Profiles
              </Link>
            </div>
          ) : (
            <div className="profiles-grid">
              {displayedProfiles.map((p) => (
                <ProfileCard
                  key={p.id}
                  name={p.name}
                  location={`${p.city}${p.state ? `, ${p.state}` : ""}`}
                  photoUrl={p.photoUrl}
                  topBadge={p.topBadge}
                  badges={p.badges}
                  href={`/profile/${p.id}`}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className={`pagination__btn ${currentPage === 1 ? "pagination__btn--disabled" : ""}`}
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                «
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  className={`pagination__btn ${currentPage === num ? "pagination__btn--active" : ""}`}
                  type="button"
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
              <button
                className={`pagination__btn ${currentPage === totalPages ? "pagination__btn--disabled" : ""}`}
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-brand__logo">
                <Logo size="footer" />
              </div>
              <p className="footer-brand__desc">
                The premier verified adult directory and companion advertising platform.
                Find verified profiles in Odisha, Maharashtra, Delhi NCR, West Bengal, Karnataka, Goa, and all major cities on lovebite.com.
              </p>
              <div className="footer-social">
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer-social__link" aria-label="Twitter">𝕏</a>
                <a href="https://t.me/lovebite_Official" target="_blank" rel="noopener noreferrer" className="footer-social__link" aria-label="Telegram">✈</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social__link" aria-label="Instagram">📷</a>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col__title">Popular Cities</h4>
              <div className="footer-col__list">
                <Link href="/?city=Mumbai" className="footer-col__link">Mumbai</Link>
                <Link href="/?city=New Delhi" className="footer-col__link">Delhi NCR</Link>
                <Link href="/?city=Bangalore" className="footer-col__link">Bangalore</Link>
                <Link href="/?city=Kolkata" className="footer-col__link">Kolkata</Link>
                <Link href="/?state=Odisha&city=Cuttack City" className="footer-col__link">Cuttack</Link>
                <Link href="/?state=Odisha&city=Bhubaneswar" className="footer-col__link">Bhubaneswar</Link>
                <Link href="/?city=Hyderabad" className="footer-col__link">Hyderabad</Link>
                <Link href="/?city=Panaji" className="footer-col__link">Goa</Link>
                <Link href="/?city=Pune" className="footer-col__link">Pune</Link>
                <Link href="/?city=Jaipur" className="footer-col__link">Jaipur</Link>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col__title">Services</h4>
              <div className="footer-col__list">
                <Link href="/?filter=vip" className="footer-col__link">VIP Escorts</Link>
                <Link href="/?filter=massages" className="footer-col__link">Sensual Massage</Link>
                <Link href="/?filter=citytour" className="footer-col__link">City Tours</Link>
                <Link href="/?filter=agencies" className="footer-col__link">Agencies</Link>
                <Link href="/?filter=videos" className="footer-col__link">Video Verified</Link>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col__title">Information</h4>
              <div className="footer-col__list">
                <Link href="/about" className="footer-col__link">About Us</Link>
                <Link href="/advertise" className="footer-col__link">Advertise (INR)</Link>
                <Link href="/contact" className="footer-col__link">Contact</Link>
                <Link href="/faq" className="footer-col__link">FAQ</Link>
                <Link href="/reviews" className="footer-col__link">Reviews</Link>
                <Link href="/blacklist" className="footer-col__link">Blacklist</Link>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col__title">Legal</h4>
              <div className="footer-col__list">
                <Link href="/terms" className="footer-col__link">Terms of Service</Link>
                <Link href="/privacy" className="footer-col__link">Privacy Policy</Link>
                <Link href="/privacy" className="footer-col__link">Cookie Policy</Link>
                <Link href="/dmca" className="footer-col__link">DMCA Compliance</Link>
                <Link href="/dmca" className="footer-col__link">18+ Statement</Link>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2012–2026 lovebite.com. All rights reserved. 18+ Adult Directory.</span>
            <div className="footer-bottom__links">
              <Link href="/terms" className="footer-bottom__link">Terms</Link>
              <Link href="/privacy" className="footer-bottom__link">Privacy</Link>
              <Link href="/dmca" className="footer-bottom__link">DMCA</Link>
              <Link href="/" className="footer-bottom__link">All India Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "80vh" }} />}>
      <MainDirectoryContent />
    </Suspense>
  );
}
