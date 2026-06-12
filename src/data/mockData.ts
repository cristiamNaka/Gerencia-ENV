import { Transaction, ClientCadastro, AuditLog, SystemNotification, LanguagePack, DashboardMetric } from '../types';

export const TRANSLATIONS: Record<'PT' | 'EN', LanguagePack> = {
  PT: {
    home: 'Painel Principal',
    cadastros: 'Lista de Cadastros',
    lancamentos: 'Lançamentos Futuros',
    movimentacao: 'Movimentação Diária',
    vendedores: 'Vendedores',
    credito: 'Solicitações de Crédito',
    cobranca: 'Cobrança',
    sair: 'Sair da Conta',
    auditoria: 'Histórico de Logs',
    painelAdmin: 'Painel Admin',
    promptCodex: 'Prompt Orientador',
    entradas: 'Entradas',
    saidas: 'Saídas',
    saldoLiquido: 'Saldo Líquido',
    transacoes: 'Transações',
    modoEscuro: 'Modo Escuro',
    modoClaro: 'Modo Claro',
    filtrosAvancados: 'Filtros de Pesquisa Avançados',
    intervaloDatas: 'Intervalo de Data',
    categoria: 'Categoria',
    status: 'Status',
    buscar: 'Buscar Dados',
    limparFiltros: 'Limpar Filtros',
    exportarPDF: 'Exportar Relatório PDF',
    exportarCSV: 'Exportar Relatório CSV',
    notificacoes: 'Notificações Push',
    nivelAcesso: 'Nível de Acesso',
    operacao: 'Número de Operação',
    visualizacaoLayout: 'Visualização & Layout',
    customizacaoPainel: 'Customização de Blocos',
    notificacaoPush: 'Notificações em Tempo Real',
    sucesso: 'Completo',
    aviso: 'Pendente',
    critico: 'Cancelado'
  },
  EN: {
    home: 'Main Dashboard',
    cadastros: 'Registration List',
    lancamentos: 'Future Releases',
    movimentacao: 'Daily Cash Movement',
    vendedores: 'Sellers',
    credito: 'Credit Requests',
    cobranca: 'Billing & Collection',
    sair: 'Logout',
    auditoria: 'Audit logs',
    painelAdmin: 'Admin Panel',
    promptCodex: 'Codex AI Instructions',
    entradas: 'Cash Inflow',
    saidas: 'Cash Outflow',
    saldoLiquido: 'Net Balance',
    transacoes: 'Transactions',
    modoEscuro: 'Dark Theme',
    modoClaro: 'Light Theme',
    filtrosAvancados: 'Advanced Search Filters',
    intervaloDatas: 'Date Range',
    categoria: 'Category',
    status: 'Status',
    buscar: 'Filter Records',
    limparFiltros: 'Clear Filters',
    exportarPDF: 'Export PDF Report',
    exportarCSV: 'Export CSV Spreadsheet',
    notificacoes: 'Push Notifications',
    nivelAcesso: 'Hierarchical Level',
    operacao: 'Operation ID',
    visualizacaoLayout: 'Layout & Customizer',
    customizacaoPainel: 'Rearrange Widgets',
    notificacaoPush: 'Real-time Alerts',
    sucesso: 'Completed',
    aviso: 'Pending',
    critico: 'Cancelled'
  }
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TX-653949',
    timestamp: '2026-06-12T09:33:14',
    operationNumber: '653949',
    type: 'TARIFA',
    description: 'TARIFA MOVIMENTAÇÃO ENTRADA OP-653948',
    value: -1.17,
    isCredit: false,
    status: 'COMPLETO',
    category: 'Tarifas'
  },
  {
    id: 'TX-653948',
    timestamp: '2026-06-12T09:33:08',
    operationNumber: '653948',
    type: 'EMPRÉSTIMO',
    description: 'PAGAMENTO DA PARCELA 20 DO EMPRÉSTIMO 2821 Crédito R$ 500,00 em 26x CLIENTE FELIPE VALDREZ',
    value: 39.00,
    isCredit: true,
    status: 'COMPLETO',
    category: 'Créditos'
  },
  {
    id: 'TX-653940',
    timestamp: '2026-06-12T09:26:54',
    operationNumber: '653940',
    type: 'EMPRÉSTIMO',
    description: 'EMPRÉSTIMO SOLICITADO POR ISAQUE TEIXEIRA DOS SANTOS Nº 3548 DE R$ 1.000,00, PARCELADO EM 26 VEZES',
    value: -1000.00,
    isCredit: false,
    status: 'COMPLETO',
    category: 'Empréstimos'
  },
  {
    id: 'TX-653937',
    timestamp: '2026-06-12T09:26:16',
    operationNumber: '653937',
    type: 'TARIFA',
    description: 'TARIFA MOVIMENTAÇÃO ENTRADA OP-653936',
    value: -9.24,
    isCredit: false,
    status: 'COMPLETO',
    category: 'Tarifas'
  },
  {
    id: 'TX-653936',
    timestamp: '2026-06-12T09:26:10',
    operationNumber: '653936',
    type: 'EMPRÉSTIMO',
    description: 'PAGAMENTO TOTAL PARCELAS EM ABERTO DO EMPRÉSTIMO 2671 Crédito R$ 1.000,00 para CLIENTE SAVIO SOUZA SILVA',
    value: 308.00,
    isCredit: true,
    status: 'COMPLETO',
    category: 'Créditos'
  },
  {
    id: 'TX-653933',
    timestamp: '2026-06-12T09:24:36',
    operationNumber: '653933',
    type: 'EMPRÉSTIMO',
    description: 'EMPRÉSTIMO SOLICITADO POR CARLOS EDUARDO DOS SANTOS Nº 3547 DE R$ 700,00, PARCELADO EM 26 VEZES',
    value: -700.00,
    isCredit: false,
    status: 'PENDENTE',
    category: 'Empréstimos'
  },
  {
    id: 'TX-653930',
    timestamp: '2026-06-12T09:19:05',
    operationNumber: '653930',
    type: 'TARIFA',
    description: 'TARIFA MOVIMENTAÇÃO ENTRADA OP-653929',
    value: -7.65,
    isCredit: false,
    status: 'COMPLETO',
    category: 'Tarifas'
  },
  {
    id: 'TX-653929',
    timestamp: '2026-06-12T09:18:58',
    operationNumber: '653929',
    type: 'PIX IN',
    description: 'PIX-ENTRADA Alexander Tomaz-***.760.108-** (PAGAMENTO DA PARCELA 23, 24, 25 DO EMPRÉSTIMO 2248)',
    value: 255.00,
    isCredit: true,
    status: 'COMPLETO',
    category: 'Pix'
  },
  {
    id: 'TX-653927',
    timestamp: '2026-06-12T09:18:16',
    operationNumber: '653927',
    type: 'TARIFA',
    description: 'TARIFA MOVIMENTAÇÃO ENTRADA OP-653926',
    value: -2.31,
    isCredit: false,
    status: 'COMPLETO',
    category: 'Tarifas'
  },
  {
    id: 'TX-653926',
    timestamp: '2026-06-12T09:18:10',
    operationNumber: '653926',
    type: 'EMPRÉSTIMO',
    description: 'PAGAMENTO DA PARCELA 16 DO EMPRÉSTIMO 2745 Crédito R$ 1.000,00 26x CLIENTE FELIPE JHONATAN DA SILVA',
    value: 77.00,
    isCredit: true,
    status: 'COMPLETO',
    category: 'Créditos'
  },
  {
    id: 'TX-653922',
    timestamp: '2026-06-12T09:17:41',
    operationNumber: '653922',
    type: 'TARIFA',
    description: 'TARIFA MOVIMENTAÇÃO ENTRADA OP-653921',
    value: -2.31,
    isCredit: false,
    status: 'COMPLETO',
    category: 'Tarifas'
  },
  {
    id: 'TX-653921',
    timestamp: '2026-06-12T09:17:35',
    operationNumber: '653921',
    type: 'EMPRÉSTIMO',
    description: 'PAGAMENTO DA PARCELA 3 DO EMPRÉSTIMO 3389 Crédito R$ 1.000,00 26x CLIENTE VINICIUS FERREIRA DE OLIVEIRA',
    value: 77.00,
    isCredit: true,
    status: 'COMPLETO',
    category: 'Créditos'
  },
  {
    id: 'TX-653916',
    timestamp: '2026-06-12T09:16:01',
    operationNumber: '653916',
    type: 'EMPRÉSTIMO',
    description: 'EMPRÉSTIMO SOLICITADO POR RAQUEL LUCI DE ALMEIDA, Nº 3546 DE R$ 1.300,00, PARCELADO EM 26 VEZES',
    value: -1300.00,
    isCredit: false,
    status: 'COMPLETO',
    category: 'Empréstimos'
  },
  {
    id: 'TX-653913',
    timestamp: '2026-06-12T09:13:19',
    operationNumber: '653913',
    type: 'TARIFA',
    description: 'TARIFA MOVIMENTAÇÃO ENTRADA OP-653912',
    value: -13.86,
    isCredit: false,
    status: 'COMPLETO',
    category: 'Tarifas'
  },
  {
    id: 'TX-653912',
    timestamp: '2026-06-12T09:13:12',
    operationNumber: '653912',
    type: 'EMPRÉSTIMO',
    description: 'PAGAMENTO TOTAL PARCELAS EM ABERTO DO EMPRÉSTIMO 2795 CLIENTE CAIO DE JESUS SILVA',
    value: 462.00,
    isCredit: true,
    status: 'COMPLETO',
    category: 'Créditos'
  },
  {
    id: 'TX-653907',
    timestamp: '2026-06-12T09:09:43',
    operationNumber: '653907',
    type: 'TARIFA',
    description: 'TARIFA MOVIMENTAÇÃO ENTRADA OP-653906',
    value: -2.31,
    isCredit: false,
    status: 'COMPLETO',
    category: 'Tarifas'
  },
  {
    id: 'TX-653906',
    timestamp: '2026-06-12T09:09:06',
    operationNumber: '653906',
    type: 'EMPRÉSTIMO',
    description: 'PAGAMENTO DA PARCELA 6 DO EMPRÉSTIMO 3318 Crédito R$ 1.000,00 26x CLIENTE RAFAEL SANTOS DA SILVA',
    value: 77.00,
    isCredit: true,
    status: 'COMPLETO',
    category: 'Créditos'
  },
  {
    id: 'TX-653901',
    timestamp: '2026-06-12T08:55:11',
    operationNumber: '653901',
    type: 'TARIFA',
    description: 'TARIFA MOVIMENTAÇÃO ENTRADA OP-653900',
    value: -3.00,
    isCredit: false,
    status: 'COMPLETO',
    category: 'Tarifas'
  },
  {
    id: 'TX-653900',
    timestamp: '2026-06-12T08:55:05',
    operationNumber: '653900',
    type: 'EMPRÉSTIMO',
    description: 'PAGAMENTO DA PARCELA 8 DO EMPRÉSTIMO 3278 Crédito R$ 1.300,00 26x CLIENTE GUILHERME GOMES DOS SANTOS',
    value: 100.00,
    isCredit: true,
    status: 'COMPLETO',
    category: 'Créditos'
  },
  {
    id: 'TX-653887',
    timestamp: '2026-06-12T08:26:43',
    operationNumber: '653887',
    type: 'TARIFA',
    description: 'TARIFA MOVIMENTAÇÃO ENTRADA OP-653886',
    value: -1.62,
    isCredit: false,
    status: 'COMPLETO',
    category: 'Tarifas'
  },
  {
    id: 'TX-653886',
    timestamp: '2026-06-12T08:26:36',
    operationNumber: '653886',
    type: 'EMPRÉSTIMO',
    description: 'PAGAMENTO DA PARCELA 22 DO EMPRÉSTIMO 2401 Crédito R$ 700,00 26x CLIENTE ALCINDIANO FERREIRA SOARES',
    value: 54.00,
    isCredit: true,
    status: 'COMPLETO',
    category: 'Créditos'
  },
  {
    id: 'TX-653882',
    timestamp: '2026-06-12T08:19:42',
    operationNumber: '653882',
    type: 'TARIFA',
    description: 'TARIFA MOVIMENTAÇÃO ENTRADA OP-653881',
    value: -2.31,
    isCredit: false,
    status: 'CANCELADO',
    category: 'Tarifas'
  }
];

