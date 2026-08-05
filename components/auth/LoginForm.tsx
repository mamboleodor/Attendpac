"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [mode, setMode] = useState<"signin" | "forgot">("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // Every role lands on /dashboard — the dashboard route reads the
    // signed-in user's profile and renders the right view for their role.
    router.push("/dashboard");
    router.refresh();
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Check your email for a password reset link.");
  }

  if (mode === "forgot") {
    return (
      <form onSubmit={handleForgotPassword} className="w-full max-w-sm flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-darkGray">Reset your password</h2>
          <p className="text-sm text-neutral-gray3 mt-1">
            We&rsquo;ll email you a link to get back in.
          </p>
        </div>

        <label className="text-sm font-medium text-brand-darkGray">
          Work email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="mt-1 w-full rounded-sm border border-neutral-lightBorder px-3 py-2 text-sm"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-success-green">{message}</p>}

        <button type="submit" disabled={loading} className="btn-primary hover-bright w-full">
          {loading ? "Sending…" : "Send reset link"}
        </button>

        <button
          type="button"
          onClick={() => setMode("signin")}
          className="text-sm font-bold text-brand-orange"
        >
          Back to sign in
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSignIn} className="w-full max-w-sm flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold text-brand-darkGray">Admin sign in</h2>
        <p className="text-sm text-neutral-gray3 mt-1">
          Sign in to manage your organization
        </p>
      </div>

      <label className="text-sm font-medium text-brand-darkGray">
        Work email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="mt-1 w-full rounded-sm border border-neutral-lightBorder px-3 py-2 text-sm"
        />
      </label>

      <label className="text-sm font-medium text-brand-darkGray">
        Password
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="mt-1 w-full rounded-sm border border-neutral-lightBorder px-3 py-2 text-sm"
        />
      </label>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-neutral-gray3">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember me
        </label>
        <button
          type="button"
          onClick={() => setMode("forgot")}
          className="font-bold text-brand-orange"
        >
          Forgot password?
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary hover-bright w-full">
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-xs text-neutral-gray3 text-center">
        Need an account? Contact your organization owner.
      </p>
    </form>
  );
}
