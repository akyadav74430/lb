"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Stats {
  totalUsers: number;
  totalProfiles: number;
  pendingProfiles: number;
  pendingReports: number;
  totalPhotos: number;
  completionRate: number;
}

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  isSuspended: boolean;
  createdAt: string;
  profile: {
    id: string;
    city: string | null;
    region: string | null;
    status: string;
    visibility: string;
  } | null;
}

interface ProfileItem {
  id: string;
  userId: string;
  user: { id: string; name: string; email: string; role: string };
  city: string | null;
  region: string | null;
  district: string | null;
  localArea: string | null;
  bio: string | null;
  status: string;
  visibility: string;
  ageConfirmed: boolean;
  consentRecorded: boolean;
  consentTimestamp: string | null;
  rejectionReason: string | null;
  updatedAt: string;
  photos: { id: string; url: string; order: number; isPrimary: boolean; sha256Hash: string | null }[];
  rates?: { id: string; duration: string; incall: number; outcall: number; order: number }[];
  reports?: ReportItem[];
}

interface ReportItem {
  id: string;
  profileId: string;
  category: string;
  description: string;
  status: string;
  actionTaken: string | null;
  ipAddress: string | null;
  createdAt: string;
  profile: {
    id: string;
    city: string | null;
    region: string | null;
    photoUrl: string | null;
    status: string;
    user: { id: string; name: string; email: string };
  };
  reporter: { id: string; name: string; email: string } | null;
}

interface DuplicateCluster {
  hash: string;
  count: number;
  photos: {
    id: string;
    url: string;
    profile: {
      id: string;
      city: string | null;
      user: { name: string; email: string };
    };
  }[];
}

