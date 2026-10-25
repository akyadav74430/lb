"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import IndiaLocationSelector from "@/components/IndiaLocationSelector";
import LeftSidebar from "@/components/LeftSidebar";
import SidebarMobileWrapper from "@/components/SidebarMobileWrapper";
import { EscortProfile } from "@/lib/profiles-types";

interface HomeDirectoryClientProps {
  initialProfiles: EscortProfile[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  searchParams: {
    filter?: string;
    state?: string;
    district?: string;
    city?: string;
    localArea?: string;
    page?: string;
  };
}

export function HomeDirectoryClient({
  initialProfiles,
  totalCount,
  totalPages,
  currentPage,
  searchParams,
}: HomeDirectoryClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const nextSearchParams = useSearchParams();

  const [profiles, setProfiles] = useState<EscortProfile[]>(initialProfiles);
  const [page, setPage] = useState(currentPage);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedTotalCount, setDisplayedTotalCount] = useState(totalCount);
  const [displayedTotalPages, setDisplayedTotalPages] = useState(totalPages);

  // Dynamic Page Title
  const dynamicTitle = useMemo(() => {
    const sp = nextSearchParams;
    const localAreaParam = sp.get("localArea") || "";
    const cityParam = sp.get("city") || "";
    const districtParam = sp.get("district") || "";
    const stateParam = sp.get("state") || "";
    const filterParam = sp.get("filter") || "";

    if (localAreaParam && cityParam) return `${localAreaParam}, ${cityParam} Escorts`;
    if (cityParam) return `${cityParam} Escorts`;
    if (districtParam) return `${districtParam} Escorts`;
    if (stateParam) return `${stateParam} Escorts`;
    if (filterParam === "vip") return "VIP Escorts Directory India";
    if (filterParam === "massages") return "Sensual Massage & Wellness India";
    return "Call Girls in India — Verified Escorts & Companions";
  }, [nextSearchParams]);

  // Update local state when URL changes (e.g., filter changes)
  useEffect(() => {
    const sp = nextSearchParams;
    const newPage = sp.get("page") ? parseInt(sp.get("page")!, 10) : 1;
    if (newPage !== page) {
      setPage(newPage);
    }
  }, [nextSearchParams, page]);

  // Fetch profiles when page changes (client-side pagination)
  const fetchProfiles = async (newPage: number) => {
    setIsLoading(true);
    try {
      const sp = nextSearchParams;
      const params = new URLSearchParams();
      sp.forEach((value, key) => params.set(key, value));
      params.set("page", String(newPage));

      const response = await fetch(`/api/profiles/paginated?${params.toString()}`);

      if (response.ok) {
        const data = await response.json();
        setProfiles(data.profiles);
        setDisplayedTotalCount(data.totalCount);
        setDisplayedTotalPages(data.totalPages);
        setPage(newPage);
      }
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter changes - navigate with new params
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(nextSearchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // Reset to page 1 on filter change
    router.push(`${pathname}?${params.toString()}`);
  };

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
        <h1 className="page-title" id="page-title">{dynamicTitle}</h1>

        {/* Profile Cards Grid */}
        {profiles.length === 0 ? (
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
          <>
            <div className="profiles-grid" aria-live="polite">
              {profiles.map((p, index) => (
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
                  priority={index < 4}
                  isPotentialLcp={index === 0}
                />
              ))}
            </div>

            {/* Loading indicator for pagination */}
            {isLoading && (
              <div className="pagination-loading" style={{ textAlign: "center", padding: "20px" }}>
                <div className="spinner" style={{ display: "inline-block", width: "24px", height: "24px", border: "3px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "k-rotate 0.6s linear infinite" }} />
              </div>
            )}

            {/* Pagination */}
            {displayedTotalPages > 1 && (
              <div className="pagination">
                <button
                  className={`pagination__btn ${page === 1 ? "pagination__btn--disabled" : ""}`}
                  type="button"
                  onClick={() => fetchProfiles(page - 1)}
                  disabled={page === 1 || isLoading}
                >
                  «
                </button>
                {Array.from({ length: displayedTotalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    className={`pagination__btn ${page === num ? "pagination__btn--active" : ""}`}
                    type="button"
                    onClick={() => fetchProfiles(num)}
                    disabled={isLoading}
                  >
                    {num}
                  </button>
                ))}
                <button
                  className={`pagination__btn ${page === displayedTotalPages ? "pagination__btn--disabled" : ""}`}
                  type="button"
                  onClick={() => fetchProfiles(page + 1)}
                  disabled={page === displayedTotalPages || isLoading}
                >
                  »
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}