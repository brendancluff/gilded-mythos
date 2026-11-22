
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function checkSession() {
      const supabase = createClient();
      const { data, error: sessionError } =
        await supabase.auth.getUser();

      if (!active) return;

      setAuthorized(!sessionError && !!data.user);
      setChecking(false);
    }

    void checkSession();

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error: updateError } =
        await supabase.auth.updateUser({ password });

      if (updateError) throw updateError;

      setSuccess(true);
      setPassword("");
      setConfirmPassword("");

      await supabase.auth.signOut();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update your password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-container">
        <p className="eyebrow">GILDED MYTHOS</p>
        <h1>Restore Your Access</h1>
        <p className="auth-subtitle">
          A new key to your adventure awaits.
        </p>

        <div className="auth-card">
          {checking ? (
            <p className="auth-subtitle">Checking your recovery link...</p>
          ) : success ? (
            <div>
              <p className="auth-success" role="status">
                Your password has been updated successfully!
              </p>
              <p className="auth-footer">
                <Link href="/login" style={{ color: "#D4AF37" }}>
                  Return to Sign In
                </Link>
              </p>
            </div>
          ) : !authorized ? (
            <div>
              <p className="auth-error" role="alert">
                Your recovery session is missing or expired.
                Please request a new password reset link.
              </p>
              <p className="auth-footer">
                <Link href="/forgot-password" style={{ color: "#D4AF37" }}>
                  Request New Link
                </Link>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              <label htmlFor="new-password">New Password</label>
              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter your new password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                required
              />

              <label htmlFor="confirm-password">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                minLength={8}
                required
              />

              {error && (
                <p className="auth-error" role="alert">{error}</p>
              )}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

