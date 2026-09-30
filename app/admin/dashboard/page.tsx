"use client";

import { useState, useEffect, useCallback } from "react";
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
  district: string | null;
  localArea: string | null;
  country: string | null;
  phone: string | null;
  whatsapp: string | null;
  gender: string | null;
  favColor: string | null;
  hidePhoneFromPublic: boolean;
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
  const [visibilityFilter, setVisibilityFilter] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Profile>>({});

  const fetchProfiles = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      if (visibilityFilter) params.set("visibility", visibilityFilter);
      const res = await fetch(`/api/admin/profiles?${params}`);
      const data = await res.json();
      if (res.ok) setProfiles(data.profiles);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, visibilityFilter]);

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
  }, [status, session, router, fetchProfiles]);

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

  const handleVisibilityChange = async (id: string, newVisibility: string) => {
    try {
      const res = await fetch(`/api/admin/profiles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility: newVisibility }),
      });
      if (res.ok) {
        setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, visibility: newVisibility } : p)));
      }
    } catch {
      alert("Error updating visibility");
    }
  };

  const openEditModal = (profile: Profile) => {
    setEditingId(profile.id);
    setEditData({
      bio: profile.bio || "",
      city: profile.city || "",
      region: profile.region || "",
      district: profile.district || "",
      localArea: profile.localArea || "",
      country: profile.country || "India",
      phone: profile.phone || "",
      whatsapp: profile.whatsapp || "",
      gender: profile.gender || "",
      favColor: profile.favColor || "",
      hidePhoneFromPublic: profile.hidePhoneFromPublic,
    });
  };

  const closeEditModal = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    try {
      const res = await fetch(`/api/admin/profiles/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        setProfiles((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...editData } : p)));
        closeEditModal();
      } else {
        alert("Failed to update profile");
      }
    } catch {
      alert("Error updating profile");
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setEditData((prev) => ({ ...prev, [target.name]: value }));
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
                placeholder="Search bio, city, phone, user name, email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
                style={{ width: 300 }}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-input"
                style={{ width: 150 }}
              >
                <option value="">All Statuses</option>
                <option value="APPROVED">Approved</option>
                <option value="PENDING">Pending</option>
                <option value="REJECTED">Rejected</option>
                <option value="DRAFT">Draft</option>
                <option value="SUSPENDED">Suspended</option>
              </select>
              <select
                value={visibilityFilter}
                onChange={(e) => setVisibilityFilter(e.target.value)}
                className="form-input"
                style={{ width: 200 }}
              >
                <option value="">All Visibilities</option>
                <option value="PUBLIC">Public</option>
                <option value="REGISTERED_USERS_ONLY">Registered Users Only</option>
                <option value="PRIVATE">Private</option>
                <option value="UNPUBLISHED">Unpublished</option>
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
                    <th>Contact</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Visibility</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ textAlign: "center", padding: 40 }}>
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
                              <div style={{ fontWeight: 600 }}>{p.bio?.slice(0, 50) || "No bio"}</div>
                              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>ID: {p.id.slice(0, 8)}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>{p.user.name}</div>
                          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{p.user.email}</div>
                          <span className={`role-badge role-${p.user.role.toLowerCase()}`}>{p.user.role}</span>
                        </td>
                        <td>
                          <div>{p.city || "—"}, {p.region || "—"}</div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                            {p.district && `${p.district}, `}{p.localArea || ""}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: 12 }}>{p.phone || "—"}</div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{p.whatsapp || "—"}</div>
                        </td>
                        <td>
                          <span style={{
                            display: "inline-block",
                            padding: "2px 8px",
                            borderRadius: 12,
                            fontSize: 11,
                            fontWeight: 600,
                            background: p.gender === "female" ? "rgba(236, 72, 153, 0.15)" :
                              p.gender === "male" ? "rgba(59, 130, 246, 0.15)" :
                              p.gender === "trans" ? "rgba(168, 85, 247, 0.15)" :
                              "rgba(148, 163, 184, 0.15)",
                            color: p.gender === "female" ? "#ec4899" :
                              p.gender === "male" ? "#3b82f6" :
                              p.gender === "trans" ? "#a855f7" : "#94a3b8",
                          }}>
                            {p.gender || "—"}
                          </span>
                        </td>
                        <td>
                          <select
                            value={p.status}
                            onChange={(e) => handleStatusChange(p.id, e.target.value)}
                            className="form-input status-select"
                            style={{ width: 130, padding: "4px 8px", fontSize: 12 }}
                          >
                            <option value="DRAFT">Draft</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                            <option value="SUSPENDED">Suspended</option>
                          </select>
                        </td>
                        <td>
                          <select
                            value={p.visibility}
                            onChange={(e) => handleVisibilityChange(p.id, e.target.value)}
                            className="form-input status-select"
                            style={{ width: 180, padding: "4px 8px", fontSize: 12 }}
                          >
                            <option value="PUBLIC">Public</option>
                            <option value="REGISTERED_USERS_ONLY">Registered Users Only</option>
                            <option value="PRIVATE">Private</option>
                            <option value="UNPUBLISHED">Unpublished</option>
                          </select>
                        </td>
                        <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="action-buttons">
                            <Link
                              href={`/profile/${p.id}`}
                              target="_blank"
                              className="btn btn--ghost btn--sm"
                              title="View Public Profile"
                            >
                              👁️
                            </Link>
                            <Link
                              href={`/profile/${p.id}/edit`}
                              className="btn btn--ghost btn--sm"
                              title="Edit (User View)"
                            >
                              ✏️
                            </Link>
                            <button
                              onClick={() => openEditModal(p)}
                              className="btn btn--primary btn--sm"
                              title="Quick Edit"
                            >
                              ⚙️
                            </button>
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

          {/* Edit Modal */}
          {editingId && (
            <div className="admin-modal-overlay" onClick={closeEditModal}>
              <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                <div className="admin-modal-header">
                  <h3>Edit Profile</h3>
                  <button onClick={closeEditModal} className="admin-modal-close">✕</button>
                </div>
                <form onSubmit={handleEditSubmit} className="admin-modal-body">
                  <div className="form-row">
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Bio</label>
                      <textarea
                        name="bio"
                        value={editData.bio || ""}
                        onChange={handleEditChange}
                        className="form-input"
                        rows={3}
                      />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">City</label>
                      <input
                        name="city"
                        type="text"
                        value={editData.city || ""}
                        onChange={handleEditChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Region / State</label>
                      <input
                        name="region"
                        type="text"
                        value={editData.region || ""}
                        onChange={handleEditChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">District</label>
                      <input
                        name="district"
                        type="text"
                        value={editData.district || ""}
                        onChange={handleEditChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Local Area</label>
                      <input
                        name="localArea"
                        type="text"
                        value={editData.localArea || ""}
                        onChange={handleEditChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Country</label>
                      <input
                        name="country"
                        type="text"
                        value={editData.country || "India"}
                        onChange={handleEditChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Phone</label>
                      <input
                        name="phone"
                        type="tel"
                        value={editData.phone || ""}
                        onChange={handleEditChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">WhatsApp</label>
                      <input
                        name="whatsapp"
                        type="tel"
                        value={editData.whatsapp || ""}
                        onChange={handleEditChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Gender</label>
                      <select
                        name="gender"
                        value={editData.gender || ""}
                        onChange={handleEditChange}
                        className="form-input"
                      >
                        <option value="">—</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="trans">Trans</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Fav Color</label>
                      <input
                        name="favColor"
                        type="text"
                        value={editData.favColor || ""}
                        onChange={handleEditChange}
                        className="form-input"
                        placeholder="#hex or color name"
                      />
                    </div>
                  </div>
                  <div className="form-group" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <input
                      name="hidePhoneFromPublic"
                      type="checkbox"
                      checked={editData.hidePhoneFromPublic || false}
                      onChange={handleEditChange}
                      id="hidePhoneEdit"
                    />
                    <label htmlFor="hidePhoneEdit" style={{ fontSize: 13, cursor: "pointer" }}>
                      Hide phone from public
                    </label>
                  </div>
                  <div className="admin-modal-footer">
                    <button type="button" onClick={closeEditModal} className="btn btn--secondary">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn--primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}