"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export const NAV_ITEMS = [
  { label: "VIP Escorts", href: "/?filter=vip", key: "vip" },
  { label: "Girls", href: "/", key: "girls" },
  { label: "Massages", href: "/?filter=massages", key: "massages" },
];

function SubNavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter");

  const isActive = (item: (typeof NAV_ITEMS)[0]) => {
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
