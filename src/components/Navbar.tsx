import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-slate-950/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Brand */}
        <Link
          href="/"
          className="text-xl font-bold text-white"
        >
          Chooze
        </Link>

        {/* Right: Nav links */}
        <div className="flex gap-6 text-slate-300">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
        </div>

      </div>
    </nav>
  );
}