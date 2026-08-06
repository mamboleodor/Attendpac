"use client";

import { useState } from "react";
import SignInForm from "@/components/auth/SignInForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import FeatureCarousel from "@/components/auth/FeatureCarousel";
export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "forgot">("signin");

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-neutral-lightBeige p-4 overflow-hidden">
      {/* Soft blurred color blobs behind the glass card */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-orange/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-brand-orange/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-white blur-3xl opacity-60" />

      <div className="relative w-full max-w-4xl min-h-[560px] rounded-3xl overflow-hidden border border-white/50 bg-white/30 backdrop-blur-2xl shadow-2xl">
        {/* Fixed form slots */}
        <div className="grid md:grid-cols-2 min-h-[560px]">
          <div className="flex items-center justify-center px-8 py-12">
            <ForgotPasswordForm onBackClick={() => setMode("signin")} />
          </div>
          <div className="flex items-center justify-center px-8 py-12">
            <SignInForm onForgotClick={() => setMode("forgot")} />
          </div>
        </div>

        {/* Sliding orange glass panel — desktop only */}
        <div
          className={`hidden md:flex absolute top-0 h-full w-1/2 bg-brand-orange/25 backdrop-blur-2xl border-x border-white/40 text-white flex-col justify-center px-12 transition-transform duration-500 ease-in-out ${
            mode === "signin" ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {mode === "signin" ? (
            <>
              <span className="text-2xl font-black text-white drop-shadow-sm mb-6">AttendPAC</span>
              <FeatureCarousel />
              <button
                onClick={() => setMode("forgot")}
                className="mt-8 rounded-pill-lg border border-white/60 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors self-start"
              >
                Forgot your password?
              </button>
            </>
  
          ) : (
            <>
              <span className="text-2xl font-black text-white drop-shadow-sm mb-4">Forgot password?</span>
              <p className="text-white/80 max-w-sm mb-8">
                No problem. We&rsquo;ll send a reset link to your work email.
              </p>
              <button
                onClick={() => setMode("signin")}
                className="rounded-pill-lg border border-white/60 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors self-start"
              >
                Back to sign in
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}