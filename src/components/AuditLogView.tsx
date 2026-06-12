import React, { useState } from 'react';
import { Shield, Search, Filter, Trash2, Calendar, FileDown, Download, Terminal, Settings } from 'lucide-react';
import { AuditLog, LanguagePack, UserRole } from '../types';

interface AuditLogViewProps {
  lang: LanguagePack;
  logs: AuditLog[];
  onClearLogs: () => void;
  onAddSystemLog: (action: string, category: 'AUTENTICACAO' | 'FINANCEIRO' | 'CADASTRO' | 'SISTEMA' | 'CONFIGURACAO', severity: 'INFO' | 'AVISO' | 'CRITICO', details: string) => void;
  currentRole: UserRole;
  onExportCSV: (items: any[], filename: string) => void;
  onExportPDF: (items: any[], title: string) => void;
}

export default function AuditLogView({
  lang,
  logs,
  onClearLogs,
  onAddSystemLog,
  currentRole,
  onExportCSV,
  onExportPDF
}: AuditLogViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('TODOS');
  const [severityFilter, setSeverityFilter] = useState<string>('TODOS');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'TODOS' || log.category === categoryFilter;
    const matchesSeverity = severityFilter === 'TODOS' || log.severity === severityFilter;
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const handleCreateTestLog = () => {
    onAddSystemLog(
      'AUDITORIA_INTERATIVIDADE',
      'SISTEMA',
      'INFO',
      'O usuário realizou uma simulação de log de auditoria no painel interativo.'
    );
  };

  const handleExportCSVLocal = () => {
    const csvData = filteredLogs.map(l => ({
      ID: l.id,
      DataHora: l.timestamp,
      Usuario: l.user,
      Role: l.role,
      Acao: l.action,
      Categoria: l.category,
      Gravidade: l.severity,
      Detalhes: l.details
    }));
    onExportCSV(csvData, 'audit_log_report');
  };

  const handleExportPDFLocal = () => {
    onExportPDF(filteredLogs, 'Relatório Geral de Auditoria de TI');
  };

  return (
    <div className="bg-[#121214] border border-[#27272a] rounded-2xl p-6 shadow-sm text-[#e4e4e7]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-5 mb-5">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            <span>{lang.auditoria}</span>
          </h2>
          <p className="text-sm text-[#a1a1aa] mt-0.5">
            Rastreamento de conformidade regulatória de todas as operações realizadas em tempo real.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleCreateTestLog}
            id="btn-log-test"
            className="flex items-center gap-1.5 px-3 py-2 border border-[#27272a] bg-[#121214] hover:bg-[#1a1a1d] rounded-xl text-xs font-semibold text-[#a1a1aa] transition-all cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-[#71717a]" />
            <span>Simular Evento</span>
          </button>

          <button
            onClick={handleExportCSVLocal}
            id="btn-export-csv-auditoria"
            className="flex items-center gap-1.5 px-3 py-2 border border-[#27272a] bg-[#121214] hover:bg-[#1a1a1d] rounded-xl text-xs font-semibold text-[#a1a1aa] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={handleExportPDFLocal}
            id="btn-export-pdf-auditoria"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Exportar PDF</span>
          </button>

          {currentRole === 'ADMINISTRADOR' && (
            <button
              onClick={onClearLogs}
              id="btn-clear-logs"
              className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              title="Limpar todos os logs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar Logs</span>
            </button>
          )}
        </div>
      </div>

      {/* Advanced filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-[#71717a]" />
          <input
            type="text"
            placeholder="Pesquisar por usuário, ação ou detalhe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#1a1a1d] border border-[#27272a] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-[#e4e4e7] outline-none placeholder-[#71717a]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#71717a] font-mono">CATEGORIA:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            id="select-log-category"
            className="flex-1 text-xs bg-[#1a1a1d] border border-[#27272a] rounded-xl p-2.5 text-[#e4e4e7] outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
          >
            <option value="TODOS">Todas Categorias</option>
            <option value="AUTENTICACAO">Autenticação (OAuth2)</option>
            <option value="FINANCEIRO">Financeiro (Transações)</option>
            <option value="CADASTRO">Cadastro (Clientes)</option>
            <option value="SISTEMA">Sistema (Docker/Containers)</option>
            <option value="CONFIGURACAO">Configuração (Acessos)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#71717a] font-mono">SEVERIDADE:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            id="select-log-severity"
            className="flex-1 text-xs bg-[#1a1a1d] border border-[#27272a] rounded-xl p-2.5 text-[#e4e4e7] outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
          >
            <option value="TODOS">Qualquer Nível</option>
            <option value="INFO">Informativo</option>
            <option value="AVISO">Aviso</option>
            <option value="CRITICO">Crítico</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[#27272a] rounded-xl bg-[#121214]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1a1a1d] border-b border-[#27272a] text-xs font-mono text-[#71717a] select-none">
              <th className="py-3 px-4 font-normal">Id Audit</th>
              <th className="py-3 px-4 font-normal">Data / Hora</th>
              <th className="py-3 px-4 font-normal">Operador</th>
              <th className="py-3 px-4 font-normal">Ação Realizada</th>
              <th className="py-3 px-4 font-normal">Módulo</th>
              <th className="py-3 px-4 font-normal">Gravidade</th>
              <th className="py-3 px-4 font-normal">Detalhes da Auditoria</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272a] text-xs text-[#e4e4e7]">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#71717a]">
                  Nenhum log de auditoria encontrado na filtragem atual.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#1a1a1d]/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#71717a]">
                    {log.id}
                  </td>
                  <td className="py-3.5 px-4 text-[#a1a1aa] font-mono whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-[#71717a]" />
                      {log.timestamp.replace('T', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">{log.user}</span>
                      <span className="text-[10px] font-mono text-[#71717a]">{log.role}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-white font-mono text-[11px] font-bold">
                    {log.action}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold py-1 px-1.5 rounded-md bg-[#1a1a1d] border border-[#27272a] text-[#a1a1aa]">
                      {log.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.severity === 'CRITICO'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : log.severity === 'AVISO'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#a1a1aa] max-w-sm truncate" title={log.details}>
                    {log.details}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-[#71717a] font-mono">
        <span>Mostrando {filteredLogs.length} de {logs.length} entradas de conformidade do banco</span>
        <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-indigo-400">
          <Settings className="w-3.5 h-3.5 animate-spin" /> Audit Trail Ativo
        </span>
      </div>
    </div>
  );
}
