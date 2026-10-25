import { EscortProfile } from "@/lib/profiles-types";
import { citySlug } from "@/lib/seo/site";
import { bioAdvertisesOtherCity } from "@/lib/seo/metadata";

interface ProfileDetailStaticProps {
  profile: EscortProfile;
}

export default function ProfileDetailStatic({ profile }: ProfileDetailStaticProps) {
  // Attributes the owner never filled in are left undefined by the DB mapper.
  // Render them as a dash rather than inventing a value.
  const attr = (label: string, value: string | undefined | null) => ({
    label,
    value: value ? value : "—",
  });

  // Build attribute rows for the table
  const attrRows: { label: string; value: React.ReactNode }[] = [
    { label: "Gender", value: profile.gender === "female" ? "Female" : profile.gender === "male" ? "Male" : "Trans" },
    attr("Age", profile.age != null ? `${profile.age}` : null),
    {
      label: "Location",
      value: (
        <a href={`/?city=${encodeURIComponent(profile.city)}`} className="profile-attr-link">
          {profile.localArea ? `${profile.localArea}, ` : ""}{profile.city}{profile.state ? `, ${profile.state}` : ""}
        </a>
      ),
    },
    attr("Eyes", profile.eyes),
    attr("Hair color", profile.hairColor || profile.hair),
    attr("Hair length", profile.hairLength),
    attr("Pubic hair", profile.pubicHair),
    attr("Bust size", profile.bustSize || profile.bust),
    attr("Bust type", profile.bustType),
    attr("Travel", profile.travel?.join(", ")),
    attr("Weight", profile.weight),
    attr("Height", profile.height),
    attr("Ethnicity", profile.ethnicity),
    attr("Orientation", profile.orientation),
    attr("Smoker", profile.smoker),
    attr("Tattoo", profile.tattoo),
    attr("Piercing", profile.piercing),
    attr("Nationality", profile.nationality || profile.country),
    attr("Languages", profile.languages.length > 0 ? profile.languages.join(", ") : null),
    attr("Available for", profile.availableFor?.join(" + ")),
    attr("Meeting with", profile.meetingWith?.join(", ")),
  ];

  return (
    <div className="pdv-info-col">
      {/* Header Card */}
      <div className="pdv-profile-header">
        <div className="pdv-header-top">
          <div>
            <h1 className="pdv-name">
              {profile.name}
              {profile.badges.includes("Verified") && (
                <span className="pdv-verified-check" title="Verified Profile">✓</span>
              )}
            </h1>
            <p className="pdv-tagline">{profile.tagline}</p>
          </div>
        </div>

        {/* Meta Row: Views, Working Hours, Status. */}
        <div className="pdv-meta-row">
          {profile.views != null && (
            <span className="pdv-meta-item">
              <span className="pdv-meta-icon">👁</span>
              <strong>{profile.views.toLocaleString()}</strong> views
            </span>
          )}
          {profile.views != null && profile.workingHours && (
            <span className="pdv-meta-dot">•</span>
          )}
          {profile.workingHours && (
            <span className="pdv-meta-item">
              <span className="pdv-meta-icon">🕒</span>
              {profile.workingHours}
            </span>
          )}
          <span className="pdv-meta-dot">•</span>
          <span className="pdv-meta-item pdv-meta-item--online">
            <span className="pdv-status-dot" />
            {profile.lastSeen || "Online today"}
          </span>
        </div>
      </div>

      {/* Full Two-Column Attribute Table */}
      <div className="pdv-card-section">
        <h2 className="pdv-card-section__title">Physical & Personal Attributes</h2>
        <table className="pdv-attr-table">
          <tbody>
            {attrRows.map((row, i) => (
              <tr key={i} className="pdv-attr-row">
                <td className="pdv-attr-label">{row.label}</td>
                <td className="pdv-attr-value">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rates Table (INR) */}
      <div className="pdv-card-section">
        <h2 className="pdv-card-section__title">Rates & Pricing (INR)</h2>
        {(() => {
          const hasTwoTiers = profile.rates && profile.rates.some(
            (r) => r.outcall && r.outcall !== "—" && r.outcall.trim() !== "" && r.outcall !== r.incall
          );
          return (
            <div className="rates-table-wrap">
              <table className="rates-table">
                <thead>
                  <tr>
                    <th scope="col">Duration</th>
                    <th scope="col">{hasTwoTiers ? "Standard Rate" : "Rate (INR)"}</th>
                    {hasTwoTiers && <th scope="col">Premium Rate</th>}
                  </tr>
                </thead>
                <tbody>
                  {profile.rates.map((rate, i) => (
                    <tr key={i}>
                      <td className="rate-duration">{rate.duration}</td>
                      <td className="rate-price">{rate.incall}</td>
                      {hasTwoTiers && (
                        <td className="rate-price rate-price--outcall rate-price--premium">{rate.outcall}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })()}
      </div>

      {/* About Me */}
      <div className="pdv-card-section">
        <h2 className="pdv-card-section__title">About {profile.name}</h2>
        {(() => {
          // A bio written about a different city is withheld rather than
          // rendered. Publishing it would put the page in competition with a
          // city the listing is not in, which misleads visitors and reads to
          // a crawler as a doorway page. See `bioAdvertisesOtherCity`.
          if (bioAdvertisesOtherCity(profile)) {
            return (
              <div className="profile-about-text">
                <p>
                  This listing does not currently include a description. Contact{" "}
                  {profile.name} directly to ask about availability, services and
                  rates.
                </p>
              </div>
            );
          }

          const paragraphs = profile.about.split("\n").filter((p) => p.trim());
          if (paragraphs.length === 0) {
            return (
              <div className="profile-about-text">
                <p>
                  This listing does not currently include a description. Contact{" "}
                  {profile.name} directly to ask about availability, services and
                  rates.
                </p>
              </div>
            );
          }

          return (
            <div className="profile-about-text">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Services Checklist */}
      <div className="pdv-card-section">
        <h2 className="pdv-card-section__title">Services & Specialities</h2>
        <div className="services-grid">
          {profile.services.map((svc, i) => (
            <div
              key={i}
              className={`service-item ${svc.available ? "service-item--available" : "service-item--unavailable"}`}
            >
              <span className="service-icon">{svc.available ? "✓" : "✕"}</span>
              <span className="service-name">{svc.name}</span>
              {svc.extraCharge && (
                <span className="service-extra">({svc.extraCharge})</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}