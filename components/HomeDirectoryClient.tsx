"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import { EscortProfile } from "@/lib/profiles-types";

interface HomeDirectoryClientProps {
  initialProfiles: EscortProfile[];
  totalPages: number;
  currentPage: number;
}

export function HomeDirectoryClient({
  initialProfiles,
  totalPages,
  currentPage,
}: HomeDirectoryClientProps) {
  const nextSearchParams = useSearchParams();

  const [profiles, setProfiles] = useState<EscortProfile[]>(initialProfiles);
  const [page, setPage] = useState(currentPage);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedTotalPages, setDisplayedTotalPages] = useState(totalPages);

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
        setDisplayedTotalPages(data.totalPages);
        setPage(newPage);
      }
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
    </>
  );
}
