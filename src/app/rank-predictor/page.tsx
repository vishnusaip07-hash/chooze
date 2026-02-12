"use client";

import { useState } from "react";

type Seat = {
  institute: string;
  program: string;
  closingRank: number | null;
};

type ApiResult = {
  range: {
    best: number;
    likely: number;
    worst: number;
  };
  openRankResults: Seat[];
  categoryRankResults: Seat[] | null;
};

export default function RankPredictorPage() {
  const [percentile, setPercentile] = useState("");
  const [category, setCategory] = useState("OPEN");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handlePredict() {
    const p = parseFloat(percentile);
    if (isNaN(p)) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/rank-predictor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ percentile: p, category }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setResult(data);
    } catch (err) {
      setError("Failed to fetch prediction");
    }

    setLoading(false);
  }

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold">JEE Rank Predictor</h1>
      <p className="text-zinc-400 max-w-xl">
        Enter your percentile and category to estimate your rank and view eligible seats based on JoSAA 2025 data.
      </p>

      <div className="max-w-sm space-y-4">
        <input
          type="number"
          step="0.01"
          placeholder="Enter your percentile"
          value={percentile}
          onChange={(e) => setPercentile(e.target.value)}
          className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white"
        >
          <option value="OPEN">OPEN</option>
          <option value="OBC-NCL">OBC-NCL</option>
          <option value="EWS">EWS</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
        </select>

        <button
          onClick={handlePredict}
          disabled={loading}
          className="w-full rounded-xl bg-zinc-800 hover:bg-zinc-700 px-4 py-3 font-medium"
        >
          {loading ? "Predicting..." : "Predict Rank"}
        </button>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>

      {result && (
        <div className="space-y-6">
          <div className="max-w-md rounded-xl border border-zinc-800/60 bg-zinc-900/60 p-4 backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-3">
              Predicted Rank Range
            </h2>
            <div className="space-y-1 text-sm text-zinc-300">
              <p>
                Best:{" "}
                <span className="text-white font-medium">
                  {result.range.best.toLocaleString()}
                </span>
              </p>
              <p>
                Likely:{" "}
                <span className="text-white font-medium">
                  {result.range.likely.toLocaleString()}
                </span>
              </p>
              <p>
                Worst:{" "}
                <span className="text-white font-medium">
                  {result.range.worst.toLocaleString()}
                </span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              OPEN Rank Seats
            </h3>
            {result.openRankResults.length === 0 ? (
              <p className="text-zinc-500">No seats found</p>
            ) : (
              result.openRankResults.map((s, i) => (
                <div
                  key={i}
                  className="border border-zinc-800 rounded-lg p-3 mb-2"
                >
                  <div className="font-medium">
                    {s.institute}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {s.program} • Closing Rank:{" "}
                    {s.closingRank ?? "N/A"}
                  </div>
                </div>
              ))
            )}
          </div>

          {result.categoryRankResults && (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {category} Seats
              </h3>
              {result.categoryRankResults.length === 0 ? (
                <p className="text-zinc-500">
                  No seats found
                </p>
              ) : (
                result.categoryRankResults.map((s, i) => (
                  <div
                    key={i}
                    className="border border-zinc-800 rounded-lg p-3 mb-2"
                  >
                    <div className="font-medium">
                      {s.institute}
                    </div>
                    <div className="text-sm text-zinc-400">
                      {s.program} • Closing Rank:{" "}
                      {s.closingRank ?? "N/A"}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}