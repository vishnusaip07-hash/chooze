// src/lib/rankPredictor.ts

export const TOTAL_CANDIDATES = 1036211;

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

const CATEGORY_MULTIPLIER: Record<Category, number> = {
  OPEN: 1,
  "OBC-NCL": 0.25,
  EWS: 0.35,
  SC: 0.15,
  ST: 0.08,
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

  const baseRank =
    ((100 - percentile) / 100) * TOTAL_CANDIDATES;

  const safeBaseRank = Math.max(1, baseRank);

  const range: RankRange = {
    best: Math.max(1, Math.round(safeBaseRank * 0.9)),
    likely: Math.max(1, Math.round(safeBaseRank)),
    worst: Math.max(1, Math.round(safeBaseRank * 1.15)),
  };

  const openRank = range.likely;

  const multiplier =
    CATEGORY_MULTIPLIER[normalizedCategory] ?? 1;

  const categoryRank =
    normalizedCategory === "OPEN"
      ? null
      : Math.max(1, Math.round(openRank * multiplier));

  return {
    openRank,
    categoryRank,
    range,
  };
}