"use client";

import { useState } from "react";
import { Rss } from "lucide-react";
import { subscribe } from "@/app/actions/subscribe";

export function SubscribeForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await subscribe(formData);

    if (result.success) {
      setStatus("success");
    } else {
      setError(result.error || "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 justify-center text-sm font-mono text-[#A3E635]">
        <span>Subscribed. You&apos;ll get the weekly digest.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <input
        name="email"
        type="email"
        required
        placeholder="your@email.com"
        className="flex-1 rounded border border-zinc-800 bg-[#18181B] px-4 py-2.5 font-mono text-sm text-[#FAFAFA] placeholder-[#52525B] focus:border-[#A3E635] focus:outline-none focus:ring-1 focus:ring-[#A3E635] transition-colors"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded font-mono font-semibold text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        style={{ background: "#A3E635", color: "#09090B" }}
      >
        {status === "submitting" ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Subscribing...
          </>
        ) : (
          <>
            <Rss size={14} />
            Subscribe
          </>
        )}
      </button>
      {error && (
        <p className="text-xs font-mono text-[#EF4444] sm:absolute sm:mt-12">{error}</p>
      )}
    </form>
  );
}
