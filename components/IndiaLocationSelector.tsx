"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getAllStates,
  getDistrictsForState,
  getCitiesForDistrict,
  getLocalAreas,
  searchIndiaLocations,
  SearchableLocation,
} from "@/lib/india-locations";

interface IndiaLocationSelectorProps {
  onLocationChange?: (loc: { state?: string; district?: string; city?: string; localArea?: string }) => void;
  compact?: boolean;
}

export default function IndiaLocationSelector({ onLocationChange, compact = false }: IndiaLocationSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedState = searchParams.get("state") || "";
  const selectedDistrict = searchParams.get("district") || "";
  const selectedCity = searchParams.get("city") || "";
  const selectedLocalArea = searchParams.get("localArea") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Derived lists
  const states = useMemo(() => getAllStates(), []);
  const districts = useMemo(() => (selectedState ? getDistrictsForState(selectedState) : []), [selectedState]);
  const cities = useMemo(() => {
    if (selectedState && selectedDistrict) {
      return getCitiesForDistrict(selectedState, selectedDistrict);
    }
    return [];
  }, [selectedState, selectedDistrict]);

  const localAreas = useMemo(() => {
    if (selectedState && selectedDistrict && selectedCity) {
      return getLocalAreas(selectedState, selectedDistrict, selectedCity);
    }
    return [];
  }, [selectedState, selectedDistrict, selectedCity]);

  // Search results
  const searchResults = useMemo(() => searchIndiaLocations(searchQuery), [searchQuery]);

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pushLocation = (params: { state?: string; district?: string; city?: string; localArea?: string }) => {
    const url = new URLSearchParams(searchParams.toString());

    if (params.state) url.set("state", params.state);
    else url.delete("state");

    if (params.district) url.set("district", params.district);
    else url.delete("district");

    if (params.city) url.set("city", params.city);
    else url.delete("city");

    if (params.localArea) url.set("localArea", params.localArea);
    else url.delete("localArea");

    // Clean up country if previously set
    url.delete("country");

    if (onLocationChange) {
      onLocationChange(params);
    }

    const queryStr = url.toString();
    router.push(queryStr ? `/?${queryStr}` : "/");
  };

  const handleStateChange = (stateVal: string) => {
    pushLocation({ state: stateVal || undefined });
  };

  const handleDistrictChange = (distVal: string) => {
    pushLocation({
      state: selectedState || undefined,
      district: distVal || undefined,
    });
  };

  const handleCityChange = (cityVal: string) => {
    pushLocation({
      state: selectedState || undefined,
      district: selectedDistrict || undefined,
      city: cityVal || undefined,
    });
  };

  const handleLocalAreaChange = (areaVal: string) => {
    pushLocation({
      state: selectedState || undefined,
      district: selectedDistrict || undefined,
      city: selectedCity || undefined,
      localArea: areaVal || undefined,
    });
  };

  const handleSelectSearchResult = (loc: SearchableLocation) => {
    setSearchQuery("");
    setIsSearchOpen(false);

    pushLocation({
      state: loc.state,
      district: loc.district,
      city: loc.city,
      localArea: loc.localArea,
    });
  };

  const handleAllIndia = () => {
    setSearchQuery("");
    pushLocation({});
  };

  const isFiltered = Boolean(selectedState || selectedDistrict || selectedCity || selectedLocalArea);

  return (
    <div className={`india-loc-selector ${compact ? "india-loc-selector--compact" : ""}`}>
      {/* Search Input with Autocomplete */}
      <div className="india-loc-search-box" ref={searchBoxRef}>
        <div className="india-loc-input-wrap">
          <span className="india-loc-flag" title="India">🇮🇳</span>
          <input
            type="text"
            className="india-loc-search-input"
            placeholder="Search state, district, city or area (e.g. Cuttack, Kolkata, Bandra)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            aria-label="Search Indian Locations"
          />
          {searchQuery && (
            <button
              type="button"
              className="india-loc-clear-btn"
              onClick={() => {
                setSearchQuery("");
                setIsSearchOpen(false);
              }}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isSearchOpen && searchResults.length > 0 && (
          <div className="india-loc-dropdown-menu">
            <div className="india-loc-dropdown-header">📍 Indian Locations Found</div>
            {searchResults.map((loc, idx) => (
              <button
                key={`${loc.hierarchy}-${idx}`}
                type="button"
                className="india-loc-dropdown-item"
                onClick={() => handleSelectSearchResult(loc)}
              >
                <div className="india-loc-item-title">
                  <span className="india-loc-type-badge">{loc.type.toUpperCase()}</span>
                  <strong>{loc.displayName}</strong>
                </div>
                <div className="india-loc-item-path">{loc.hierarchy}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dependent Dropdown Hierarchy: India → State → District → City → Local Area */}
      <div className="india-loc-hierarchical-row">
        {/* All India Button */}
        <button
          type="button"
          className={`india-loc-pill ${!isFiltered ? "india-loc-pill--active" : ""}`}
          onClick={handleAllIndia}
          title="Browse All India Profiles"
        >
          🇮🇳 All India
        </button>

        {/* State Select */}
        <div className="india-loc-select-wrap">
          <label className="india-loc-label" htmlFor="state-select">State:</label>
          <select
            id="state-select"
            className="india-loc-select"
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
          >
            <option value="">All States</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* District Select (Active when State is chosen) */}
        {selectedState && districts.length > 0 && (
          <div className="india-loc-select-wrap">
            <label className="india-loc-label" htmlFor="district-select">District:</label>
            <select
              id="district-select"
              className="india-loc-select"
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
            >
              <option value="">All Districts</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        )}

        {/* City Select (Active when District is chosen) */}
        {selectedDistrict && cities.length > 0 && (
          <div className="india-loc-select-wrap">
            <label className="india-loc-label" htmlFor="city-select">City:</label>
            <select
              id="city-select"
              className="india-loc-select"
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
            >
              <option value="">All Cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}

        {/* Local Area Select (Active when City is chosen) */}
        {selectedCity && localAreas.length > 0 && (
          <div className="india-loc-select-wrap">
            <label className="india-loc-label" htmlFor="area-select">Area:</label>
            <select
              id="area-select"
              className="india-loc-select"
              value={selectedLocalArea}
              onChange={(e) => handleLocalAreaChange(e.target.value)}
            >
              <option value="">All Areas</option>
              {localAreas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        )}

        {/* Active Breadcrumb Summary & Reset */}
        {isFiltered && (
          <button
            type="button"
            className="india-loc-reset-btn"
            onClick={handleAllIndia}
            title="Reset location filter"
          >
            Reset ✕
          </button>
        )}
      </div>

      {/* Active Selection Badge Path */}
      {isFiltered && (
        <div className="india-loc-active-path">
          <span className="india-loc-path-label">Active Filter:</span>
          <span className="india-loc-path-badge">🇮🇳 India</span>
          {selectedState && <span className="india-loc-path-badge">› {selectedState}</span>}
          {selectedDistrict && <span className="india-loc-path-badge">› {selectedDistrict}</span>}
          {selectedCity && <span className="india-loc-path-badge">› {selectedCity}</span>}
          {selectedLocalArea && <span className="india-loc-path-badge">› {selectedLocalArea}</span>}
        </div>
      )}
    </div>
  );
}
