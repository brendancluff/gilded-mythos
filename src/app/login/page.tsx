
"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "register" | "login";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const confirmed = searchParams.get("confirmed") === "true";
  const confirmationError = searchParams.get("error");

  const [mode, setMode] = useState<AuthMode>(
    confirmed ? "login" : "register"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      if (mode === "register") {
        if (password.length < 8) {
          setError(
            "Your password must contain at least 8 characters."
          );
          return;
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/login?confirmed=true`,
          },
        });

        if (signUpError) {
          throw signUpError;
        }

        setMessage(
          "Registration request received. Check your email for a confirmation link before signing in."
        );

        setPassword("");
      } else {
        const { error: signInError } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });

        if (signInError) {
          throw signInError;
        }

        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setMessage("");
    setError("");
    setPassword("");
  }

  return (
    <main className="auth-page">
      <section className="auth-container">
        <p className="eyebrow">GILDED MYTHOS</p>

        <h1>Enter the Mythos</h1>

        <p className="auth-subtitle">
          Your adventure begins here.
        </p>

        <div className="auth-card">
          <div className="auth-tabs">
            <button
              type="button"
              className={mode === "register" ? "active" : ""}
              onClick={() => changeMode("register")}
              aria-pressed={mode === "register"}
            >
              Create Account
            </button>

            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => changeMode("login")}
              aria-pressed={mode === "login"}
            >
              Sign In
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="auth-email">
              Email Address
            </label>

            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="auth-password">
              Password
            </label>

            <input
              id="auth-password"
              type="password"
              autoComplete={
                mode === "register"
                  ? "new-password"
                  : "current-password"
              }
              placeholder={
                mode === "register"
                  ? "Enter your password (8 characters minimum)"
                  : "Enter your password"
              }
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={mode === "register" ? 8 : undefined}
              required
            />

            {confirmed && (
              <p className="auth-success" role="status">
                Your email has been verified!
                You can now sign in.
              </p>
            )}

            {confirmationError && (
              <p className="auth-error" role="alert">
                Your confirmation link is invalid or has expired.
                Please check your email or request a new
                confirmation link.
              </p>
            )}

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            {message && (
              <p className="auth-success" role="status">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "register"
                  ? "Create Account"
                  : "Sign In"}
            </button>
          </form>

          <p className="auth-footer">
            {mode === "register"
              ? "Already have an account?"
              : "New to Gilded Mythos?"}
            {" "}
            <button
              type="button"
              onClick={() =>
                changeMode(
                  mode === "register"
                    ? "login"
                    : "register"
                )
              }
            >
              {mode === "register"
                ? "Sign In"
                : "Create an Account"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="auth-page">
          <section className="auth-container">
            <p className="eyebrow">GILDED MYTHOS</p>

            <h1>Enter the Mythos</h1>

            <p className="auth-subtitle">
              Loading authentication...
            </p>
          </section>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
