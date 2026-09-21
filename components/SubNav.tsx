"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export const NAV_ITEMS = [
  { label: "VIP Escorts", href: "/?filter=vip", key: "vip" },
  { label: "Girls", href: "/", key: "girls" },
  { label: "Massages", href: "/?filter=massages", key: "massages" },
  { label: "Pornstars", href: "/?filter=pornstars", key: "pornstars" },
  { label: "City Tour", href: "/?filter=citytour", key: "citytour" },
  { label: "Agencies", href: "/?filter=agencies", key: "agencies" },
  { label: "Boys", href: "/?filter=boys", key: "boys" },
  { label: "Trans", href: "/?filter=trans", key: "trans" },
  { label: "Videos", href: "/?filter=videos", key: "videos" },
  { label: "Advertise", href: "/advertise", key: "advertise" },
  { label: "Reviews", href: "/reviews", key: "reviews" },
  { label: "Black List", href: "/blacklist", key: "blacklist" },
];

function SubNavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter");

  const isActive = (item: (typeof NAV_ITEMS)[0]) => {
    if (item.key === "advertise") return pathname === "/advertise";
    if (item.key === "reviews") return pathname === "/reviews";
    if (item.key === "blacklist") return pathname === "/blacklist";
    if (pathname === "/") {
      if (!currentFilter && item.key === "girls") return true;
      return currentFilter === item.key;
    }
    return false;
  };

  return (
    <nav className="subnav" aria-label="Main navigation">
      <ul className="subnav__list">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          return (
            <li key={item.label} className="subnav__item">
              <Link
                href={item.href}
                className={`subnav__link${active ? " subnav__link--active" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function SubNav() {
  return (
    <Suspense fallback={
      <nav className="subnav" aria-label="Main navigation">
        <ul className="subnav__list">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="subnav__item">
              <Link href={item.href} className="subnav__link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    }>
      <SubNavContent />
    </Suspense>
  );
}
