import productsData from "@/data/products.json";

export type ProductSource =
  | "reddit"
  | "twitter"
  | "github"
  | "appstore"
  | "producthunt"
  | "indiehackers"
  | "hackernews";

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
}

export const PRODUCTS: Product[] = (productsData as Product[]).sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);
