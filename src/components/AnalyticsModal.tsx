import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle, TrendingUp, Calendar, Filter, Share2, HelpCircle } from 'lucide-react';
import { DashboardMetric, Transaction, LanguagePack } from '../types';

interface AnalyticsModalProps {
  metric: DashboardMetric;
  transactions: Transaction[];
  onClose: () => void;
  lang: LanguagePack;
  onExportCSV: (items: any[], filename: string) => void;
  onExportPDF: (items: any[], title: string) => void;
}

export default function AnalyticsModal({
  metric,
  transactions,
  onClose,
  lang,
  onExportCSV,
  onExportPDF
}: AnalyticsModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('TODOS');
  const [dateRange, setDateRange] = useState<string>('7d');

  // Filter transaction records by status, matches categories relevant to the metric card
  const filteredTxs = transactions.filter(t => {
    // Basic mapping of categories
    const isCadastroMetric = metric.id.includes('cadastros');
    const isMovdiariaMetric = metric.id.includes('mov-diaria');
    const isCreditoMetric = metric.id.includes('credito') || metric.id.includes('atraso');
    const isVendedoresMetric = metric.id.includes('vendedores');
    const isLancamentosMetric = metric.id.includes('lancamentos');

    let matchesCategory = true;
    if (isCadastroMetric) {
      matchesCategory = t.type === 'TARIFA'; // Representing some basic flow
    } else if (isMovdiariaMetric) {
      matchesCategory = true; // Show everything for cash movement
    } else if (isCreditoMetric) {
      matchesCategory = t.category === 'Empréstimos' || t.category === 'Créditos';
    } else if (isVendedoresMetric) {
      matchesCategory = t.category === 'Créditos';
    } else if (isLancamentosMetric) {
      matchesCategory = t.status === 'PENDENTE';
    }

    const matchesStatus = selectedStatus === 'TODOS' || t.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  const handleCsvExport = () => {
    const dataToExport = filteredTxs.map(t => ({
      Id: t.id,
      Data: t.timestamp,
      N_Operacao: t.operationNumber,
      Categoria: t.category,
      Descricao: t.description,
      Valor_R$: t.value,
      Status: t.status
    }));
    onExportCSV(dataToExport, `relatorio_${metric.id}`);
  };

  const handlePdfExport = () => {
    onExportPDF(filteredTxs, `Demonstrativo Técnico - ${metric.title}`);
  };

  // Find max value in chartData to scale SVG appropriately
  const chartData = metric.chartData || [
    { label: '06/08', value1: 10 },
    { label: '07/08', value1: 30 },
    { label: '08/08', value1: 5 },
    { label: '09/08', value1: 45 },
    { label: '10/08', value1: 20 },
    { label: '11/08', value1: 85 },
    { label: '12/08', value1: 5 }
  ];

  const maxVal = Math.max(...chartData.map(d => d.value1), 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div 
         id="analytics-modal-container" 
         className="w-full max-w-4xl bg-[#121214] border border-[#27272a] rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 my-8 focus:outline-none text-[#e4e4e7]"
      >
        {/* Header bar of modal */}
        <div className="p-6 bg-gradient-to-r from-[#18181b] to-[#09090b] border-b border-[#27272a] text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest bg-white/10 px-2 py-0.5 rounded uppercase font-bold text-[#a1a1aa]">
              ANALYSIS MODULE
            </span>
            <h3 className="text-lg sm:text-xl font-display font-bold mt-1.5 leading-snug text-white">
              {metric.title}
            </h3>
            <p className="text-xs text-[#a1a1aa] mt-1">
              {metric.subtitle || 'Detalhamento estatístico e auditoria de blocos de custódia'}
            </p>
          </div>
          <button 
            onClick={onClose}
            id="btn-close-modal"
            className="p-2 hover:bg-white/10 active:scale-95 text-[#a1a1aa] hover:text-white rounded-full transition-all cursor-pointer"
          >
            <X className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* Modal content body */}
        <div className="p-6 space-y-6">
          {/* Section 1: Detailed metrics in columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metric.fields.map((f, i) => (
              <div key={i} className="bg-[#1a1a1d] p-4 rounded-xl border border-[#27272a]/50 text-[#e4e4e7]">
                <span className="text-[10px] font-semibold text-[#71717a] font-mono tracking-wider block uppercase select-none">
                  {f.label}
                </span>
                <span className={`text-lg sm:text-xl font-bold block mt-1.5 ${f.color || 'text-white'}`}>
                  {f.value}
                </span>
              </div>
            ))}
          </div>

          {/* Section 2: Visual Chart & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Embedded vector Chart */}
            <div className="bg-[#1a1a1d] p-5 rounded-2xl border border-[#27272a]/50 lg:col-span-2">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold text-[#e4e4e7] uppercase font-mono tracking-wide flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  Evolução Histórica das Operações (06/08 - 12/08)
                </span>
                <div className="flex rounded-md bg-[#09090b] border border-[#27272a] p-0.5">
                  {['7d', '30d'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDateRange(d)}
                      className={`px-2 py-0.5 text-[9px] font-semibold rounded cursor-pointer ${
                        dateRange === d ? 'bg-indigo-500 text-white font-bold' : 'text-[#71717a] hover:text-white'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pure SVG Animated Bar Chart */}
              <div className="h-44 w-full flex items-end justify-between px-2 pt-2 pb-1 border-b border-[#27272a] relative">
                {/* Y-Axis lines */}
                <div className="absolute inset-x-0 top-0 border-t border-[#27272a]/30 text-[8px] font-mono text-[#71717a] z-0 pt-0.5 select-none">
                  Limite Teórico (Max: {maxVal})
                </div>
                <div className="absolute inset-x-0 top-1/2 border-t border-[#27272a]/30 text-[8px] font-mono text-[#71717a] z-0 pt-0.5 select-none">
                  Médio
                </div>

                {chartData.map((d, idx) => {
                  const percent = (d.value1 / maxVal) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center group z-10 mx-1">
                      <div className="text-[9px] font-mono font-bold text-[#a1a1aa] mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-650 text-white px-1 py-0.5 rounded leading-none">
                        {d.value1}
                      </div>
                      <div 
                        className="w-full bg-indigo-500 group-hover:bg-indigo-600 rounded-t transition-all duration-500 relative shadow-sm"
                        style={{ height: `${Math.max(percent, 8)}%` }}
                      >
                        {/* Interactive glow bubble */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[10px] font-mono text-[#71717a] mt-2 select-none">
                        {d.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-[11px] text-[#71717a] mt-3 font-mono leading-relaxed">
                * Os dados representam lançamentos consolidados no fuso UTC. Eventuais divergências de liquidação são resolvidas no fechamento de caixa às 18:00.
              </p>
            </div>

            {/* Sidebar metadata of the model */}
            <div className="bg-[#1a1a1d] p-5 rounded-2xl border border-[#27272a]/50 space-y-4">
              <span className="text-xs font-bold text-[#e4e4e7] tracking-wide block uppercase font-mono">
                Detalhamento Regulatório
              </span>
              
              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-[#71717a] block font-mono">CÓDIGO INTERNO:</span>
                  <span className="font-semibold text-white">ENV-MD-{metric.id.toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-[#71717a] block font-mono">PERFORMANCE ESPERADA:</span>
                  <span className="text-emerald-400 font-bold">100% ADIMPLENTE (SLA)</span>
                </div>
                <div>
                  <span className="text-[#71717a] block font-mono">REGRAS DE AUDITORIA:</span>
                  <p className="text-[11px] text-[#a1a1aa] mt-1 leading-relaxed">
                    Operações vinculadas à agência exigem registro de log prévio e chave token de segurança de conformidade corporativa.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#27272a] space-y-2">
                <button
                  onClick={handleCsvExport}
                  id="btn-export-csv-modal"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 border border-[#27272a] hover:bg-[#121214] text-[#e4e4e7] bg-[#1a1a1d] rounded-xl text-xs font-semibold cursor-pointer transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-[#71717a]" />
                  <span>{lang.exportarCSV}</span>
                </button>
                <button
                  onClick={handlePdfExport}
                  id="btn-export-pdf-modal"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-sm font-bold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{lang.exportarPDF}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Detailed Ledger List inside Modal */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1a1a1d] p-4 rounded-xl border border-[#27272a]">
              <span className="text-xs font-bold text-[#e4e4e7] uppercase font-mono tracking-wide">
                Registros de Contabilidade Vinculados ao Bloco ({filteredTxs.length})
              </span>

              {/* Status Filter buttons inside modal */}
              <div className="flex rounded-lg bg-[#09090b] border border-[#27272a] p-1">
                {['TODOS', 'COMPLETO', 'PENDENTE', 'CANCELADO'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`px-2 py-1 text-[10px] font-semibold rounded cursor-pointer transition-all ${
                      selectedStatus === st ? 'bg-indigo-500 text-white font-bold shadow-sm' : 'text-[#71717a] hover:text-[#e4e4e7]'
                    }`}
                  >
                    {st === 'TODOS' ? 'Todos' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Micro list of records */}
            <div className="max-h-56 overflow-y-auto border border-[#27272a] rounded-xl bg-[#09090b]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#121214] border-b border-[#27272a] text-[10px] font-mono text-[#71717a] select-none">
                    <th className="py-2.5 px-3 font-normal">Identificação</th>
                    <th className="py-2.5 px-3 font-normal">Fila de Horário</th>
                    <th className="py-2.5 px-3 font-normal">Descrição Histórica</th>
                    <th className="py-2.5 px-3 font-normal text-right">Contabilidade</th>
                    <th className="py-2.5 px-3 font-normal text-center">Auditoria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272a]/60 text-xs text-[#e4e4e7]">
                  {filteredTxs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-[#71717a]">
                        Nenhuma transação correspondente encontrada neste status.
                      </td>
                    </tr>
                  ) : (
                    filteredTxs.map((t) => (
                      <tr key={t.id} className="hover:bg-[#1a1a1d]/30">
                        <td className="py-2.5 px-3 font-mono text-[11px] font-bold text-[#71717a]">
                          {t.id}
                        </td>
                        <td className="py-2.5 px-3 text-[#a1a1aa] font-mono whitespace-nowrap">
                          {t.timestamp.replace('T', ' ')}
                        </td>
                        <td className="py-2.5 px-3 text-white">
                          {t.description}
                        </td>
                        <td className={`py-2.5 px-3 font-bold text-right font-mono whitespace-nowrap ${t.isCredit ? 'text-emerald-400' : 'text-red-400'}`}>
                          {t.isCredit ? '+' : ''} R$ {Math.abs(t.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                            t.status === 'COMPLETO' ? 'bg-emerald-400' : t.status === 'CANCELADO' ? 'bg-red-400' : 'bg-amber-400'
                          }`} title={t.status} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
