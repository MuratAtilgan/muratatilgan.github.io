import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-center items-center pb-8 mb-16 border-b border-zinc-800">
      <div className="flex gap-8 text-[15px] font-medium tracking-wide">
        <Link href="#about" className="text-zinc-400 hover:text-zinc-100 transition-colors">About</Link>
        <Link href="#work" className="text-zinc-400 hover:text-zinc-100 transition-colors">Research</Link>
        <Link href="#skills" className="text-zinc-400 hover:text-zinc-100 transition-colors">Skills</Link>
        <a href="mailto:muratatilgan@hotmail.co.uk" className="text-zinc-400 hover:text-zinc-100 transition-colors">Contact</a>
      </div>
    </nav>
  );
}
