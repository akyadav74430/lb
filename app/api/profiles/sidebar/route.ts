import { NextResponse } from "next/server";
import { listPublicProfiles } from "@/lib/seo/profiles";

export async function GET() {
  const profiles = await listPublicProfiles();
  // Return only the data needed for the sidebar (city/state counts)
  const stateCounts = new Map<string, number>();
  const cityCounts = new Map<string, { count: number; state: string }>();

  for (const p of profiles) {
    if (p.gender !== "female") continue;
    if (p.state) {
      stateCounts.set(p.state, (stateCounts.get(p.state) || 0) + 1);
    }
    if (p.city) {
      const key = `${p.city}|${p.state || ""}`;
      const existing = cityCounts.get(key) || { count: 0, state: p.state || "" };
      existing.count += 1;
      cityCounts.set(key, existing);
    }
  }

  const states = Array.from(stateCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const cities = Array.from(cityCounts.entries())
    .map(([key, { count, state }]) => {
      const [name] = key.split("|");
      return { name, count, state };
    })
    .sort((a, b) => b.count - a.count);

  return NextResponse.json({ states, cities });
}