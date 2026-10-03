// Dados dos projetos.
//
// Regras (ver DESIGN_SYSTEM.md, "Cartas de projeto"):
// - `type`: uma ou duas palavras (Full Stack, Web, Back-end).
// - `title`: nome do projeto, até 28 caracteres (não é traduzido).
// - `summary`: o problema que resolve, até ~110 caracteres, em cada idioma.
// - `tech`: de 2 a 4 nomes, os mais relevantes para a vaga.
// - `image`: print da tela principal (1280x800 ou maior, sem moldura de navegador)
//   em `public/projects/`, ex.: "/projects/meu-projeto.png". `null` usa o espaço reservado.
// - `live`: endereço da versão no ar, ou `null` (o link "Ver projeto" some).
// - `github`: link do repositório, ou `null` se for privado (o link "GitHub" some da carta).
// - `details`: descrição completa, de 5 a 7 funcionalidades curtas e de 3 a 5 prints (1280x800).
// - Ordem: o projeto mais próximo de full stack vem primeiro.

type Bilingual = { pt: string; en: string };

// Conteúdo do painel que abre ao clicar na carta (estilo README).
export type ProjectDetails = {
  overview: Bilingual;
  features: { pt: string[]; en: string[] };
  // Prints em `public/projects/`. A primeira imagem é a de abertura do painel.
  gallery: { src: string; caption: Bilingual }[];
};

export type Project = {
  id: string;
  type: { pt: string; en: string };
  title: string;
  summary: { pt: string; en: string };
  tech: string[];
  image: string | null;
  live: string | null;
  github: string | null;
  details: ProjectDetails;
};

