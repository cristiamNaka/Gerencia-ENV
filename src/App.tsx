import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, ArrowUpRight, ArrowDownRight, RefreshCw, Layers, SlidersHorizontal, CheckCircle, 
  HelpCircle, Sparkles, Filter, Download, Info, ShieldCheck, Key, FileText, Check, AlertTriangle, Eye, EyeOff
} from 'lucide-react';
import { 
  UserProfile, Transaction, ClientCadastro, AuditLog, SystemNotification, DashboardMetric 
} from './types';
import { 
  TRANSLATIONS, INITIAL_TRANSACTIONS, INITIAL_CADASTROS, INITIAL_LOGS, INITIAL_NOTIFICATIONS, 
  INITIAL_METRICS, DAILY_ACCOUNT_MOVEMENT_CHART 
} from './data/mockData';

// Subcomponents
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CadastroView from './components/CadastroView';
import AuditLogView from './components/AuditLogView';
import AdminPanel from './components/AdminPanel';
import AnalyticsModal from './components/AnalyticsModal';
import PromptOrientador from './components/PromptOrientador';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [currentLanguage, setCurrentLanguage] = useState<'PT' | 'EN'>('PT');
  const [currentTheme, setCurrentTheme] = useState<string>('env-standard');

  // Core collections
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [cadastros, setCadastros] = useState<ClientCadastro[]>(INITIAL_CADASTROS);
  const [logs, setLogs] = useState<AuditLog[]>(INITIAL_LOGS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);

  // User session state (OAuth simulation)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'GERENTE TESTE',
    agency: 'R7 COMERCIO',
    agencyCode: '009',
    role: 'GERENTE',
    email: 'cristiam2005@gmail.com'
  });
  const [oauthAuthorized, setOauthAuthorized] = useState<boolean>(true);
  const [showOauthModal, setShowOauthModal] = useState<boolean>(false);

  // Layout customizing toggles
  const [visibleWidgets, setVisibleWidgets] = useState<Record<string, boolean>>({
    'met-cadastros-pendentes': true,
    'met-mov-diaria': true,
    'met-solicitacoes-credito': true,
    'met-credito-receber-hoje': true,
    'met-credito-recebido-hoje': true,
    'met-credito-atraso': true,
    'met-vendedores-resumo': true,
    'met-lancamentos-futuros': true,
    'met-cadastros-aprovados': true
  });
  const [showDensityCompact, setShowDensityCompact] = useState<boolean>(false);
  const [complianceChecked, setComplianceChecked] = useState<boolean>(false);

  // Advanced Search / Filter values
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('TODOS');
  const [filterStatus, setFilterStatus] = useState<string>('TODOS');
  const [filterDateRange, setFilterDateRange] = useState<string>('TODOS');

  // Modal focus state
  const [selectedMetric, setSelectedMetric] = useState<DashboardMetric | null>(null);

  // Live time flow
  const [currentTime, setCurrentTime] = useState<Date>(new Date('2026-06-12T09:36:07'));

  // Auto-notification simulations
  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate real-time data ingestion every 40 seconds
      const randomNames = ['Arthur Linhares', 'Beatriz de Souza', 'Claudio Mendes', 'Diana Nobre'];
      const randomValue = Math.floor(Math.random() * 800) + 10;
      const index = Math.floor(Math.random() * randomNames.length);
      const name = randomNames[index];
      const operation = Math.floor(500000 + Math.random() * 200000).toString();

      const newTx: Transaction = {
        id: `TX-${operation}`,
        timestamp: new Date().toISOString().split('.')[0],
        operationNumber: operation,
        type: 'PIX IN',
        description: `PIX-ENTRADA instantânea recebida de ${name} via QR Code dinâmico`,
        value: randomValue,
        isCredit: true,
        status: 'COMPLETO',
        category: 'Pix'
      };

      setTransactions(prev => [newTx, ...prev]);

      // Push real-time alert
      const newAlert: SystemNotification = {
        id: `NOT-${Math.floor(100+Math.random()*900)}`,
        timestamp: new Date().toISOString().split('.')[0],
        title: 'Pix Comercial Ingerido',
        message: `${name} enviou R$ ${randomValue.toLocaleString('pt-BR')} via Pix Agência.`,
        type: 'SUCCESS',
        read: false
      };
      setNotifications(prev => [newAlert, ...prev]);

      // Add audit log
      const newLog: AuditLog = {
        id: `LOG-${Math.floor(600+Math.random()*400)}`,
        timestamp: new Date().toISOString().split('.')[0],
        user: 'SISTEMA_DOCKER',
        role: 'ADMINISTRADOR',
        action: 'RECEBIMENTO_INSTANTANEO',
        details: `Operação Pix recebida de ${name}. Valor: R$ ${randomValue}. Compilamento imediato de impostos.`,
        category: 'FINANCEIRO',
        severity: 'INFO'
      };
      setLogs(prev => [newLog, ...prev]);

    }, 35000);

    return () => clearInterval(timer);
  }, []);

  // Update body dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // State calculations for metric summaries (Screenshot values initially)
  const calcTotals = () => {
    let entradas = 6542.50;
    let saidas = 3198.59;
    
    // Add dynamically based on new completions
    const currentCompleted = transactions.filter(t => t.status === 'COMPLETO');
    const dynamicallyAdded = currentCompleted.filter(t => t.timestamp > '2026-06-12T09:33:14');
    
    dynamicallyAdded.forEach(t => {
      if (t.isCredit) {
        entradas += t.value;
      } else {
        saidas += Math.abs(t.value);
      }
    });

    const saldoLiquido = entradas - saidas;
    const totalTransactions = 150 + dynamicallyAdded.length;

    return {
      entradas,
      saidas,
      saldoLiquido,
      totalTransactions
    };
  };

  const totals = calcTotals();
  const activeLangPack = TRANSLATIONS[currentLanguage];

  // System Events actions
  const triggerCustomPushNotify = (title: string, message: string, type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR') => {
    const newAlert: SystemNotification = {
      id: `NOT-${Math.floor(100+Math.random()*900)}`,
      timestamp: new Date().toISOString().split('.')[0],
      title,
      message,
      type,
      read: false
    };
    setNotifications(prev => [newAlert, ...prev]);
  };

  const addSystemLog = (
    action: string, 
    category: 'AUTENTICACAO' | 'FINANCEIRO' | 'CADASTRO' | 'SISTEMA' | 'CONFIGURACAO', 
    severity: 'INFO' | 'AVISO' | 'CRITICO', 
    details: string
  ) => {
    const newLog: AuditLog = {
      id: `LOG-${Math.floor(500+Math.random()*400)}`,
      timestamp: new Date().toISOString().split('.')[0],
      user: userProfile.name,
      role: userProfile.role,
      action,
      details,
      category,
      severity
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // Client actions
  const handleAddCadastro = (newCad: ClientCadastro) => {
    setCadastros(prev => [newCad, ...prev]);
    addSystemLog(
      'CADASTRO_INCLUIDO',
      'CADASTRO',
      'INFO',
      `O usuário incluiu o cliente ${newCad.name} (${newCad.id}) na lista de verificação regulatória.`
    );
    triggerCustomPushNotify(
      'Novo Cadastro Inicializado',
      `${newCad.name} foi adicionado à fila e aguarda aprovação de mesa.`,
      'INFO'
    );
  };

  const handleUpdateCadastroStatus = (id: string, newStatus: 'APROVADO' | 'REJEITADO' | 'PENDENTE') => {
    setCadastros(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    const client = cadastros.find(c => c.id === id);
    const clientName = client ? client.name : 'Cliente';
    
    addSystemLog(
      `CAD_STATUS_${newStatus.toUpperCase()}`,
      'CADASTRO',
      newStatus === 'REJEITADO' ? 'AVISO' : 'INFO',
      `O status regulatório do cliente ${clientName} (${id}) foi alterado para: ${newStatus}.`
    );

    triggerCustomPushNotify(
      `Cadastro ${newStatus}`,
      `O cadastro de ${clientName} mudou para ${newStatus}.`,
      newStatus === 'APROVADO' ? 'SUCCESS' : newStatus === 'REJEITADO' ? 'ERROR' : 'WARNING'
    );
  };

  const handleDeleteCadastro = (id: string) => {
    setCadastros(prev => prev.filter(c => c.id !== id));
    addSystemLog(
      'CADASTRO_REMOVIDO',
      'CADASTRO',
      'AVISO',
      `O cadastro de ID ${id} foi completamente excluído do banco.`
    );
  };

  const handleToggleContacted = (id: string) => {
    setCadastros(prev => prev.map(c => c.id === id ? { ...c, contacted: !c.contacted } : c));
    addSystemLog(
      'CADASTRO_VENEZIA_CONTACTED',
      'CADASTRO',
      'INFO',
      `Situação de contato alternada para o cliente de ID ${id}.`
    );
  };

  // Export functions
  const handleExportCSV = (dataList: any[], filename: string) => {
    if (dataList.length === 0) return;
    const keys = Object.keys(dataList[0]);
    const csvContent = [
      keys.join(','),
      ...dataList.map(item => keys.map(k => {
        let val = item[k];
        if (typeof val === 'string') {
          val = `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(','))
    ].join('\n');

    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addSystemLog(
      'EXPORT_CSV',
      'FINANCEIRO',
      'INFO',
      `Planilha de dados exportada para arquivo CSV. Escopo: ${filename}.`
    );
  };

  const handleExportPDF = (list: any[], title: string) => {
    // Generate a beautiful formatted text and open print preview or simulated file download
    const win = window.open('', '_blank');
    if (!win) {
      alert('Por favor, ative os pop-ups para exportar o PDF de auditoria corporativo.');
      return;
    }

    const html = `
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: sans-serif; color: #222; padding: 40px; }
            h1 { font-size: 20px; border-bottom: 2px solid #D32F2F; padding-bottom: 15px; color: #111; }
            span.meta { font-size: 11px; float: right; color: #777; font-family: monospace; }
            table { width: 100%; border-collapse: collapse; margin-top: 30px; font-size: 11px; }
            th { text-align: left; background: #f4f4f4; padding: 10px; border: 1px solid #ddd; font-family: monospace; }
            td { padding: 9px; border: 1px solid #ddd; }
            .header-info { margin-top: 15px; font-size: 12px; line-height: 1.5; color: #444; }
            .footer { margin-top: 50px; border-top: 1px solid #ddd; padding-top: 15px; font-size: 10px; text-align: center; color: #999; }
          </style>
        </head>
        <body>
          <span class="meta">${new Date().toLocaleString()} | AGÊNCIA: ${userProfile.agencyCode}</span>
          <h1>ENV Digital - ${title}</h1>
          
          <div class="header-info">
            <strong>Relatório de Auditoria Regulatória</strong><br/>
            Responsável Técnico: ${userProfile.name} (${userProfile.role})<br/>
            ID de Conexão Segura: ${userProfile.email}<br/>
            Status de Verificação: HOMOLOGADO E CONFORME
          </div>

          <table>
            <thead>
              <tr>
                <th>Referência</th>
                <th>Data d/m/Y</th>
                <th>Descrição Técnica</th>
                <th>Informações de Fluxo</th>
              </tr>
            </thead>
            <tbody>
              ${list.map((item, idx) => `
                <tr>
                  <td>${item.id || item.operationNumber || `SEQ-${idx}`}</td>
                  <td>${(item.timestamp || item.signupDate || '').replace('T', ' ')}</td>
                  <td>${item.description || item.name || item.details || ''}</td>
                  <td>${item.value !== undefined ? `R$ ${item.value}` : item.status || 'REGISTRADO'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            ENV Digital &copy; 2026 - Conforme com regras rígidas de segurança corporativa nos termos da Circular 3.978/BACEN.
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    win.document.write(html);
    win.document.close();

    addSystemLog(
      'EXPORT_PDF',
      'SISTEMA',
      'INFO',
      `Demonstrativo gerado no formato PDF corporativo para o módulo: ${title}.`
    );
  };

  // Theme-specific styling classes
  const getThemeBackground = () => {
    switch (currentTheme) {
      case 'crimson-business':
        return 'bg-gradient-to-br from-[#101016] via-[#151214] to-[#1E1414] text-[#e4e4e7]';
      case 'warm-sand':
        return 'bg-neutral-50 text-neutral-900';
      case 'cyberpunk-tech':
        return 'bg-gradient-to-br from-[#02050A] via-[#0D1527] to-[#16294C] text-[#e4e4e7]';
      default:
        return 'bg-[#09090b] text-[#e4e4e7]'; // Elegant Dark
    }
  };

  // Simulated advanced search matching
  const matchedTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(filterQuery.toLowerCase()) || 
                          t.operationNumber.includes(filterQuery);
    
    // Category mapping
    let matchesCategory = true;
    if (filterCategory !== 'TODOS') {
      matchesCategory = t.category.toLowerCase().includes(filterCategory.toLowerCase());
    }

    // Status mapping
    const matchesStatus = filterStatus === 'TODOS' || t.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Real-time notification cleanups
  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // OAuth2 secure modal trigger & auth flow
  const handleSimulateOAuth = () => {
    setShowOauthModal(true);
  };

  const handleConfirmOAuth = (success: boolean) => {
    if (success) {
      setOauthAuthorized(true);
      addSystemLog(
        'RELAX_SECURITY_OAUTH',
        'AUTENTICACAO',
        'INFO',
        'Autenticação renovada e token revalidado para sessões SSH/API. Chave expira em 3600s.'
      );
      triggerCustomPushNotify('OAuth2 Autorizado', 'O token de fluxo seguro foi injetado com adimplência!', 'SUCCESS');
    } else {
      setOauthAuthorized(false);
      addSystemLog(
        'REVOKE_SECURITY_OAUTH',
        'AUTENTICACAO',
        'CRITICO',
        'Sessão revogada pelo usuário ou token inválido.'
      );
      triggerCustomPushNotify('Acesso Revogado', 'Operações restritas requerem revalidação da chave segura.', 'ERROR');
    }
    setShowOauthModal(false);
  };

  // Simulated live cash input to trigger automatic updates and test the system!
  const handleAddNewQuickTransaction = () => {
    const value = Math.floor(250 + Math.random() * 4000);
    const op = Math.floor(654000 + Math.random() * 999).toString();
    const newTx: Transaction = {
      id: `TX-${op}`,
      timestamp: new Date().toISOString().split('.')[0],
      operationNumber: op,
      type: 'PIX IN',
      description: `PAGAMENTO RECEBIDO ONLINE DA OP-${op} DE CLIENTE EVENTUAL`,
      value: value,
      isCredit: true,
      status: 'COMPLETO',
      category: 'Pix'
    };
    setTransactions(prev => [newTx, ...prev]);
    addSystemLog(
      'QUICK_ENTRY_COMPILED',
      'FINANCEIRO',
      'INFO',
      `Compilada entrada dinâmica de R$ ${value.toFixed(2)} pelo clique interativo de simulação.`
    );
    triggerCustomPushNotify(
      'Entrada Simulada',
      `O valor de R$ ${value.toLocaleString('pt-BR')} foi integrado nas estatísticas com sucesso!`,
      'SUCCESS'
    );
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-[#09090b] text-[#e4e4e7]' : 'bg-neutral-50 text-neutral-900'} font-sans`}>
      
      {/* Sidebar - left */}
      <Sidebar 
        lang={activeLangPack} 
        activeTab={activeTab} 
        onSelectTab={setActiveTab} 
        userProfile={userProfile} 
      />

      {/* Main wrapper right */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header - top */}
        <Header 
          lang={activeLangPack}
          currentLanguage={currentLanguage}
          onToggleLanguage={() => setCurrentLanguage(prev => prev === 'PT' ? 'EN' : 'PT')}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(prev => !prev)}
          userProfile={userProfile}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
          onSimulateOAuth={handleSimulateOAuth}
          oauthAuthorized={oauthAuthorized}
          timeString="12/06/2026 09:36:07"
        />

        {/* Content body space */}
        <main className={`flex-1 p-6 ${getThemeBackground()} transition-all duration-300 overflow-y-auto space-y-6`}>
          
          {/* Main home dashboard view */}
          {activeTab === 'home' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              {/* Floating Top Dashboard header layout */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display font-black tracking-tight text-white uppercase flex items-center gap-2">
                    <span>{activeLangPack.movimentacao}</span>
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-mono py-1 px-2.5 rounded border border-indigo-500/20 font-bold">
                      AGÊNCIA 13
                    </span>
                  </h1>
                  <p className="text-xs text-[#a1a1aa] mt-1 uppercase font-mono tracking-wider">
                    Demonstrativo consolidado de tesouraria. Última Carga: <strong className="text-indigo-400">12/06/2026 09:36:07</strong>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleAddNewQuickTransaction}
                    id="btn-simulate-cash"
                    className="flex items-center gap-2 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer transition-all"
                    title="Adicionar valor em tempo real para ver gráficos e logs mudarem!"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Lançar Entrada R$</span>
                  </button>

                  <button
                    onClick={() => {
                      handleExportCSV(matchedTransactions, 'movimentacao_diaria');
                    }}
                    id="btn-export-csv-head"
                    className="flex items-center gap-2 px-3 py-2 bg-[#121214] border border-[#27272a] hover:bg-[#1a1a1d] text-[#e4e4e7] text-xs font-semibold rounded-xl cursor-pointer transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>{activeLangPack.exportarCSV}</span>
                  </button>
                </div>
              </div>

              {/* Stat rows matching top table in first screenshot */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: activeLangPack.entradas, val: `R$ ${totals.entradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, color: 'text-emerald-400', isUp: true },
                  { label: activeLangPack.saidas, val: `R$ ${totals.saidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, color: 'text-red-400', isUp: false },
                  { label: activeLangPack.saldoLiquido, val: `R$ ${totals.saldoLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, color: totals.saldoLiquido >= 0 ? 'text-emerald-400' : 'text-red-400', isUp: totals.saldoLiquido >= 0 },
                  { label: activeLangPack.transacoes, val: totals.totalTransactions, color: 'text-indigo-455', isUp: null }
                ].map((stat, i) => (
                  <div key={i} className="bg-[#121214] border border-[#27272a] rounded-2xl p-5 shadow-sm hover:border-indigo-500/30 transition-all text-[#e4e4e7]">
                    <span className="text-[10px] font-mono tracking-wider text-[#71717a] block uppercase font-bold">
                      {stat.label}
                    </span>
                    <div className="flex items-baseline justify-between mt-2.5">
                      <span className={`text-lg sm:text-xl font-display font-black tracking-tight ${stat.color}`}>
                        {stat.val}
                      </span>
                      {stat.isUp !== null && (
                        <span className={`text-[10px] font-mono font-bold flex items-center ${stat.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                          {stat.isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          12.4%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Big bar chart: Movimentação Diária Conta Agência */}
              <div className="bg-[#121214] border border-[#27272a] rounded-2xl p-6 shadow-sm text-[#e4e4e7]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    Evolução Comparativa Diária - Entradas (Verde) vs Saídas (Vermelho)
                  </span>

                  {/* Legend */}
                  <div className="flex gap-4 text-xs font-mono">
                    <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <span className="w-2.5 h-2.5 rounded-xs bg-emerald-400 inline-block" />
                      Entradas
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-red-400">
                      <span className="w-2.5 h-2.5 rounded-xs bg-red-400 inline-block" />
                      Saídas
                    </span>
                  </div>
                </div>

                {/* Animated Column Chart */}
                <div className="h-44 w-full flex items-end justify-between px-2 pt-2 pb-1 border-b border-[#27272a] relative">
                  {DAILY_ACCOUNT_MOVEMENT_CHART.map((d, id) => {
                    const maxUnit = 65000;
                    const scale1 = (d.value1 / maxUnit) * 100;
                    const scale2 = (d.value2 / maxUnit) * 100;

                    return (
                      <div key={id} className="flex-1 flex flex-col items-center mx-1 sm:mx-3 group">
                        <div className="w-full flex items-end gap-1.5 justify-center h-full">
                          
                          {/* Entrada graph bar */}
                          <div 
                            className="w-4 bg-emerald-500 rounded-t hover:bg-emerald-600 transition-all shadow-sm relative cursor-pointer"
                            style={{ height: `${Math.max(scale1, 10)}%` }}
                          >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] bg-[#09090b] border border-[#27272a] text-[#e4e4e7] p-1 rounded font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap shadow-md">
                              E: R$ {d.value1}
                            </div>
                          </div>

                          {/* Saída graph bar */}
                          <div 
                            className="w-4 bg-[#ef4444]/80 rounded-t hover:bg-[#ef4444] transition-all shadow-sm relative cursor-pointer"
                            style={{ height: `${Math.max(scale2, 6)}%` }}
                          >
                            <div className="absolute -top-11 left-1/2 -translate-x-1/2 text-[8px] bg-[#09090b] border border-[#27272a] text-[#e4e4e7] p-1 rounded font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap shadow-md">
                              S: R$ {d.value2}
                            </div>
                          </div>

                        </div>
                        <span className="text-[10px] font-mono text-[#71717a] mt-2 select-none">
                          {d.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Advanced search panel - Requested: Data range, category, status */}
              <div className="bg-[#121214] border border-[#27272a] rounded-2xl p-5">
                <span className="text-xs font-bold text-[#71717a] uppercase font-mono tracking-wider block mb-3.5">
                  📁 {activeLangPack.filtrosAvancados} (Geral da Agência)
                </span>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Date range selection */}
                  <div>
                    <label className="text-[10px] text-[#71717a] font-mono block uppercase mb-1">Intervalo de Vepas</label>
                    <select
                      value={filterDateRange}
                      onChange={(e) => setFilterDateRange(e.target.value)}
                      id="select-filter-daterange"
                      className="w-full text-xs p-2.5 bg-[#1a1a1d] border border-[#27272a] rounded-xl outline-none text-[#e4e4e7] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="TODOS">Qualquer Período</option>
                      <option value="HOJE">Vencendo Hoje (12/06)</option>
                      <option value="7d">Últimos 7 Dias</option>
                      <option value="30d">Últimos 30 Dias</option>
                    </select>
                  </div>

                  {/* Category selection */}
                  <div>
                    <label className="text-[10px] text-[#71717a] font-mono block uppercase mb-1">Dívidas & Categorias</label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      id="select-filter-category"
                      className="w-full text-xs p-2.5 bg-[#1a1a1d] border border-[#27272a] rounded-xl outline-none text-[#e4e4e7] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="TODOS">Todas Categorias</option>
                      <option value="Tarifas">Tarifas Operacionais</option>
                      <option value="Empréstimos">Solicitações de Empréstimos</option>
                      <option value="Pix">Lançamento Pix</option>
                      <option value="Créditos">Créditos Gerais</option>
                    </select>
                  </div>

                  {/* Status Selection */}
                  <div>
                    <label className="text-[10px] text-[#71717a] font-mono block uppercase mb-1">Status de Fechamento</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      id="select-filter-status"
                      className="w-full text-xs p-2.5 bg-[#1a1a1d] border border-[#27272a] rounded-xl outline-none text-[#e4e4e7] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="TODOS">Todos os Fechamentos</option>
                      <option value="COMPLETO">Quitação Completa</option>
                      <option value="PENDENTE">Lançamento Pendente</option>
                      <option value="CANCELADO">Estornado / Cancelado</option>
                    </select>
                  </div>

                  {/* Keyboard query */}
                  <div className="flex flex-col justify-end">
                    <label className="text-[10px] text-[#71717a] font-mono block uppercase mb-1">Buscar por Descrição</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ex: Felipe Valdrez..."
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#1a1a1d] border border-[#27272a] rounded-xl outline-none text-[#e4e4e7] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                      {filterQuery && (
                        <button
                          onClick={() => setFilterQuery('')}
                          className="absolute right-3 top-3 text-[10px] font-bold text-[#71717a] hover:text-white"
                        >
                          X
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 mt-3 pt-3 border-t border-[#27272a] text-xs text-[#a1a1aa]">
                  <span>Encontradas <strong className="text-indigo-400 font-bold">{matchedTransactions.length}</strong> transações correspondentes</span>
                  
                  <button
                    onClick={() => {
                      setFilterQuery('');
                      setFilterCategory('TODOS');
                      setFilterStatus('TODOS');
                      setFilterDateRange('TODOS');
                    }}
                    id="btn-clear-main-filters"
                    className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer uppercase font-mono tracking-wider"
                  >
                    Redefinir Campos
                  </button>
                </div>
              </div>

              {/* Dynamic Grid Layout of 9 Blocks/Widgets */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#27272a] pb-3 mb-5">
                  <div>
                    <h3 className="text-sm font-bold text-[#a1a1aa] block font-mono">LAYOUT DE AUDITORIA OPERACIONAL</h3>
                    <p className="text-xs text-[#71717a]">Clique em qualquer bloco para abrir o modal de análise e exportação de dados.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Density Toggler */}
                    <button
                      onClick={() => setShowDensityCompact(!showDensityCompact)}
                      id="btn-density-toggle"
                      className="px-3 py-1.5 border border-[#27272a] bg-[#1a1a1d] text-[#a1a1aa] hover:bg-[#121214] rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Configurar Espaçamento: {showDensityCompact ? 'Compacto' : 'Padrão'}
                    </button>
                  </div>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${showDensityCompact ? 'gap-y-4' : 'gap-y-6'}`}>
                  {INITIAL_METRICS(transactions, cadastros)
                    .filter(m => visibleWidgets[m.id])
                    .map((m) => (
                      <div
                        key={m.id}
                        id={`metric-widget-card-${m.id}`}
                        onClick={() => setSelectedMetric(m)}
                        className="bg-[#121214] border border-[#27272a] rounded-2xl overflow-hidden shadow-sm hover:border-[#6366f1]/40 hover:shadow-indigo-500/5 active:scale-[0.99] transition-all cursor-pointer group flex flex-col h-full text-[#e4e4e7]"
                      >
                        {/* Header card indicator line block */}
                        <div className="bg-[#18181b] text-xs font-bold text-indigo-400 p-4 border-b border-[#27272a] select-none flex items-center justify-between">
                          <span className="font-display font-medium tracking-wider truncate uppercase text-[10px]">
                            {m.title}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-xs" />
                        </div>

                        {/* Middle fields row - Grid layout */}
                        <div className={`p-4 grid grid-cols-2 gap-3.5 flex-1 ${showDensityCompact ? 'py-3' : 'py-5'}`}>
                          {m.fields.map((f, idKey) => (
                            <div key={idKey} className="border-b border-[#27272a]/40 pb-2">
                              <span className="text-[9px] font-mono tracking-wider text-[#71717a] block uppercase select-none font-semibold">
                                {f.label}
                              </span>
                              <span className={`text-sm font-black block mt-1 ${f.color || 'text-white'}`}>
                                {f.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Graphic Mini bar representation */}
                        <div className="px-4 pb-4 select-none">
                          <div className="h-10 w-full flex items-end justify-between px-1 border-b border-[#27272a]">
                            {(m.chartData || []).map((chartItem, idx) => {
                              const valuesList = (m.chartData || []).map(k => k.value1);
                              const maxValInList = Math.max(...valuesList, 1);
                              const heightPercentage = (chartItem.value1 / maxValInList) * 100;
                              return (
                                <div 
                                  key={idx} 
                                  className="w-2.5 bg-indigo-500/20 group-hover:bg-indigo-500/50 rounded-t-xs transition-colors"
                                  style={{ height: `${Math.max(heightPercentage, 10)}%` }}
                                />
                              );
                            })}
                          </div>
                        </div>

                        {/* Footer bar */}
                        <div className="bg-[#1a1a1d] p-3 text-center border-t border-[#27272a] text-[10px] font-mono text-[#71717a] font-bold uppercase select-none tracking-widest group-hover:text-indigo-400 group-hover:bg-[#1a1a1d]/60 transition-all">
                          Ver Detalhes do Bloco +
                        </div>
                      </div>
                    ))}
                </div>
              </div>

            </div>
          )}

          {/* Registration Module (Cadastros) */}
          {activeTab === 'cadastros' && (
            <div className="max-w-7xl mx-auto">
              <CadastroView 
                lang={activeLangPack}
                cadastros={cadastros}
                onAddCadastro={handleAddCadastro}
                onUpdateStatus={handleUpdateCadastroStatus}
                onDeleteCadastro={handleDeleteCadastro}
                onToggleContacted={handleToggleContacted}
                currentRole={userProfile.role}
              />
            </div>
          )}

          {/* Lançamentos Futuros page view */}
          {activeTab === 'lancamentos' && (
            <div className="space-y-6 max-w-7xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
              <div className="border-b border-neutral-150 dark:border-neutral-800 pb-5">
                <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white uppercase">
                  {activeLangPack.lancamentos} / Custódia Garantida
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Gerenciamento de adimplência de liquidações agendadas e recebíveis do ciclo operacional de vendas.
                </p>
              </div>

              <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 p-4 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase font-mono tracking-wider">Lançamentos sob Monitoramento</h4>
                  <p className="text-[11px] text-amber-700 dark:text-amber-500 mt-0.5">
                    O índice de liquidez projeta compensação integral nas próximas 48 horas. Re-auditar se houver estornos de tarifas bancárias na matriz.
                  </p>
                </div>
              </div>

              {/* Transactions list related */}
              <div className="overflow-x-auto border border-neutral-100 dark:border-neutral-800/80 rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-50 dark:bg-neutral-800/20 border-b border-neutral-100 dark:border-neutral-800 text-xs font-mono text-slate-400 select-none">
                      <th className="py-2.5 px-3 font-normal">Identificador</th>
                      <th className="py-2.5 px-3 font-normal">Agendamento</th>
                      <th className="py-2.5 px-3 font-normal font-bold">Tipo</th>
                      <th className="py-2.5 px-3 font-normal">Descrição Histórica</th>
                      <th className="py-2.5 px-3 font-normal text-right">Previsão Custódia</th>
                      <th className="py-2.5 px-3 font-normal text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-850 text-xs">
                    {transactions.filter(t => t.status === 'PENDENTE').map((t) => (
                      <tr key={t.id} className="hover:bg-neutral-50/20 dark:hover:bg-neutral-800/5">
                        <td className="py-3 px-3 font-mono font-bold text-neutral-500">{t.id}</td>
                        <td className="py-3 px-3 text-neutral-450 font-mono">{t.timestamp.replace('T', ' ')}</td>
                        <td className="py-3 px-3 font-bold text-yellow-600 uppercase text-[10px]">{t.type}</td>
                        <td className="py-3 px-3 text-neutral-750 dark:text-neutral-200">{t.description}</td>
                        <td className="py-3 px-3 font-bold text-right text-red-500 font-mono">
                          - R$ {Math.abs(t.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-950/20 text-yellow-650 text-[10px] font-bold rounded">
                            AGUARDANDO
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Daily flow movement page (Movimentação) */}
          {activeTab === 'movimentacao' && (
            <div className="space-y-6 max-w-7xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-150 dark:border-neutral-800 pb-5">
                <div>
                  <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white uppercase">
                    Extrato Analítico Conta Corrente
                  </h2>
                  <p className="text-xs text-neutral-450 mt-1 uppercase font-mono tracking-widest">
                    Agência de Cobrança 009 | Conta Operacional: 02-001-954385
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleExportCSV(transactions, 'extrato_integro')}
                    className="flex items-center gap-1.5 px-3 py-2 bg-neutral-900 dark:bg-neutral-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Baixar Planilha Completa</span>
                  </button>
                </div>
              </div>

              {/* Advanced search ledger */}
              <div className="overflow-x-auto border border-neutral-100 dark:border-neutral-800 rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-50 dark:bg-neutral-800/30 border-b border-neutral-100 dark:border-neutral-850 text-xs font-mono text-neutral-400 select-none">
                      <th className="py-3 px-3 font-normal">Operação</th>
                      <th className="py-3 px-3 font-normal">Data / Hora</th>
                      <th className="py-3 px-3 font-normal font-bold">Categoria</th>
                      <th className="py-3 px-3 font-normal">Descrição Técnica</th>
                      <th className="py-3 px-3 font-normal text-right">Crédito</th>
                      <th className="py-3 px-3 font-normal text-right">Débito</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-105 dark:divide-neutral-850 text-xs">
                    {transactions.map((t) => (
                      <tr key={t.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/10">
                        <td className="py-3.5 px-3 font-mono font-bold text-neutral-500">{t.operationNumber}</td>
                        <td className="py-3.5 px-3 text-neutral-450 font-mono">{t.timestamp.replace('T', ' ')}</td>
                        <td className="py-3.5 px-3">
                          <span className="font-bold py-0.5 px-1.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 uppercase text-[10px]">
                            {t.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-medium text-neutral-800 dark:text-neutral-300">{t.description}</td>
                        <td className="py-3.5 px-3 text-right font-mono font-bold text-green-500">
                          {t.isCredit ? `R$ ${t.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '--'}
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono font-bold text-red-500">
                          {!t.isCredit ? `R$ ${Math.abs(t.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '--'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Credit requests flow (Credito) */}
          {activeTab === 'credito' && (
            <div className="space-y-6 max-w-7xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
              <div className="border-b border-neutral-150 dark:border-neutral-800 pb-5">
                <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white uppercase">
                  Solicitações de Crédito Pendentes no Mês
                </h2>
                <p className="text-xs text-neutral-450 mt-1">
                  Tratamento de propostas bilaterais sob os critérios regulatórios de segurança bancária.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Isaque Teixeira dos Santos', val: 'R$ 1.000,00', prop: 'Mesa de Crédito 1', score: 'ALTO RISCO' },
                  { name: 'Carlos Eduardo dos Santos', val: 'R$ 700,00', prop: 'Agência 13', score: 'ADIMPLENTE' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-red-550 transition-colors bg-neutral-50 dark:bg-neutral-850">
                    <span className="text-[9px] font-mono tracking-wider bg-red-100 dark:bg-red-950/40 text-red-650 dark:text-red-400 px-2 py-0.5 rounded font-bold">
                      {item.score}
                    </span>
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mt-2">{item.name}</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">Valor Proposta de Empréstimo: <strong className="text-neutral-800 dark:text-white">{item.val}</strong></p>
                    
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => {
                          alert('Crédito Aprovado com Sucesso! Um log de auditoria foi gravado.');
                          addSystemLog('CREDITO_MESA_APROVADO', 'FINANCEIRO', 'INFO', `Crédito de ${item.val} para ${item.name} homologado à taxa padrão.`);
                        }}
                        className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                      >
                        Aprovar R$
                      </button>
                      <button
                        onClick={() => {
                          alert('Crédito Recusado de Acordo com regras de compliance.');
                          addSystemLog('CREDITO_MESA_REGULATORIO', 'FINANCEIRO', 'AVISO', `Crédito recusado para ${item.name} devido à carência ativa.`);
                        }}
                        className="py-1.5 px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Recusar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audit Logs tab */}
          {activeTab === 'auditoria' && (
            <div className="max-w-7xl mx-auto">
              <AuditLogView 
                lang={activeLangPack}
                logs={logs}
                onClearLogs={() => {
                  setLogs([]);
                  addSystemLog('LIMPEZA_AUDITORIA', 'CONFIGURACAO', 'CRITICO', 'Todo histórico de logs locais de conformidade regulatória foi deletado pelo administrador.');
                }}
                onAddSystemLog={addSystemLog}
                currentRole={userProfile.role}
                onExportCSV={handleExportCSV}
                onExportPDF={handleExportPDF}
              />
            </div>
          )}

          {/* Admin panel tab */}
          {activeTab === 'admin' && (
            <div className="max-w-7xl mx-auto">
              <AdminPanel 
                lang={activeLangPack}
                userProfile={userProfile}
                onChangeRole={(newRole) => {
                  setUserProfile(prev => ({ ...prev, role: newRole }));
                  addSystemLog(
                    'REGULATION_ROLE_CHANGED', 
                    'CONFIGURACAO', 
                    'AVISO', 
                    `Acesso hierárquico reconfigurado para a credencial ${userProfile.name}. Novo cargo: ${newRole}.`
                  );
                  triggerCustomPushNotify('Cargo Reconfigurado', `Seu perfil operacional agora é considerado ${newRole}.`, 'WARNING');
                }}
                onUpdateProfile={(name, email, code) => {
                  setUserProfile(prev => ({ ...prev, name, email, agencyCode: code }));
                  addSystemLog('PROFILE_UPDATED', 'CONFIGURACAO', 'INFO', 'Os dados de usuário e cadastro de filial foram salvos.');
                }}
                complianceChecked={complianceChecked}
                onToggleCompliance={() => {
                  setComplianceChecked(!complianceChecked);
                  addSystemLog(
                    'COMPLIANCE_SIGNATURE',
                    'SISTEMA',
                    'INFO',
                    `O responsável declarou a regularidade fiscal sob termos digitais. Assinatura: SHA256-${Math.floor(100000+Math.random()*900000)}`
                  );
                  triggerCustomPushNotify('Conformidade Assinada', 'O termo regulatório foi enviado à Mesa Central de Compliance.', 'SUCCESS');
                }}
                logsCount={logs.length}
                cadastrosPendingCount={cadastros.filter(c => c.status === 'PENDENTE').length}
                currentTheme={currentTheme}
                onSetTheme={setCurrentTheme}
                onTriggerPushNotification={triggerCustomPushNotify}
              />
            </div>
          )}

          {/* Prompt builder guidelines tab */}
          {activeTab === 'prompt_codex' && (
            <div className="max-w-7xl mx-auto">
              <PromptOrientador lang={activeLangPack} currentRole={userProfile.role} />
            </div>
          )}

        </main>
      </div>

      {/* Selected Block Detailed Modal */}
      {selectedMetric && (
        <AnalyticsModal 
          metric={selectedMetric}
          transactions={transactions}
          onClose={() => setSelectedMetric(null)}
          lang={activeLangPack}
          onExportCSV={handleExportCSV}
          onExportPDF={handleExportPDF}
        />
      )}

      {/* Simulated OAuth2 Login/Setup Modal popup */}
      {showOauthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-2xl animate-in duration-150 zoom-in-95">
            <div className="p-6 bg-red-750 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Key className="w-5.5 h-5.5" />
                <div>
                  <h3 className="text-base font-bold font-display">Autenticação OAuth2 Segura</h3>
                  <p className="text-[11px] text-red-100">Contratos bilaterais de regulação</p>
                </div>
              </div>
              <button 
                onClick={() => setShowOauthModal(false)}
                className="p-1 px-2.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg cursor-pointer"
              >
                Fechar
              </button>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Este token simula o protocolo de segurança regulamentar <strong>OAuth2.0</strong> com criptografia de ponta a ponta e chaves rotativas de auditoria. Escolha as permissões requeridas pelo seu appレット abaixo:
              </p>

              <div className="space-y-2.5 p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-205 dark:border-neutral-850 rounded-2xl text-xs">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-800 dark:text-white font-semibold">Scope: profile / email</strong>
                    <span className="text-[11px] text-neutral-500 block">Identificar agência corporativa e operador financeiro.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-800 dark:text-white font-semibold">Scope: transactions / auditing_logs (DML)</strong>
                    <span className="text-[11px] text-neutral-500 block">Escrever registros de logs obrigatórios para conformidade regulatória.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-800 dark:text-white font-semibold">Scope: write_registrations (Cadastros)</strong>
                    <span className="text-[11px] text-neutral-500 block">Acessar e atualizar status cadastral na mesa regulatória externa.</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-450 font-mono">
                <span>CLIENT SECRET: **********</span>
                <span>STATUS: {oauthAuthorized ? 'CONECTADO' : 'REVOGADO'}</span>
              </div>

              <div className="pt-3 flex gap-2.5">
                <button
                  onClick={() => handleConfirmOAuth(false)}
                  className="flex-1 py-2.5 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300 font-bold rounded-xl text-xs cursor-pointer text-center"
                >
                  Revogar Token
                </button>
                <button
                  onClick={() => handleConfirmOAuth(true)}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs cursor-pointer text-center"
                >
                  Autorizar Conexão
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
