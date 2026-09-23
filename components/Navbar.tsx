"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Logo from "./Logo";

const CITIES = [
  "Bangalore", "Mumbai", "Delhi", "Chennai", "Pune",
  "Kolkata", "Hyderabad", "Ahmedabad", "Jaipur",
];

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="navbar">
      <div className="navbar__top">
        <Logo size="header" />

        <div className="navbar__actions">
          {status !== "loading" && (
            <>
              {session ? (
                <>
                  <Link href="/profile/edit" className="navbar__icon-btn" title="My Profile">
                    👤
                  </Link>
                  <button
                    className="navbar__icon-btn"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    title="Sign out"
                  >
                    🚪
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth" className="btn--post" title="Sign in / Sign up">
                    🔑 Sign In
                  </Link>
                </>
              )}
            </>
          )}
          {session && (
            <Link href="/signup" className="btn--post">
              📋 Post Your Profile
            </Link>
          )}
        </div>
      </div>

      <nav className="navbar__subnav" aria-label="Browse by city">
        <div className="navbar__subnav-inner">
          {CITIES.map((city) => (
            <Link
              key={city}
              href={`/?city=${encodeURIComponent(city)}`}
              className="navbar__city"
            >
              {city} Directory
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
