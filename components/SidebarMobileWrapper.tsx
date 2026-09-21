"use client";

import { useEffect, ReactNode } from "react";

export default function SidebarMobileWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    const btn = document.getElementById("mobile-menu-btn");
    const sidebar = document.getElementById("sidebar-left");

    if (!btn || !sidebar) return;

    // Create overlay element
    let overlay = document.getElementById("sidebar-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "sidebar-overlay";
      overlay.className = "sidebar-overlay";
      document.body.appendChild(overlay);
    }

    function openSidebar() {
      sidebar!.classList.add("sidebar-left--open");
      overlay!.classList.add("sidebar-overlay--visible");
      document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
      sidebar!.classList.remove("sidebar-left--open");
      overlay!.classList.remove("sidebar-overlay--visible");
      document.body.style.overflow = "";
    }

    function toggleSidebar() {
      if (sidebar!.classList.contains("sidebar-left--open")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }

    btn.addEventListener("click", toggleSidebar);
    overlay.addEventListener("click", closeSidebar);

    return () => {
      btn.removeEventListener("click", toggleSidebar);
      overlay!.removeEventListener("click", closeSidebar);
    };
  }, []);

  return <>{children}</>;
}
