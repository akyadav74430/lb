/**
 * LGD (Local Government Directory) Data Source
 *
 * Source: https://lgdirectory.gov.in (Official Government of India)
 * Processed dataset from: https://github.com/planemad/india-local-government-directory
 * License: Government Open Data License – India (GODL)
 * Retrieval date: 2024 (dataset from 2022, LGD is updated monthly)
 *
 * This module provides typed access to the complete India administrative hierarchy:
 * State -> District -> Subdistrict -> City/Town/Village
 */

export interface LGDState {
  code: string;
  name: string;
  nameLocal?: string;
  census2001Code?: string;
  census2011Code?: string;
  type: 'State' | 'UT';
}

export interface LGDDistrict {
  stateCode: string;
  stateName: string;
  code: string;
  name: string;
  census2001Code?: string;
  census2011Code?: string;
}

export interface LGDSubdistrict {
  stateCode: string;
  stateName: string;
  districtCode: string;
  districtName: string;
  code: string;
  version: string;
  name: string;
  census2001Code?: string;
  census2011Code?: string;
}

export interface LGDLocalBody {
  stateName: string;
  localbodyCode: string;
  localbodyName: string;
  census2011Code: string;
  districtCode: string;
  districtName: string;
  subdistrictCode?: string;
  subdistrictName?: string;
  villageCode?: string;
  villageName?: string;
}

/**
 * URLs for the LGD CSV datasets (hosted on planemad's GitHub, sourced from lgdirectory.gov.in)
 * These are the official Government of India LGD datasets, processed for CSV format.
 */
export const LGD_DATA_URLS = {
  states: 'https://raw.githubusercontent.com/planemad/india-local-government-directory/main/administrative/1-state.csv',
  districts: 'https://raw.githubusercontent.com/planemad/india-local-government-directory/main/administrative/2-district.csv',
  subdistricts: 'https://raw.githubusercontent.com/planemad/india-local-government-directory/main/administrative/3-subdistrict.csv',
  localBodies: 'https://raw.githubusercontent.com/planemad/india-local-government-directory/main/municipal-directory.csv',
} as const;

/**
 * Metadata about the LGD dataset
 */
export const LGD_METADATA = {
  source: 'Local Government Directory (LGD), Ministry of Panchayati Raj, Government of India',
  sourceUrl: 'https://lgdirectory.gov.in',
  processedBy: 'planemad/india-local-government-directory',
  license: 'Government Open Data License – India (GODL)',
  licenseUrl: 'https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf',
  retrievalDate: '2024-10-14',
  datasetDate: '2022-03-11 (original retrieval), LGD updated monthly',
  coverage: {
    states: 36,
    districts: 784,
    subdistricts: 7092,
    localBodies: '4000+ urban local bodies',
  },
  note: 'LGD is the authoritative source mandated by Cabinet Secretariat (Nov 2016) for all e-Governance applications. This dataset provides LGD codes for interoperability.',
} as const;

/**
 * Parse CSV text into array of objects
 */
export function parseCSV<T>(csvText: string): T[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());
  const results: T[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle quoted fields with commas
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    if (values.length === headers.length) {
      const obj: Record<string, string> = {};
      headers.forEach((header, idx) => {
        obj[header] = values[idx]?.replace(/^"|"$/g, '') || '';
      });
      results.push(obj as T);
    }
  }

  return results;
}

/**
 * In-memory cache for LGD data to avoid repeated downloads
 */
const LGD_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface LGDCacheEntry<T> {
  data: T;
  timestamp: number;
}

const lgdCache = new Map<string, LGDCacheEntry<any>>();

async function fetchAndParseCSV<T>(url: string, parser: (rows: Record<string, string>[]) => T[]): Promise<T[]> {
  const cacheKey = url;
  const cached = lgdCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < LGD_CACHE_TTL_MS) {
    console.log(`[LGD] Cache hit for ${url}`);
    return cached.data;
  }

  console.log(`[LGD] Fetching ${url}`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  const csv = await response.text();
  const parsed = parseCSV<Record<string, string>>(csv);
  const data = parser(parsed);

  lgdCache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
}

/**
 * Fetch and parse LGD states
 */
export async function fetchLGDStates(): Promise<LGDState[]> {
  return fetchAndParseCSV(LGD_DATA_URLS.states, (parsed) =>
    parsed.map(row => {
      const stateOrUT = row['State or UT'] || '';
      return {
        code: row['State Code'] || row['State LGD Code'] || '',
        name: row['State Name'] || row['State Name (In English)'] || '',
        nameLocal: row['State Name'] || row['State Name (In Local language)'] || '',
        census2001Code: row['Census 2001 Code'] || undefined,
        census2011Code: row['Census 2011 Code'] || undefined,
        type: stateOrUT === 'U' ? 'UT' as const : 'State' as const,
      };
    }).filter(s => s.code && s.name)
  );
}

/**
 * Fetch and parse LGD districts
 */
export async function fetchLGDDistricts(): Promise<LGDDistrict[]> {
  return fetchAndParseCSV(LGD_DATA_URLS.districts, (parsed) =>
    parsed.map(row => ({
      stateCode: row['State Code'] || '',
      stateName: row['State Name'] || '',
      code: row['District Code'] || '',
      name: row['District Name'] || '',
      census2001Code: row['Census 2001 Code'] || undefined,
      census2011Code: row['Census 2011 Code'] || undefined,
    })).filter(d => d.code && d.name)
  );
}

/**
 * Fetch and parse LGD subdistricts
 */
export async function fetchLGDSubdistricts(): Promise<LGDSubdistrict[]> {
  return fetchAndParseCSV(LGD_DATA_URLS.subdistricts, (parsed) =>
    parsed.map(row => ({
      stateCode: row['State Code'] || '',
      stateName: row['State Name'] || '',
      districtCode: row['District Code'] || '',
      districtName: row['District Name'] || '',
      code: row['Sub-district Code'] || row['Subdistrict Code'] || '',
      version: row['Sub-district Version'] || row['Subdistrict Version'] || '1',
      name: row['Sub-district Name'] || row['Subdistrict Name'] || '',
      census2001Code: row['Census 2001 code'] || row['Census 2001 Code'] || undefined,
      census2011Code: row['Census 2011 code'] || row['Census 2011 Code'] || undefined,
    })).filter(s => s.code && s.name)
  );
}

/**
 * Fetch and parse LGD local bodies (urban/rural local bodies = cities/towns/villages)
 */
export async function fetchLGDLocalBodies(): Promise<LGDLocalBody[]> {
  return fetchAndParseCSV(LGD_DATA_URLS.localBodies, (parsed) =>
    parsed.map(row => ({
      stateName: row['State Name'] || '',
      localbodyCode: row['Localbody Code'] || '',
      localbodyName: row['Localbody Name'] || '',
      census2011Code: row['Census 2011 Code'] || '',
      districtCode: row['District Code'] || '',
      districtName: row['District Name'] || '',
      subdistrictCode: row['Subdistrict Code'] || undefined,
      subdistrictName: row['Subdistrict Name'] || undefined,
      villageCode: row['Village Code'] || undefined,
      villageName: row['Village Name'] || undefined,
    })).filter(lb => lb.localbodyCode && lb.localbodyName)
  );
}