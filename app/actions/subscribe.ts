"use server";

import { getSupabase } from "@/lib/supabase";

interface SubscribeResult {
  success: boolean;
  error?: string;
}

export async function subscribe(formData: FormData): Promise<SubscribeResult> {
  const email = formData.get("email") as string | null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email." };
  }

  const supabase = getSupabase();

  const { error } = await supabase.from("subscribers").insert({
    email: email.trim().toLowerCase(),
  });

  if (error) {
    if (error.code === "23505") {
      return { success: true }; // Already subscribed, treat as success
    }
    console.error("Subscribe error:", error);
    return { success: false, error: "Something went wrong. Try again." };
  }

  return { success: true };
}
