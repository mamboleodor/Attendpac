"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordForm({ onBackClick }: { onBackClick: () => void }) {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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

  return (
    <form onSubmit={handleForgotPassword} className="w-full max-w-sm flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold text-brand-darkGray">Reset your password</h2>
        <p className="text-sm text-neutral-gray3 mt-1">We&rsquo;ll email you a link to get back in.</p>
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

      <button type="button" onClick={onBackClick} className="text-sm font-bold text-brand-orange md:hidden">
        Back to sign in
      </button>
    </form>
  );
}