export const INITIAL_CADASTROS: ClientCadastro[] = [
  {
    id: 'CAD-001',
    name: 'Roberto de Sousa Almeida',
    phone: '(11) 98877-6611',
    email: 'roberto.almeida@gmail.com',
    signupDate: '2026-06-11',
    status: 'PENDENTE',
    contacted: false
  },
  {
    id: 'CAD-002',
    name: 'Letícia Vasconcelos Ramos',
    phone: '(21) 97755-4433',
    email: 'leticia.ramos@vasconcelos.io',
    signupDate: '2026-06-11',
    status: 'PENDENTE',
    contacted: true
  },
  {
    id: 'CAD-003',
    name: 'Felipe Valdrez',
    phone: '(48) 99122-3344',
    email: 'felipe.valdrez@outlook.com',
    signupDate: '2026-06-10',
    status: 'APROVADO',
    contacted: true
  },
  {
    id: 'CAD-004',
    name: 'Saulo Silveira Cruz',
    phone: '(31) 98223-1122',
    email: 'saulo.cruz@live.com',
    signupDate: '2026-06-10',
    status: 'REJEITADO',
    contacted: true
  },
  {
    id: 'CAD-005',
    name: 'Gisele Marques Pinheiro',
    phone: '(85) 99654-8800',
    email: 'gisele.pinheiro@terra.com.br',
    signupDate: '2026-06-09',
    status: 'APROVADO',
    contacted: true
  },
  {
    id: 'CAD-006',
    name: 'Carlos Eduardo dos Santos',
    phone: '(11) 97654-3210',
    email: 'carlos.eduardo@gmail.com',
    signupDate: '2026-06-12',
    status: 'PENDENTE',
    contacted: false
  },
  {
    id: 'CAD-007',
    name: 'Mariana de Oliveira Lima',
    phone: '(47) 98811-2233',
    email: 'mariana.lima@outlook.com',
    signupDate: '2026-06-12',
    status: 'PENDENTE',
    contacted: false
  }
];

