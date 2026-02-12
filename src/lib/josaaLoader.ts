import fs from "fs/promises";
import path from "path";

export type JosaaSeat = {
  institute: string;
  program: string;
  quota: string;
  seatType: string;
  gender: string;
  round: number;
  openingRank: number;
  closingRank: number;
};

let cachedData: JosaaSeat[] | null = null;

export async function loadJosaaData(): Promise<JosaaSeat[]> {
  if (cachedData) return cachedData;

  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "josaa-2025.json"
    );

    console.log("Reading file from:", filePath);

    const raw = await fs.readFile(filePath, "utf-8");
    const json: Record<string, unknown>[] = JSON.parse(raw);

    cachedData = json
      .filter((row) => String(row["Year"]) === "2025")
      .map((row) => ({
        institute: String(row["Institute"] ?? ""),
        program: String(row["Academic_Program"] ?? ""),
        quota: String(row["Quota"] ?? ""),
        seatType: String(row["Seat_Type"] ?? ""),
        gender: String(row["Gender"] ?? ""),
        round: Number(row["Round"]),
        openingRank: Number(row["Opening_Rank"]),
        closingRank: Number(row["Closing_Rank"]),
      }))
      .filter(
        (row) =>
          !isNaN(row.round) &&
          !isNaN(row.openingRank) &&
          !isNaN(row.closingRank)
      );

    console.log("Loaded seats:", cachedData.length);

    return cachedData;
  } catch (error) {
    console.error("Loader error:", error);
    throw error;
  }
}