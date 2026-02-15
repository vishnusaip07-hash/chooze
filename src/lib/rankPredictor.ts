// src/lib/rankPredictor.ts

// JEE Main 2026 Session 1 Approx Total Appeared
export const TOTAL_CANDIDATES = 1300368;

export type RankRange = {
  best: number;
  likely: number;
  worst: number;
};

export type RankResult = {
  openRank: number;
  categoryRank: number | null;
  range: RankRange;
};

export type Category =
  | "OPEN"
  | "OBC-NCL"
  | "EWS"
  | "SC"
  | "ST";

/*
  Approx category participation distribution
  (based on historical NTA patterns)
*/
const CATEGORY_DISTRIBUTION: Record<Category, number> = {
  OPEN: 0.43,
  "OBC-NCL": 0.37,
  EWS: 0.10,
  SC: 0.07,
  ST: 0.03,
};

export function predictRanks(
  percentile: number,
  category: string
): RankResult {
  if (percentile <= 0 || percentile > 100) {
    throw new Error("Invalid percentile");
  }

  const normalizedCategory =
    (category?.toUpperCase() as Category) ?? "OPEN";

  // ---------------------------
  // OPEN RANK (AIR)
  // ---------------------------
  const rawOpenRank =
    ((100 - percentile) / 100) * TOTAL_CANDIDATES;

  const openRank = Math.max(1, Math.round(rawOpenRank));

  // Rank Range Buffer
  const range: RankRange = {
    best: Math.max(1, Math.round(openRank * 0.9)),
    likely: openRank,
    worst: Math.max(1, Math.round(openRank * 1.15)),
  };

  // ---------------------------
  // CATEGORY RANK
  // ---------------------------
  const categoryShare =
    CATEGORY_DISTRIBUTION[normalizedCategory] ?? 1;

  const totalCategoryCandidates =
    TOTAL_CANDIDATES * categoryShare;

  const rawCategoryRank =
    ((100 - percentile) / 100) *
    totalCategoryCandidates;

  const categoryRank =
    normalizedCategory === "OPEN"
      ? null
      : Math.max(1, Math.round(rawCategoryRank));

  return {
    openRank,
    categoryRank,
    range,
  };
}