export const INITIAL_LOGS: AuditLog[] = [
  {
    id: 'LOG-001',
    timestamp: '2026-06-12T09:34:00',
    user: 'GERENTE TESTE',
    role: 'GERENTE',
    action: 'LOGIN_OAUTH',
    details: 'Autenticação bem-sucedida via canal OAuth2 de segurança. IP: 189.54.22.10',
    category: 'AUTENTICACAO',
    severity: 'INFO'
  },
  {
    id: 'LOG-002',
    timestamp: '2026-06-12T09:33:14',
    user: 'SISTEMA_DOCKER',
    role: 'ADMINISTRADOR',
    action: 'PROCESSAMENTO_TARIFA',
    details: 'Tarifa aplicada automaticamente sobre a operação OP-653948 do cliente Felipe Valdrez. Valor: R$ 1,17',
    category: 'FINANCEIRO',
    severity: 'INFO'
  },
  {
    id: 'LOG-003',
    timestamp: '2026-06-12T09:26:54',
    user: 'GERENTE TESTE',
    role: 'GERENTE',
    action: 'EMPRÉSTIMO_PRE_APROVAÇÃO',
    details: 'Sinal de aprovação para solicitação de empréstimo do cliente Isaque Teixeira dos Santos. Total: R$ 1.000,00',
    category: 'FINANCEIRO',
    severity: 'AVISO'
  },
  {
    id: 'LOG-004',
    timestamp: '2026-06-12T09:18:58',
    user: 'GATEWAY_PIX',
    role: 'ADMINISTRADOR',
    action: 'RECEBIMENTO_PIX',
    details: 'Pix ID PX-65231 recebido. Remetente: Alexander Tomaz. Liquidação imediata.',
    category: 'FINANCEIRO',
    severity: 'INFO'
  },
  {
    id: 'LOG-005',
    timestamp: '2026-06-12T09:10:15',
    user: 'GERENTE TESTE',
    role: 'GERENTE',
    action: 'CADASTRO_ALTERADO',
    details: 'Cadastro do cliente Carlos Eduardo dos Santos adicionado na fila de verificação.',
    category: 'CADASTRO',
    severity: 'INFO'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'NOT-001',
    timestamp: '2026-06-12T09:33:14',
    title: 'Crédito Vencendo Hoje',
    message: 'Contrato nº 2821 do cliente Felipe Valdrez registra vencimento agendado para o dia de hoje.',
    type: 'WARNING',
    read: false
  },
  {
    id: 'NOT-002',
    timestamp: '2026-06-12T09:26:54',
    title: 'Solicitação Crítica de Valor de Empréstimo',
    message: 'Empréstimo de R$ 1.000,00 solicitado por Isaque Teixeira dos Santos acima do limite padrão do perfil.',
    type: 'ERROR',
    read: false
  },
  {
    id: 'NOT-003',
    timestamp: '2026-06-12T09:18:58',
    title: 'Pix Liquidado',
    message: 'Alexander Tomaz pagou R$ 255,00 via Pix. Quitando 3 parcelas do empréstimo em aberto.',
    type: 'SUCCESS',
    read: true
  }
];

