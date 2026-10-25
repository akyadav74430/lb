import { NextRequest, NextResponse } from "next/server";
import { listPublicProfilesPaginated } from "@/lib/seo/profiles";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const filter = searchParams.get("filter") || undefined;
  const state = searchParams.get("state") || undefined;
  const district = searchParams.get("district") || undefined;
  const city = searchParams.get("city") || undefined;
  const localArea = searchParams.get("localArea") || undefined;
  const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1;
  const perPage = 12;

  const result = await listPublicProfilesPaginated({
    filter,
    state,
    district,
    city,
    localArea,
    page,
    perPage,
  });

  return NextResponse.json(result);
}