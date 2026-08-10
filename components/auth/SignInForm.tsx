"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignInForm({ onForgotClick }: { onForgotClick: () => void }) {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });

    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-2 rounded-md border border-neutral-lightBorder bg-white px-4 py-2.5 text-sm font-bold text-brand-darkGray hover:bg-neutral-lightGray transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 18 18">
          <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/>
          <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.85.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 0 0 9 18z"/>
          <path fill="#FBBC05" d="M3.97 10.71A5.4 5.4 0 0 1 3.68 9c0-.59.1-1.17.28-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.04l3.01-2.33z"/>
          <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
        </svg>
        {googleLoading ? "Redirecting…" : "Continue with Google"}
      </button>

      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-neutral-lightBorder" />
        <span className="text-[10px] font-bold text-neutral-gray2 tracking-widest">OR EMAIL</span>
        <div className="h-px flex-1 bg-neutral-lightBorder" />
      </div>

      <form onSubmit={handleSignIn} className="flex flex-col gap-3">
        <label className="text-sm font-bold text-brand-darkGray block">
          Work email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="mt-1 w-full rounded-md border border-neutral-lightBorder px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
          />
        </label>

        <label className="text-sm font-bold text-brand-darkGray block">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-1 w-full rounded-md border border-neutral-lightBorder px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-md bg-brand-orange text-white font-bold px-4 py-2.5 text-sm hover:brightness-110 transition-all mt-1"
        >
          {loading ? "Signing in…" : "Sign in"}
          {!loading && (
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-sm bg-white/20">→</span>
          )}
        </button>

        <p className="text-xs text-neutral-gray3 text-center mt-1">
          Forgot your password?{" "}
          <button type="button" onClick={onForgotClick} className="font-bold text-brand-darkGray underline">
            Reset it
          </button>
        </p>
      </form>

      <p className="text-xs text-neutral-gray3 text-center">
        Need an account?{" "}
        <span className="font-bold text-brand-darkGray">Contact your organization owner.</span>
      </p>
    </div>
  );
}