export const DAILY_ACCOUNT_MOVEMENT_CHART = [
  { label: '06/08', value1: 45000, value2: 38000 },
  { label: '07/08', value1: 40000, value2: 42000 },
  { label: '08/08', value1: 52000, value2: 41000 },
  { label: '09/08', value1: 61000, value2: 55000 },
  { label: '10/08', value1: 56000, value2: 58000 },
  { label: '11/08', value1: 59000, value2: 55000 },
  { label: '12/08', value1: 6542, value2: 3198 }
];

export const INITIAL_METRICS = (txs: Transaction[], cads: ClientCadastro[]): DashboardMetric[] => {
  const pendCadCount = cads.filter(c => c.status === 'PENDENTE').length;
  const telCadCount = cads.filter(c => c.phone !== '').length;
  const mailCadCount = cads.filter(c => c.email !== '').length;
  const noContactCount = cads.filter(c => !c.contacted).length;

  return [
    {
      id: 'met-cadastros-pendentes',
      title: 'LISTA DE CADASTROS PENDENTE DE APROVAÇÃO',
      subtitle: 'Visão de aprovação regulatória',
      fields: [
        { label: 'PENDENTES', value: pendCadCount, color: 'text-amber-500' },
        { label: 'COM TELEFONE', value: telCadCount, color: 'text-blue-500' },
        { label: 'COM E-MAIL', value: mailCadCount, color: 'text-indigo-400' },
        { label: 'SEM CONTATO', value: noContactCount, color: 'text-red-500' }
      ],
      chartData: [
        { label: '06/08', value1: 1 },
        { label: '07/08', value1: 0 },
        { label: '08/08', value1: 2 },
        { label: '09/08', value1: 1 },
        { label: '10/08', value1: 3 },
        { label: '11/08', value1: 0 },
        { label: '12/08', value1: pendCadCount }
      ]
    },
    {
      id: 'met-mov-diaria',
      title: 'MOVIMENTAÇÃO DIÁRIA CONTA CORRENTE',
      subtitle: 'Controle de tesouraria operacional',
      fields: [
        { label: 'CONTAS LISTADAS', value: 5, color: 'text-neutral-700 dark:text-neutral-300' },
        { label: 'SALDO TOTAL', value: 'R$ 1.000,00', color: 'text-green-500' },
        { label: 'SALDO MÉDIO', value: 'R$ 200,00', color: 'text-sky-500' },
        { label: 'CONTAS POSITIVAS', value: 1, color: 'text-emerald-500' }
      ],
      chartData: [
        { label: '06/08', value1: 100 },
        { label: '07/08', value1: 150 },
        { label: '08/08', value1: 200 },
        { label: '09/08', value1: 450 },
        { label: '10/08', value1: 600 },
        { label: '11/08', value1: 850 },
        { label: '12/08', value1: 1000 }
      ]
    },
    {
      id: 'met-solicitacoes-credito',
      title: 'SOLICITAÇÕES DE CRÉDITO 12/06/2026',
      subtitle: 'Aprovações financeiras ativas',
      fields: [
        { label: 'EMPRÉSTIMOS ATIVOS', value: 1346, color: 'text-purple-500' },
        { label: 'TOTAL RECEBIDO', value: 'R$ 1.119.314,00', color: 'text-green-500' },
        { label: 'POR RECEBER', value: 'R$ 1.659.001,00', color: 'text-red-400' },
        { label: 'LUCRO', value: 'R$ 123.450,00', color: 'text-emerald-500' }
      ],
      chartData: [
        { label: '06/08', value1: 10 },
        { label: '07/08', value1: 15 },
        { label: '08/08', value1: 65 },
        { label: '09/08', value1: 32 },
        { label: '10/08', value1: 40 },
        { label: '11/08', value1: 28 },
        { label: '12/08', value1: 5 }
      ]
    },
    {
      id: 'met-credito-receber-hoje',
      title: 'CRÉDITO A RECEBER VENCIMENTO HOJE 12/06/2026',
      subtitle: 'Controle de recebíveis agendados',
      fields: [
        { label: 'CONTRATOS', value: 5, color: 'text-neutral-700 dark:text-neutral-300' },
        { label: 'VALOR TOTAL', value: 'R$ 462,00', color: 'text-amber-500' },
        { label: 'TICKET MÉDIO', value: 'R$ 92,40', color: 'text-sky-400' },
        { label: 'MAIOR VALOR', value: 'R$ 100,00', color: 'text-amber-600' }
      ],
      chartData: [
        { label: '06/08', value1: 300 },
        { label: '07/08', value1: 200 },
        { label: '08/08', value1: 310 },
        { label: '09/08', value1: 320 },
        { label: '10/08', value1: 380 },
        { label: '11/08', value1: 410 },
        { label: '12/08', value1: 462 }
      ]
    },
    {
      id: 'met-credito-recebido-hoje',
      title: 'CRÉDITO RECEBIDO NO VENCIMENTO HOJE 12/06/2026',
      subtitle: 'Adimplência diária realizada',
      fields: [
        { label: 'CONTRATOS', value: 5, color: 'text-neutral-700 dark:text-neutral-300' },
        { label: 'VALOR TOTAL', value: 'R$ 13.130,00', color: 'text-emerald-500' },
        { label: 'TICKET MÉDIO', value: 'R$ 2.626,00', color: 'text-teal-400' },
        { label: 'MAIOR VALOR', value: 'R$ 2.626,00', color: 'text-emerald-600' }
      ],
      chartData: [
        { label: '06/08', value1: 400 },
        { label: '07/08', value1: 0 },
        { label: '08/08', value1: 380 },
        { label: '09/08', value1: 350 },
        { label: '10/08', value1: 380 },
        { label: '11/08', value1: 290 },
        { label: '12/08', value1: 150 }
      ]
    },
    {
      id: 'met-credito-atraso',
      title: 'CRÉDITO A RECEBER COM MAIS DE UM DIA DE ATRASO',
      subtitle: 'Inadimplência acumulada',
      fields: [
        { label: 'CONTRATOS', value: 5, color: 'text-red-500 font-bold' },
        { label: 'TOTAL ATRASO', value: 'R$ 1.491,00', color: 'text-red-500' },
        { label: 'ATRASO MÉDIO', value: '30 dias', color: 'text-orange-500' },
        { label: 'MAIOR CONTRA', value: '46 dias', color: 'text-red-600' }
      ],
      chartData: [
        { label: '06/08', value1: 10000 },
        { label: '07/08', value1: 12000 },
        { label: '08/08', value1: 15000 },
        { label: '09/08', value1: 17000 },
        { label: '10/08', value1: 21000 },
        { label: '11/08', value1: 25000 },
        { label: '12/08', value1: 60000 }
      ]
    },
    {
      id: 'met-vendedores-resumo',
      title: 'VENDEDORES - RESUMO DETALHADO',
      subtitle: 'Eficiência e volume de equipe',
      fields: [
        { label: 'VENDEDORES', value: 5, color: 'text-neutral-700 dark:text-neutral-300' },
        { label: 'VENDAS', value: 1986, color: 'text-blue-500' },
        { label: 'PAGO', value: 'R$ 339.460,00', color: 'text-green-500' },
        { label: 'PENDENTE', value: 'R$ 60.020,00', color: 'text-amber-500' }
      ],
      chartData: [
        { label: '06/08', value1: 10 },
        { label: '07/08', value1: 8 },
        { label: '08/08', value1: 65 },
        { label: '09/08', value1: 24 },
        { label: '10/08', value1: 28 },
        { label: '11/08', value1: 20 },
        { label: '12/08', value1: 5 }
      ]
    },
    {
      id: 'met-lancamentos-futuros',
      title: 'LANÇAMENTOS FUTUROS / ANTECIPAÇÃO',
      subtitle: 'Previsões de fluxo e custódia',
      fields: [
        { label: 'LANÇAMENTOS', value: 5, color: 'text-neutral-700 dark:text-neutral-300' },
        { label: 'VALOR FUTURO', value: 'R$ 30.720,00', color: 'text-indigo-400' },
        { label: 'VALOR ANTECIPADO', value: 'R$ 0,00', color: 'text-neutral-400' },
        { label: '% ANTECIPADO', value: '0.0%', color: 'text-teal-500' }
      ],
      chartData: [
        { label: '06/08', value1: 0 },
        { label: '07/08', value1: 0 },
        { label: '08/08', value1: 0 },
        { label: '09/08', value1: 0 },
        { label: '10/08', value1: 0 },
        { label: '11/08', value1: 0 },
        { label: '12/08', value1: 1 }
      ]
    },
    {
      id: 'met-cadastros-aprovados',
      title: 'LISTA DE CADASTROS APROVADOS',
      subtitle: 'Clientes validados no compliance',
      fields: [
        { label: 'APROVADOS', value: cads.filter(c => c.status === 'APROVADO').length, color: 'text-emerald-500 font-bold' },
        { label: 'COM TELEFONE', value: 5, color: 'text-blue-500' },
        { label: 'COM E-MAIL', value: 5, color: 'text-indigo-400' },
        { label: 'SEM CONTATO', value: 0, color: 'text-neutral-400' }
      ],
      chartData: [
        { label: '06/08', value1: 2 },
        { label: '07/08', value1: 1 },
        { label: '08/08', value1: 8 },
        { label: '09/08', value1: 12 },
        { label: '10/08', value1: 16 },
        { label: '11/08', value1: 3 },
        { label: '12/08', value1: 2 }
      ]
    }
  ];
};
