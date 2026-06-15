export default function LivroReclamacoes() {
  return (
    <a
      href="https://www.livroreclamacoes.pt"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Livro de Reclamações Online"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-lg transition-shadow hover:shadow-xl"
    >
      <svg width="26" height="26" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="6" fill="#CC0000"/>
        <rect x="8" y="10" width="24" height="20" rx="2" fill="white"/>
        <rect x="11" y="15" width="18" height="2" rx="1" fill="#CC0000"/>
        <rect x="11" y="19" width="14" height="2" rx="1" fill="#CC0000"/>
        <rect x="11" y="23" width="10" height="2" rx="1" fill="#CC0000"/>
      </svg>
      <div>
        <p className="text-xs font-bold text-zinc-800">Livro de Reclamações</p>
        <p className="text-[10px] text-zinc-400">livroreclamacoes.pt</p>
      </div>
    </a>
  );
}
