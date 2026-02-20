"use server";

import { headers } from "next/headers";
import { getSupabase } from "@/lib/supabase";

interface SubmitResult {
  success: boolean;
  error?: string;
}

export async function submitProblem(
  formData: FormData
): Promise<SubmitResult> {
  const problem = formData.get("problem") as string | null;
  const email = formData.get("email") as string | null;

  if (!problem || problem.trim().length < 20) {
    return { success: false, error: "Please describe the problem in at least 20 characters." };
  }
  if (problem.trim().length > 500) {
    return { success: false, error: "Please keep it under 500 characters." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Invalid email address." };
  }

  const supabase = getSupabase();

  // Rate limit: max 3 submissions per IP per hour
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
  const { count } = await supabase
    .from("submissions")
    .select("id", { count: "exact", head: true })
    .gte("created_at", oneHourAgo);

  if (count !== null && count >= 10) {
    return { success: false, error: "Too many submissions recently. Try again later." };
  }

  // Insert
  const { error: insertError } = await supabase.from("submissions").insert({
    problem: problem.trim(),
    email: email?.trim() || null,
  });

  if (insertError) {
    console.error("Supabase insert error:", insertError);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  // Slack notification (best effort)
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `📥 *New submission on no-humans.app*\n> ${problem.trim()}\n${email ? `📧 ${email}` : "_no email_"}`,
        }),
      });
    } catch {
      // Don't fail the submission if Slack fails
    }
  }

  return { success: true };
}
