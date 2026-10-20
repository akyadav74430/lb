import Link from "next/link";
import SidebarMobileWrapper from "@/components/SidebarMobileWrapper";
import LeftSidebar from "@/components/LeftSidebar";
import IndiaLocationSelector from "@/components/IndiaLocationSelector";
import { HomeDirectoryClient } from "./HomeDirectoryClient";
import { listPublicProfiles } from "@/lib/seo/profiles";

async function getInitialProfiles() {
  // listPublicProfiles() already merges DB + static listings; dedupe by id
  // so a static profile that also exists in the database is not shown twice.
  const profiles = await listPublicProfiles();
  const seen = new Set<string>();
  return profiles.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}

export default async function HomeDirectory() {
  // Fetch initial profiles on the server (cached for 60s via listPublicProfiles cache)
  const initialProfiles = await getInitialProfiles();

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

        {/* Page Title - Default, client will update based on URL params */}
        <h1 className="page-title">Call Girls in India — Verified Escorts & Companions</h1>

        {/* Client-side interactivity (filtering, pagination, title updates) */}
        <HomeDirectoryClient initialProfiles={initialProfiles} />
      </main>
    </div>
  );
}