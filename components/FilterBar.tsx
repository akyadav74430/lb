"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect, useTransition, useMemo } from "react";
import { PRESET_COLORS } from "@/lib/colors";
import { getAllStates } from "@/lib/india-locations";

function debounce<T extends (...args: Parameters<T>) => void>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [state, setState] = useState(searchParams.get("state") ?? "");
  const [color, setColor] = useState(searchParams.get("color") ?? "");

  const allStates = getAllStates();

  const pushParams = useCallback(
    (overrides: Record<string, string>) => {
      const params = new URLSearchParams();
      const merged = { search, city, state, color, ...overrides };
      if (merged.search) params.set("search", merged.search);
      if (merged.city) params.set("city", merged.city);
      if (merged.state) params.set("state", merged.state);
      if (merged.color) params.set("color", merged.color);
      startTransition(() => {
        router.push(`/?${params.toString()}`);
      });
    },
    [search, city, state, color, router]
  );

  const debouncedPush = useMemo(() => debounce(pushParams, 300), [pushParams]);

  useEffect(() => {
    debouncedPush({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, city]);

  const handleState = (val: string) => {
    setState(val);
    pushParams({ state: val });
  };

  const handleColor = (val: string) => {
    const next = color === val ? "" : val;
    setColor(next);
    pushParams({ color: next });
  };

  const handleClear = () => {
    setSearch("");
    setCity("");
    setState("");
    setColor("");
    startTransition(() => router.push("/"));
  };

  const hasFilters = search || city || state || color;

  return (
    <div className="filter-bar" role="search" aria-label="Filter profiles">
      <input
        id="filter-search"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or bio…"
        className="filter-input filter-input--search"
        aria-label="Search"
      />

      <input
        id="filter-city"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City in India…"
        className="filter-input"
        aria-label="Filter by city"
      />

      <select
        id="filter-state"
        value={state}
        onChange={(e) => handleState(e.target.value)}
        className="filter-select"
        aria-label="Filter by state"
      >
        <option value="">All Indian States</option>
        {allStates.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <div className="filter-colors" role="group" aria-label="Filter by favourite color">
        {PRESET_COLORS.map((c) => (
          <button
            key={c.value}
            type="button"
            className={`color-swatch ${color === c.value ? "color-swatch--active" : ""}`}
            style={{ backgroundColor: c.value }}
            onClick={() => handleColor(c.value)}
            title={c.name}
            aria-label={`Filter by ${c.name}`}
            aria-pressed={color === c.value}
          />
        ))}
      </div>

      {hasFilters && (
        <button type="button" className="btn btn--ghost btn--sm" onClick={handleClear}>
          Clear filters
        </button>
      )}
    </div>
  );
}