interface AuditLogItem {
  id: string;
  userId: string | null;
  action: string;
  details: string | null;
  ipAddress: string | null;
  createdAt: string;
  user: { name: string; email: string } | null;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"overview" | "pending" | "reports" | "photos" | "users" | "logs">("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [pendingProfiles, setPendingProfiles] = useState<ProfileItem[]>([]);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [duplicates, setDuplicates] = useState<DuplicateCluster[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Reject modal state
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectTargetId, setRejectTargetId] = useState<string | null>(null);
  const [rejectActionType, setRejectActionType] = useState<"REJECT" | "REQUEST_CHANGES">("REJECT");
  const [rejectReason, setRejectReason] = useState("");
  const [actionProcessing, setActionProcessing] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    try {
      const [statsRes, modRes, usersRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/moderation"),
        fetch("/api/admin/users"),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }

      if (modRes.ok) {
        const modData = await modRes.json();
        setPendingProfiles(modData.pendingProfiles || []);
        setReports(modData.reports || []);
        setDuplicates(modData.duplicateClusters || []);
        setAuditLogs(modData.auditLogs || []);
      }

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users || []);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/signin");
    } else if (status === "authenticated") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchDashboardData();
    }
  }, [status, router, fetchDashboardData]);

  // Execute Profile Action
  const handleProfileAction = async (profileId: string, action: string, reason?: string) => {
    if (action === "REJECT" || action === "REQUEST_CHANGES") {
      setRejectTargetId(profileId);
      setRejectActionType(action as "REJECT" | "REQUEST_CHANGES");
      setRejectModalOpen(true);
      return;
    }

    if (!confirm(`Are you sure you want to ${action} this profile?`)) return;

    setActionProcessing(true);
    try {
      const res = await fetch("/api/admin/moderation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType: "PROFILE",
          targetId: profileId,
          action,
          reason: reason || null,
        }),
      });

      if (res.ok) {
        await fetchDashboardData();
      } else {
        const err = await res.json();
        alert(err.error || "Action failed");
      }
    } finally {
      setActionProcessing(false);
    }
  };

  const handleConfirmReject = async () => {
    if (!rejectTargetId || !rejectReason.trim()) {
      alert("Please provide an explicit reason");
      return;
    }

    setActionProcessing(true);
    try {
      const res = await fetch("/api/admin/moderation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType: "PROFILE",
          targetId: rejectTargetId,
          action: rejectActionType,
          reason: rejectReason.trim(),
        }),
      });

      if (res.ok) {
        setRejectModalOpen(false);
        setRejectReason("");
        setRejectTargetId(null);
        await fetchDashboardData();
      } else {
        const err = await res.json();
        alert(err.error || "Action failed");
      }
    } finally {
      setActionProcessing(false);
    }
  };

  // Handle Report Action
  const handleReportAction = async (reportId: string, action: "RESOLVE" | "DISMISS" | "INVESTIGATING") => {
    const res = await fetch("/api/admin/moderation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetType: "REPORT",
        targetId: reportId,
        action: action === "RESOLVE" ? "APPROVE" : action === "DISMISS" ? "REJECT" : "REQUEST_CHANGES",
        reason: `Marked as ${action}`,
      }),
    });

    if (res.ok) {
      await fetchDashboardData();
    }
  };

  // Handle User Role / Suspension
  const handleUserRoleChange = async (userId: string, newRole: string) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: newRole }),
    });
    if (res.ok) {
      await fetchDashboardData();
    } else {
      const err = await res.json();
      alert(err.error || "Failed to update role");
    }
  };

  const handleToggleSuspend = async (userId: string, currentSuspended: boolean) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, isSuspended: !currentSuspended }),
    });
    if (res.ok) {
      await fetchDashboardData();
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to permanently delete this user and all associated profile data?")) return;
    const res = await fetch(`/api/admin/users?id=${userId}`, { method: "DELETE" });
    if (res.ok) {
      await fetchDashboardData();
    } else {
      const err = await res.json();
      alert(err.error || "Failed to delete user");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="admin-dash">
        <div className="admin-dash__body" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🛡️</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-muted)" }}>Loading Security &amp; Moderation Center…</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dash" style={{ minHeight: "100vh", background: "#0e0e12" }}>
      {/* Header */}
      <header className="admin-dash__header" style={{ background: "#16161c", borderBottom: "1px solid #272732", padding: "12px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/" className="admin-dash__logo" style={{ fontSize: 18, fontWeight: 700, color: "#fff", textDecoration: "none" }}>
            🛡️ lovebite.com <span style={{ color: "#e11d48", fontSize: 13, padding: "2px 6px", background: "rgba(225,29,72,0.15)", borderRadius: 4, marginLeft: 6 }}>Trust &amp; Safety</span>
          </Link>
        </div>

        <nav className="admin-dash__nav" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 13, color: "#9ca3af" }}>
            Signed in as: <strong style={{ color: "#fff" }}>{session?.user?.name || "Admin"}</strong> ({(session?.user as { role?: string } | undefined)?.role || "ADMIN"})
          </span>
          <Link href="/" className="admin-dash__nav-link" style={{ color: "#e5e7eb", textDecoration: "none", fontSize: 13 }}>
            View Site
          </Link>
          <button
            className="admin-dash__nav-link"
            onClick={() => signOut({ callbackUrl: "/admin/signin" })}
            style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid #ef4444", color: "#f87171", padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}
          >
            Sign Out
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="admin-dash__body" style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 20px" }}>
        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: 8, borderBottom: "1px solid #272732", paddingBottom: 12, marginBottom: 24, overflowX: "auto" }}>
          {[
            { id: "overview", label: "📊 Overview", count: null },
            { id: "pending", label: "⏳ Pending Profiles", count: pendingProfiles.length },
            { id: "reports", label: "🚩 Reports Queue", count: reports.filter((r) => r.status === "PENDING").length },
            { id: "photos", label: "🔍 Duplicates & Photos", count: duplicates.length },
            { id: "users", label: "👥 Users & Roles", count: users.length },
            { id: "logs", label: "📜 Audit Logs", count: null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "overview" | "pending" | "reports" | "photos" | "users" | "logs")}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: activeTab === tab.id ? "1px solid #e11d48" : "1px solid transparent",
                background: activeTab === tab.id ? "rgba(225, 29, 72, 0.15)" : "#1a1a24",
                color: activeTab === tab.id ? "#fff" : "#9ca3af",
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>{tab.label}</span>
              {tab.count !== null && tab.count > 0 && (
                <span
                  style={{
                    background: tab.id === "reports" || tab.id === "pending" ? "#e11d48" : "#374151",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "2px 6px",
                    borderRadius: 10,
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ══════════════ TAB 1: OVERVIEW ══════════════ */}
        {activeTab === "overview" && (
          <div>
            <div className="admin-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
              <div className="admin-stat" style={{ background: "#181824", border: "1px solid #282838", padding: 20, borderRadius: 10 }}>
                <div style={{ color: "#9ca3af", fontSize: 13, fontWeight: 600 }}>Total Users</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginTop: 4 }}>{stats?.totalUsers ?? 0}</div>
              </div>

              <div className="admin-stat" style={{ background: "#181824", border: "1px solid #282838", padding: 20, borderRadius: 10 }}>
                <div style={{ color: "#9ca3af", fontSize: 13, fontWeight: 600 }}>Published Profiles</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#10b981", marginTop: 4 }}>{stats?.totalProfiles ?? 0}</div>
              </div>

              <div className="admin-stat" style={{ background: "#181824", border: "1px solid #282838", padding: 20, borderRadius: 10 }}>
                <div style={{ color: "#9ca3af", fontSize: 13, fontWeight: 600 }}>Pending Review</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: (stats?.pendingProfiles ?? 0) > 0 ? "#f59e0b" : "#fff", marginTop: 4 }}>
                  {stats?.pendingProfiles ?? 0}
                </div>
              </div>

              <div className="admin-stat" style={{ background: "#181824", border: "1px solid #282838", padding: 20, borderRadius: 10 }}>
                <div style={{ color: "#9ca3af", fontSize: 13, fontWeight: 600 }}>Open Reports</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: (stats?.pendingReports ?? 0) > 0 ? "#ef4444" : "#fff", marginTop: 4 }}>
                  {stats?.pendingReports ?? 0}
                </div>
              </div>

              <div className="admin-stat" style={{ background: "#181824", border: "1px solid #282838", padding: 20, borderRadius: 10 }}>
                <div style={{ color: "#9ca3af", fontSize: 13, fontWeight: 600 }}>Photo Assets</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#8b5cf6", marginTop: 4 }}>{stats?.totalPhotos ?? 0}</div>
              </div>
            </div>

            {/* Quick Action Alerts */}
            {(pendingProfiles.length > 0 || reports.filter((r) => r.status === "PENDING").length > 0) && (
              <div style={{ background: "rgba(225, 29, 72, 0.08)", border: "1px solid rgba(225, 29, 72, 0.3)", borderRadius: 10, padding: 20, marginBottom: 24 }}>
                <h3 style={{ margin: "0 0 8px", color: "#fda4af", fontSize: 16 }}>⚠️ Items Requiring Action</h3>
                <p style={{ margin: 0, fontSize: 14, color: "#e5e7eb" }}>
                  You have <strong>{pendingProfiles.length}</strong> companion profile(s) awaiting moderation review and <strong>{reports.filter((r) => r.status === "PENDING").length}</strong> unresolved user safety report(s).
                </p>
              </div>
            )}
          </div>
        )}

        {/* ══════════════ TAB 2: PENDING PROFILES ══════════════ */}
        {activeTab === "pending" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
              Profiles Awaiting Moderation ({pendingProfiles.length})
            </h2>

            {pendingProfiles.length === 0 ? (
              <div style={{ background: "#181824", border: "1px solid #282838", padding: 48, borderRadius: 10, textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>✓</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>Queue is empty</div>
                <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>All companion profiles have been reviewed and approved.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {pendingProfiles.map((p) => (
                  <div key={p.id} style={{ background: "#181824", border: "1px solid #282838", borderRadius: 10, padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#fff" }}>{p.user.name}</h3>
                          <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 4, background: "#f59e0b", color: "#000", fontWeight: 700 }}>
                            {p.status}
                          </span>
                        </div>
                        <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>
                          Email: <strong>{p.user.email}</strong> • Location: <strong>{p.city || "—"}, {p.region || "India"}</strong>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: "flex", gap: 10 }}>
                        <button
                          onClick={() => handleProfileAction(p.id, "APPROVE")}
                          disabled={actionProcessing}
                          style={{ background: "#10b981", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: 13 }}
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={() => handleProfileAction(p.id, "REQUEST_CHANGES")}
                          disabled={actionProcessing}
                          style={{ background: "#f59e0b", border: "none", color: "#000", padding: "8px 14px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: 13 }}
                        >
                          ⚠️ Request Changes
                        </button>
                        <button
                          onClick={() => handleProfileAction(p.id, "REJECT")}
                          disabled={actionProcessing}
                          style={{ background: "#ef4444", border: "none", color: "#fff", padding: "8px 14px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: 13 }}
                        >
                          ✕ Reject
                        </button>
                      </div>
                    </div>

                    {/* Bio & Details */}
                    {p.bio && (
                      <div style={{ background: "#121218", padding: 12, borderRadius: 6, marginTop: 14, fontSize: 13, color: "#d1d5db" }}>
                        <strong>Bio:</strong> {p.bio}
                      </div>
                    )}

                    {/* Consent & Age Declaration Badge */}
                    <div style={{ display: "flex", gap: 16, marginTop: 14, fontSize: 12, color: "#9ca3af" }}>
                      <span style={{ color: p.ageConfirmed ? "#10b981" : "#ef4444" }}>
                        {p.ageConfirmed ? "✓ 18+ Age Verified" : "✕ Age Not Confirmed"}
                      </span>
                      <span style={{ color: p.consentRecorded ? "#10b981" : "#ef4444" }}>
                        {p.consentRecorded ? `✓ Consent Logged (${p.consentTimestamp ? new Date(p.consentTimestamp).toLocaleDateString() : "Active"})` : "✕ No Consent Logged"}
                      </span>
                    </div>

                    {/* Photo Gallery Grid */}
                    <div style={{ marginTop: 16 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#e5e7eb", marginBottom: 8 }}>
                        Uploaded Photos ({p.photos.length}):
                      </div>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        {p.photos.map((photo) => (
                          <div key={photo.id} style={{ position: "relative", width: 100, height: 130, borderRadius: 6, overflow: "hidden", border: photo.isPrimary ? "2px solid #e11d48" : "1px solid #333" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={photo.url} alt="Photo thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            {photo.isPrimary && (
                              <span style={{ position: "absolute", top: 4, left: 4, background: "#e11d48", color: "#fff", fontSize: 9, fontWeight: 700, padding: "1px 4px", borderRadius: 2 }}>
                                MAIN
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rates & Pricing Matrix */}
                    {p.rates && p.rates.length > 0 && (
                      <div style={{ marginTop: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#e5e7eb", marginBottom: 8 }}>
                          Companion Rates &amp; Pricing (INR):
                        </div>
                        <div style={{ overflowX: "auto", background: "#121218", borderRadius: 6, border: "1px solid #282838" }}>
                          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" }}>
                            <thead>
                              <tr style={{ borderBottom: "1px solid #282838", color: "#9ca3af" }}>
                                <th style={{ padding: "8px 12px" }}>Duration</th>
                                <th style={{ padding: "8px 12px" }}>Standard Rate</th>
                                <th style={{ padding: "8px 12px" }}>Premium Rate</th>
                              </tr>
                            </thead>
                            <tbody>
                              {p.rates.map((r) => (
                                <tr key={r.id || r.duration} style={{ borderBottom: "1px solid #1a1a24" }}>
                                  <td style={{ padding: "6px 12px", color: "#e5e7eb", fontWeight: 500 }}>{r.duration}</td>
                                  <td style={{ padding: "6px 12px", color: "#10b981", fontWeight: 600 }}>
                                    {r.incall ? `₹${r.incall.toLocaleString("en-IN")}` : "—"}
                                  </td>
                                  <td style={{ padding: "6px 12px", color: "#f43f5e", fontWeight: 600 }}>
                                    {r.outcall ? `₹${r.outcall.toLocaleString("en-IN")}` : "—"}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════ TAB 3: REPORTS QUEUE ══════════════ */}
        {activeTab === "reports" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
              User Safety Reports ({reports.length})
            </h2>

            {reports.length === 0 ? (
              <div style={{ background: "#181824", border: "1px solid #282838", padding: 48, borderRadius: 10, textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🛡️</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>No reports filed</div>
                <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>No reports have been submitted yet.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {reports.map((r) => (
                  <div key={r.id} style={{ background: "#181824", border: "1px solid #282838", borderRadius: 10, padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ background: "#e11d48", color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 8px", borderRadius: 4 }}>
                            {r.category}
                          </span>
                          <span style={{ fontSize: 12, color: "#9ca3af" }}>
                            Status: <strong style={{ color: r.status === "PENDING" ? "#f59e0b" : "#10b981" }}>{r.status}</strong>
                          </span>
                          <span style={{ fontSize: 12, color: "#6b7280" }}>• {new Date(r.createdAt).toLocaleString()}</span>
                        </div>

                        <div style={{ fontSize: 14, color: "#f3f4f6", margin: "10px 0 6px" }}>
                          <strong>Reported Profile:</strong> {r.profile?.user?.name} ({r.profile?.city || "—"}) [ID: {r.profileId}]
                        </div>
                        <div style={{ background: "#111116", padding: 12, borderRadius: 6, fontSize: 13, color: "#d1d5db" }}>
                          &quot;{r.description}&quot;
                        </div>
                      </div>

                      {/* Action buttons */}
                      {r.status === "PENDING" && (
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            onClick={() => handleReportAction(r.id, "RESOLVE")}
                            style={{ background: "#10b981", border: "none", color: "#fff", padding: "6px 12px", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer" }}
                          >
                            Resolve
                          </button>
                          <button
                            onClick={() => handleProfileAction(r.profileId, "SUSPEND")}
                            style={{ background: "#ef4444", border: "none", color: "#fff", padding: "6px 12px", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer" }}
                          >
                            Suspend Profile
                          </button>
                          <button
                            onClick={() => handleReportAction(r.id, "DISMISS")}
                            style={{ background: "#374151", border: "none", color: "#d1d5db", padding: "6px 12px", borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer" }}
                          >
                            Dismiss
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════ TAB 4: PHOTO REVIEW & DUPLICATES ══════════════ */}
        {activeTab === "photos" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
              Duplicate Image Fingerprint Detection (SHA-256)
            </h2>

            {duplicates.length === 0 ? (
              <div style={{ background: "#181824", border: "1px solid #282838", padding: 48, borderRadius: 10, textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>No duplicate photo hashes found</div>
                <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>
                  All uploaded profile photos have unique SHA-256 perceptual hashes across accounts.
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {duplicates.map((cluster, idx) => (
                  <div key={idx} style={{ background: "#181824", border: "1px solid rgba(225, 29, 72, 0.3)", borderRadius: 10, padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontSize: 13, color: "#fda4af", fontWeight: 700 }}>
                        ⚠️ Matching Hash Cluster ({cluster.count} occurrences): <code style={{ color: "#fff" }}>{cluster.hash.slice(0, 16)}…</code>
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                      {cluster.photos.map((p) => (
                        <div key={p.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 120 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.url} alt="Duplicate" style={{ width: 120, height: 160, objectFit: "cover", borderRadius: 6 }} />
                          <span style={{ fontSize: 11, color: "#fff", fontWeight: 600, marginTop: 4, textAlign: "center" }}>
                            {p.profile?.user?.name}
                          </span>
                          <span style={{ fontSize: 10, color: "#9ca3af" }}>{p.profile?.city || "—"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════ TAB 5: USERS & ROLES ══════════════ */}
        {activeTab === "users" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
              User Accounts &amp; Role-Based Access Control ({users.length})
            </h2>

            <div style={{ background: "#181824", border: "1px solid #282838", borderRadius: 10, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #282838", color: "#9ca3af" }}>
                    <th style={{ padding: 14 }}>User</th>
                    <th style={{ padding: 14 }}>Email</th>
                    <th style={{ padding: 14 }}>Role</th>
                    <th style={{ padding: 14 }}>Status</th>
                    <th style={{ padding: 14 }}>Joined</th>
                    <th style={{ padding: 14, textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} style={{ borderBottom: "1px solid #20202e" }}>
                      <td style={{ padding: 14, fontWeight: 600, color: "#fff" }}>{u.name}</td>
                      <td style={{ padding: 14, color: "#d1d5db" }}>{u.email}</td>
                      <td style={{ padding: 14 }}>
                        <select
                          value={u.role}
                          onChange={(e) => handleUserRoleChange(u.id, e.target.value)}
                          disabled={u.id === session?.user?.id}
                          style={{
                            background: "#121218",
                            border: "1px solid #3b3b4f",
                            color: "#fff",
                            padding: "4px 8px",
                            borderRadius: 4,
                            fontSize: 12,
                          }}
                        >
                          <option value="REGISTERED_USER">REGISTERED_USER</option>
                          <option value="MODERATOR">MODERATOR</option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                        </select>
                      </td>
                      <td style={{ padding: 14 }}>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 700,
                            background: u.isSuspended ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.2)",
                            color: u.isSuspended ? "#f87171" : "#34d399",
                          }}
                        >
                          {u.isSuspended ? "SUSPENDED" : "ACTIVE"}
                        </span>
                      </td>
                      <td style={{ padding: 14, color: "#9ca3af" }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: 14, textAlign: "right" }}>
                        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                          {u.id !== session?.user?.id && (
                            <>
                              <button
                                onClick={() => handleToggleSuspend(u.id, u.isSuspended)}
                                style={{
                                  background: u.isSuspended ? "#10b981" : "#f59e0b",
                                  border: "none",
                                  color: u.isSuspended ? "#fff" : "#000",
                                  padding: "4px 8px",
                                  borderRadius: 4,
                                  fontSize: 11,
                                  fontWeight: 600,
                                  cursor: "pointer",
                                }}
                              >
                                {u.isSuspended ? "Unsuspend" : "Suspend"}
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                style={{
                                  background: "#ef4444",
                                  border: "none",
                                  color: "#fff",
                                  padding: "4px 8px",
                                  borderRadius: 4,
                                  fontSize: 11,
                                  fontWeight: 600,
                                  cursor: "pointer",
                                }}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════ TAB 6: AUDIT LOGS ══════════════ */}
        {activeTab === "logs" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
              Security Audit Trail ({auditLogs.length})
            </h2>

            <div style={{ background: "#181824", border: "1px solid #282838", borderRadius: 10, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #282838", color: "#9ca3af" }}>
                    <th style={{ padding: 14 }}>Action</th>
                    <th style={{ padding: 14 }}>User / Actor</th>
                    <th style={{ padding: 14 }}>Details</th>
                    <th style={{ padding: 14 }}>IP Address</th>
                    <th style={{ padding: 14 }}>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} style={{ borderBottom: "1px solid #20202e" }}>
                      <td style={{ padding: 14 }}>
                        <code
                          style={{
                            background: "#121218",
                            padding: "2px 6px",
                            borderRadius: 4,
                            color: log.action.includes("FAILED") || log.action.includes("DELETE") || log.action.includes("SUSPEND") ? "#f87171" : "#34d399",
                            fontSize: 12,
                          }}
                        >
                          {log.action}
                        </code>
                      </td>
                      <td style={{ padding: 14, color: "#fff", fontWeight: 500 }}>
                        {log.user ? `${log.user.name} (${log.user.email})` : "System / Anonymous"}
                      </td>
                      <td style={{ padding: 14, color: "#d1d5db" }}>{log.details || "—"}</td>
                      <td style={{ padding: 14, color: "#9ca3af" }}>{log.ipAddress || "127.0.0.1"}</td>
                      <td style={{ padding: 14, color: "#9ca3af" }}>{new Date(log.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Rejection / Request Changes Reason Modal */}
      {rejectModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 16,
          }}
        >
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 12, padding: 24, maxWidth: 500, width: "100%", color: "var(--text)" }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 18, color: "var(--text)" }}>
              {rejectActionType === "REJECT" ? "Reject Profile" : "Request Changes from Owner"}
            </h3>
            <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--text-muted)" }}>
              Provide a clear reason so the companion understands what needs to be changed.
            </p>

            <textarea
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Photo 2 is low quality, or location details do not match..."
              style={{
                width: "100%",
                padding: "10px 12px",
                background: "var(--input-bg)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--input-text)",
                fontSize: 14,
                marginBottom: 16,
                boxSizing: "border-box",
                display: "block",
                resize: "vertical",
              }}
            />

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setRejectModalOpen(false)}
                style={{ padding: "8px 16px", background: "transparent", border: "1px solid #4b5563", color: "#e5e7eb", borderRadius: 6, cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                disabled={actionProcessing || !rejectReason.trim()}
                style={{
                  padding: "8px 18px",
                  background: rejectActionType === "REJECT" ? "#ef4444" : "#f59e0b",
                  color: rejectActionType === "REJECT" ? "#fff" : "#000",
                  border: "none",
                  borderRadius: 6,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {actionProcessing ? "Processing…" : `Confirm ${rejectActionType === "REJECT" ? "Rejection" : "Request"}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

