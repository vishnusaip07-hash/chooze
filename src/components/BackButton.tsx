"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
    >
      ← Back
    </button>
  );
}