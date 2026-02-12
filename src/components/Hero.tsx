import Container from "./Container";

export default function Hero() {
  return (
    <Container>
      <div className="py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Chooze
        </h1>

        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
          Smarter JoSAA counselling with intelligent choice filling,
          rank prediction and AI assistance.
        </p>
      </div>
    </Container>
  );
}
