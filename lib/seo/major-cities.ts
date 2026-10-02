/**
 * Top metropolitan hubs and commercial centres in India for companion & escort services.
 * 
 * Having structured data for these major hubs ensures that city landing pages
 * are fully fleshed out with genuine local neighborhoods, pricing insights,
 * and high-intent SEO relevance rather than returning 404 errors.
 */

export interface MajorCityDef {
  slug: string;
  name: string;
  region: string;
  areas: string[];
  rateMin: number;
  rateMax: number;
  faqs?: { q: string; a: string }[];
}

export const MAJOR_CITIES: MajorCityDef[] = [
  {
    slug: "mumbai",
    name: "Mumbai",
    region: "Maharashtra",
    areas: ["Bandra", "Andheri West", "Juhu", "Colaba", "Powai", "Worli", "BKC", "Thane", "Navi Mumbai", "Santacruz"],
    rateMin: 12000,
    rateMax: 75000,
    faqs: [
      {
        q: "How can I book an independent escort in Mumbai safely?",
        a: "Browse verified profiles on Lovebite, check photos and published rates, and message the companion directly via WhatsApp or phone. Never pay any advance booking fee or registration charge via UPI before meeting.",
      },
      {
        q: "Do escorts in Mumbai provide outcall service to hotels?",
        a: "Yes, most independent companions in Mumbai provide outcall services to 4-star and 5-star luxury hotels across Bandra, BKC, Juhu, Andheri, and South Mumbai.",
      },
      {
        q: "What are the standard escort rates in Mumbai?",
        a: "Verified independent companion rates in Mumbai generally range from ₹12,000 to ₹35,000 for 1-2 hour sessions, with overnight appointments starting around ₹60,000 to ₹75,000.",
      },
    ],
  },
  {
    slug: "delhi",
    name: "Delhi",
    region: "Delhi",
    areas: ["South Delhi", "Connaught Place", "Aerocity", "Dwarka", "Vasant Kunj", "Karol Bagh", "Saket", "Hauz Khas", "Greater Kailash"],
    rateMin: 10000,
    rateMax: 70000,
    faqs: [
      {
        q: "Where do independent companions in Delhi provide services?",
        a: "Companions in Delhi cater to prime locations including South Delhi, luxury hotels in Aerocity, Connaught Place, and Central Delhi, as well as NCR regions like Gurgaon and Noida.",
      },
      {
        q: "Are the profile photos on Lovebite Delhi verified?",
        a: "Yes, Lovebite screens profiles through strict 18+ verification and automated duplicate-photo inspection to minimize fake or stolen listings.",
      },
      {
        q: "How do I avoid escort scams in Delhi NCR?",
        a: "Always insist on cash on meeting or pay only after greeting the companion in person at your hotel room. Anyone demanding advance UPI deposits, hotel room booking fees, or taxi fares upfront is a scammer.",
      },
    ],
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    region: "Karnataka",
    areas: ["Koramangala", "Indiranagar", "Whitefield", "HSR Layout", "MG Road", "Electronic City", "Jayanagar", "Marathahalli", "Hebbal"],
    rateMin: 12000,
    rateMax: 65000,
    faqs: [
      {
        q: "How do outcall bookings work in Bangalore?",
        a: "Share your hotel name and room details after booking your room. Independent companions in Bangalore travel directly to business hotels in tech hubs like Whitefield, Koramangala, and Central MG Road.",
      },
      {
        q: "What languages do Bangalore companions speak?",
        a: "Most independent companions in Bangalore are well-educated and speak fluent English, Hindi, and regional languages, catering well to corporate and tech business travellers.",
      },
    ],
  },
  {
    slug: "pune",
    name: "Pune",
    region: "Maharashtra",
    areas: ["Koregaon Park", "Viman Nagar", "Hinjewadi", "Kalyani Nagar", "Baner", "Wakad", "Shivaji Nagar", "Aundh", "Magarpatta"],
    rateMin: 10000,
    rateMax: 55000,
    faqs: [
      {
        q: "Are incall facilities available in Pune?",
        a: "Some independent escorts in Pune offer private, discreet incall apartments in Koregaon Park and Viman Nagar, while outcalls to 5-star hotels in Hinjewadi and central Pune are widely preferred.",
      },
    ],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    region: "Telangana",
    areas: ["Banjara Hills", "Jubilee Hills", "Hitech City", "Gachibowli", "Madhapur", "Kondapur", "Begumpet", "Somajiguda"],
    rateMin: 10000,
    rateMax: 60000,
    faqs: [
      {
        q: "Where do elite companions meet clients in Hyderabad?",
        a: "Popular locations include 5-star hotels across Banjara Hills, Jubilee Hills, and business hotels in Hitech City and Financial District Gachibowli.",
      },
    ],
  },
  {
    slug: "goa",
    name: "Goa",
    region: "Goa",
    areas: ["Calangute", "Baga", "Candolim", "Panaji", "Anjuna", "Arpora", "Colva", "Morjim", "Vagator"],
    rateMin: 15000,
    rateMax: 80000,
    faqs: [
      {
        q: "Can I book holiday and weekend companions in Goa?",
        a: "Yes, many independent companions offer vacation companion services, dinner dates, and overnight resort visits across North and South Goa beach properties.",
      },
      {
        q: "How do I avoid fake beach agency scams in Goa?",
        a: "Avoid roadside touts and unregistered flyers. Deal only with independent profiles on Lovebite who have direct phone or WhatsApp contact.",
      },
    ],
  },
  {
    slug: "kolkata",
    name: "Kolkata",
    region: "West Bengal",
    areas: ["Park Street", "Salt Lake", "New Town", "Ballygunge", "Alipore", "Howrah", "Rajarhat", "Gariahat"],
    rateMin: 8000,
    rateMax: 50000,
    faqs: [
      {
        q: "What is the typical pricing for call girls in Kolkata?",
        a: "Independent companions in Kolkata typically charge between ₹8,000 and ₹25,000 for standard 1 to 2 hour dates, with VIP overnight rates around ₹45,000 to ₹60,000.",
      },
    ],
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    region: "Rajasthan",
    areas: ["C-Scheme", "Vaishali Nagar", "Malviya Nagar", "Mansarovar", "MI Road", "Tonk Road", "Raja Park"],
    rateMin: 10000,
    rateMax: 50000,
    faqs: [
      {
        q: "Are companions available for heritage hotel visits in Jaipur?",
        a: "Yes, verified companions provide discreet outcall services to luxury heritage resorts and business hotels throughout Jaipur.",
      },
    ],
  },
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    region: "Gujarat",
    areas: ["SG Highway", "Bodakdev", "Satellite", "Vastrapur", "Prahlad Nagar", "Navrangpura", "Thaltej"],
    rateMin: 10000,
    rateMax: 55000,
    faqs: [
      {
        q: "How is privacy maintained when booking in Ahmedabad?",
        a: "Companions maintain complete discretion with private direct contact and prefer outcalls to reputable star-rated hotels along SG Highway and Prahlad Nagar.",
      },
    ],
  },
  {
    slug: "chandigarh",
    name: "Chandigarh",
    region: "Chandigarh",
    areas: ["Sector 17", "Sector 35", "Sector 22", "Sector 8", "Mohali", "Panchkula", "Zirakpur", "IT Park"],
    rateMin: 10000,
    rateMax: 50000,
    faqs: [
      {
        q: "Do Chandigarh companions travel to Mohali and Panchkula?",
        a: "Yes, most independent listings cover the entire Tricity area including Chandigarh, Mohali, Zirakpur, and Panchkula hotels.",
      },
    ],
  },
  {
    slug: "chennai",
    name: "Chennai",
    region: "Tamil Nadu",
    areas: ["T Nagar", "Nungambakkam", "OMR", "Velachery", "Anna Nagar", "Guindy", "ECR", "Alwarpet"],
    rateMin: 10000,
    rateMax: 60000,
    faqs: [
      {
        q: "What areas in Chennai have the highest companion availability?",
        a: "Popular areas include Nungambakkam, T Nagar, Guindy luxury hotels, and beachside resorts along ECR.",
      },
    ],
  },
  {
    slug: "lucknow",
    name: "Lucknow",
    region: "Uttar Pradesh",
    areas: ["Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar", "Vibhuti Khand", "Charbagh"],
    rateMin: 8000,
    rateMax: 45000,
    faqs: [
      {
        q: "Can I book outcall escorts in Gomti Nagar Lucknow?",
        a: "Yes, Gomti Nagar and Vibhuti Khand luxury hotels are the primary hubs for outcall companion appointments in Lucknow.",
      },
    ],
  },
  {
    slug: "noida",
    name: "Noida",
    region: "Uttar Pradesh",
    areas: ["Sector 18", "Sector 62", "Sector 50", "Sector 137", "Sector 15", "Greater Noida", "Pari Chowk"],
    rateMin: 10000,
    rateMax: 55000,
    faqs: [
      {
        q: "Are Noida escorts available for outcalls in Greater Noida?",
        a: "Yes, companions frequently travel across Sector 18, Expressway sectors, and Greater Noida star hotels.",
      },
    ],
  },
  {
    slug: "gurgaon",
    name: "Gurgaon",
    region: "Haryana",
    areas: ["DLF Cyber City", "Sector 29", "Golf Course Road", "Sohna Road", "Sector 56", "MG Road Gurgaon", "Udyog Vihar"],
    rateMin: 12000,
    rateMax: 70000,
    faqs: [
      {
        q: "How to hire executive corporate companions in Gurgaon?",
        a: "Directly connect via WhatsApp with verified profiles for meetings at premium business hotels around Cyber City and Golf Course Road.",
      },
    ],
  },
  {
    slug: "surat",
    name: "Surat",
    region: "Gujarat",
    areas: ["Vesu", "Dumas Road", "Adajan", "Varachha", "Piplod", "Ghod Dod Road"],
    rateMin: 9000,
    rateMax: 45000,
    faqs: [],
  },
  {
    slug: "indore",
    name: "Indore",
    region: "Madhya Pradesh",
    areas: ["Vijay Nagar", "Palasia", "AB Road", "Bhawar Kuan", "Sapna Sangeeta"],
    rateMin: 8000,
    rateMax: 45000,
    faqs: [],
  },
  {
    slug: "bhubaneswar",
    name: "Bhubaneswar",
    region: "Odisha",
    areas: ["Patia", "Saheed Nagar", "Nayapalli", "Jayadev Vihar", "Chandrasekharpur", "Khandagiri"],
    rateMin: 8000,
    rateMax: 40000,
    faqs: [],
  },
  {
    slug: "cochin",
    name: "Kochi",
    region: "Kerala",
    areas: ["Ernakulam", "Marine Drive", "MG Road", "Kakkanad", "Fort Kochi", "Edappally"],
    rateMin: 10000,
    rateMax: 50000,
    faqs: [],
  },
  {
    slug: "dehradun",
    name: "Dehradun",
    region: "Uttarakhand",
    areas: ["Rajpur Road", "Jakhan", "Sahastradhara Road", "Clement Town", "Ballupur"],
    rateMin: 8000,
    rateMax: 40000,
    faqs: [],
  },
  {
    slug: "patna",
    name: "Patna",
    region: "Bihar",
    areas: ["Bailey Road", "Kankarbagh", "Boring Road", "Fraser Road", "Danapur"],
    rateMin: 7000,
    rateMax: 35000,
    faqs: [],
  },
];

export const MAJOR_CITY_BY_SLUG = new Map<string, MajorCityDef>(
  MAJOR_CITIES.map((c) => [c.slug, c])
);
