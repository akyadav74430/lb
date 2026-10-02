/**
 * Hand-written, per-city editorial copy for high-intent Indian cities.
 *
 * Each city page overrides the generic template with rich, locally relevant
 * paragraphs detailing companion culture, star hotel zones, rates, discretion,
 * and anti-scam warnings.
 */
export interface CityEditorial {
  /** Replaces the generated opening paragraph(s). */
  intro?: string[];
  /** Replaces the generated "areas listed" sentence. */
  areasNote?: string;
  /** Replaces the generated rate-spread sentence. */
  ratesNote?: string;
  /** Extra factual paragraphs appended after the generated body. */
  extra?: string[];
}

export const CITY_EDITORIAL: Record<string, CityEditorial> = {
  mumbai: {
    intro: [
      "Looking for verified call girls and independent escorts in Mumbai? Lovebite provides a secure, curated directory of elite female companions across the Financial Capital of India. Whether you are visiting Mumbai for high-powered corporate meetings in BKC, staying at a luxury sea-facing hotel in Colaba, or seeking an unhurried dinner date companion in Bandra or Juhu, our platform connects you directly with genuine independent profiles.",
      "Every escort listing on Lovebite is self-published and photo-screened for authenticity. There are no middleman commissions or hidden booking agency costs. You review real photographs, published rates, and personal bios, then connect directly with the companion via WhatsApp or phone call.",
    ],
    areasNote:
      "Mumbai companions cater to both incall and outcall bookings across South Mumbai (Colaba, Nariman Point, Marine Drive, Worli), Western Suburbs (Bandra West, Khar, Juhu, Andheri West, Powai), and major business hubs including Bandra-Kurla Complex (BKC) and Navi Mumbai.",
    ratesNote:
      "Published rates for verified independent escorts in Mumbai generally start around ₹12,000 to ₹25,000 for standard 1 to 2 hour rendezvous, with VIP overnight hotel stays starting from ₹60,000 onwards.",
    extra: [
      "Safety & Anti-Scam Protocol: Never transfer advance deposits, security fees, or taxi fares via UPI or bank transfer before meeting in person. Genuine independent escorts in Mumbai only accept payment after arriving at your confirmed 4-star or 5-star hotel room.",
      "Most independent companions in Mumbai are well-educated, multilingual (fluent in English and Hindi), and accustomed to accompanying discerning corporate executives, NRI visitors, and discerning gentlemen.",
    ],
  },
  delhi: {
    intro: [
      "Discover verified independent call girls and VIP escorts in Delhi NCR. Lovebite connects visitors and local residents with authentic companion listings across South Delhi, Aerocity, Connaught Place, and Central Delhi. Each profile provides verified photographs, transparent pricing, and direct contact options without agency intermediaries.",
      "Delhi is a bustling metropolis that hosts thousands of diplomats, business travelers, and luxury hotel guests daily. Whether you are staying near Delhi Airport Aerocity for a short layover or relaxing at a boutique South Delhi property, you can find respectful, charming companions who value mutual discretion.",
    ],
    areasNote:
      "Companions listed in Delhi cover high-demand localities including South Delhi (Greater Kailash, Saket, Vasant Kunj, Hauz Khas), Central Delhi (Connaught Place, Chanakyapuri), Aerocity hospitality district, as well as NCR corridors including Gurgaon Cyber City and Noida.",
    ratesNote:
      "Rates in Delhi typically start from ₹10,000 to ₹22,000 for short duration dates, with comprehensive dinner dates and overnight companion services ranging between ₹40,000 and ₹70,000.",
    extra: [
      "Hotel Hospitality Guidelines: Aerocity and luxury 5-star hotels in Central/South Delhi are the safest and most private settings for outcall appointments. Always book your room under your own name and receive your guest directly at your room.",
      "Lovebite strictly prohibits advance fee requests. Report any user who demands advance UPI payments or booking deposits.",
    ],
  },
  bangalore: {
    intro: [
      "Find genuine independent call girls and VIP escorts in Bangalore (Bengaluru), India's premier technology and startup capital. Lovebite features real companion profiles with verified photos, published services, and direct contact numbers.",
      "Whether you are wrapping up a demanding tech summit in Whitefield or Electronic City, or enjoying the vibrant nightlife in Indiranagar and Koramangala, our independent companions offer refined, engaging, and relaxing company tailored to your schedule.",
    ],
    areasNote:
      "Popular Bangalore companion hubs include Koramangala, Indiranagar, MG Road, Whitefield tech parks, HSR Layout, Electronic City, and luxury business hotels along Outer Ring Road and Hebbal.",
    ratesNote:
      "Companion rates in Bengaluru generally range from ₹12,000 to ₹25,000 for 1-2 hours, with full evening and overnight packages ranging from ₹50,000 to ₹65,000.",
    extra: [
      "Discretion and privacy are paramount. Independent Bangalore companions are chosen for their conversational ease, elegance, and understanding of professional etiquette.",
    ],
  },
  pune: {
    intro: [
      "Explore verified independent escorts and call girls in Pune on Lovebite. Pune blends rich cultural heritage with a sprawling IT and automotive corridor, making it a frequent destination for corporate travelers and entrepreneurs.",
      "Our verified listings in Pune feature real photos, clear service offerings, and direct WhatsApp communication for hassle-free, discreet bookings.",
    ],
    areasNote:
      "Listings cover prime residential and commercial zones including Koregaon Park (KP), Viman Nagar, Hinjewadi IT Park, Kalyani Nagar, Baner, and Magarpatta City.",
    ratesNote:
      "Standard companion rates in Pune start around ₹10,000 to ₹20,000 for short dates, with overnight sessions ranging between ₹40,000 and ₹55,000.",
    extra: [
      "Avoid street agents and fake online classifieds in Pune. Connect directly with independently verified individuals on Lovebite for guaranteed safety and unhurried service.",
    ],
  },
  hyderabad: {
    intro: [
      "Looking for verified call girls in Hyderabad? Lovebite presents a premier directory of independent escorts across Cyberabad and Greater Hyderabad. All profiles feature authentic photo galleries, published rates, and private contact lines.",
      "From high-profile business visits in Hitech City and Gachibowli to relaxed evenings near Banjara Hills and Jubilee Hills, connect with elegant companions who ensure complete confidentiality.",
    ],
    areasNote:
      "Companions serve major upscale localities including Banjara Hills, Jubilee Hills, Hitech City, Gachibowli Financial District, Madhapur, and Begumpet.",
    ratesNote:
      "Rates in Hyderabad typically range from ₹10,000 to ₹25,000 for 1-2 hours, with overnight companion packages priced between ₹45,000 and ₹60,000.",
  },
  goa: {
    intro: [
      "Experience unforgettable holiday companionship with verified call girls and independent escorts in Goa. Whether you are vacationing along the sunny beaches of North Goa or relaxing in luxury villas in South Goa, Lovebite offers transparent, verified profiles.",
      "Skip shady beach touts and fraudulent agencies. Book independent, verified companions directly for beach resort dinners, pool parties, clubbing, and private overnight romance.",
    ],
    areasNote:
      "Goa listings cover popular beachfront destinations such as Calangute, Baga, Candolim, Anjuna, Panaji, Morjim, and luxury resorts across South Goa (Colva, Cavelossim).",
    ratesNote:
      "Vacation and overnight companion rates in Goa typically start around ₹15,000 for standard meetings, with full weekend getaway packages starting from ₹75,000 to ₹1,20,000.",
    extra: [
      "Scam Warning in Goa: Beachside flyers and touts operating around Baga and Calangute frequently run advance payment extortion scams. Always book through verified independent profiles on Lovebite where you pay only after meeting.",
    ],
  },
  kolkata: {
    intro: [
      "Browse verified independent escorts and call girls in Kolkata on Lovebite. The City of Joy has a long-standing tradition of gracious hospitality, and our independent companion listings offer authentic charm, warmth, and discretion.",
      "Find companions for luxury hotel meetings near Park Street, Salt Lake Sector V, and Rajarhat New Town with verified photos and direct phone or WhatsApp contact.",
    ],
    areasNote:
      "Localities covered include Park Street, Ballygunge, Alipore, Salt Lake (Sector V), New Town Rajarhat, and luxury hotels along the EM Bypass.",
    ratesNote:
      "Independent companion rates in Kolkata range from ₹8,000 to ₹20,000 for short sessions, and ₹35,000 to ₹50,000 for overnight bookings.",
  },
  jaipur: {
    intro: [
      "Find elite call girls and verified escorts in Jaipur, the Pink City of Rajasthan. Lovebite connects luxury tourists, business guests, and local professionals with independent companions providing outcall services to heritage properties and star hotels.",
      "Enjoy enchanting company for royal heritage dinners, luxury suite relaxation, and unhurried intimacy with verified profiles.",
    ],
    areasNote:
      "Key areas include C-Scheme, Vaishali Nagar, Malviya Nagar, Mansarovar, MI Road, and heritage resort properties along Delhi-Jaipur highway.",
    ratesNote:
      "Rates in Jaipur typically range from ₹10,000 to ₹22,000 for short dates, and ₹40,000 to ₹55,000 for overnight rendezvous.",
  },
  ahmedabad: {
    intro: [
      "Verified independent call girls and escorts in Ahmedabad on Lovebite. Explore high-profile companion listings offering discreet hotel outcalls across Gujarat's largest commercial hub.",
      "Every listing features authentic photographs, published prices, and direct WhatsApp contact for complete peace of mind.",
    ],
    areasNote:
      "Companions cater to prominent business areas including SG Highway, Prahlad Nagar, Bodakdev, Satellite, Vastrapur, and luxury hotels in central Ahmedabad.",
    ratesNote:
      "Independent rates in Ahmedabad start from ₹10,000 to ₹20,000 for standard sessions, with overnight dates around ₹40,000 to ₹55,000.",
  },
  chandigarh: {
    intro: [
      "Find genuine call girls in Chandigarh and Tricity (Mohali & Panchkula) on Lovebite. Known for its clean architecture and modern lifestyle, Chandigarh hosts sophisticated independent companions who provide polite, private, and memorable company.",
      "Browse real photos, verified phone numbers, and published rates for hotel outcalls across Sector 17, Sector 35, and IT Park.",
    ],
    areasNote:
      "Covering Chandigarh sectors (Sector 17, 35, 22, 8, 9), Mohali Phase 7 & 8, Panchkula, and Zirakpur hotel belt.",
    ratesNote:
      "Tricity companion rates start from ₹10,000 to ₹22,000 for 1-2 hours, and ₹40,000 to ₹50,000 for overnight dates.",
  },
  chennai: {
    intro: [
      "Connect with verified independent call girls and escorts in Chennai on Lovebite. Chennai is South India's bustling corporate, automotive, and healthcare center.",
      "Our verified companions offer refined company, fluent conversational skills, and absolute discretion for business travelers staying in Nungambakkam, T Nagar, or OMR.",
    ],
    areasNote:
      "Areas covered include T Nagar, Nungambakkam, Guindy luxury hotels, OMR IT corridor, Anna Nagar, and ECR beach resorts.",
    ratesNote:
      "Rates in Chennai typically range between ₹10,000 and ₹25,000 for standard meetings, and ₹45,000 to ₹60,000 for overnight visits.",
  },
  lucknow: {
    intro: [
      "Verified call girls and independent escorts in Lucknow, the City of Nawabs. Lovebite features respectful, charming companions who understand true hospitality and discretion.",
      "Meet companions for discreet hotel outcalls in Gomti Nagar and Hazratganj with zero agency hassle and 100% verified real photos.",
    ],
    areasNote:
      "Key coverage areas include Gomti Nagar, Vibhuti Khand, Hazratganj, Indira Nagar, and Aliganj.",
    ratesNote:
      "Companion rates in Lucknow range from ₹8,000 to ₹18,000 for 1-2 hours, and ₹35,000 to ₹45,000 for full night rendezvous.",
  },
  noida: {
    intro: [
      "Find verified call girls and VIP escorts in Noida and Greater Noida. Lovebite lists independent companions ready for discreet appointments at 4-star and 5-star hotels along the Noida-Greater Noida Expressway.",
      "Direct WhatsApp contact, authentic photos, and published rates ensure a seamless, transparent experience.",
    ],
    areasNote:
      "Covering Sector 18, Sector 62, Sector 50, Sector 137, Expressway star hotels, and Greater Noida Pari Chowk.",
    ratesNote:
      "Rates start from ₹10,000 to ₹20,000 for 1-2 hour sessions, with overnight rates around ₹40,000 to ₹55,000.",
  },
  gurgaon: {
    intro: [
      "Elite call girls and executive escorts in Gurgaon (Gurugram). As the Millennium City hosting Fortune 500 headquarters, Gurgaon demands top-tier companionship.",
      "Lovebite features polished, English-speaking independent companions perfect for dinner dates at Cyber Hub, business trips, and private luxury suite relaxation.",
    ],
    areasNote:
      "Major locations include DLF Cyber City, Sector 29, Golf Course Road, Golf Course Extension, Sohna Road, and MG Road luxury hotels.",
    ratesNote:
      "Gurgaon companion rates start from ₹12,000 to ₹25,000 for 1-2 hours, and ₹50,000 to ₹70,000 for overnight appointments.",
  },
};
