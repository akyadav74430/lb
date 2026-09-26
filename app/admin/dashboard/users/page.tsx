"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isSuspended: boolean;
  createdAt: string;
  _count: { profile: number };
}

export default function AdminUsers() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role !== "SUPER_ADMIN" && session?.user?.role !== "ADMIN") {
        router.push("/");
      } else {
        fetchUsers();
      }
    } else if (status === "unauthenticated") {
      router.push("/admin/signin");
    }
  }, [status, session, router]);

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (roleFilter) params.set("role", roleFilter);
      const res = await fetch(`/api/admin/users?${params}`);
      const data = await res.json();
      if (res.ok) setUsers(data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
      } else {
        alert("Failed to update role");
      }
    } catch {
      alert("Error updating role");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSuspendToggle = async (id: string, suspended: boolean) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSuspended: !suspended }),
      });
      if (res.ok) {
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isSuspended: !suspended } : u)));
      } else {
        alert("Failed to update suspension status");
      }
    } catch {
      alert("Error updating user");
    } finally {
      setUpdatingId(null);
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
            <li><Link href="/admin/dashboard">👥 Profiles</Link></li>
            <li className="active"><Link href="/admin/dashboard/users">👤 Users</Link></li>
            <li><Link href="/admin/dashboard/settings">⚙️ Settings</Link></li>
          </ul>
        </nav>

        <main className="admin-main">
          <div className="admin-toolbar">
            <h2>User Management</h2>
            <div className="admin-filters">
              <input
                type="text"
                placeholder="Search name, email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
                style={{ width: 280 }}
              />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="form-input"
                style={{ width: 180 }}
              >
                <option value="">All Roles</option>
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="ADMIN">Admin</option>
                <option value="MODERATOR">Moderator</option>
                <option value="REGISTERED_USER">Registered User</option>
                <option value="VISITOR">Visitor</option>
              </select>
              <button onClick={fetchUsers} className="btn btn--secondary" disabled={loading}>
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: 40 }}>Loading users…</div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Profiles</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: 40 }}>
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <div>
                            <div style={{ fontWeight: 600 }}>{u.name}</div>
                            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{u.email}</div>
                            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{u.id.slice(0, 8)}</div>
                          </div>
                        </td>
                        <td>
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            disabled={updatingId === u.id}
                            className="form-input status-select"
                            style={{ width: 150, padding: "4px 8px", fontSize: 12 }}
                          >
                            <option value="VISITOR">Visitor</option>
                            <option value="REGISTERED_USER">Registered User</option>
                            <option value="MODERATOR">Moderator</option>
                            <option value="ADMIN">Admin</option>
                            <option value="SUPER_ADMIN">Super Admin</option>
                          </select>
                        </td>
                        <td>{u._count.profile}</td>
                        <td>
                          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                            <input
                              type="checkbox"
                              checked={u.isSuspended}
                              onChange={() => handleSuspendToggle(u.id, u.isSuspended)}
                              disabled={updatingId === u.id}
                            />
                            <span>{u.isSuspended ? "🔴 Suspended" : "🟢 Active"}</span>
                          </label>
                        </td>
                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              onClick={() => setTargetUserForReset(u.id, u.email)}
                              className="btn btn--ghost btn--sm"
                              title="Reset Password"
                            >
                              🔑
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

function setTargetUserForReset(id: string, email: string) {
  const event = new CustomEvent("admin:reset-password", { detail: { id, email } });
  window.dispatchEvent(event);
}