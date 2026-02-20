import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  let body: { problem?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { problem, email } = body;

  if (!problem || typeof problem !== "string" || problem.trim().length < 20) {
    return NextResponse.json(
      { error: "problem is required (20-500 characters)." },
      { status: 400 }
    );
  }
  if (problem.trim().length > 500) {
    return NextResponse.json(
      { error: "problem must be under 500 characters." },
      { status: 400 }
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const supabase = getSupabase();

  // Rate limit: max 10 submissions globally per hour
  const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
  const { count } = await supabase
    .from("submissions")
    .select("id", { count: "exact", head: true })
    .gte("created_at", oneHourAgo);

  if (count !== null && count >= 10) {
    return NextResponse.json(
      { error: "Too many submissions recently. Try again later." },
      { status: 429 }
    );
  }

  const { error: insertError } = await supabase.from("submissions").insert({
    problem: problem.trim(),
    email: typeof email === "string" ? email.trim() || null : null,
  });

  if (insertError) {
    console.error("Supabase insert error:", insertError);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // Slack notification (best effort)
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `📥 *New submission via API*\n> ${problem.trim()}\n${email ? `📧 ${email}` : "_no email_"}`,
        }),
      });
    } catch {
      // Don't fail the submission if Slack fails
    }
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
