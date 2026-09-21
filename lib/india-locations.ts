export interface LocalArea {
  name: string;
}

export interface CityData {
  name: string;
  localAreas?: string[];
}

export interface DistrictData {
  name: string;
  cities: CityData[];
}

export interface StateData {
  name: string;
  code: string;
  districts: DistrictData[];
}

export const INDIA_LOCATIONS: StateData[] = [
  {
    name: "Odisha",
    code: "OD",
    districts: [
      {
        name: "Cuttack",
        cities: [
          {
            name: "Cuttack City",
            localAreas: ["Badambadi", "CDA Sector", "Link Road", "Ranihat", "Chauliaganj", "Buxi Bazaar", "Madhupatna", "Mangalabag"],
          },
          {
            name: "Choudwar",
            localAreas: ["Industrial Area", "OTM Colony", "Gandhi Nagar"],
          },
        ],
      },
      {
        name: "Khordha",
        cities: [
          {
            name: "Bhubaneswar",
            localAreas: ["Patia", "Saheed Nagar", "Nayapalli", "Jayadev Vihar", "Chandrasekharpur", "Khandagiri", "Baramunda", "Infocity", "Rasulgarh"],
          },
          {
            name: "Jatani",
            localAreas: ["Station Road", "Railway Colony", "Market Square"],
          },
        ],
      },
      {
        name: "Puri",
        cities: [
          {
            name: "Puri",
            localAreas: ["VIP Road", "Sea Beach Road", "Grand Road", "Baliapanda", "Chakratirtha Road"],
          },
        ],
      },
      {
        name: "Ganjam",
        cities: [
          {
            name: "Berhampur",
            localAreas: ["Gandhi Nagar", "Hillpatna", "Bada Bazaar", "Kamapalli"],
          },
        ],
      },
      {
        name: "Sundargarh",
        cities: [
          {
            name: "Rourkela",
            localAreas: ["Civil Township", "Sector 5", "Koel Nagar", "Uditnagar", "Chhend Colony"],
          },
        ],
      },
      {
        name: "Sambalpur",
        cities: [
          {
            name: "Sambalpur City",
            localAreas: ["Budharaja", "Dhanupali", "Khetrajpur", "Ainthapali"],
          },
        ],
      },
    ],
  },
  {
    name: "West Bengal",
    code: "WB",
    districts: [
      {
        name: "Kolkata",
        cities: [
          {
            name: "Kolkata",
            localAreas: ["Salt Lake (Bidhannagar)", "Park Street", "New Town", "Ballygunge", "Alipore", "Gariahat", "Rajarhat", "Tollygunge", "Dum Dum", "Behala", "Jadavpur", "Esplanade"],
          },
        ],
      },
      {
        name: "North 24 Parganas",
        cities: [
          {
            name: "Barasat",
            localAreas: ["Champadali", "Colony More", "Kazipara"],
          },
          {
            name: "Barrackpore",
            localAreas: ["Station Road", "Cantonment", "Anandapuri"],
          },
          {
            name: "Bidhannagar",
            localAreas: ["Sector 1", "Sector 2", "Sector 3", "Sector 5 (IT Hub)"],
          },
        ],
      },
      {
        name: "South 24 Parganas",
        cities: [
          {
            name: "Jadavpur",
            localAreas: ["Central Road", "Santoshpur", "Bagha Jatin"],
          },
          {
            name: "Sonarpur",
            localAreas: ["Station Road", "Rajpur", "Kamalgazi"],
          },
        ],
      },
      {
        name: "Howrah",
        cities: [
          {
            name: "Howrah",
            localAreas: ["Shibpur", "Salkia", "Bally", "Liluah", "Mandirtala"],
          },
        ],
      },
      {
        name: "Darjeeling",
        cities: [
          {
            name: "Siliguri",
            localAreas: ["Sevoke Road", "Matigara", "Pradhan Nagar", "Hakim Para", "College Para"],
          },
          {
            name: "Darjeeling",
            localAreas: ["Mall Road", "Chowrasta", "Gandhi Road", "Lebong"],
          },
        ],
      },
      {
        name: "Paschim Bardhaman",
        cities: [
          {
            name: "Durgapur",
            localAreas: ["City Centre", "Benachity", "Bidhannagar", "Muchipara"],
          },
          {
            name: "Asansol",
            localAreas: ["Court Area", "Burnpur", "GT Road", "Ushagram"],
          },
        ],
      },
    ],
  },
  {
    name: "Maharashtra",
    code: "MH",
    districts: [
      {
        name: "Mumbai City",
        cities: [
          {
            name: "Mumbai South",
            localAreas: ["Colaba", "Marine Drive", "Nariman Point", "Fort", "Malabar Hill", "Worli", "Lower Parel", "Byculla", "Churchgate"],
          },
        ],
      },
      {
        name: "Mumbai Suburban",
        cities: [
          {
            name: "Mumbai",
            localAreas: ["Bandra West", "Juhu", "Andheri West", "Andheri East", "Powai", "Santacruz", "Khar", "Versova", "Lokhandwala", "Goregaon", "Malad", "Borivali", "Kandivali"],
          },
        ],
      },
      {
        name: "Pune",
        cities: [
          {
            name: "Pune",
            localAreas: ["Koregaon Park", "Baner", "Kalyani Nagar", "Viman Nagar", "Hinjewadi (IT Park)", "Aundh", "Kothrud", "Wakad", "Shivaji Nagar", "Magarpatta", "Hadapsar"],
          },
        ],
      },
      {
        name: "Thane",
        cities: [
          {
            name: "Thane",
            localAreas: ["Ghodbunder Road", "Majiwada", "Panchpakhadi", "Vartak Nagar", "Naupada"],
          },
          {
            name: "Navi Mumbai",
            localAreas: ["Vashi", "Nerul", "Belapur", "Kharghar", "Seawoods", "Airoli", "Kopar Khairane"],
          },
        ],
      },
      {
        name: "Nagpur",
        cities: [
          {
            name: "Nagpur",
            localAreas: ["Dharampeth", "Ramdaspeth", "Civil Lines", "Sadar", "Pratap Nagar", "Wardha Road"],
          },
        ],
      },
      {
        name: "Nashik",
        cities: [
          {
            name: "Nashik",
            localAreas: ["College Road", "Gangapur Road", "Indira Nagar", "CIDCO", "Panchavati"],
          },
        ],
      },
    ],
  },
  {
    name: "Delhi",
    code: "DL",
    districts: [
      {
        name: "New Delhi",
        cities: [
          {
            name: "New Delhi",
            localAreas: ["Connaught Place", "Chanakyapuri", "Barakhamba", "Khan Market", "Lutyens Delhi", "Gol Market"],
          },
        ],
      },
      {
        name: "South Delhi",
        cities: [
          {
            name: "South Delhi",
            localAreas: ["South Extension", "Hauz Khas", "Saket", "Greater Kailash 1 & 2", "Vasant Kunj", "Def Col (Defence Colony)", "Green Park", "Lajpat Nagar", "Nehru Place", "Malviya Nagar"],
          },
        ],
      },
      {
        name: "South West Delhi",
        cities: [
          {
            name: "Dwarka",
            localAreas: ["Sector 6", "Sector 10", "Sector 12", "Sector 21", "Aerocity", "Mahipalpur"],
          },
        ],
      },
      {
        name: "West Delhi",
        cities: [
          {
            name: "West Delhi",
            localAreas: ["Rajouri Garden", "Punjabi Bagh", "Janakpuri", "Patel Nagar", "Paschim Vihar", "Tilak Nagar"],
          },
        ],
      },
      {
        name: "North Delhi",
        cities: [
          {
            name: "North Delhi",
            localAreas: ["Civil Lines", "Model Town", "Pitampura", "Rohini", "Kamla Nagar", "Shalimar Bagh"],
          },
        ],
      },
      {
        name: "East Delhi",
        cities: [
          {
            name: "East Delhi",
            localAreas: ["Mayur Vihar", "Preet Vihar", "Laxmi Nagar", "IP Extension", "Patparganj"],
          },
        ],
      },
    ],
  },
  {
    name: "Karnataka",
    code: "KA",
    districts: [
      {
        name: "Bangalore Urban",
        cities: [
          {
            name: "Bangalore",
            localAreas: ["Indiranagar", "Koramangala", "Whitefield", "MG Road & Brigade", "HSR Layout", "JP Nagar", "Jayanagar", "Marathahalli", "Electronic City", "Bellandur", "Hebbal", "Malleshwaram", "Lavelle Road"],
          },
        ],
      },
      {
        name: "Mysore",
        cities: [
          {
            name: "Mysore",
            localAreas: ["Gokulam", "Jayalakshmipuram", "VV Mohalla", "Saraswathipuram", "Kuvempunagar"],
          },
        ],
      },
      {
        name: "Dakshina Kannada",
        cities: [
          {
            name: "Mangalore",
            localAreas: ["Kadri", "Bejai", "Lalbagh", "Kankanady", "Bunder"],
          },
        ],
      },
    ],
  },
  {
    name: "Telangana",
    code: "TS",
    districts: [
      {
        name: "Hyderabad",
        cities: [
          {
            name: "Hyderabad",
            localAreas: ["Banjara Hills", "Jubilee Hills", "Gachibowli", "Hitec City", "Madhapur", "Kondapur", "Somajiguda", "Begumpet", "Kukatpally", "Manikonda", "Panjagutta"],
          },
        ],
      },
      {
        name: "Medchal-Malkajgiri",
        cities: [
          {
            name: "Secunderabad",
            localAreas: ["Sainikpuri", "Alwal", "AS Rao Nagar", "Karkhana", "Trimulgherry"],
          },
        ],
      },
    ],
  },
  {
    name: "Tamil Nadu",
    code: "TN",
    districts: [
      {
        name: "Chennai",
        cities: [
          {
            name: "Chennai",
            localAreas: ["T. Nagar", "Nungambakkam", "Anna Nagar", "Adyar", "Velachery", "ECR (East Coast Road)", "OMR (IT Corridor)", "Mylapore", "Alwarpet", "Guindy", "Besant Nagar", "Kilpauk"],
          },
        ],
      },
      {
        name: "Coimbatore",
        cities: [
          {
            name: "Coimbatore",
            localAreas: ["RS Puram", "Gandhipuram", "Race Course", "Peelamedu", "Saibaba Colony"],
          },
        ],
      },
      {
        name: "Madurai",
        cities: [
          {
            name: "Madurai",
            localAreas: ["KK Nagar", "Anna Nagar", "Simmakkal", "SS Colony"],
          },
        ],
      },
    ],
  },
  {
    name: "Gujarat",
    code: "GJ",
    districts: [
      {
        name: "Ahmedabad",
        cities: [
          {
            name: "Ahmedabad",
            localAreas: ["SG Highway", "Satellite", "Bodakdev", "Vastrapur", "Navrangpura", "Prahlad Nagar", "Thaltej", "Sindhubhavan Road", "Bopal", "Paldi"],
          },
        ],
      },
      {
        name: "Surat",
        cities: [
          {
            name: "Surat",
            localAreas: ["Vesu", "Piplod", "Ghod Dod Road", "Adajan", "City Light", "Dumas Road"],
          },
        ],
      },
      {
        name: "Vadodara",
        cities: [
          {
            name: "Vadodara",
            localAreas: ["Alkapuri", "Old Padra Road", "Gotri", "Vasna", "Sayajigunj"],
          },
        ],
      },
    ],
  },
  {
    name: "Rajasthan",
    code: "RJ",
    districts: [
      {
        name: "Jaipur",
        cities: [
          {
            name: "Jaipur",
            localAreas: ["C-Scheme", "Malviya Nagar", "Vaishali Nagar", "Mansarovar", "Raja Park", "Bani Park", "Tonk Road", "Civil Lines", "JLN Marg"],
          },
        ],
      },
      {
        name: "Udaipur",
        cities: [
          {
            name: "Udaipur",
            localAreas: ["Fateh Sagar", "Lake Pichola Area", "Panchwati", "Shobhagpura", "Hiran Magri"],
          },
        ],
      },
      {
        name: "Jodhpur",
        cities: [
          {
            name: "Jodhpur",
            localAreas: ["Ratanada", "Shastri Nagar", "Sardarpura", "Pal Road"],
          },
        ],
      },
    ],
  },
  {
    name: "Goa",
    code: "GA",
    districts: [
      {
        name: "North Goa",
        cities: [
          {
            name: "Panaji",
            localAreas: ["Miramar", "Campal", "Dona Paula", "Fontainhas", "Patto"],
          },
          {
            name: "Candolim / Calangute",
            localAreas: ["Candolim Beach Road", "Calangute Strip", "Baga Road", "Arpora", "Sinquerim"],
          },
          {
            name: "Anjuna / Vagator",
            localAreas: ["Anjuna Flea Market Area", "Vagator Hill", "Ozran", "Siolim", "Assagao"],
          },
        ],
      },
      {
        name: "South Goa",
        cities: [
          {
            name: "Margao",
            localAreas: ["Borda", "Fatorda", "Aquem", "Colva Beach Road", "Benaulim"],
          },
          {
            name: "Vasco da Gama",
            localAreas: ["Bogmalo", "Dabolim", "Chicalim"],
          },
        ],
      },
    ],
  },
  {
    name: "Uttar Pradesh",
    code: "UP",
    districts: [
      {
        name: "Gautam Buddha Nagar",
        cities: [
          {
            name: "Noida",
            localAreas: ["Sector 18", "Sector 62", "Sector 137", "Sector 50", "Sector 76", "Sector 128", "Sector 150"],
          },
          {
            name: "Greater Noida",
            localAreas: ["Alpha 1", "Beta 2", "Pari Chowk", "Knowledge Park", "Techzone 4"],
          },
        ],
      },
      {
        name: "Lucknow",
        cities: [
          {
            name: "Lucknow",
            localAreas: ["Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar", "Mahanagar", "Vibhuti Khand", "Sushant Golf City"],
          },
        ],
      },
      {
        name: "Ghaziabad",
        cities: [
          {
            name: "Ghaziabad",
            localAreas: ["Indirapuram", "Vaishali", "Vasundhara", "Raj Nagar Extension", "Kaushambi"],
          },
        ],
      },
      {
        name: "Agra",
        cities: [
          {
            name: "Agra",
            localAreas: ["Tajganj", "Fatehabad Road", "Civil Lines", "Sanjay Place", "Kamla Nagar"],
          },
        ],
      },
      {
        name: "Varanasi",
        cities: [
          {
            name: "Varanasi",
            localAreas: ["Cantonment", "Sigra", "Assi Ghat", "Godowlia", "Lanka"],
          },
        ],
      },
      {
        name: "Kanpur Nagar",
        cities: [
          {
            name: "Kanpur",
            localAreas: ["Civil Lines", "Swaroop Nagar", "Kakadeo", "Mall Road", "Sharda Nagar"],
          },
        ],
      },
    ],
  },
  {
    name: "Haryana",
    code: "HR",
    districts: [
      {
        name: "Gurugram",
        cities: [
          {
            name: "Gurugram (Gurgaon)",
            localAreas: ["DLF Phase 1-5", "Cyber Hub / Cyber City", "Golf Course Road", "Golf Course Extension", "Sohna Road", "MG Road", "Sector 29", "Sector 56", "Sector 57", "Sushant Lok"],
          },
        ],
      },
      {
        name: "Faridabad",
        cities: [
          {
            name: "Faridabad",
            localAreas: ["Sector 15", "Sector 21", "Greenfield", "Surajkund Road", "NIT"],
          },
        ],
      },
      {
        name: "Panchkula",
        cities: [
          {
            name: "Panchkula",
            localAreas: ["Sector 5", "Sector 7", "Sector 20", "MDC Sector 4", "Industrial Area"],
          },
        ],
      },
    ],
  },
  {
    name: "Punjab",
    code: "PB",
    districts: [
      {
        name: "SAS Nagar (Mohali)",
        cities: [
          {
            name: "Mohali",
            localAreas: ["Phase 3B2", "Phase 7", "Sector 70", "Aerocity", "Sector 82 IT Park"],
          },
        ],
      },
      {
        name: "Ludhiana",
        cities: [
          {
            name: "Ludhiana",
            localAreas: ["Sarabha Nagar", "Model Town", "BRS Nagar", "Civil Lines", "Ferozepur Road"],
          },
        ],
      },
      {
        name: "Amritsar",
        cities: [
          {
            name: "Amritsar",
            localAreas: ["Ranjit Avenue", "Mall Road", "Lawrence Road", "Green Avenue", "Civil Lines"],
          },
        ],
      },
      {
        name: "Jalandhar",
        cities: [
          {
            name: "Jalandhar",
            localAreas: ["Model Town", "Civil Lines", "GT Road", "Urban Estate Phase 2"],
          },
        ],
      },
    ],
  },
  {
    name: "Chandigarh",
    code: "CH",
    districts: [
      {
        name: "Chandigarh",
        cities: [
          {
            name: "Chandigarh",
            localAreas: ["Sector 17", "Sector 35", "Sector 8", "Sector 9", "Sector 22", "Sector 26", "Sector 43", "IT Park"],
          },
        ],
      },
    ],
  },
  {
    name: "Kerala",
    code: "KL",
    districts: [
      {
        name: "Ernakulam",
        cities: [
          {
            name: "Kochi (Cochin)",
            localAreas: ["Kakkanad (Infopark)", "Panampilly Nagar", "Marine Drive", "Edappally", "MG Road", "Fort Kochi", "Kadavanthra"],
          },
        ],
      },
      {
        name: "Thiruvananthapuram",
        cities: [
          {
            name: "Trivandrum",
            localAreas: ["Kazhakkoottam (Technopark)", "Kowdiar", "Vellayambalam", "Vazhuthacaud", "Pattom"],
          },
        ],
      },
      {
        name: "Kozhikode",
        cities: [
          {
            name: "Calicut",
            localAreas: ["Mavoor Road", "Beach Road", "Thondayad", "PT Usha Road"],
          },
        ],
      },
    ],
  },
  {
    name: "Andhra Pradesh",
    code: "AP",
    districts: [
      {
        name: "Visakhapatnam",
        cities: [
          {
            name: "Visakhapatnam (Vizag)",
            localAreas: ["Siripuram", "MVP Colony", "Beach Road", "Dwaraka Nagar", "Madhurawada", "Gajuwaka"],
          },
        ],
      },
      {
        name: "NTR / Krishna",
        cities: [
          {
            name: "Vijayawada",
            localAreas: ["MG Road", "Benz Circle", "Governorpet", "Suryaraopet"],
          },
        ],
      },
    ],
  },
  {
    name: "Madhya Pradesh",
    code: "MP",
    districts: [
      {
        name: "Indore",
        cities: [
          {
            name: "Indore",
            localAreas: ["Vijay Nagar", "Palasia", "AB Road", "Saket Nagar", "Bhawarkua", "ByPass Road"],
          },
        ],
      },
      {
        name: "Bhopal",
        cities: [
          {
            name: "Bhopal",
            localAreas: ["Arera Colony", "MP Nagar", "Shahpura", "Kolar Road", "Hoshangabad Road"],
          },
        ],
      },
    ],
  },
  {
    name: "Bihar",
    code: "BR",
    districts: [
      {
        name: "Patna",
        cities: [
          {
            name: "Patna",
            localAreas: ["Boring Road", "Bailey Road", "Kankarbagh", "Fraser Road", "Patliputra Colony", "Rajendra Nagar"],
          },
        ],
      },
    ],
  },
  {
    name: "Jharkhand",
    code: "JH",
    districts: [
      {
        name: "Ranchi",
        cities: [
          {
            name: "Ranchi",
            localAreas: ["Main Road", "Lalpur", "Doranda", "Harmu", "Ashok Nagar", "Kanke Road"],
          },
        ],
      },
      {
        name: "East Singhbhum",
        cities: [
          {
            name: "Jamshedpur",
            localAreas: ["Bistupur", "Sakchi", "Kadma", "Sonari", "Telco"],
          },
        ],
      },
    ],
  },
  {
    name: "Assam",
    code: "AS",
    districts: [
      {
        name: "Kamrup Metropolitan",
        cities: [
          {
            name: "Guwahati",
            localAreas: ["GS Road", "Zoo Road", "Beltola", "Christian Basti", "Paltan Bazaar", "Dispur", "Ulubari"],
          },
        ],
      },
    ],
  },
  {
    name: "Uttarakhand",
    code: "UK",
    districts: [
      {
        name: "Dehradun",
        cities: [
          {
            name: "Dehradun",
            localAreas: ["Rajpur Road", "Hathibarkala", "Dharampur", "Vasant Vihar", "Jakhan"],
          },
          {
            name: "Rishikesh",
            localAreas: ["Tapovan", "Laxman Jhula", "Swarg Ashram", "AIIMS Road"],
          },
        ],
      },
    ],
  },
  {
    name: "Himachal Pradesh",
    code: "HP",
    districts: [
      {
        name: "Shimla",
        cities: [
          {
            name: "Shimla",
            localAreas: ["Mall Road", "Sanjauli", "Chotta Shimla", "Kasumpti", "Jakhu"],
          },
        ],
      },
      {
        name: "Kullu",
        cities: [
          {
            name: "Manali",
            localAreas: ["Old Manali", "Mall Road", "Aleo", "Vashisht"],
          },
        ],
      },
    ],
  },
  {
    name: "Jammu and Kashmir",
    code: "JK",
    districts: [
      {
        name: "Srinagar",
        cities: [
          {
            name: "Srinagar",
            localAreas: ["Rajbagh", "Lal Chowk", "Hyderpora", "Karan Nagar", "Boulevard Road"],
          },
        ],
      },
      {
        name: "Jammu",
        cities: [
          {
            name: "Jammu",
            localAreas: ["Gandhi Nagar", "Trikuta Nagar", "Channi Himmat", "Bahu Plaza"],
          },
        ],
      },
    ],
  },
];

