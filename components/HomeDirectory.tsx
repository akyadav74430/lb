"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import IndiaLocationSelector from "@/components/IndiaLocationSelector";
import LeftSidebar from "@/components/LeftSidebar";
import SidebarMobileWrapper from "@/components/SidebarMobileWrapper";
import { getAllProfiles, dbProfileToEscortProfile, EscortProfile } from "@/lib/profiles-data";

export default function HomeDirectory() {
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
            <h3 className="empty-state__title">
              No escorts found for this location or filter
            </h3>
            <p className="empty-state__text">
              Try selecting &ldquo;All India&rdquo; or clearing your location/category filters.
            </p>
            <Link href="/" className="btn-leave-review" style={{ display: "inline-block" }}>
              Show All India Profiles
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
                phone={p.phone}
                whatsapp={p.whatsapp}
                hidePhone={Boolean(p.isPhoneHidden || p.hidePhoneFromPublic)}
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
  );
}