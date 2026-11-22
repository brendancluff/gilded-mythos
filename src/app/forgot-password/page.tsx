
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const supabase = createClient();

      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/reset-password`,
        });

      if (resetError) {
        throw resetError;
      }

      setMessage(
        "If an account exists with that email, you will receive a password reset link shortly."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send the reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-container">
        <p className="eyebrow">GILDED MYTHOS</p>
        <h1>Recover Your Account</h1>
        <p className="auth-subtitle">
          Every adventurer deserves a second chance.
        </p>

        <div className="auth-card">
          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="reset-email">Email Address</label>
            <input
              id="reset-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            {error && (
              <p className="auth-error" role="alert">{error}</p>
            )}

            {message && (
              <p className="auth-success" role="status">{message}</p>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="auth-footer">
            Remember your password?{" "}
            <Link href="/login" style={{ color: "#D4AF37" }}>
              Return to Sign In
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
