# Portfólio de Rafael Silva

Portfólio bilíngue (português e inglês) de desenvolvimento web e full stack. Site de página única, com seções que ocupam a tela inteira, tema claro e escuro, animações guiadas pela rolagem e foco em acessibilidade e desempenho.

## Tecnologias

- **Next.js 16** (App Router) e **React 19**, com TypeScript
- **next-intl** para as rotas por idioma (`/` em português e `/en` em inglês)
- **CSS puro** com variáveis de design (sem biblioteca de interface)
- Fontes **Figtree** e **Kaushan Script**, carregadas pelo `next/font`
- Logos de tecnologias do pacote **simple-icons**
- Hospedagem na **Vercel**

## Como rodar

Requer Node.js 22.

```bash
npm install
npm run dev      # servidor de desenvolvimento em http://localhost:3000
npm run check    # lint, tipos e build de produção
npm run start    # serve o build de produção (depois de npm run build)
```

> Não rode `npm run build` com o `npm run dev` ligado: os dois usam a pasta `.next`.

## Estrutura

```
app/[locale]/      página e layout de cada idioma
app/               robots, sitemap e ícones do site
components/        Header, Hero, About, Projects, Stack, Experience, Contact, Footer...
content/           textos (pt.json, en.json), projetos, stack e dados do site
i18n/              rotas, navegação e carregamento de textos por idioma
lib/site.ts        endereço público do site
styles/tokens.css  cores, tipografia, espaçamentos e movimento
public/            foto, imagens de compartilhamento e prints dos projetos
proxy.ts           escolha do idioma na primeira visita
```

## Como editar o conteúdo

| O que | Onde |
| --- | --- |
| Textos do site (português e inglês) | `content/pt.json` e `content/en.json`, sempre com as mesmas chaves |
| Projetos, funcionalidades e galerias | `content/projects.ts` (prints em `public/projects/`) |
| Ferramentas da Stack e logos | `content/stack.ts` e `content/brand-icons.ts` |
| Foto, e-mail, LinkedIn, GitHub e currículo | `content/site.ts` |
| Cores, fontes e espaçamentos | `styles/tokens.css` |

Ao trocar uma imagem, dê um **nome novo** ao arquivo: o cache de imagens usa o nome.

## Publicação na Vercel

1. Envie o código para um repositório no GitHub.
2. Na Vercel, **Add New > Project**, importe o repositório e mantenha as configurações detectadas (Next.js).
3. **Deploy.** Não é preciso configurar nada: o site descobre sozinho o domínio de produção da Vercel para o `canonical`, o `sitemap` e as imagens de compartilhamento.
4. Com domínio próprio, adicione a variável `NEXT_PUBLIC_SITE_URL` (por exemplo `https://seudominio.com`) e faça um novo deploy.
5. Depois do deploy, preencha em `content/projects.ts` os campos `live` e `github` do projeto "Portfolio".

Variáveis de ambiente: veja `.env.example`.

## Qualidade

Última auditoria no build de produção: Lighthouse 96 a 100 em desempenho, 100 em acessibilidade, boas práticas e SEO; 0 violações no axe (WCAG 2.2 AA); navegação completa por teclado. Repita a medição no site publicado.
