import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center pb-8 mb-16 border-b border-zinc-800">
      <div className="font-semibold text-lg tracking-tight select-none">
        {/* Logo text removed per user request */}
      </div>
      <div className="flex gap-6 text-sm font-medium">
        <Link href="#about" className="text-zinc-400 hover:text-zinc-100 transition-colors">About</Link>
        <Link href="#work" className="text-zinc-400 hover:text-zinc-100 transition-colors">Work</Link>
        <a href="mailto:muratatilgan@hotmail.co.uk" className="text-zinc-400 hover:text-zinc-100 transition-colors">Contact</a>
      </div>
    </nav>
  );
}
