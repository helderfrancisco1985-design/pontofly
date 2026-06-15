type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  reelUrl?: string;
  content: ContentBlock[];
};

export const posts: Post[] = [
  {
    slug: "como-escolher-o-fio-certo",
    category: "Guias",
    title: "Como escolher o fio certo para o teu projeto",
    excerpt:
      "Lã, algodão, acrílico ou mistura? Descobre como escolher o fio ideal consoante o projeto, a estação do ano e o teu nível de experiência.",
    date: "2 de junho de 2025",
    readTime: "5 min de leitura",
    reelUrl: "https://www.instagram.com/reel/DJZICvytsx2/",
    content: [
      {
        type: "paragraph",
        text: "Uma das primeiras dúvidas de quem começa a tricotar ou a fazer croché é: que fio devo usar? A resposta depende de vários fatores — o tipo de projeto, a estação do ano, o nível de experiência e, claro, o teu orçamento. Neste guia explicamos tudo o que precisas de saber para fazer a escolha certa.",
      },
      {
        type: "heading",
        text: "Tipos de fibra: cada uma tem o seu lugar",
      },
      {
        type: "paragraph",
        text: "A lã é a fibra mais tradicional e continua a ser a favorita de muitas artesãs. É quente, elástica e muito agradável de trabalhar. Ideal para peças de inverno como gorros, cachecóis e casacos. No entanto, pode ser menos indicada para pessoas com pele sensível ou para bebés.",
      },
      {
        type: "paragraph",
        text: "O algodão é uma excelente opção para projetos de verão ou para artigos de uso doméstico como porta-copos, sacos de supermercado e toalhas. É resistente, lavável e não provoca alergias. A desvantagem é que tem menos elasticidade do que a lã, o que pode tornar o trabalho ligeiramente mais difícil para principiantes.",
      },
      {
        type: "paragraph",
        text: "O acrílico é a escolha mais económica e prática. Lava bem na máquina, é durável e está disponível numa grande variedade de cores. É perfeito para projetos decorativos, brinquedos amigurumi e peças do dia a dia. Para quem está a aprender, o acrílico é muitas vezes a melhor forma de começar sem gastar muito.",
      },
      {
        type: "paragraph",
        text: "As misturas combinam o melhor de cada mundo. Um fio de lã com acrílico, por exemplo, oferece o calor da lã com a facilidade de cuidados do acrílico. Vale sempre a pena ler o rótulo e perceber a composição exata antes de comprar.",
      },
      {
        type: "heading",
        text: "A espessura importa",
      },
      {
        type: "paragraph",
        text: "A espessura do fio — também chamada de peso — determina a rapidez com que o projeto cresce e o aspeto final da peça. Fios finos criam tecidos delicados e leves, ideais para xailes e tops de verão. Fios grossos trabalham-se mais depressa e resultam em peças mais quentes e estruturadas.",
      },
      {
        type: "list",
        items: [
          "Superfino / Fingering — meias, xailes delicados, rendas",
          "Fino / Sport — tops, casacos leves de primavera",
          "Médio / Worsted — o mais versátil, ótimo para principiantes",
          "Grosso / Bulky — cachecóis, gorros, cobertores rápidos",
          "Super grosso — projetos de braço ou agulhas gigantes",
        ],
      },
      {
        type: "heading",
        text: "Pensa na estação do ano",
      },
      {
        type: "paragraph",
        text: "Para peças de inverno, privilegia fibras naturais com boa capacidade térmica — lã merina, alpaca ou misturas com estas fibras. Para primavera e verão, opta por algodão, linho ou bambu, que são respiráveis e não aquecem demasiado.",
      },
      {
        type: "heading",
        text: "Adapta ao teu nível de experiência",
      },
      {
        type: "paragraph",
        text: "Se estás a começar, evita fios muito finos ou com textura peluda (como o mohair), pois dificultam a visualização dos pontos e tornam mais complicado corrigir erros. Um fio médio liso, de cor clara ou neutra, é o ideal para aprender — consegues ver os pontos com clareza e progredir com confiança.",
      },
      {
        type: "paragraph",
        text: "À medida que ganhas experiência, podes experimentar fibras mais delicadas, fios matizados ou mesmo criar a tua própria combinação de fios para efeitos únicos. A curiosidade é o melhor guia nesta arte.",
      },
      {
        type: "heading",
        text: "O nosso conselho final",
      },
      {
        type: "paragraph",
        text: "Antes de comprar grandes quantidades, compra uma meada e trabalha uma amostra. Observa como o fio se comporta nas tuas mãos, como cai após lavar e se o resultado final corresponde ao que imaginavas. Na Ponto Fly tens acesso a uma seleção cuidada de fios para todos os gostos e projetos — não hesites em contactar-nos se precisares de ajuda para escolher.",
      },
    ],
  },
  {
    slug: "trico-ou-croche",
    category: "Inspiração",
    title: "Tricô ou croché: qual combina mais contigo?",
    excerpt:
      "Duas técnicas, mil possibilidades. Exploramos as diferenças entre tricô e croché para te ajudar a encontrar o teu ponto favorito.",
    date: "18 de maio de 2025",
    readTime: "4 min de leitura",
    reelUrl: "https://www.instagram.com/reel/DHbqxD8NdXt/",
    content: [
      {
        type: "paragraph",
        text: "Tricô e croché são duas das formas mais antigas e gratificantes de criar à mão. Ambas usam fio e resultam em peças bonitas e funcionais, mas são técnicas distintas com ferramentas, movimentos e resultados diferentes. Se estás a pensar por onde começar, este artigo ajuda-te a descobrir qual das duas é a tua.",
      },
      {
        type: "heading",
        text: "O que é o tricô?",
      },
      {
        type: "paragraph",
        text: "O tricô usa duas agulhas (ou uma agulha circular) para criar malha através de pontos interligados. O tecido resultante é elástico, leve e muito parecido com o das camisolas industriais. É a técnica ideal para peças de vestuário como camisolas, meias, cachecóis e luvas.",
      },
      {
        type: "paragraph",
        text: "O processo envolve manter vários pontos ativos em simultâneo nas agulhas, o que pode parecer intimidante no início. No entanto, com prática, os movimentos tornam-se rítmicos e quase meditativas.",
      },
      {
        type: "heading",
        text: "O que é o croché?",
      },
      {
        type: "paragraph",
        text: "O croché usa apenas uma agulha com gancho para puxar o fio através de laçadas. Trabalhas um ponto de cada vez, o que torna muito mais fácil corrigir erros — basta puxar o fio e recomeçar. O tecido resultante é geralmente mais espesso e estruturado do que o tricô.",
      },
      {
        type: "paragraph",
        text: "É uma técnica extremamente versátil: podes criar roupas, acessórios, bonecos amigurumi, cestos, decorações e muito mais. Muitas pessoas consideram o croché mais rápido de aprender do que o tricô.",
      },
      {
        type: "heading",
        text: "Principais diferenças",
      },
      {
        type: "list",
        items: [
          "Ferramentas: tricô usa duas agulhas; croché usa uma agulha com gancho",
          "Dificuldade inicial: croché é geralmente mais fácil para principiantes",
          "Correção de erros: muito mais simples no croché",
          "Tecido: tricô é mais elástico e fino; croché é mais estruturado",
          "Velocidade: o croché tende a ser mais rápido",
          "Versatilidade 3D: o croché é superior para formas tridimensionais (amigurumi, cestos)",
          "Vestuário fluido: o tricô dá resultados mais próximos do têxtil industrial",
        ],
      },
      {
        type: "heading",
        text: "Qual é mais fácil de aprender?",
      },
      {
        type: "paragraph",
        text: "A maioria dos instrutores recomenda o croché para quem começa do zero, precisamente porque só se usa uma agulha e se trabalha um ponto de cada vez. Se errares, é muito simples desfazer. No tricô, gerir os pontos em duas agulhas em simultâneo requer um pouco mais de coordenação.",
      },
      {
        type: "paragraph",
        text: "Dito isto, há pessoas que preferem naturalmente o tricô desde o início — os movimentos parecem mais intuitivos para elas. A melhor forma de descobrir é experimentar as duas técnicas antes de decidir.",
      },
      {
        type: "heading",
        text: "Podes aprender as duas",
      },
      {
        type: "paragraph",
        text: "Muitas artesãs dominam ambas as técnicas e escolhem a mais adequada consoante o projeto. Não tens de te limitar a uma. Começar por uma e explorar a outra mais tarde é uma forma fantástica de crescer como criadora e de alargar o que consegues fazer.",
      },
      {
        type: "paragraph",
        text: "Na Ponto Fly tens fios e acessórios adequados para as duas técnicas. Se precisares de ajuda para escolher a agulha certa para começar, fala connosco — temos todo o gosto em orientar-te.",
      },
    ],
  },
  {
    slug: "5-ideias-para-comecar",
    category: "Projetos",
    title: "5 ideias simples para começar a criar à mão",
    excerpt:
      "Nunca tricotaste antes? Sem problema. Aqui ficam cinco projetos perfeitos para principiantes, com materiais fáceis de encontrar.",
    date: "5 de maio de 2025",
    readTime: "6 min de leitura",
    reelUrl: "https://www.instagram.com/reel/DFSxyf0txke/",
    content: [
      {
        type: "paragraph",
        text: "Começar a tricotar ou a fazer croché pode parecer desafiante, mas a verdade é que há muitos projetos pensados especialmente para quem está a dar os primeiros passos. A chave é começar simples, celebrar o progresso e não ter medo de errar — os erros fazem parte do processo criativo.",
      },
      {
        type: "paragraph",
        text: "Aqui ficam cinco ideias perfeitas para principiantes. Escolhe aquela que mais te motiva e começa hoje.",
      },
      {
        type: "heading",
        text: "1. Cachecol em ponto direito",
      },
      {
        type: "paragraph",
        text: "O cachecol é o projeto clássico para quem começa no tricô. Usa apenas o ponto direito (o ponto mais básico de todos) e não requer costuras nem técnicas especiais. Basta montar pontos suficientes para a largura que queres e continuar linha após linha até atingir o comprimento desejado.",
      },
      {
        type: "paragraph",
        text: "Materiais necessários: um fio médio ou grosso (acrílico ou lã), agulhas de 5 a 7 mm. Tempo estimado: 1 a 3 fins de semana, dependendo do comprimento e da velocidade.",
      },
      {
        type: "heading",
        text: "2. Porta-copos em croché",
      },
      {
        type: "paragraph",
        text: "Os porta-copos são pequenos, rápidos de fazer e incrivelmente úteis. Em croché, trabalham-se em redondo a partir do centro, o que permite aprender os pontos básicos sem ter de lidar com costuras. São o projeto ideal para fazer em grande quantidade e oferecer como prenda.",
      },
      {
        type: "paragraph",
        text: "Materiais necessários: algodão de espessura média, agulha de croché de 3,5 a 4 mm. Tempo estimado: 1 a 2 horas por porta-copos.",
      },
      {
        type: "heading",
        text: "3. Gorro básico",
      },
      {
        type: "paragraph",
        text: "Um gorro simples é um dos projetos mais motivadores para principiantes porque o resultado final é imediatamente utilizável. Em croché, pode ser feito em redondo com apenas dois ou três tipos de pontos. Em tricô circular, é igualmente acessível após dominar o ponto direito.",
      },
      {
        type: "paragraph",
        text: "Materiais necessários: fio grosso ou super grosso, agulha circular (para tricô) ou agulha de croché grossa. Tempo estimado: 3 a 5 horas.",
      },
      {
        type: "heading",
        text: "4. Saco de barbante",
      },
      {
        type: "paragraph",
        text: "Os sacos de rede em barbante ou algodão estão na moda e são práticos para o dia a dia — perfeitos para idas ao mercado ou para guardar frutas e legumes. Em croché, o ponto rede é simples de aprender e cresce rapidamente. É também um projeto ecológico e com impacto visual imediato.",
      },
      {
        type: "paragraph",
        text: "Materiais necessários: barbante de algodão cru ou colorido, agulha de croché de 4 a 5 mm. Tempo estimado: 4 a 6 horas.",
      },
      {
        type: "heading",
        text: "5. Amigurumi pequeno",
      },
      {
        type: "paragraph",
        text: "Os amigurumi são pequenos bonecos em croché, originários do Japão, que conquistaram o mundo pela sua fofura. São feitos em ponto contínuo (ponto baixo em espiral) e permitem criar personagens infinitas. Um amigurumi simples — como uma bolinha com cara — é acessível para principiantes e faz uma prenda adorável.",
      },
      {
        type: "paragraph",
        text: "Materiais necessários: fio acrílico fino, agulha de croché de 2,5 a 3 mm, enchimento de fibra, olhos de segurança. Tempo estimado: 3 a 4 horas para um boneco pequeno.",
      },
      {
        type: "heading",
        text: "Dicas antes de começar",
      },
      {
        type: "list",
        items: [
          "Escolhe fios de cor clara para ver os pontos com mais facilidade",
          "Não te preocupes com a perfeição — os primeiros projetos são para aprender",
          "Segue tutoriais em vídeo: ver os movimentos em tempo real ajuda muito",
          "Conta os pontos regularmente para não perder nem ganhar pontos sem querer",
          "Faz uma pequena amostra antes de começar o projeto para ajustar o tamanho das agulhas",
        ],
      },
      {
        type: "paragraph",
        text: "Na Ponto Fly encontras todos os materiais de que precisas para começar qualquer um destes projetos. Se tiveres dúvidas sobre que agulha ou fio escolher, fala connosco — adoramos ajudar quem está a dar os primeiros pontos.",
      },
    ],
  },
];
