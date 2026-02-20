import { getSupabase } from "@/lib/supabase";

export type ProductSource =
  | "reddit"
  | "twitter"
  | "github"
  | "appstore"
  | "producthunt"
  | "indiehackers"
  | "hackernews"
  | "manual";

export interface Product {
  slug: string;
  name: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  source: ProductSource;
  icon: string;
  accentColor: string;
  createdAt: string;
  complaint?: string;
  complaintAuthor?: string;
  complaintUrl?: string;
  score?: number;
}

interface ProductRow {
  slug: string;
  name: string;
  description: string;
  live_url: string;
  github_url: string;
  source: string;
  icon: string;
  accent_color: string;
  created_at: string;
  complaint: string | null;
  complaint_author: string | null;
  complaint_url: string | null;
  score: number | null;
}

function rowToProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    liveUrl: row.live_url,
    githubUrl: row.github_url,
    source: row.source as ProductSource,
    icon: row.icon,
    accentColor: row.accent_color,
    createdAt: row.created_at,
    complaint: row.complaint ?? undefined,
    complaintAuthor: row.complaint_author ?? undefined,
    complaintUrl: row.complaint_url ?? undefined,
    score: row.score ?? undefined,
  };
}

export async function getProducts(): Promise<Product[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }

  return (data as ProductRow[]).map(rowToProduct);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return rowToProduct(data as ProductRow);
}
