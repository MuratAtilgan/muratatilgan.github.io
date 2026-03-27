export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
      <p>&copy; {new Date().getFullYear()} Murat Atilgan. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="mailto:ma@caledonianai.co.uk" className="hover:text-zinc-200 transition-colors">Email</a>
        <a href="https://www.caledonianai.co.uk/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors">Caledonian AI</a>
      </div>
    </footer>
  );
}
