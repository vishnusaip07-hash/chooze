import { NextResponse } from "next/server";
import { loadJosaaData } from "@/lib/josaaLoader";

export const runtime = "nodejs";

type Seat = {
  institute: string;
  program: string;
  quota: string;
  seatType: string;
  gender: string;
  round?: number;
  openingRank: number;
  closingRank: number;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const rankParam = searchParams.get("rank");
    const seatType = searchParams.get("seatType");
    const gender = searchParams.get("gender");
    const quota = searchParams.get("quota");
    const roundParam = searchParams.get("round");

    const rank = Number(rankParam);

    if (!rankParam || isNaN(rank) || rank <= 0) {
      return NextResponse.json(
        { error: "Valid rank is required" },
        { status: 400 }
      );
    }

    // ✅ FIXED — await async loader
    const data: Seat[] = await loadJosaaData();

    let results = data.filter(
      (seat) => rank <= seat.closingRank
    );

    if (seatType) {
      results = results.filter(
        (seat) => seat.seatType === seatType
      );
    }

    if (gender) {
      results = results.filter(
        (seat) => seat.gender === gender
      );
    }

    if (quota) {
      results = results.filter(
        (seat) => seat.quota === quota
      );
    }

    if (roundParam) {
      const roundNumber = Number(roundParam);
      if (!isNaN(roundNumber)) {
        results = results.filter(
          (seat) => seat.round === roundNumber
        );
      }
    }

    results = results
      .sort((a, b) => a.closingRank - b.closingRank)
      .slice(0, 20);

    return NextResponse.json({
      status: "ok",
      count: results.length,
      results,
    });
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}