"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignInForm({ onForgotClick }: { onForgotClick: () => void }) {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
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

  return (
    <form onSubmit={handleSignIn} className="w-full max-w-sm flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold text-brand-darkGray">Admin sign in</h2>
        <p className="text-sm text-neutral-gray3 mt-1">Sign in to manage your organization</p>
      </div>

      <label className="text-sm font-medium text-brand-darkGray">
        Work email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="mt-1 w-full rounded-lg border border-white/60 bg-white/40 backdrop-blur-sm px-3 py-2 text-sm placeholder:text-neutral-gray2 focus:outline-none focus:ring-2 focus:ring-brand-orange/50"
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
         className="mt-1 w-full rounded-lg border border-white/60 bg-white/40 backdrop-blur-sm px-3 py-2 text-sm placeholder:text-neutral-gray2 focus:outline-none focus:ring-2 focus:ring-brand-orange/50"
        />
      </label>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-neutral-gray3">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          Remember me
        </label>
        <button type="button" onClick={onForgotClick} className="font-bold text-brand-orange md:hidden">
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