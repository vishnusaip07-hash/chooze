// app/page.tsx
import Link from "next/link";

const features = [
  {
    title: "Smart Choice Filler",
    desc: "Auto-generate optimized JoSAA choices",
    href: "/simulator",
  },
  {
    title: "Rank Predictor",
    desc: "Predict rank from percentile & data",
    href: "/rank-predictor",
  },
  {
    title: "Chat / Assistant",
    desc: "Ask counselling doubts instantly",
    href: "/chat",
  },
];

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Chooze</h1>
      <p className="text-zinc-400 mb-10">
        Smarter counselling decisions, made simple.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f) => (
          <Link key={f.title} href={f.href}>
            <div className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:-translate-y-1 hover:border-zinc-600 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-2">
                {f.title}
              </h2>
              <p className="text-zinc-400 group-hover:text-zinc-300">
                {f.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Phase 1 Important Note */}
      <div className="mt-16 rounded-2xl border border-blue-500/40 bg-blue-500/10 p-8 text-center">
        <h2 className="text-lg font-semibold text-blue-300 mb-2">
          ℹ️ Important Note
        </h2>
        <p className="text-blue-200 text-sm">
          Current results are based on Phase 1 counselling data. Closing ranks may
          vary in Phase 2 and subsequent rounds depending on applicant participation
          and seat movement.
        </p>
      </div>
    </div>
  );
}