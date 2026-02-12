import { NextResponse } from "next/server";
import { loadJosaaData } from "@/lib/josaaLoader";
import { predictRanks } from "@/lib/rankPredictor";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { percentile, category } = await req.json();

    if (
      typeof percentile !== "number" ||
      percentile <= 0 ||
      percentile > 100
    ) {
      return NextResponse.json(
        { error: "Invalid percentile" },
        { status: 400 }
      );
    }

    const { openRank, categoryRank, range } =
      predictRanks(percentile, category);

    // ✅ FIXED — await the loader
    const josaaData = await loadJosaaData();

    const openRankResults = josaaData
      .filter(
        (seat) =>
          seat.seatType === "OPEN" &&
          openRank <= seat.closingRank
      )
      .sort((a, b) => a.closingRank - b.closingRank)
      .slice(0, 20);

    const categoryRankResults =
      category &&
      category !== "OPEN" &&
      categoryRank !== null
        ? josaaData
            .filter(
              (seat) =>
                seat.seatType === category &&
                categoryRank <= seat.closingRank
            )
            .sort((a, b) => a.closingRank - b.closingRank)
            .slice(0, 20)
        : null;

    return NextResponse.json({
      range,
      openRankResults,
      categoryRankResults,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}