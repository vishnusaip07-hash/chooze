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

      {/* Ad / wide section */}
      <div className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
        Advertisement / Premium Features Banner
      </div>
    </div>
  );
}