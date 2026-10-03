import {
  siBootstrap,
  siC,
  siExpress,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siJira,
  siJquery,
  siN8n,
  siNodedotjs,
  siPython,
  siReact,
  siRedux,
  siSap,
  siSqlite,
} from "simple-icons";
import {
  awsPath,
  azureDevopsPath,
  azurePath,
  css3Path,
  excelPath,
  oraclePath,
  powerBiPath,
} from "./brand-icons";

// Ferramentas da Stack, na ordem de importância para a vaga (a lista aprovada
// no plano). `brand` é a cor que aparece só no hover (DESIGN_SYSTEM.md), e `ink`
// é a cor do logo sobre ela. `icon` usa o caminho do pacote simple-icons; sem
// logo (null), o selo mostra a sigla em `abbr`. Hoje só o SQL é assim, porque é uma
// linguagem e não tem logo de marca. Os logos de AWS, Azure, Power BI e outros vêm
// de `brand-icons.ts`; o do OCI usa o símbolo da Oracle.
// `darkBrand`: marca escura que no tema escuro usa o texto principal no hover.

export type ToolGroup =
  | "languages"
  | "web"
  | "backend"
  | "data"
  | "cloud"
  | "tools";

// Ordem das áreas no painel expandido.
export const toolGroups: ToolGroup[] = ["languages", "web", "backend", "data", "cloud", "tools"];

export type Tool = {
  name: string;
  group: ToolGroup;
  brand: string;
  ink: "light" | "dark";
  icon: string | null;
  abbr: string;
  darkBrand?: boolean;
};

export const tools: Tool[] = [
  // Linguagens
  { name: "JavaScript", group: "languages", brand: "#E0B400", ink: "dark", icon: siJavascript.path, abbr: "JS" },
  { name: "Python", group: "languages", brand: "#3776AB", ink: "light", icon: siPython.path, abbr: "Py" },
  { name: "C", group: "languages", brand: "#00599C", ink: "light", icon: siC.path, abbr: "C" },
  // Web
  { name: "HTML5", group: "web", brand: "#E34F26", ink: "light", icon: siHtml5.path, abbr: "H5" },
  { name: "CSS3", group: "web", brand: "#1572B6", ink: "light", icon: css3Path, abbr: "CSS" },
  { name: "React", group: "web", brand: "#149ECA", ink: "light", icon: siReact.path, abbr: "Re" },
  { name: "Redux", group: "web", brand: "#764ABC", ink: "light", icon: siRedux.path, abbr: "Rx" },
  { name: "Bootstrap", group: "web", brand: "#7952B3", ink: "light", icon: siBootstrap.path, abbr: "Bs" },
  { name: "jQuery", group: "web", brand: "#0769AD", ink: "light", icon: siJquery.path, abbr: "jQ" },
  // Back-end
  { name: "Node.js", group: "backend", brand: "#5FA04E", ink: "light", icon: siNodedotjs.path, abbr: "No" },
  { name: "Express", group: "backend", brand: "#555555", ink: "light", icon: siExpress.path, abbr: "Ex", darkBrand: true },
  // Dados
  { name: "SQL", group: "data", brand: "#CC6A2B", ink: "light", icon: null, abbr: "SQL" },
  { name: "SQLite", group: "data", brand: "#0F80CC", ink: "light", icon: siSqlite.path, abbr: "SQ" },
  { name: "Power BI", group: "data", brand: "#D9A800", ink: "dark", icon: powerBiPath, abbr: "BI" },
  { name: "Excel", group: "data", brand: "#217346", ink: "light", icon: excelPath, abbr: "XL" },
  // Cloud e DevOps
  { name: "AWS", group: "cloud", brand: "#E08A00", ink: "dark", icon: awsPath, abbr: "AWS" },
  { name: "Azure", group: "cloud", brand: "#0078D4", ink: "light", icon: azurePath, abbr: "Az" },
  { name: "OCI", group: "cloud", brand: "#C74634", ink: "light", icon: oraclePath, abbr: "OCI" },
  { name: "Azure DevOps", group: "cloud", brand: "#0078D4", ink: "light", icon: azureDevopsPath, abbr: "ADO" },
  // Ferramentas
  { name: "Git", group: "tools", brand: "#F05032", ink: "light", icon: siGit.path, abbr: "Git" },
  { name: "GitHub", group: "tools", brand: "#333333", ink: "light", icon: siGithub.path, abbr: "GH", darkBrand: true },
  { name: "Jira", group: "tools", brand: "#0052CC", ink: "light", icon: siJira.path, abbr: "Ji" },
  { name: "N8N", group: "tools", brand: "#EA4B71", ink: "light", icon: siN8n.path, abbr: "n8n" },
  { name: "SAP ERP", group: "tools", brand: "#0A7FC2", ink: "light", icon: siSap.path, abbr: "SAP" },
];
