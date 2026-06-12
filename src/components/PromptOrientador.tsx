import React, { useState } from 'react';
import { Copy, Check, Terminal, Shield, Eye, Layers } from 'lucide-react';
import { LanguagePack } from '../types';

interface PromptOrientadorProps {
  lang: LanguagePack;
  currentRole: string;
}

export default function PromptOrientador({ lang, currentRole }: PromptOrientadorProps) {
  const [copied, setCopied] = useState(false);
  const [databaseType, setDatabaseType] = useState('Firebase Firestore');
  const [architectureStyle, setArchitectureStyle] = useState('Full-Stack Express + React');
  const [securityLevel, setSecurityLevel] = useState('OAuth2 + RBAC (Controle Hierárquico)');
  const [reportingType, setReportingType] = useState('Automático Mensal PDF/CSV');

  const generatedPrompt = `### PROMPT ORIENTADOR PARA CODEX IA - IMPLEMENTAÇÃO DO SITEMA PRO

Você é um Engenheiro de Software Sênior especializado em sistemas financeiros e segurança regulatória. Nosso objetivo é refinar e expandir o Dashboard Financeiro "ENV Digital" para um ambiente de produção de alto desempenho.

#### 1. Arquitetura do Sistema e Stack Recomendada
- **Frontend**: React 19 + TypeScript + Tailwind CSS (com suporte adaptativo a Modo Escuro/Claro nativo).
- **Backend / Microserviços**: ${architectureStyle} com suporte nativo a operações de alta frequência e conformidade de integridade.
- **Banco de Dados**: ${databaseType} para armazenamento persistente dos registros de auditoria, cadastros e logs regulatórios.
- **Segurança & Autenticação**: ${securityLevel}, integrando perfis de acesso granularizado:
  - \`ADMINISTRADOR\`: Acesso irrestrito a configurações, remoção de logs e permissões.
  - \`GERENTE\`: Edição e aprovação de cadastros, exportação e filtragem avançada de dados.
  - \`OPERADOR\`: Apenas leitura de relatórios e lançamento de movimentações diárias.

#### 2. Funcionalidades de Segurança e Conformidade (Auditoria)
- **Motor de Logs em Tempo Real**: Desenvolva um middleware que intercepte toda requisição (DML/DQL) gravando IP, ID do Usuário, Cargo, Ação de Segurança e Timestamp ISO-8601 em um banco de dados imutável (Audit Trail).
- **Relatório Mensal de Conformidade**: Implemente geração automática de relatórios no formato PDF utilizando templates corporativos contendo cabeçalho institucional, sumário de operações suspeitas e termos regulatórios.

#### 3. Notificações Críticas e Feed em Tempo Real
- Fluxo baseado em WebSockets (ou Server-Sent Events) para alertar imediatamente o painel sobre:
  - Tentativas de login malsucedidas.
  - Solicitações de empréstimo acima do limite agendado.
  - Operações de débito suspeitas com alto volume de valor.

#### 4. Filtros Avançados e Exportação de Listas
- Criação de Queries Otimizadas no banco para permitir filtros combinados em tempo real por:
  - Intervalos de data retroativos do período selecionado.
  - Categoria específica (Empréstimos, Tarifas, Créditos, PIX).
  - Status operacional (Completo, Pendente, Cancelado).
- Funções de pipeline para parsear JSON em planilhas CSV e exportações compactas de PDF.

#### 5. Configuração da Interface (Visual e Idiomas)
- UI Responsiva que reproduza o visual corporativo "ENV Digital" (azul escuro elegante, contraste de valores vermelho de saída e verde de entrada).
- Suporte a múltiplos idiomas (Português/Inglês) via dicionários estruturados.

Com base nestes requisitos, crie o código do servidor e do cliente respeitando a estrutura de pastas modular do ecossistema e as melhores práticas de Clean Code.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-5 mb-5">
        <div>
          <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-red-500" />
            {lang.promptCodex}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Configure seu prompt personalizado para alimentar o Codex ou IA externa e acelerar o desenvolvimento de produção.
          </p>
        </div>
        <button
          onClick={handleCopy}
          id="btn-copy-prompt"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-medium rounded-xl transition-all shadow-sm self-start sm:self-center cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-white" />
              <span>Copiar Prompt Codex</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card Banco */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800/80">
          <label className="text-xs font-mono text-neutral-400 block mb-1">DATA PERSISTENCE</label>
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block mb-2">Banco de Dados</span>
          <select
            value={databaseType}
            onChange={(e) => setDatabaseType(e.target.value)}
            className="w-full text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-2 text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-red-500"
          >
            <option value="Firebase Firestore (Recomendado)">Firebase Firestore</option>
            <option value="PostgreSQL (Cloud SQL / Neon)">PostgreSQL Relacional</option>
            <option value="MongoDB Atlas Cloud">MongoDB Atlas</option>
            <option value="Local IndexedDB (Apenas offline)">Offline IndexedDB</option>
          </select>
        </div>

        {/* Card Arch */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800/80">
          <label className="text-xs font-mono text-neutral-400 block mb-1">ARCH STYLE</label>
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block mb-2">Estilo de Arquitetura</span>
          <select
            value={architectureStyle}
            onChange={(e) => setArchitectureStyle(e.target.value)}
            className="w-full text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-2 text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-red-500"
          >
            <option value="Full-Stack Express + React com Vite">Fullstack Express/React</option>
            <option value="Serverless Next.js App Router">Next.js App Router</option>
            <option value="Backend isolado em Go / Gin + React">Go Backend + React</option>
            <option value="Spring Boot Java API + React">Spring Boot + React</option>
          </select>
        </div>

        {/* Card Security */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800/80">
          <label className="text-xs font-mono text-neutral-400 block mb-1">SECURITY & CONTROL</label>
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block mb-2">Segurança de Acesso</span>
          <select
            value={securityLevel}
            onChange={(e) => setSecurityLevel(e.target.value)}
            className="w-full text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-2 text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-red-500"
          >
            <option value="OAuth2 com JWT + RBAC (Hierarquia de Perfis)">OAuth2 Segura + RBAC</option>
            <option value="Firebase Authentication + Regras Firestore Estritas">Firebase Auth + Rules</option>
            <option value="Autenticação JWT Simples com Cookies HttpOnly">Cookies Session JWT</option>
          </select>
        </div>

        {/* Card Reporting */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800/80">
          <label className="text-xs font-mono text-neutral-400 block mb-1">COMPLIANCE REPORT</label>
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block mb-2">Relatório de Conformidade</span>
          <select
            value={reportingType}
            onChange={(e) => setReportingType(e.target.value)}
            className="w-full text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-2 text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-red-500"
          >
            <option value="Automático Mensal PDF estruturado e planilhas CSV">PDF Estruturado e CSV</option>
            <option value="Download sob Demanda JSON/CSV">CSV/JSON Export</option>
            <option value="Relatórios Consolidados Diários via E-mail">Email Diário PDF</option>
          </select>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-3 right-3 flex gap-2">
          <span className="text-[10px] font-mono tracking-wider bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded">
            MARKDOWN READY
          </span>
        </div>
        <pre className="text-xs font-mono bg-neutral-950 text-neutral-200 p-5 rounded-xl overflow-x-auto max-h-80 border border-neutral-800 leading-relaxed scrollbar-thin">
          <code>{generatedPrompt}</code>
        </pre>
      </div>

      <div className="mt-4 flex items-center gap-5 text-xs text-neutral-400 dark:text-neutral-500 bg-neutral-50 dark:bg-neutral-900 p-3.5 rounded-lg border border-neutral-100 dark:border-neutral-800">
        <span className="flex items-center gap-1.5 font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">
          <Shield className="w-4 h-4 text-emerald-500" /> Dica de Auditoria:
        </span>
        <span>
          O Codex interpretará o controle de acessos (atualmente definido como <strong>{currentRole}</strong>) para desenhar permissões de banco de dados imutáveis equivalentes no backend solicitado.
        </span>
      </div>
    </div>
  );
}
