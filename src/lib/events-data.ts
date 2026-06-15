export type PontoFlyEvent = {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  type: "lancamento" | "feira" | "workshop" | "promocao";
};

export const events: PontoFlyEvent[] = [
  {
    id: "1",
    date: "2025-07-05",
    title: "Nova coleção de verão",
    description: "Chegam os novos fios de algodão e linho em tons frescos para a estação.",
    type: "lancamento",
  },
  {
    id: "2",
    date: "2025-07-19",
    title: "Feira de Artesanato de Braga",
    description: "Encontra-nos no stand da Ponto Fly com novidades e preços especiais.",
    type: "feira",
  },
  {
    id: "3",
    date: "2025-08-02",
    title: "Workshop de Croché para Principiantes",
    description: "Aprende os pontos básicos com a nossa equipa. Vagas limitadas.",
    type: "workshop",
  },
  {
    id: "4",
    date: "2025-08-20",
    title: "Promoção de Verão",
    description: "Até 30% de desconto em fios selecionados durante uma semana.",
    type: "promocao",
  },
  {
    id: "5",
    date: "2025-09-10",
    title: "Lançamento — Coleção Outono",
    description: "Novos fios de lã merino e alpaca para os projetos mais aconchegantes.",
    type: "lancamento",
  },
  {
    id: "6",
    date: "2025-10-04",
    title: "Festival do Artesanato — Lisboa",
    description: "Estaremos presentes no maior festival de artesanato têxtil de Portugal.",
    type: "feira",
  },
];

export const typeConfig = {
  lancamento: { label: "Lançamento", color: "#543286" },
  feira:      { label: "Feira",      color: "#0ea5e9" },
  workshop:   { label: "Workshop",   color: "#f59e0b" },
  promocao:   { label: "Promoção",   color: "#22c55e" },
};
