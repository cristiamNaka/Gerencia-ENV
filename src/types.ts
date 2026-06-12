/**
 * Types & Interfaces for ENV Digital Dashboard
 */

export type UserRole = 'ADMINISTRADOR' | 'GERENTE' | 'OPERADOR';

export interface UserProfile {
  name: string;
  agency: string;
  agencyCode: string;
  role: UserRole;
  email: string;
}

export type TransactionType = 'TARIFA' | 'EMPRÉSTIMO' | 'PIX IN' | 'PIX OUT' | 'CRÉDITO' | 'DEBITO';

export interface Transaction {
  id: string;
  timestamp: string; // ISO format
  operationNumber: string;
  type: TransactionType;
  description: string;
  value: number; // Positive for credit, negative for debit
  isCredit: boolean;
  status: 'COMPLETO' | 'PENDENTE' | 'CANCELADO';
  category: string;
}

export interface ClientCadastro {
  id: string;
  name: string;
  phone: string;
  email: string;
  signupDate: string;
  status: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
  contacted: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  details: string;
  category: 'AUTENTICACAO' | 'FINANCEIRO' | 'CADASTRO' | 'SISTEMA' | 'CONFIGURACAO';
  severity: 'INFO' | 'AVISO' | 'CRITICO';
}

export interface SystemNotification {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
}

export interface DashboardMetric {
  id: string;
  title: string;
  subtitle?: string;
  fields: {
    label: string;
    value: string | number;
    color?: string;
    type?: string;
  }[];
  chartData?: {
    label: string;
    value1: number;
    value2?: number;
  }[];
  chartType?: 'bar' | 'line' | 'mixed';
  detailsHtml?: string;
}

export interface LanguagePack {
  home: string;
  cadastros: string;
  lancamentos: string;
  movimentacao: string;
  vendedores: string;
  credito: string;
  cobranca: string;
  sair: string;
  auditoria: string;
  painelAdmin: string;
  promptCodex: string;
  entradas: string;
  saidas: string;
  saldoLiquido: string;
  transacoes: string;
  modoEscuro: string;
  modoClaro: string;
  filtrosAvancados: string;
  intervaloDatas: string;
  categoria: string;
  status: string;
  buscar: string;
  limparFiltros: string;
  exportarPDF: string;
  exportarCSV: string;
  notificacoes: string;
  nivelAcesso: string;
  operacao: string;
  visualizacaoLayout: string;
  customizacaoPainel: string;
  notificacaoPush: string;
  sucesso: string;
  aviso: string;
  critico: string;
}
