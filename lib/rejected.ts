import { getSupabase } from "@/lib/supabase";

export interface RejectedIdea {
  title: string;
  complaint: string;
  platform: string;
  author: string;
  sourceUrl: string;
  score: number;
  reason: string;
  rejectedAt: string;
}

interface RejectedRow {
  title: string;
  complaint: string;
  platform: string;
  author: string | null;
  source_url: string | null;
  score: number;
  reason: string;
  rejected_at: string;
}

function rowToRejected(row: RejectedRow): RejectedIdea {
  return {
    title: row.title,
    complaint: row.complaint,
    platform: row.platform,
    author: row.author ?? "",
    sourceUrl: row.source_url ?? "",
    score: row.score,
    reason: row.reason,
    rejectedAt: row.rejected_at,
  };
}

export async function getRejectedIdeas(): Promise<RejectedIdea[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("rejected_ideas")
    .select("*")
    .order("rejected_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch rejected ideas:", error);
    return [];
  }

  return (data as RejectedRow[]).map(rowToRejected);
}
