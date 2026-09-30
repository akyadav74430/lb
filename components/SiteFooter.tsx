import Link from "next/link";
import Logo from "@/components/Logo";
import { listCitiesWithListings } from "@/lib/seo/profiles";

/**
 * Site-wide footer.
 *
 * The city column is generated from cities that actually have public listings,
 * so every link here is a real, indexable landing page rather than a filter URL.
 */
export default async function SiteFooter() {
  const cities = await listCitiesWithListings();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand__logo">
              <Logo size="footer" />
            </div>
            <p className="footer-brand__desc">
              A city-wise directory of independent escorts, call girls and companions in
              India. Profiles are reviewed before they are published, and every listing
              links straight to the profile page.
            </p>
            <div className="footer-social">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer-social__link" aria-label="X">𝕏</a>
              <a href="https://t.me/lovebite_Official" target="_blank" rel="noopener noreferrer" className="footer-social__link" aria-label="Telegram">✈</a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col__title">Cities With Listings</h4>
            <div className="footer-col__list">
              {cities.length > 0 ? (
                cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/city/${city.slug}`}
                    className="footer-col__link"
                  >
                    Escorts in {city.name}
                  </Link>
                ))
              ) : (
                <span className="footer-col__link">No published listings yet</span>
              )}
              <Link href="/escorts" className="footer-col__link">
                All escorts in India
              </Link>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col__title">Services</h4>
            <div className="footer-col__list">
              <Link href="/escorts" className="footer-col__link">Escorts &amp; Call Girls</Link>
              <Link href="/?filter=vip" className="footer-col__link">VIP Escorts</Link>
              <Link href="/?filter=massages" className="footer-col__link">Sensual Massage</Link>
              <Link href="/?filter=citytour" className="footer-col__link">City Tours</Link>
              <Link href="/?filter=videos" className="footer-col__link">Video Verified</Link>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col__title">Information</h4>
            <div className="footer-col__list">
              <Link href="/about" className="footer-col__link">About Us</Link>
              <Link href="/advertise" className="footer-col__link">Advertise (INR)</Link>
              <Link href="/contact" className="footer-col__link">Contact</Link>
              <Link href="/faq" className="footer-col__link">FAQ</Link>
              <Link href="/reviews" className="footer-col__link">Reviews</Link>
              <Link href="/blacklist" className="footer-col__link">Blacklist</Link>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col__title">Legal</h4>
            <div className="footer-col__list">
              <Link href="/terms" className="footer-col__link">Terms of Service</Link>
              <Link href="/privacy" className="footer-col__link">Privacy Policy</Link>
              <Link href="/privacy" className="footer-col__link">Cookie Policy</Link>
              <Link href="/dmca" className="footer-col__link">DMCA Compliance</Link>
              <Link href="/dmca" className="footer-col__link">18+ Statement</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2012–2026 Lovebite. All rights reserved. 18+ Adult Directory.</span>
          <div className="footer-bottom__links">
            <Link href="/terms" className="footer-bottom__link">Terms</Link>
            <Link href="/privacy" className="footer-bottom__link">Privacy</Link>
            <Link href="/dmca" className="footer-bottom__link">DMCA</Link>
            <Link href="/sitemap.xml" className="footer-bottom__link">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}