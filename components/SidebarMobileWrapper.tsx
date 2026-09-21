"use client";

import { useEffect, useCallback, ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Wraps the LeftSidebar and manages mobile open/close state.
 *
 * Key fixes:
 * - Closes sidebar on ANY route/search-params change (link click inside sidebar).
 * - Closes sidebar when tapping overlay.
 * - Does NOT duplicate the toggle listener — TopHeader.tsx owns the toggle via its onClick.
 * - Uses CSS transitions on opacity+visibility (not display:none) for smooth animations.
 */
export default function SidebarMobileWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const closeSidebar = useCallback(() => {
    const sidebar = document.getElementById("sidebar-left");
    const overlay = document.getElementById("sidebar-overlay");
    if (sidebar) sidebar.classList.remove("sidebar-left--open");
    if (overlay) overlay.classList.remove("sidebar-overlay--visible");
    document.body.style.overflow = "";
  }, []);

  // Close sidebar whenever the route or search params change (user clicked a link)
  useEffect(() => {
    closeSidebar();
  }, [pathname, searchParams, closeSidebar]);

  // Set up overlay element once, attach close handler
  useEffect(() => {
    let overlay = document.getElementById("sidebar-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "sidebar-overlay";
      overlay.className = "sidebar-overlay";
      document.body.appendChild(overlay);
    }

    const handleOverlayClick = () => closeSidebar();
    overlay.addEventListener("click", handleOverlayClick);

    // Close on Escape key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      overlay!.removeEventListener("click", handleOverlayClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [closeSidebar]);

  return <>{children}</>;
}
