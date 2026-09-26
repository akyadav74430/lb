"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

interface Profile {
  id: string;
  userId: string;
  bio: string | null;
  city: string | null;
  region: string | null;
  status: string;
  visibility: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  photos: { url: string }[];
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role !== "SUPER_ADMIN" && session?.user?.role !== "ADMIN") {
        router.push("/");
      } else {
        fetchProfiles();
      }
    } else if (status === "unauthenticated") {
      router.push("/admin/signin");
    }
  }, [status, session, router]);

  const fetchProfiles = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      const res = await fetch(`/api/admin/profiles?${params}`);
      const data = await res.json();
      if (res.ok) setProfiles(data.profiles);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this profile permanently?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/profiles/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProfiles((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete profile");
      }
    } catch {
      alert("Error deleting profile");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/profiles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
      }
    } catch {
      alert("Error updating status");
    }
  };

  if (status === "loading") return <div style={{ padding: 40, textAlign: "center" }}>Loading…</div>;

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header__left">
          <Logo size="nav" />
          <h1>Admin Dashboard</h1>
        </div>
        <div className="admin-header__right">
          <span className="admin-badge">Superuser</span>
          <Link href="/api/auth/signout" className="btn btn--ghost">Sign Out</Link>
        </div>
      </header>

      <div className="admin-container">
        <nav className="admin-sidebar">
          <ul>
            <li className="active"><Link href="/admin/dashboard">👥 Profiles</Link></li>
            <li><Link href="/admin/dashboard/users">👤 Users</Link></li>
            <li><Link href="/admin/dashboard/settings">⚙️ Settings</Link></li>
          </ul>
        </nav>

        <main className="admin-main">
          <div className="admin-toolbar">
            <h2>Profile Management</h2>
            <div className="admin-filters">
              <input
                type="text"
                placeholder="Search name, email, city…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
                style={{ width: 280 }}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-input"
                style={{ width: 180 }}
              >
                <option value="">All Statuses</option>
                <option value="APPROVED">Approved</option>
                <option value="PENDING">Pending</option>
                <option value="REJECTED">Rejected</option>
                <option value="DRAFT">Draft</option>
                <option value="SUSPENDED">Suspended</option>
              </select>
              <button onClick={fetchProfiles} className="btn btn--secondary" disabled={loading}>
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: 40 }}>Loading profiles…</div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>User</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Visibility</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: 40 }}>
                        No profiles found
                      </td>
                    </tr>
                  ) : (
                    profiles.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            {p.photos[0] && (
                              <img
                                src={p.photos[0].url}
                                alt=""
                                style={{ width: 40, height: 40, borderRadius: 4, objectFit: "cover" }}
                              />
                            )}
                            <div>
                              <div style={{ fontWeight: 600 }}>{p.bio?.slice(0, 40) || "No bio"}</div>
                              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{p.id.slice(0, 8)}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>{p.user.name}</div>
                          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{p.user.email}</div>
                          <span className={`role-badge role-${p.user.role.toLowerCase()}`}>{p.user.role}</span>
                        </td>
                        <td>
                          {p.city || "—"}, {p.region || "—"}
                        </td>
                        <td>
                          <select
                            value={p.status}
                            onChange={(e) => handleStatusChange(p.id, e.target.value)}
                            className="form-input status-select"
                            style={{ width: 140, padding: "4px 8px", fontSize: 12 }}
                          >
                            <option value="DRAFT">Draft</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                            <option value="SUSPENDED">Suspended</option>
                          </select>
                        </td>
                        <td>
                          <span className={`vis-badge vis-${p.visibility.toLowerCase()}`}>
                            {p.visibility}
                          </span>
                        </td>
                        <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="action-buttons">
                            <Link
                              href={`/profile/${p.id}`}
                              target="_blank"
                              className="btn btn--ghost btn--sm"
                              title="View"
                            >
                              👁️
                            </Link>
                            <Link
                              href={`/profile/${p.id}/edit`}
                              className="btn btn--ghost btn--sm"
                              title="Edit"
                            >
                              ✏️
                            </Link>
                            <button
                              onClick={() => handleDelete(p.id)}
                              disabled={deletingId === p.id}
                              className="btn btn--danger btn--sm"
                              title="Delete"
                            >
                              {deletingId === p.id ? "⏳" : "🗑️"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}