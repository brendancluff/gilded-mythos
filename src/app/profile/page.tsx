
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type FanProfile = {
  username: string | null;
  house_id: string | null;
  secondary_house_id: string | null;
};

type House = {
  id: string;
  name: string;
};

const houseColors: Record<string, string> = {
  Solara: "#701F2B",
  Lunaris: "#88BAC8",
  Atherion: "#245C3B",
  Spiraxus: "#45205E",
};

export default function ProfilePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<FanProfile | null>(null);

  const [houseName, setHouseName] = useState<string | null>(null);
  const [secondaryHouseName, setSecondaryHouseName] =
    useState<string | null>(null);

  const [usernameInput, setUsernameInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function loadProfile() {
      setLoading(true);
      setError(null);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setEmail(null);
        setProfile(null);
        setHouseName(null);
        setSecondaryHouseName(null);
        setLoading(false);
        return;
      }

      setEmail(user.email ?? null);

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("username, house_id, secondary_house_id")
        .eq("id", user.id)
        .single();

      if (profileError) {
        setError("Unable to load your profile.");
        setLoading(false);
        return;
      }

      const fanProfile = data as FanProfile;

      setProfile(fanProfile);
      setUsernameInput(fanProfile.username ?? "");

      const houseIds = [
        fanProfile.house_id,
        fanProfile.secondary_house_id,
      ].filter((id): id is string => id !== null);

      if (houseIds.length > 0) {
        const { data: houses, error: houseError } =
          await supabase
            .from("houses")
            .select("id, name")
            .in("id", houseIds);

        if (houseError) {
          setError("Unable to load your House assignment.");
          setHouseName(null);
          setSecondaryHouseName(null);
        } else {
          const houseList = (houses ?? []) as House[];

          const primary = houseList.find(
            (house) => house.id === fanProfile.house_id
          );

          const secondary = houseList.find(
            (house) =>
              house.id === fanProfile.secondary_house_id
          );

          setHouseName(primary?.name ?? null);
          setSecondaryHouseName(secondary?.name ?? null);

          if (!primary) {
            setError("Unable to find your assigned House.");
          }
        }
      } else {
        setHouseName(null);
        setSecondaryHouseName(null);
      }

      setLoading(false);
    }

    void loadProfile();
  }, []);

  async function saveUsername() {
    const username = usernameInput.trim();

    if (username.length < 3 || username.length > 30) {
      setSaveMessage(
        "Username must be between 3 and 30 characters."
      );
      return;
    }

    setSaving(true);
    setSaveMessage("");

    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setSaveMessage("Please sign in again.");
      setSaving(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ username })
      .eq("id", user.id);

    if (updateError) {
      setSaveMessage(
        updateError.code === "23505"
          ? "That username is already taken."
          : "Unable to save username. Please try again."
      );
    } else {
      setProfile((current) =>
        current ? { ...current, username } : current
      );

      setUsernameInput(username);
      setSaveMessage("Username saved successfully!");
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen px-6 py-16 text-center text-[#88BAC8]">
        Loading your adventurer profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#d4af37]">
          Gilded Mythos
        </p>

        <h1 className="mb-4 text-4xl font-bold text-[#d4af37]">
          My Profile
        </h1>

        {!email ? (
          <div className="mt-10 rounded-xl border border-[#d4af37]/40 bg-[#333A57]/40 p-8">
            <p className="mb-5 text-[#88BAC8]">
              Sign in to view your adventurer profile.
            </p>

            <Link
              href="/login"
              className="inline-block rounded-lg bg-[#d4af37] px-6 py-3 font-semibold text-black"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-[#d4af37]/40 bg-[#333A57]/40 p-8">
            <h2 className="mb-6 text-2xl font-semibold text-[#f0d77c]">
              Adventurer Profile
            </h2>

            <div className="space-y-6 text-[#88BAC8]">
              {/* Email */}
              <div>
                <p className="text-sm text-[#f0d77c]">
                  Email
                </p>
                <p>{email}</p>
              </div>

              {/* Username Editor */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm text-[#f0d77c]"
                >
                  Username
                </label>

                <div className="flex flex-wrap gap-3">
                  <input
                    id="username"
                    type="text"
                    value={usernameInput}
                    onChange={(event) => {
                      setUsernameInput(event.target.value);
                      setSaveMessage("");
                    }}
                    minLength={3}
                    maxLength={30}
                    placeholder="Choose your adventurer name"
                    className="min-w-0 flex-1 rounded-lg border border-[#d4af37]/40 bg-[#111827] px-4 py-3 text-white"
                  />

                  <button
                    type="button"
                    onClick={saveUsername}
                    disabled={
                      saving ||
                      usernameInput.trim() === profile?.username
                    }
                    className="rounded-lg bg-[#d4af37] px-5 py-3 font-semibold text-black disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Username"}
                  </button>
                </div>

                {saveMessage && (
                  <p
                    role="status"
                    className="mt-2 text-sm text-[#f0d77c]"
                  >
                    {saveMessage}
                  </p>
                )}
              </div>

              {/* Kinari Academy Houses */}
              <div>
                <p className="mb-3 text-sm text-[#f0d77c]">
                  Kinari Academy House
                </p>

                {houseName ? (
                  <div className="space-y-4">
                    <div
                      className="rounded-xl border border-[#d4af37]/50 p-5"
                      style={{
                        backgroundColor:
                          houseColors[houseName] ?? "#333A57",
                      }}
                    >
                      <p className="text-sm text-white/80">
                        Primary House
                      </p>

                      <p className="mt-1 text-2xl font-bold text-white">
                        {houseName}
                      </p>
                    </div>

                    {secondaryHouseName && (
                      <div
                        className="rounded-xl border border-[#d4af37]/50 p-5"
                        style={{
                          backgroundColor:
                            houseColors[secondaryHouseName] ??
                            "#333A57",
                        }}
                      >
                        <p className="text-sm text-white/80">
                          Secondary House
                        </p>

                        <p className="mt-1 text-2xl font-bold text-white">
                          {secondaryHouseName}
                        </p>
                      </div>
                    )}

                    <p className="text-sm text-[#88BAC8]">
                      Your House assignment is permanent.
                    </p>
                  </div>
                ) : profile?.house_id ? (
                  <p>
                    Your House assignment could not be displayed.
                    Please try refreshing the page.
                  </p>
                ) : (
                  <div>
                    <p className="mb-3">
                      Not sorted yet
                    </p>

                    <Link
                      href="/quiz"
                      className="inline-block rounded-lg border border-[#d4af37] px-5 py-2 text-[#f0d77c] hover:bg-[#d4af37]/10"
                    >
                      Explore the House Quiz
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-6 text-sm text-red-300">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
