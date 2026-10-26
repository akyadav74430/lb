import { Suspense } from "react";
import SidebarMobileWrapper from "@/components/SidebarMobileWrapper";
import LeftSidebar from "@/components/LeftSidebar";
import IndiaLocationSelector from "@/components/IndiaLocationSelector";
import { HomeDirectoryClient } from "./HomeDirectoryClient";
import { listPublicProfilesPaginated } from "@/lib/seo/profiles";

interface HomeDirectoryProps {
  searchParams: Promise<{
    filter?: string;
    state?: string;
    district?: string;
    city?: string;
    localArea?: string;
    page?: string;
  }>;
}

function SidebarSkeleton() {
  return (
    <SidebarMobileWrapper>
      <LeftSidebar />
    </SidebarMobileWrapper>
  );
}

async function getPaginatedProfiles(searchParams: HomeDirectoryProps["searchParams"]) {
  const sp = await searchParams;
  return listPublicProfilesPaginated({
    filter: sp.filter,
    state: sp.state,
    district: sp.district,
    city: sp.city,
    localArea: sp.localArea,
    page: sp.page ? parseInt(sp.page, 10) : 1,
    perPage: 12,
  });
}

export default async function HomeDirectory({ searchParams }: HomeDirectoryProps) {
  const { profiles: initialProfiles, totalPages } = await getPaginatedProfiles(searchParams);
  const sp = await searchParams;
  const currentPage = sp.page ? parseInt(sp.page, 10) : 1;

  const dynamicTitle = (() => {
    if (sp.localArea && sp.city) return `${sp.localArea}, ${sp.city} Escorts`;
    if (sp.city) return `${sp.city} Escorts`;
    if (sp.district) return `${sp.district} Escorts`;
    if (sp.state) return `${sp.state} Escorts`;
    if (sp.filter === "vip") return "VIP Escorts Directory India";
    if (sp.filter === "massages") return "Sensual Massage & Wellness India";
    return "Escorts & Call Girls Directory in India";
  })();

  return (
    <div className="page-body">
      {/* LEFT SIDEBAR — Indian Location Nav */}
      <Suspense fallback={<SidebarSkeleton />}>
        <SidebarMobileWrapper>
          <LeftSidebar />
        </SidebarMobileWrapper>
      </Suspense>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* Top Indian Location Filter Bar */}
        <IndiaLocationSelector />

        {/* Keep the primary heading in the server-rendered page shell so crawlers
            see one semantic main region and one authoritative H1. */}
        <h1 className="page-title" id="page-title">{dynamicTitle}</h1>

        {/* Client-side interactivity (pagination, filter updates without full reload) */}
        <HomeDirectoryClient
          initialProfiles={initialProfiles}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
}
