export interface CourseModule {
  title: string;
  lessons: { title: string; duration: string }[];
}

export interface Course {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  lessons: number;
  students: number;
  level: string;
  rating: number;
  reviews: number;
  price: number;
  salePrice: number;
  badge: string;
  duration: string;
  language: string;
  certificate: boolean;
  instructor: {
    name: string;
    avatar: string;
    role: string;
  };
  description: string;
  objectives: string[];
  modules: CourseModule[];
}

export const courses: Course[] = [
  {
    id: 1,
    slug: "informatica-essencial",
    title: "Informática Essencial",
    category: "Informática",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=600&h=400&fit=crop",
    lessons: 80,
    students: 110,
    level: "Intermediário",
    rating: 5.0,
    reviews: 42,
    price: 800,
    salePrice: 700,
    badge: "Mais Vendido",
    duration: "40h",
    language: "Português",
    certificate: true,
    instructor: { name: "Prof. Carlos Silva", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", role: "Especialista em TI" },
    description: "Domine as ferramentas essenciais de informática para o mercado de trabalho. Aprenda desde o básico até recursos avançados do pacote Office, navegação segura na internet e organização de arquivos.",
    objectives: ["Dominar o pacote Office completo", "Navegar com segurança na internet", "Gerenciar arquivos e pastas eficientemente", "Utilizar ferramentas de produtividade", "Solucionar problemas comuns do computador"],
    modules: [
      { title: "Introdução ao Computador", lessons: [{ title: "Hardware e Software", duration: "15min" }, { title: "Sistema Operacional Windows", duration: "20min" }, { title: "Gerenciamento de Arquivos", duration: "18min" }] },
      { title: "Microsoft Word", lessons: [{ title: "Formatação de Textos", duration: "22min" }, { title: "Tabelas e Imagens", duration: "19min" }, { title: "Estilos e Templates", duration: "16min" }] },
      { title: "Microsoft Excel", lessons: [{ title: "Fórmulas Básicas", duration: "25min" }, { title: "Gráficos e Tabelas Dinâmicas", duration: "30min" }, { title: "Funções Avançadas", duration: "28min" }] },
      { title: "Internet e Segurança", lessons: [{ title: "Navegação Segura", duration: "14min" }, { title: "E-mail Profissional", duration: "12min" }, { title: "Ferramentas Online", duration: "20min" }] },
    ],
  },
  {
    id: 2,
    slug: "python-para-iniciantes",
    title: "Python para Iniciantes",
    category: "Programação",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop",
    lessons: 65,
    students: 230,
    level: "Iniciante",
    rating: 4.9,
    reviews: 87,
    price: 600,
    salePrice: 450,
    badge: "Popular",
    duration: "35h",
    language: "Português",
    certificate: true,
    instructor: { name: "Ana Costa", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", role: "Desenvolvedora Sênior" },
    description: "Aprenda Python do zero ao avançado. Este curso cobre desde a sintaxe básica até projetos práticos com automação, web scraping e análise de dados.",
    objectives: ["Entender a lógica de programação", "Escrever scripts Python funcionais", "Trabalhar com bibliotecas populares", "Criar projetos práticos do mundo real", "Manipular dados com Pandas"],
    modules: [
      { title: "Fundamentos do Python", lessons: [{ title: "Instalação e Configuração", duration: "10min" }, { title: "Variáveis e Tipos de Dados", duration: "22min" }, { title: "Estruturas Condicionais", duration: "25min" }] },
      { title: "Estruturas de Dados", lessons: [{ title: "Listas e Tuplas", duration: "20min" }, { title: "Dicionários e Sets", duration: "18min" }, { title: "Compreensão de Listas", duration: "15min" }] },
      { title: "Funções e Módulos", lessons: [{ title: "Criando Funções", duration: "22min" }, { title: "Módulos e Pacotes", duration: "18min" }, { title: "Tratamento de Erros", duration: "16min" }] },
      { title: "Projetos Práticos", lessons: [{ title: "Automação de Tarefas", duration: "30min" }, { title: "Web Scraping", duration: "28min" }, { title: "Análise de Dados", duration: "35min" }] },
    ],
  },
  {
    id: 3,
    slug: "design-ui-ux-completo",
    title: "Design UI/UX Completo",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    lessons: 92,
    students: 185,
    level: "Avançado",
    rating: 4.8,
    reviews: 63,
    price: 900,
    salePrice: 750,
    badge: "Novo",
    duration: "48h",
    language: "Português",
    certificate: true,
    instructor: { name: "Marcos Oliveira", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", role: "UI/UX Designer Lead" },
    description: "Curso completo de Design UI/UX. Aprenda a criar interfaces incríveis, realizar pesquisas com usuários, prototipar no Figma e entregar produtos digitais de alta qualidade.",
    objectives: ["Dominar os princípios de UI/UX", "Criar protótipos no Figma", "Conduzir pesquisas de usuário", "Desenvolver Design Systems", "Criar portfólios profissionais"],
    modules: [
      { title: "Fundamentos de UX", lessons: [{ title: "O que é UX Design", duration: "15min" }, { title: "Pesquisa de Usuário", duration: "25min" }, { title: "Personas e Jornadas", duration: "22min" }] },
      { title: "UI Design", lessons: [{ title: "Tipografia e Cores", duration: "20min" }, { title: "Grids e Layouts", duration: "18min" }, { title: "Componentes e Padrões", duration: "24min" }] },
      { title: "Figma Avançado", lessons: [{ title: "Auto Layout", duration: "22min" }, { title: "Componentes Interativos", duration: "28min" }, { title: "Prototipagem", duration: "30min" }] },
      { title: "Design System", lessons: [{ title: "Criando um DS", duration: "35min" }, { title: "Documentação", duration: "20min" }, { title: "Handoff para Devs", duration: "18min" }] },
    ],
  },
  {
    id: 4,
    slug: "marketing-digital-estrategico",
    title: "Marketing Digital Estratégico",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    lessons: 55,
    students: 320,
    level: "Intermediário",
    rating: 4.7,
    reviews: 95,
    price: 700,
    salePrice: 500,
    badge: "Mais Vendido",
    duration: "30h",
    language: "Português",
    certificate: true,
    instructor: { name: "Juliana Mendes", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", role: "Head de Marketing" },
    description: "Aprenda estratégias de marketing digital que realmente funcionam. SEO, tráfego pago, redes sociais, e-mail marketing e muito mais para alavancar seu negócio.",
    objectives: ["Criar estratégias de SEO eficientes", "Gerenciar campanhas de tráfego pago", "Dominar redes sociais para negócios", "Criar funis de vendas", "Analisar métricas e KPIs"],
    modules: [
      { title: "Fundamentos do Marketing Digital", lessons: [{ title: "Panorama do Marketing Digital", duration: "15min" }, { title: "Persona e Público-Alvo", duration: "20min" }, { title: "Funil de Vendas", duration: "18min" }] },
      { title: "SEO e Conteúdo", lessons: [{ title: "SEO On-Page", duration: "25min" }, { title: "SEO Off-Page", duration: "20min" }, { title: "Marketing de Conteúdo", duration: "22min" }] },
      { title: "Tráfego Pago", lessons: [{ title: "Google Ads", duration: "30min" }, { title: "Facebook/Instagram Ads", duration: "28min" }, { title: "Otimização de Campanhas", duration: "25min" }] },
    ],
  },
  {
    id: 5,
    slug: "excel-avancado-para-negocios",
    title: "Excel Avançado para Negócios",
    category: "Negócios",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    lessons: 48,
    students: 175,
    level: "Avançado",
    rating: 4.9,
    reviews: 58,
    price: 550,
    salePrice: 400,
    badge: "Popular",
    duration: "25h",
    language: "Português",
    certificate: true,
    instructor: { name: "Prof. Carlos Silva", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", role: "Especialista em TI" },
    description: "Leve suas habilidades de Excel ao próximo nível. Dashboards, macros VBA, Power Query e análise avançada de dados para tomada de decisões empresariais.",
    objectives: ["Criar dashboards profissionais", "Automatizar tarefas com VBA", "Utilizar Power Query e Power Pivot", "Analisar grandes volumes de dados", "Criar relatórios executivos"],
    modules: [
      { title: "Fórmulas Avançadas", lessons: [{ title: "PROCV/PROCX e INDEX/MATCH", duration: "25min" }, { title: "Fórmulas Matriciais", duration: "22min" }, { title: "Funções de Texto e Data", duration: "18min" }] },
      { title: "Dashboards", lessons: [{ title: "Gráficos Avançados", duration: "28min" }, { title: "Tabelas Dinâmicas", duration: "30min" }, { title: "Segmentação de Dados", duration: "20min" }] },
      { title: "VBA e Macros", lessons: [{ title: "Introdução ao VBA", duration: "25min" }, { title: "Criando Macros", duration: "22min" }, { title: "Automatizando Relatórios", duration: "30min" }] },
    ],
  },
  {
    id: 6,
    slug: "desenvolvimento-web-fullstack",
    title: "Desenvolvimento Web Fullstack",
    category: "Programação",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    lessons: 120,
    students: 290,
    level: "Intermediário",
    rating: 4.8,
    reviews: 112,
    price: 1200,
    salePrice: 900,
    badge: "Destaque",
    duration: "60h",
    language: "Português",
    certificate: true,
    instructor: { name: "Ana Costa", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", role: "Desenvolvedora Sênior" },
    description: "Torne-se um desenvolvedor web completo. HTML, CSS, JavaScript, React, Node.js e banco de dados. Do frontend ao backend em um único curso.",
    objectives: ["Construir sites responsivos com HTML/CSS", "Programar com JavaScript moderno", "Criar aplicações React", "Desenvolver APIs com Node.js", "Trabalhar com banco de dados"],
    modules: [
      { title: "HTML e CSS", lessons: [{ title: "Estrutura HTML5", duration: "20min" }, { title: "CSS Flexbox e Grid", duration: "25min" }, { title: "Responsividade", duration: "22min" }] },
      { title: "JavaScript", lessons: [{ title: "Fundamentos JS", duration: "25min" }, { title: "DOM e Eventos", duration: "22min" }, { title: "Async/Await e APIs", duration: "28min" }] },
      { title: "React", lessons: [{ title: "Componentes e Props", duration: "25min" }, { title: "State e Hooks", duration: "30min" }, { title: "Roteamento e Context", duration: "28min" }] },
      { title: "Node.js e Backend", lessons: [{ title: "Express.js", duration: "25min" }, { title: "REST APIs", duration: "28min" }, { title: "Banco de Dados", duration: "30min" }] },
    ],
  },
];

export const categories = [...new Set(courses.map((c) => c.category))];
export const levels = [...new Set(courses.map((c) => c.level))];
