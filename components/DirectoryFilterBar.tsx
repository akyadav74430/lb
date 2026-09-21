"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const FILTER_DROPDOWNS = [
  { id: "age", label: "Age", options: ["18-21", "22-25", "26-30", "31-35", "36-40", "40+"] },
  { id: "hair", label: "Hair", options: ["Black", "Dark Brown", "Chestnut", "Brunette", "Blonde", "Red", "Other"] },
  { id: "rates", label: "Rates", options: ["₹1,500-2,500", "₹2,500-3,500", "₹3,500-5,000", "₹5,000+"] },
  { id: "breast", label: "Breast", options: ["Natural", "Small", "Medium", "Large", "Extra Large"] },
  { id: "travel", label: "Travel", options: ["Incall", "Outcall", "Both"] },
  { id: "weight", label: "Weight", options: ["40-50kg", "50-60kg", "60-70kg", "70-80kg", "80+kg"] },
  { id: "height", label: "Height", options: ["150-160cm", "160-170cm", "170-180cm", "180+cm"] },
  { id: "services", label: "Services", options: ["GFE", "Sensual Massage", "Nuru Massage", "Tantric", "Duo", "Dinner Date", "City Tour"] },
  { id: "ethnicity", label: "Eth / Nat", options: ["Indian", "North Indian", "South Indian", "East Indian", "Asian", "Mixed", "Exotic"] },
  { id: "languages", label: "Languages", options: ["English", "Hindi", "Bengali", "Marathi", "Telugu", "Tamil", "Gujarati", "Odia", "Punjabi", "French"] },
  { id: "preferences", label: "Preferences", options: ["Men", "Women", "Couples", "All"] },
];

const TOGGLE_FILTERS = [
  { id: "reviews", label: "With Reviews", count: null },
  { id: "verified", label: "Verified 🔒", count: null },
  { id: "newcomers", label: "Newcomers", count: null },
  { id: "videos", label: "With Videos 📹", count: null },
  { id: "independent", label: "Independent", count: null },
  { id: "vip", label: "VIP Only 🔥", count: null },
  { id: "duo", label: "Duo Sessions", count: null },
];

function DropdownItem({
  filter,
  openId,
  onToggle,
  isFirst,
  isLast,
}: {
  filter: typeof FILTER_DROPDOWNS[0];
  openId: string | null;
  onToggle: (id: string) => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isOpen = openId === filter.id;

  return (
    <div className={`filter-dropdown${isOpen ? " filter-dropdown--open" : ""}`} ref={ref}>
      <button
        className="filter-dropdown__trigger"
        onClick={() => onToggle(filter.id)}
        style={{
          ...(isFirst ? { borderRadius: "4px 0 0 4px" } : {}),
          ...(isLast ? { borderRight: "1px solid var(--border)", borderRadius: "0 4px 4px 0" } : {}),
        }}
        type="button"
      >
        {filter.label}
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path d="M4 6l4 4 4-4z" />
        </svg>
      </button>
      {isOpen && (
        <div className="filter-dropdown__panel">
          {filter.options.map((opt) => (
            <label key={opt} className="filter-dropdown__option">
              <input type="checkbox" />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DirectoryFilterBar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeToggles, setActiveToggles] = useState<Set<string>>(new Set());
  const barRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = useCallback((id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  }, []);

  const handleToggleFilter = useCallback((id: string) => {
    setActiveToggles((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="filter-bar" ref={barRef}>
      {/* Top row: Map button + dropdown filters */}
      <div className="filter-bar__top">
        <button className="filter-btn-map" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          India Incall Map
        </button>

        <div className="filter-dropdowns">
          {FILTER_DROPDOWNS.map((f, i) => (
            <DropdownItem
              key={f.id}
              filter={f}
              openId={openDropdown}
              onToggle={handleToggleDropdown}
              isFirst={i === 0}
              isLast={i === FILTER_DROPDOWNS.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Bottom row: toggle pills */}
      <div className="filter-toggles">
        {TOGGLE_FILTERS.map((t) => (
          <button
            key={t.id}
            className={`filter-toggle${activeToggles.has(t.id) ? " filter-toggle--active" : ""}`}
            onClick={() => handleToggleFilter(t.id)}
            type="button"
          >
            <span className="filter-toggle__dot" />
            {t.label}
            {t.count !== null && (
              <span className="filter-toggle__count">({t.count})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