export const projects: Project[] = [
  {
    id: "cifro",
    type: { pt: "Full Stack", en: "Full Stack" },
    title: "CIFRO",
    summary: {
      pt: "App de finanças pessoais: contas, cartões, faturas e patrimônio em um painel, com dados isolados por usuário.",
      en: "Personal finance app: accounts, cards, invoices and net worth in one dashboard, with per-user data isolation.",
    },
    tech: ["Next.js", "React", "TypeScript", "Supabase"],
    image: "/projects/cifro.png",
    live: "https://cifro-nine.vercel.app",
    // Repositório privado (Rafaelgs2/CIRFRO-APP). Para exibir o link, torne-o
    // público no GitHub e troque `null` por "https://github.com/Rafaelgs2/CIRFRO-APP".
    github: null,
    details: {
      overview: {
        pt: "O CIFRO reúne contas, cartões, faturas e patrimônio em um único painel, para entender o mês sem montar planilhas. Cada usuário tem os seus dados isolados, e a lógica financeira é coberta por testes.",
        en: "CIFRO brings accounts, cards, invoices and net worth into a single dashboard, so you can understand your month without building spreadsheets. Each user has isolated data, and the financial logic is covered by tests.",
      },
      features: {
        pt: [
          "Contas, receitas, despesas, transferências, cartões, faturas e pagamentos em um só lugar.",
          "Categorias, compromissos, metas, relatórios e fechamento mensal.",
          "Valores guardados e calculados em centavos inteiros, sem erros de arredondamento.",
          "Login por e-mail e senha, com recuperação de conta.",
          "Dados separados por usuário e protegidos por Row Level Security (RLS) no Supabase.",
          "Modo de demonstração com dados fictícios, separado dos dados pessoais.",
          "Testes automatizados dos invariantes financeiros e deploy na Vercel.",
        ],
        en: [
          "Accounts, income, expenses, transfers, cards, invoices and payments in one place.",
          "Categories, commitments, goals, reports and monthly closing.",
          "Amounts stored and calculated as whole cents, with no rounding errors.",
          "Email and password sign-in, with account recovery.",
          "Per-user data protected by Row Level Security (RLS) on Supabase.",
          "Demo mode with fictional data, kept apart from personal data.",
          "Automated tests for the financial invariants, and deployment on Vercel.",
        ],
      },
      gallery: [
        {
          src: "/projects/cifro.png",
          caption: { pt: "Página inicial do CIFRO", en: "CIFRO home page" },
        },
        {
          src: "/projects/cifro/painel.png",
          caption: { pt: "Painel com saldo, receitas, despesas e fluxo financeiro", en: "Dashboard with balance, income, expenses and cash flow" },
        },
        {
          src: "/projects/cifro/movimentacoes.png",
          caption: { pt: "Movimentações com categoria, conta, data e valor", en: "Transactions with category, account, date and amount" },
        },
        {
          src: "/projects/cifro/cartoes.png",
          caption: { pt: "Cartão e fatura, com limite disponível e vencimento", en: "Card and invoice, with available limit and due date" },
        },
        {
          src: "/projects/cifro/leitura.png",
          caption: { pt: "Gráfico de receitas, despesas e saldo ao longo dos meses", en: "Chart of income, expenses and balance over the months" },
        },
        {
          src: "/projects/cifro/mes.png",
          caption: { pt: "Resumo mensal com navegação entre períodos", en: "Monthly summary with navigation between periods" },
        },
      ],
    },
  },
  {
    id: "rt-burguer",
    type: { pt: "Front-end", en: "Front-end" },
    title: "RT BURGUER",
    summary: {
      pt: "Landing page responsiva de uma hamburgueria, com cardápio, avaliações e menu que acompanha a rolagem.",
      en: "Responsive burger restaurant landing page, with menu, reviews and scroll-aware navigation.",
    },
    tech: ["HTML5", "CSS3", "JavaScript", "jQuery"],
    image: "/projects/rt-burguer.png",
    live: "https://rafaelgs2.github.io/RT-BURGUER/",
    github: "https://github.com/Rafaelgs2/RT-BURGUER",
    details: {
      overview: {
        pt: "Landing page de uma hamburgueria, criada como projeto de aprendizado para praticar design responsivo, navegação fluida e animações suaves, usando HTML, CSS e JavaScript com jQuery.",
        en: "Landing page for a burger restaurant, built as a learning project to practice responsive design, smooth navigation and gentle animations, using HTML, CSS and JavaScript with jQuery.",
      },
      features: {
        pt: [
          "Menu que destaca automaticamente a seção visível durante a rolagem.",
          "Animações de entrada dos elementos com ScrollReveal.",
          "Menu mobile com botão hambúrguer.",
          "Sombra dinâmica no cabeçalho conforme a página rola.",
          "Seções de início, cardápio de pratos e avaliações de clientes.",
          "Layout responsivo para celular, tablet e desktop.",
          "CSS modular, com um arquivo por seção.",
        ],
        en: [
          "Menu that automatically highlights the section in view while scrolling.",
          "Entrance animations for elements with ScrollReveal.",
          "Mobile menu with a hamburger button.",
          "Dynamic header shadow as the page scrolls.",
          "Sections for the home page, the dish menu and customer reviews.",
          "Responsive layout for phone, tablet and desktop.",
          "Modular CSS, one file per section.",
        ],
      },
      gallery: [
        {
          src: "/projects/rt-burguer.png",
          caption: { pt: "Início e chamada para o cardápio", en: "Home and call to action for the menu" },
        },
        {
          src: "/projects/rt-burguer/cardapio.png",
          caption: { pt: "Cardápio com os pratos, notas e preços", en: "Menu with the dishes, ratings and prices" },
        },
        {
          src: "/projects/rt-burguer/avaliacoes.png",
          caption: { pt: "Avaliações de clientes e rodapé", en: "Customer reviews and footer" },
        },
        {
          src: "/projects/rt-burguer/mobile.png",
          caption: { pt: "Versão para celular, com o menu hambúrguer aberto", en: "Mobile version, with the hamburger menu open" },
        },
      ],
    },
  },
  {
    id: "todo-list",
    type: { pt: "Front-end", en: "Front-end" },
    title: "To-Do List",
    summary: {
      pt: "App de tarefas com dados salvos no navegador, bloqueio de duplicadas, animações suaves e acessibilidade.",
      en: "Task app with browser-saved data, duplicate blocking, smooth animations and accessibility.",
    },
    tech: ["HTML5", "CSS3", "JavaScript"],
    image: "/projects/todo-list.png",
    live: "https://to-do-list-mu-ashy.vercel.app",
    github: "https://github.com/Rafaelgs2/To-do-List",
    details: {
      overview: {
        pt: "Gerenciador de tarefas feito para praticar UX, acessibilidade e código limpo, em JavaScript puro. As tarefas ficam salvas no navegador e as interações têm animações suaves.",
        en: "Task manager built to practice UX, accessibility and clean code, in plain JavaScript. Tasks are saved in the browser and interactions come with smooth animations.",
      },
      features: {
        pt: [
          "CRUD completo: criar, concluir e excluir tarefas.",
          "Tarefas salvas no localStorage, sem perder nada ao recarregar a página.",
          "Bloqueio de tarefas duplicadas, com validação por método de array.",
          "Alertas de erro que abrem em sanfona, sem poluir a tela.",
          "Animação de deslize e fade ao concluir e remover uma tarefa.",
          "Acessibilidade com aria-labels e textos para leitor de tela.",
          "Layout responsivo para celular e desktop.",
        ],
        en: [
          "Full CRUD: create, complete and delete tasks.",
          "Tasks saved in localStorage, nothing is lost when the page reloads.",
          "Duplicate task blocking, validated with an array method.",
          "Error alerts that open as an accordion, without cluttering the screen.",
          "Slide and fade animation when completing and removing a task.",
          "Accessibility with aria-labels and screen reader text.",
          "Responsive layout for phone and desktop.",
        ],
      },
      gallery: [
        {
          src: "/projects/todo-list.png",
          caption: { pt: "Tela inicial, com a lista vazia", en: "Home screen, with an empty list" },
        },
        {
          src: "/projects/todo-list/lista.png",
          caption: { pt: "Lista com tarefas, uma delas concluída", en: "List with tasks, one of them completed" },
        },
        {
          src: "/projects/todo-list/duplicada.png",
          caption: { pt: "Aviso ao tentar criar uma tarefa duplicada", en: "Alert when trying to create a duplicate task" },
        },
        {
          src: "/projects/todo-list/mobile.png",
          caption: { pt: "Versão para celular, com a lista e o aviso", en: "Mobile version, with the list and the alert" },
        },
      ],
    },
  },
  {
    id: "portfolio",
    type: { pt: "Front-end", en: "Front-end" },
    title: "Portfolio",
    summary: {
      pt: "Este site: bilíngue, com tema claro e escuro, animações guiadas pela rolagem e foco em acessibilidade.",
      en: "This very site: bilingual, with light and dark themes, scroll-driven animations and a focus on accessibility.",
    },
    tech: ["Next.js", "TypeScript", "CSS", "next-intl"],
    image: "/projects/portfolio.png",
    // Se um dia houver domínio próprio, troque `live` pelo endereço novo.
    live: "https://portfolio-fawn-two-44.vercel.app",
    github: "https://github.com/Rafaelgs2/Portfolio",
    details: {
      overview: {
        pt: "Um portfólio bilíngue (português e inglês) pensado como um produto, com design system documentado, movimento guiado pela rolagem e atenção à acessibilidade.",
        en: "A bilingual portfolio (Portuguese and English) designed like a product, with a documented design system, scroll-driven motion and attention to accessibility.",
      },
      features: {
        pt: [
          "Duas rotas, / e /en, com o idioma escolhido pelo navegador na primeira visita.",
          "Tema claro e escuro, aplicado antes da primeira pintura para a página não piscar.",
          "Animações guiadas pela rolagem (efeito de funil e parallax), desligadas para quem prefere menos movimento.",
          "Nome em manuscrito que se desenha ao carregar e logo própria.",
          "Navegação por teclado e foco visível em todos os controles.",
          "Imagens otimizadas pelo Next.js e imagem de compartilhamento por idioma.",
        ],
        en: [
          "Two routes, / and /en; the language is picked from the browser on the first visit.",
          "Light and dark themes, applied before first paint so the page never flashes.",
          "Scroll-driven animations (funnel effect and parallax), turned off for people who prefer less motion.",
          "A handwritten name that draws itself on load, and a custom logo.",
          "Keyboard navigation and visible focus on every control.",
          "Images optimized by Next.js and a share image for each language.",
        ],
      },
      gallery: [
        {
          src: "/projects/portfolio.png",
          caption: { pt: "Início do portfólio", en: "Portfolio home" },
        },
        {
          src: "/projects/portfolio/sobre.png",
          caption: { pt: "Sobre mim, com a foto em formato de polaroid", en: "About me, with the photo as a polaroid" },
        },
        {
          src: "/projects/portfolio/projetos.png",
          caption: { pt: "Projetos, em cartas grandes e desencontradas, com inclinação e brilho", en: "Projects, as large staggered cards with tilt and sheen" },
        },
        {
          src: "/projects/portfolio/stack.png",
          caption: { pt: "Stack em faixas animadas e lista por área", en: "Stack as animated strips and a list by area" },
        },
        {
          src: "/projects/portfolio/experiencia.png",
          caption: { pt: "Experiência em linha do tempo", en: "Experience as a timeline" },
        },
      ],
    },
  },
];
