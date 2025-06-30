// script.js (versão atualizada)
import { promises as fs } from "fs";
import path from "path";

// 1. Lista de arquivos completa e atualizada, baseada na nova árvore.
// Organizei por tipo para o arquivo final ficar mais legível.
const filePaths = [
  // --- Arquivos de Configuração na Raiz ---
  "components.json",
  "envConfig.ts",
  "eslint.config.mjs",
  "next.config.ts",
  "next-env.d.ts",
  "package.json",
  "postcss.config.mjs",
  "tsconfig.json",
  "README.md",

  // --- Biblioteca Principal (lib) ---
  "src/lib/utils.ts",
  "src/lib/config.ts",
  "src/lib/clients/notion.ts",
  "src/lib/services/messageService.ts",
  "src/lib/services/notionService.ts",

  // --- Arquivos da Aplicação (app) ---
  "src/app/globals.css",
  "src/app/layout.tsx",

  // --- Componentes ---
  "src/app/components/Notion.tsx",
  "src/app/components/SendMessage.tsx",

  // --- Páginas ---
  "src/app/page.tsx",
  "src/app/people/page.tsx",

  // --- Serviços Antigos (se ainda em uso) ---
  "src/app/services/message.ts",
  "src/app/services/notion.ts",

  // --- Rotas da API ---
  "src/app/api/people/route.ts",
  "src/app/api/notion/route.ts",
  "src/app/api/message/route.ts",
];

const outputFile = "full-project.txt";
const filesToExclude = ["package-lock.json", "full-project.txt", "script.js"];

async function bundleProjectFiles() {
  console.log(
    "🚀 Começando a juntar os arquivos do projeto (versão atualizada)...",
  );
  let fullContent = `Projeto: whatsapp-waha-notion\n`;
  fullContent += `Gerado em: ${new Date().toString()}\n\n`;

  try {
    const allFileContents = await Promise.all(
      filePaths.map(async (filePath) => {
        if (filesToExclude.includes(path.basename(filePath))) {
          return ""; // Pula arquivos excluídos
        }
        try {
          const content = await fs.readFile(filePath, "utf-8");
          const header = `// --- INÍCIO DO ARQUIVO: ${filePath} ---\n`;
          const footer = `\n// --- FIM DO ARQUIVO: ${filePath} ---\n\n`;
          return header + content + footer;
        } catch (error) {
          console.warn(
            `⚠️  Aviso: Arquivo não encontrado, pulando: ${filePath}`,
          );
          return "";
        }
      }),
    );

    fullContent += allFileContents.join("");

    await fs.writeFile(outputFile, fullContent);

    console.log(
      `✅ Sucesso! O projeto inteiro foi compilado em: ${outputFile}`,
    );
    console.log("Pode copiar o conteúdo desse arquivo e me mandar.");
  } catch (error) {
    console.error("❌ Oh não! Ocorreu um erro ao gerar o arquivo:", error);
  }
}

bundleProjectFiles();
