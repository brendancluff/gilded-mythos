
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function AuthButton() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    void supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    setSigningOut(true);
    setError("");

    const supabase = createClient();
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError("Unable to sign out. Please try again.");
      setSigningOut(false);
      return;
    }

    setUser(null);
    setSigningOut(false);
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <Link href="/login" className="auth-nav-button">
        Login
      </Link>
    );
  }

  return (
    <div className="auth-nav-controls">
      <button
        type="button"
        className="auth-nav-button"
        onClick={handleLogout}
        disabled={signingOut}
      >
        {signingOut ? "Signing Out..." : "Log Out"}
      </button>

      {error && (
        <span role="alert" className="auth-nav-error">
          {error}
        </span>
      )}
    </div>
  );
}