/* ─── Helper Functions ─── */

export function getAllStates(): string[] {
  return INDIA_LOCATIONS.map((s) => s.name);
}

export function getDistrictsForState(stateName: string): string[] {
  const state = INDIA_LOCATIONS.find((s) => s.name.toLowerCase() === stateName.toLowerCase());
  if (!state) return [];
  return state.districts.map((d) => d.name);
}

export function getCitiesForDistrict(stateName: string, districtName: string): string[] {
  const state = INDIA_LOCATIONS.find((s) => s.name.toLowerCase() === stateName.toLowerCase());
  if (!state) return [];
  const district = state.districts.find((d) => d.name.toLowerCase() === districtName.toLowerCase());
  if (!district) return [];
  return district.cities.map((c) => c.name);
}

export function getCitiesForState(stateName: string): string[] {
  const state = INDIA_LOCATIONS.find((s) => s.name.toLowerCase() === stateName.toLowerCase());
  if (!state) return [];
  const cities: string[] = [];
  for (const d of state.districts) {
    for (const c of d.cities) {
      if (!cities.includes(c.name)) cities.push(c.name);
    }
  }
  return cities;
}

export function getLocalAreas(stateName: string, districtName: string, cityName: string): string[] {
  const state = INDIA_LOCATIONS.find((s) => s.name.toLowerCase() === stateName.toLowerCase());
  if (!state) return [];
  const district = state.districts.find((d) => d.name.toLowerCase() === districtName.toLowerCase());
  if (!district) return [];
  const city = district.cities.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
  return city?.localAreas || [];
}

