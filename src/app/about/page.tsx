export default function AboutPage() {
  return (
    <div className="space-y-16">

      {/* TITLE */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">
          About Chooze
        </h1>
        <p className="text-zinc-400 text-lg">
          Smarter counselling decisions, made simple.
        </p>
      </section>

      {/* WHAT IS CHOOZE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          What is Chooze?
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          Chooze is a JEE counselling assistance platform built to
          help students make confident and informed decisions
          during JoSAA counselling. It combines rank prediction,
          smart simulations, and data-backed tools to reduce
          confusion and costly mistakes.
        </p>
      </section>

      {/* WHO BUILT IT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Who built Chooze?
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          Chooze is built by students of the
          <span className="text-white font-medium">
            {" "}National Institute of Technology (NIT)
          </span>,
          who have personally gone through the JoSAA counselling
          process and understand the real confusion students face.
        </p>
      </section>

      {/* WHO IT IS FOR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Who is it for?
        </h2>
        <ul className="list-disc list-inside text-zinc-400 space-y-2">
          <li>JEE Main & Advanced aspirants</li>
          <li>Students confused between branches or colleges</li>
          <li>Parents supporting counselling decisions</li>
        </ul>
      </section>

      {/* FEATURES */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          What Chooze offers
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h3 className="font-semibold mb-2">
              Rank Predictor
            </h3>
            <p className="text-zinc-400 text-sm">
              Estimate your expected rank from percentile using
              real previous-year trends.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h3 className="font-semibold mb-2">
              Smart Choice Filler
            </h3>
            <p className="text-zinc-400 text-sm">
              Auto-generate optimized JoSAA choice lists based on
              rank, preferences, and priorities.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h3 className="font-semibold mb-2">
              Chat Assistant
            </h3>
            <p className="text-zinc-400 text-sm">
              Get instant answers to counselling-related doubts.
            </p>
          </div>
        </div>
      </section>

      {/* DATA DISCLAIMER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Data & accuracy
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          Predictions and simulations are based on publicly
          available JEE Main and JoSAA data from recent years.
          While Chooze provides strong estimates, final outcomes
          depend on real-time counselling dynamics.
        </p>
      </section>

      {/* FOOTER NOTE */}
      <section className="pt-8 border-t border-zinc-800 text-sm text-zinc-500">
        Chooze is built to assist — not replace — informed
        decision making.
      </section>

    </div>
  );
}