"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function AdminSettings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [targetUserId, setTargetUserId] = useState("");
  const [targetUserEmail, setTargetUserEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirm, setResetConfirm] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setTargetUserId(e.detail.id);
      setTargetUserEmail(e.detail.email);
      setResetPassword("");
      setResetConfirm("");
      const el = document.getElementById("reset-password-section");
      el?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("admin:reset-password", handler as EventListener);
    return () => window.removeEventListener("admin:reset-password", handler as EventListener);
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Password changed successfully" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ type: "error", text: data.error || "Failed to change password" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!targetUserId) {
      setMessage({ type: "error", text: "Select a user first" });
      return;
    }
    if (resetPassword !== resetConfirm) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }
    setResetLoading(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: resetPassword, targetUserId }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: `Password reset for ${targetUserEmail}` });
        setResetPassword("");
        setResetConfirm("");
        setTargetUserId("");
        setTargetUserEmail("");
      } else {
        setMessage({ type: "error", text: data.error || "Failed to reset password" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setResetLoading(false);
    }
  };

  if (status === "loading") return <div style={{ padding: 40, textAlign: "center" }}>Loading…</div>;
  if (status !== "authenticated" || (session?.user?.role !== "SUPER_ADMIN" && session?.user?.role !== "ADMIN")) {
    router.push("/admin/signin");
    return null;
  }

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
            <li><Link href="/admin/dashboard/users">👤 Users</Link></li>
            <li className="active"><Link href="/admin/dashboard/settings">⚙️ Settings</Link></li>
          </ul>
        </nav>

        <main className="admin-main">
          <h2 style={{ marginBottom: 24 }}>Settings & Security</h2>

          {/* Change Own Password */}
          <section className="admin-card" style={{ marginBottom: 32 }}>
            <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700 }}>Change Your Password</h3>
            <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
              {message && (
                <div className={`admin-alert admin-alert--${message.type}`}>
                  {message.text}
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-input"
                  required
                  autoComplete="current-password"
                />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-input"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  required
                  autoComplete="new-password"
                />
              </div>
              <button type="submit" className="btn btn--primary" disabled={loading} style={{ width: "fit-content" }}>
                {loading ? "Saving…" : "Change Password"}
              </button>
            </form>
          </section>

          {/* Reset Any User's Password (Super Admin only) */}
          {session?.user?.role === "SUPER_ADMIN" && (
            <section className="admin-card" id="reset-password-section">
              <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700 }}>Reset Any User's Password (Super Admin)</h3>
              <form onSubmit={handleResetPassword} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 500 }}>
                <div className="form-row">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">User ID</label>
                    <input
                      type="text"
                      value={targetUserId}
                      onChange={(e) => setTargetUserId(e.target.value)}
                      className="form-input"
                      placeholder="Enter user ID (from Users page)"
                      required
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">User Email (for confirmation)</label>
                    <input
                      type="email"
                      value={targetUserEmail}
                      onChange={(e) => setTargetUserEmail(e.target.value)}
                      className="form-input"
                      placeholder="user@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    className="form-input"
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    value={resetConfirm}
                    onChange={(e) => setResetConfirm(e.target.value)}
                    className="form-input"
                    required
                    autoComplete="new-password"
                  />
                </div>
                <button type="submit" className="btn btn--danger" disabled={resetLoading} style={{ width: "fit-content" }}>
                  {resetLoading ? "Resetting…" : "Reset User Password"}
                </button>
              </form>
            </section>
          )}

          <div className="admin-card" style={{ marginTop: 32 }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700 }}>Quick Links</h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/admin/dashboard" className="btn btn--secondary">← Back to Profiles</Link>
              <Link href="/admin/dashboard/users" className="btn btn--secondary">Manage Users</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}