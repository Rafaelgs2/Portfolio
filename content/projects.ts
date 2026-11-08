// Dados dos projetos.
//
// Regras (ver DESIGN_SYSTEM.md, "Cartas de projeto"):
// - `type`: uma ou duas palavras (Full Stack, Web, Back-end).
// - `title`: nome do projeto, até 28 caracteres (não é traduzido).
// - `summary`: o problema que resolve, até ~110 caracteres, em cada idioma.
// - `tech`: os mais relevantes para a vaga primeiro. A carta mostra só os 4 primeiros
//   e o painel de detalhes mostra todos.
// - `image`: print da tela principal (1280x800 ou maior, sem moldura de navegador)
//   em `public/projects/`, ex.: "/projects/meu-projeto.png". `null` usa o espaço reservado.
//   Um GIF precisa de um PNG com o mesmo nome ao lado, usado como quadro parado.
// - `live`: endereço da versão no ar, ou `null` (o link "Ver projeto" some).
// - `github`: link do repositório, ou `null` se for privado (o link "GitHub" some da carta).
// - `details`: descrição completa, de 5 a 7 funcionalidades curtas e de 3 a 5 prints (1280x800).
// - Ordem: o projeto mais próximo de full stack vem primeiro.
//
// Campos opcionais, que a maioria dos projetos não usa:
// - `status`: etiqueta de situação, ex.: "Estudo de caso".
// - `related`: etiqueta com link para a carta de outro projeto (`id` dele).
// - `extraLinks`: links além de `live` e `github`. A carta mostra só o primeiro e o
//   painel de detalhes mostra todos.
// - `simulationNote`: a imagem da carta não é um print real. O texto aparece sob ela,
//   e o texto alternativo passa a ser a legenda da primeira imagem da galeria.

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
  status?: Bilingual;
  related?: { id: string; label: Bilingual };
  extraLinks?: { label: Bilingual; href: string }[];
  simulationNote?: Bilingual;
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
    github: "https://github.com/Rafaelgs2/CIFRO-APP",
    related: {
      id: "cifro-telegram",
      label: { pt: "Automação no Telegram →", en: "Telegram automation →" },
    },
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
    id: "cifro-telegram",
    type: { pt: "Automação", en: "Automation" },
    title: "CIFRO Telegram Automation",
    status: { pt: "Estudo de caso", en: "Case study" },
    related: {
      id: "cifro",
      label: { pt: "Parte do CIFRO →", en: "Part of CIFRO →" },
    },
    summary: {
      pt: "Automação que registra despesas do CIFRO a partir de uma mensagem no Telegram. Cada chat é ligado a um usuário por um link de uso único, e o bot não usa chave de serviço.",
      en: "A Telegram → n8n → Supabase automation that records CIFRO expenses from chat messages. Each chat is linked to a user with a one-time link, and the bot uses no service-role key.",
    },
    tech: [
      "n8n",
      "Telegram Bot API",
      "Supabase",
      "PostgreSQL (PL/pgSQL)",
      "Row Level Security",
      "Webhooks",
      "SQL tests",
      "Docker",
    ],
    image: "/projects/cifro-telegram/workflow.gif",
    simulationNote: {
      pt: "Simulação: diagrama do workflow, não é captura do n8n.",
      en: "Simulation: workflow diagram, not an n8n capture.",
    },
    // Não existe versão no ar: o bot roda localmente e não é aberto ao público.
    live: null,
    github: "https://github.com/Rafaelgs2/N8n_Bot_Automation_Cifro_App",
    extraLinks: [
      {
        // O estudo de caso está em português.
        label: { pt: "Ler estudo de caso ↗", en: "Read case study (PT) ↗" },
        href: "https://github.com/Rafaelgs2/N8n_Bot_Automation_Cifro_App/blob/main/docs/estudo-de-caso.md",
      },
      {
        label: { pt: "App CIFRO ↗", en: "CIFRO app ↗" },
        href: "https://cifro-nine.vercel.app",
      },
      {
        label: { pt: "Código do CIFRO ↗", en: "CIFRO code ↗" },
        href: "https://github.com/Rafaelgs2/CIFRO-APP",
      },
    ],
    details: {
      overview: {
        pt: "O CIFRO é um app de finanças pessoais. Esta automação permite registrar um gasto com uma mensagem como 'almoço 32,50': o n8n recebe o webhook do Telegram e chama funções do Postgres, e é o banco que decide de quem é cada mensagem. O desafio central foi provar de quem é o chat sem confiar no que o usuário digita, e fazer isso sem uma chave de serviço. O repositório documenta as decisões, o modelo de ameaças, os erros cometidos no caminho e as limitações. É um projeto de estudo e validação: o bot roda no meu computador e não está aberto ao público.",
        en: "CIFRO is a personal finance app. This automation lets you record an expense with a message like 'almoço 32,50' (lunch, 32.50): n8n receives the Telegram webhook and calls Postgres functions, and the database decides who each message belongs to. The core challenge was proving who owns the chat without trusting what the user types, and doing so without a service-role key. The repository documents the decisions, the threat model, the mistakes made along the way and the limitations. This is a study and validation project: the bot runs on my computer and is not open to the public.",
      },
      features: {
        pt: [
          "O Telegram de cada pessoa é ligado à conta dela por um link de uso único; o banco decide de quem é cada mensagem.",
          "Sem chave de serviço: o bot se autentica por um segredo em cabeçalho, guardado como hash, e a função só insere uma despesa.",
          "Idempotente: reenviar a mesma mensagem não duplica a despesa.",
          "Suíte de 101 cenários SQL, com isolamento entre usuários, casos de abuso e um teste de controle.",
        ],
        en: [
          "Each person's Telegram is linked to their account with a one-time link; the database decides who each message belongs to.",
          "No service-role key: the bot authenticates with a header secret, stored as a hash, and the function only inserts an expense.",
          "Idempotent: resending the same message does not duplicate the expense.",
          "A suite of 101 SQL scenarios, covering isolation between users, abuse cases and a control test.",
        ],
      },
      gallery: [
        {
          src: "/projects/cifro-telegram/workflow.gif",
          caption: {
            pt: "Simulação: diagrama do caminho de uma mensagem pelos nós do workflow, não é captura do n8n",
            en: "Simulation: diagram of a message's path through the workflow nodes, not an n8n capture",
          },
        },
        {
          src: "/projects/cifro-telegram/conectar.gif",
          caption: {
            pt: "Simulação com dados fictícios: conectar o Telegram pelo Perfil do CIFRO e receber a confirmação do bot",
            en: "Simulation with fictional data: connecting Telegram from the CIFRO profile and getting the bot's confirmation",
          },
        },
        {
          src: "/projects/cifro-telegram/registrar.gif",
          caption: {
            pt: "Simulação com dados fictícios: duas despesas enviadas ao bot entrando em Lançamentos",
            en: "Simulation with fictional data: two expenses sent to the bot appearing in the transaction list",
          },
        },
      ],
    },
  },
  {
    id: "transfer2u",
    type: { pt: "Full Stack", en: "Full Stack" },
    title: "Transfer2U",
    summary: {
      pt: "Envie textos e arquivos do celular para o computador em salas temporárias, sem cadastro, com senha e QR code.",
      en: "Send text and files from phone to computer in temporary rooms, with no sign-up, password protection and QR code.",
    },
    tech: ["Next.js", "TypeScript", "Upstash Redis", "Vercel Blob"],
    image: "/projects/transfer2u.png",
    live: "https://transfer2u.vercel.app",
    github: "https://github.com/Rafaelgs2/Tranfer2U",
    details: {
      overview: {
        pt: "O Transfer2U resolve um problema comum: passar um texto ou arquivo do celular para o computador (ou para outra pessoa) sem login nem app. Você cria uma sala, compartilha o link ou o QR code e tudo some quando ela expira. O foco foi em segurança e em contornar os limites do plano gratuito da Vercel.",
        en: "Transfer2U solves a common problem: moving text or a file from your phone to your computer (or to someone else) with no login and no app. You create a room, share the link or QR code, and everything disappears when it expires. The focus was on security and on working around Vercel's free-tier limits.",
      },
      features: {
        pt: [
          "Salas temporárias de 1 hora, 24 horas ou 7 dias, sem cadastro.",
          "Entrada por link, QR code ou código de 6 caracteres, com senha opcional.",
          "Senhas guardadas como hash bcrypt e acesso por cookie JWT assinado.",
          "Upload de arquivos de até 50 MB direto para o Vercel Blob, contornando o limite de 4,5 MB das funções.",
          "Limite de tentativas por IP na entrada por código, contra força bruta.",
          "Salas e mensagens no Upstash Redis com expiração, e cron diário que apaga arquivos vencidos.",
          "Atualização automática por polling que só roda com a aba visível.",
        ],
        en: [
          "Temporary rooms of 1 hour, 24 hours or 7 days, with no sign-up.",
          "Join by link, QR code or 6-character code, with an optional password.",
          "Passwords stored as bcrypt hashes, with access through a signed JWT cookie.",
          "Uploads up to 50 MB straight to Vercel Blob, getting around the 4.5 MB function limit.",
          "Per-IP rate limiting on code-based joins, against brute force.",
          "Rooms and messages in Upstash Redis with expiry, and a daily cron that deletes expired files.",
          "Automatic refresh through polling that only runs while the tab is visible.",
        ],
      },
      gallery: [
        {
          src: "/projects/transfer2u.png",
          caption: {
            pt: "Página inicial, com entrada por código e criação de sala",
            en: "Home page, with join by code and room creation",
          },
        },
      ],
    },
  },
  {
    id: "bti",
    type: { pt: "Dados", en: "Data" },
    title: "Brazil Traffic Intelligence",
    summary: {
      pt: "Onde, quando e por que acidentes em rodovias federais viram mortes: 632 mil registros da PRF, 2017–2025.",
      en: "Where, when and why crashes on federal highways turn fatal: 632k PRF records, 2017–2025.",
    },
    tech: ["Python", "SQL", "PostgreSQL", "Power BI"],
    image: "/projects/bti.png",
    live: "https://bti-brazil-traffic-intelligence-six.vercel.app",
    github: "https://github.com/Rafaelgs2/BTI---Brazil-Traffic-Intelligence",
    details: {
      overview: {
        pt: "Um projeto de dados de ponta a ponta sobre os acidentes registrados pela Polícia Rodoviária Federal entre 2017 e 2025. Um pipeline de um comando baixa os dados oficiais, audita a qualidade, carrega um modelo estrela no PostgreSQL e alimenta um painel em Power BI e um protótipo HTML interativo. O foco é a gravidade dado o acidente e a concentração por trecho, sem afirmar causa: não há dados de tráfego para medir o risco de dirigir.",
        en: "An end-to-end data project on crashes recorded by Brazil's Federal Highway Police between 2017 and 2025. A one-command pipeline downloads the official data, audits its quality, loads a star schema into PostgreSQL and feeds a Power BI dashboard and an interactive HTML prototype. The focus is severity given a crash and concentration by road segment, with no causal claims: there is no traffic data to measure the risk of driving.",
      },
      features: {
        pt: [
          "Pipeline reproduzível com um comando (python -m bti.pipeline): ingestão com hash SHA-256, auditoria, transformação em Parquet e carga no banco.",
          "Modelo estrela no PostgreSQL (7 dimensões, 2 fatos) e 10 consultas com CTEs e window functions, conferidas contra o pandas.",
          "Auditoria de qualidade com 13 achados, como a quebra de registro de abril de 2018 e a mudança na lista de causas.",
          "Estatística com ressalvas: intervalos de Wilson, regressão logística com erros agrupados, STL e correção para múltiplos testes.",
          "Dashboard em Power BI criado como código (PBIP, TMDL e PBIR), com 6 páginas e 71 visuais.",
          "Protótipo HTML em um único arquivo, com 8 abas, filtros de período e região, modo dia e noite e gráficos SVG feitos à mão.",
          "31 testes automatizados que conferem totais, contratos de dados e a reconciliação entre SQL e Python.",
        ],
        en: [
          "Reproducible one-command pipeline (python -m bti.pipeline): ingestion with SHA-256 hashes, auditing, Parquet transformation and database load.",
          "PostgreSQL star schema (7 dimensions, 2 facts) and 10 queries with CTEs and window functions, checked against pandas.",
          "Data-quality audit with 13 findings, such as the April 2018 registry break and the change in the cause list.",
          "Statistics with caveats: Wilson intervals, logistic regression with clustered errors, STL and multiple-testing correction.",
          "Power BI dashboard built as code (PBIP, TMDL and PBIR), with 6 pages and 71 visuals.",
          "Single-file HTML prototype with 8 tabs, period and region filters, day and night modes and hand-built SVG charts.",
          "31 automated tests that check totals, data contracts and the reconciliation between SQL and Python.",
        ],
      },
      gallery: [
        {
          src: "/projects/bti/visao-geral.png",
          caption: {
            pt: "Visão geral: mortos, acidentes com vítimas, % fatais e índice de gravidade",
            en: "Overview: deaths, crashes with victims, % fatal and severity index",
          },
        },
        {
          src: "/projects/bti/onde.png",
          caption: {
            pt: "Onde: mapa de trechos de 10 km e ranking dos que mais concentram mortes",
            en: "Where: map of 10 km segments and ranking of those with the most deaths",
          },
        },
        {
          src: "/projects/bti/quando.png",
          caption: {
            pt: "Quando: mapas de calor de volume e de gravidade por dia e hora",
            en: "When: heatmaps of volume and severity by weekday and hour",
          },
        },
        {
          src: "/projects/bti/por-que-e-grave.png",
          caption: {
            pt: "Por que é grave: tipos de acidente, causas e condições do local",
            en: "Why it is severe: crash types, causes and road conditions",
          },
        },
        {
          src: "/projects/bti/quem.png",
          caption: {
            pt: "Quem: tipo de usuário, idade e sexo das vítimas",
            en: "Who: user type, age and sex of victims",
          },
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
