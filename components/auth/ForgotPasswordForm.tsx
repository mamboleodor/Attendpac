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
    <form onSubmit={handleForgotPassword} className="w-full flex flex-col gap-3">
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

      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-success-green">{message}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-brand-orange text-white font-bold px-4 py-2.5 text-sm hover:brightness-110 transition-all"
      >
        {loading ? "Sending…" : "Send reset link"}
      </button>

      <button type="button" onClick={onBackClick} className="text-xs text-neutral-gray3 text-center hover:text-brand-orange">
        Back to sign in
      </button>
    </form>
  );
}