export interface SearchableLocation {
  type: "state" | "district" | "city" | "localArea";
  displayName: string;
  state: string;
  district?: string;
  city?: string;
  localArea?: string;
  hierarchy: string;
}

/** Flatten all locations into a searchable list */
export function getSearchableLocations(): SearchableLocation[] {
  const results: SearchableLocation[] = [];

  for (const state of INDIA_LOCATIONS) {
    // Add State
    results.push({
      type: "state",
      displayName: state.name,
      state: state.name,
      hierarchy: `India › ${state.name}`,
    });

    for (const district of state.districts) {
      // Add District
      results.push({
        type: "district",
        displayName: district.name,
        state: state.name,
        district: district.name,
        hierarchy: `India › ${state.name} › ${district.name}`,
      });

      for (const city of district.cities) {
        // Add City
        results.push({
          type: "city",
          displayName: city.name,
          state: state.name,
          district: district.name,
          city: city.name,
          hierarchy: `India › ${state.name} › ${district.name} › ${city.name}`,
        });

        if (city.localAreas) {
          for (const area of city.localAreas) {
            // Add Local Area
            results.push({
              type: "localArea",
              displayName: area,
              state: state.name,
              district: district.name,
              city: city.name,
              localArea: area,
              hierarchy: `India › ${state.name} › ${city.name} › ${area}`,
            });
          }
        }
      }
    }
  }

  return results;
}

/** Quick search utility across all Indian locations */
export function searchIndiaLocations(query: string, limit = 12): SearchableLocation[] {
  if (!query || query.trim() === "") return [];
  const q = query.toLowerCase().trim();
  const all = getSearchableLocations();

  return all
    .filter(
      (item) =>
        item.displayName.toLowerCase().includes(q) ||
        item.state.toLowerCase().includes(q) ||
        (item.city && item.city.toLowerCase().includes(q)) ||
        (item.district && item.district.toLowerCase().includes(q))
    )
    .slice(0, limit);
}

/**
 * Format currency in Indian numbering system:
 * Examples: ₹999, ₹1,499, ₹10,000, ₹1,00,000
 */
export function formatINR(amount: number | string): string {
  const num = typeof amount === "string" ? parseFloat(amount.replace(/[^\d.-]/g, "")) : amount;
  if (isNaN(num)) return "₹0";

  // Format with Indian lakh/crore commas
  const parts = Math.round(num).toString();
  let lastThree = parts.substring(parts.length - 3);
  const otherNumbers = parts.substring(0, parts.length - 3);
  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  return `₹${formatted}`;
}
