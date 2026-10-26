"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { INDIA_LOCATIONS } from "@/lib/india-locations";
import { citySlug } from "@/lib/seo/site";

interface SidebarCounts {
  states: Array<{ name: string; count: number }>;
  cities: Array<{ name: string; count: number; state: string }>;
}

export default function LeftSidebar() {
  const searchParams = useSearchParams();
  const activeState = searchParams.get("state") || "";
  const activeCity = searchParams.get("city") || "";

  const [searchQuery, setSearchQuery] = useState("");
  // Only expand active state by default, or first state if none active
  // This significantly reduces initial DOM nodes
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    if (activeState) {
      initial[activeState] = true;
    }
    return initial;
  });
  const [sidebarData, setSidebarData] = useState<SidebarCounts>({ states: [], cities: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/profiles/sidebar")
      .then((res) => res.json())
      .then((data) => {
        if (mounted) {
          setSidebarData(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Build lookup maps for quick access
  const profileCounts = useMemo(() => {
    const stateCounts: Record<string, number> = {};
    const cityCounts: Record<string, number> = {};

    for (const s of sidebarData.states) {
      stateCounts[s.name] = s.count;
    }
    for (const c of sidebarData.cities) {
      cityCounts[c.name] = c.count;
    }
    return { stateCounts, cityCounts };
  }, [sidebarData]);

  const toggleState = (stateName: string) => {
    setExpandedStates((prev) => ({
      ...prev,
      [stateName]: !prev[stateName],
    }));
  };

  // Filtered states and their cities based on search
  const filteredStates = useMemo(() => {
    if (!searchQuery.trim()) return INDIA_LOCATIONS;
    const q = searchQuery.toLowerCase().trim();

    return INDIA_LOCATIONS.filter((s) => {
      if (s.name.toLowerCase().includes(q)) return true;
      return s.districts.some((d) => {
        if (d.name.toLowerCase().includes(q)) return true;
        return d.cities.some((c) => c.name.toLowerCase().includes(q));
      });
    });
  }, [searchQuery]);

  const isAllIndiaActive = !activeState && !activeCity;
  const totalProfiles = sidebarData.states.reduce((sum, s) => sum + s.count, 0);

  if (isLoading) {
    return (
      <aside className="sidebar-left" id="sidebar-left">
        <div className="sidebar-search">
          <div className="sidebar-search__box">
            <input
              type="text"
              className="sidebar-search__input"
              placeholder="Search Indian city or state…"
              disabled
              aria-label="Search Indian locations"
            />
          </div>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section__title"><span>🇮🇳 Indian States & Cities</span></div>
          <div className="sidebar-loading">Loading…</div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="sidebar-left" id="sidebar-left">
      {/* Search Input */}
      <div className="sidebar-search">
        <div className="sidebar-search__box">
          <input
            type="text"
            className="sidebar-search__input"
            placeholder="Search Indian city or state…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search Indian locations"
          />
          <span className="sidebar-search__btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        </div>
      </div>

      {/* All India Reset Option */}
      <div className="sidebar-all-india">
        <Link
          href="/"
          className={`sidebar-all-india__btn ${isAllIndiaActive ? "sidebar-all-india__btn--active" : ""}`}
        >
          <span className="sidebar-all-india__flag">🇮🇳</span>
          <span className="sidebar-all-india__text">All India Directory</span>
          <span className="sidebar-all-india__count">({totalProfiles})</span>
        </Link>
      </div>

      {/* Indian States & Cities Navigation */}
      <div className="sidebar-section">
        <div className="sidebar-section__title">
          <span>🇮🇳 Indian States & Cities</span>
        </div>

        <div className="india-state-list">
          {filteredStates.map((state) => {
            const isStateActive = activeState.toLowerCase() === state.name.toLowerCase();
            const isExpanded = searchQuery ? true : Boolean(expandedStates[state.name]);
            const count = profileCounts.stateCounts[state.name] || 0;

            // Collect all unique cities for this state
            const stateCities: { name: string; count: number }[] = [];
            for (const d of state.districts) {
              for (const c of d.cities) {
                if (!stateCities.some((sc) => sc.name === c.name)) {
                  stateCities.push({
                    name: c.name,
                    count: profileCounts.cityCounts[c.name] || 0,
                  });
                }
              }
            }

            return (
              <div key={state.name} className="india-state-item">
                <div className={`india-state-header ${isStateActive ? "india-state-header--active" : ""}`}>
                  <button
                    type="button"
                    className="india-state-toggle"
                    onClick={() => toggleState(state.name)}
                    aria-label={`Toggle ${state.name} cities`}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className={`india-state-arrow ${isExpanded ? "india-state-arrow--open" : ""}`}
                    >
                      <path d="M4 6l4 4 4-4z" />
                    </svg>
                  </button>

                  <Link
                    href={`/locations/${citySlug(state.name)}`}
                    className="india-state-link"
                  >
                    <span className="india-state-name">{state.name}</span>
                    {count > 0 && <span className="india-state-count">({count})</span>}
                  </Link>
                </div>

                {/* City Sub-list */}
                {isExpanded && stateCities.length > 0 && (
                  <div className="india-city-sublist">
                    {stateCities.map((c) => {
                      const isCityActive = activeCity.toLowerCase() === c.name.toLowerCase();
                      return (
                        <Link
                          key={c.name}
                          href={`/?state=${encodeURIComponent(state.name)}&city=${encodeURIComponent(c.name)}`}
                          className={`india-city-link ${isCityActive ? "india-city-link--active" : ""}`}
                        >
                          <span className="india-city-dot">•</span>
                          <span className="india-city-name">{c.name}</span>
                          {c.count > 0 && <span className="india-city-count">({c.count})</span>}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
