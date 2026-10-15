import Link from "next/link";
import SidebarMobileWrapper from "@/components/SidebarMobileWrapper";
import LeftSidebar from "@/components/LeftSidebar";
import IndiaLocationSelector from "@/components/IndiaLocationSelector";
import ProfileCard from "@/components/ProfileCard";
import { HomeDirectoryClient } from "./HomeDirectoryClient";
import { listPublicProfiles } from "@/lib/seo/profiles";

interface HomeDirectoryProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

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

export default async function HomeDirectory({ searchParams }: HomeDirectoryProps) {
  const sp = await searchParams;
  const filterParam = (sp.filter as string) || "";
  const stateParam = (sp.state as string) || "";
  const districtParam = (sp.district as string) || "";
  const cityParam = (sp.city as string) || "";
  const localAreaParam = (sp.localArea as string) || "";

  // Fetch initial profiles on the server
  const initialProfiles = await getInitialProfiles();

  // Pre-filter on server for initial render
  const filteredProfiles = initialProfiles.filter((p) => {
    if (p.gender !== "female") return false;
    if (filterParam === "vip" && !p.badges.includes("VIP") && p.topBadge !== "top") return false;
    if (filterParam === "massages" && p.category !== "massages") return false;
    if (stateParam && p.state && p.state.toLowerCase() !== stateParam.toLowerCase()) return false;
    if (districtParam && p.district && p.district.toLowerCase() !== districtParam.toLowerCase()) return false;
    if (cityParam && p.city.toLowerCase() !== cityParam.toLowerCase()) return false;
    if (localAreaParam && p.localArea && p.localArea.toLowerCase() !== localAreaParam.toLowerCase()) return false;
    return true;
  });

  const profilesPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(filteredProfiles.length / profilesPerPage));
  const displayedProfiles = filteredProfiles.slice(0, profilesPerPage);

  // Dynamic Page Title
  let dynamicTitle = "Call Girls in India — Verified Escorts & Companions";
  if (localAreaParam && cityParam) dynamicTitle = `${localAreaParam}, ${cityParam} Escorts`;
  else if (cityParam) dynamicTitle = `${cityParam} Escorts`;
  else if (districtParam) dynamicTitle = `${districtParam} Escorts`;
  else if (stateParam) dynamicTitle = `${stateParam} Escorts`;
  else if (filterParam === "vip") dynamicTitle = "VIP Escorts Directory India";
  else if (filterParam === "massages") dynamicTitle = "Sensual Massage & Wellness India";

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

        {/* Page Title */}
        <h1 className="page-title">{dynamicTitle}</h1>

        {/* Profile Cards Grid */}
        {displayedProfiles.length === 0 ? (
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
          <div className="profiles-grid">
            {displayedProfiles.map((p, index) => (
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
              />
            ))}
          </div>
        )}

        {/* Pagination - server-rendered first page, client takes over */}
        {totalPages > 1 && (
          <div className="pagination">
            <button className="pagination__btn pagination__btn--disabled" type="button" disabled>
              «
            </button>
            <button className="pagination__btn pagination__btn--active" type="button">
              1
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 2).map((num) => (
              <button key={num} className="pagination__btn" type="button">
                {num}
              </button>
            ))}
            <button className="pagination__btn" type="button">
              »
            </button>
          </div>
        )}

        {/* Client-side interactivity (filtering, pagination, title updates) */}
        <HomeDirectoryClient initialProfiles={initialProfiles} />
      </main>
    </div>
  );
}