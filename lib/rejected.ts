import rejectedData from "@/data/rejected.json";

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

export const REJECTED: RejectedIdea[] = (rejectedData as RejectedIdea[]).sort(
  (a, b) =>
    new Date(b.rejectedAt).getTime() - new Date(a.rejectedAt).getTime()
);
