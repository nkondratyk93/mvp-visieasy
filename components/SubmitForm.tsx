"use client";

import { useState } from "react";
import { submitProblem } from "@/app/actions/submit";

export function SubmitForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await submitProblem(formData);

    if (result.success) {
      setStatus("success");
    } else {
      setError(result.error || "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded border border-zinc-800 bg-[#18181B] p-8 text-center">
        <div className="text-3xl mb-4">✓</div>
        <p className="font-mono text-[#A3E635] text-sm mb-2">
          Got it! The agent will evaluate your idea.
        </p>
        <p className="font-mono text-[#52525B] text-xs">
          If it scores high enough, you&apos;ll see it ship.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto">
      <div>
        <textarea
          name="problem"
          required
          minLength={20}
          maxLength={500}
          rows={3}
          onChange={(e) => setCharCount(e.target.value.length)}
          placeholder="Describe your problem — what frustrates you?"
          className="w-full rounded border border-zinc-800 bg-[#18181B] px-4 py-3 font-mono text-sm text-[#FAFAFA] placeholder-[#52525B] focus:border-[#22D3EE] focus:outline-none focus:ring-1 focus:ring-[#22D3EE] resize-none transition-colors"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] font-mono text-[#3F3F46]">min 20 chars</span>
          <span
            className="text-[10px] font-mono"
            style={{ color: charCount > 500 ? "#EF4444" : "#3F3F46" }}
          >
            {charCount}/500
          </span>
        </div>
      </div>

      <input
        name="email"
        type="email"
        placeholder="Email (optional — we'll notify you when it ships)"
        className="w-full rounded border border-zinc-800 bg-[#18181B] px-4 py-3 font-mono text-sm text-[#FAFAFA] placeholder-[#52525B] focus:border-[#22D3EE] focus:outline-none focus:ring-1 focus:ring-[#22D3EE] transition-colors"
      />

      {error && (
        <p className="text-xs font-mono text-[#EF4444]">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-mono font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: "#22D3EE", color: "#09090B" }}
      >
        {status === "submitting" ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </>
        ) : "Submit Problem"}
      </button>
    </form>
  );
}
