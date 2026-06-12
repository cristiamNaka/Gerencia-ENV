import React, { useState } from 'react';
import { Shield, Sparkles, User, Settings2, RefreshCw, FileText, CheckCircle2, AlertTriangle, Layers, Languages, BookOpen } from 'lucide-react';
import { UserRole, UserProfile, LanguagePack } from '../types';

interface AdminPanelProps {
  lang: LanguagePack;
  userProfile: UserProfile;
  onChangeRole: (newRole: UserRole) => void;
  onUpdateProfile: (name: string, email: string, code: string) => void;
  complianceChecked: boolean;
  onToggleCompliance: () => void;
  logsCount: number;
  cadastrosPendingCount: number;
  currentTheme: string;
  onSetTheme: (theme: string) => void;
  onTriggerPushNotification: (title: string, message: string, type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR') => void;
}

export default function AdminPanel({
  lang,
  userProfile,
  onChangeRole,
  onUpdateProfile,
  complianceChecked,
  onToggleCompliance,
  logsCount,
  cadastrosPendingCount,
  currentTheme,
  onSetTheme,
  onTriggerPushNotification
}: AdminPanelProps) {
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [agencyCode, setAgencyCode] = useState(userProfile.agencyCode);
  const [customTitle, setCustomTitle] = useState('Alerta de Teste Coorporativo');
  const [customMsg, setCustomMsg] = useState('Este é um exemplo de notificação corporativa push em tempo real.');

  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(name, email, agencyCode);
    onTriggerPushNotification('Perfil Atualizado', 'Os dados cadastrais do seu usuário corporativo foram salvos!', 'SUCCESS');
  };

  const handleSendCustomNotify = () => {
    onTriggerPushNotification(customTitle, customMsg, 'INFO');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Col 1: Usuário & Controle Hierárquico */}
      <div className="bg-[#121214] border border-[#27272a] rounded-2xl p-5 shadow-sm space-y-4 text-[#e4e4e7]">
        <div>
          <h3 className="text-sm font-display font-bold text-[#71717a] font-mono tracking-wider uppercase">Controle de Segurança</h3>
          <h2 className="text-lg font-display font-semibold text-white mt-1 flex items-center gap-1.5 font-sans">
            <User className="w-5 h-5 text-indigo-400" />
            Níveis de Acesso
          </h2>
        </div>

        <div className="p-4 bg-[#1a1a1d] rounded-xl space-y-3 border border-[#27272a]/30">
          <p className="text-xs text-[#a1a1aa]">
            Modifique seu perfil hierárquico abaixo para ver como as restrições são aplicadas em tempo real pelas regras estritas do sistema:
          </p>

          <div className="grid grid-cols-1 gap-2 pt-1 font-sans">
            {([
              { role: 'ADMINISTRADOR', desc: 'Acesso total de auditoria, limpeza e gestão', color: 'border-red-500/20 text-red-400' },
              { role: 'GERENTE', desc: 'Aprovação de cadastros, exportação e visualização', color: 'border-indigo-500/20 text-indigo-400' },
              { role: 'OPERADOR', desc: 'Apenas leitura de relatórios e painéis', color: 'border-emerald-500/20 text-emerald-400' }
            ] as const).map(({ role, desc }) => (
              <button
                key={role}
                onClick={() => onChangeRole(role)}
                id={`btn-role-change-${role.toLowerCase()}`}
                className={`text-left p-3 border rounded-xl transition-all cursor-pointer text-xs ${
                  userProfile.role === role 
                    ? 'bg-indigo-500 border-indigo-500 text-white font-bold scale-[1.01] shadow-md shadow-indigo-500/15' 
                    : 'bg-[#121214] border-[#27272a] text-[#a1a1aa] hover:bg-[#1a1a1d]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono tracking-wide">{role}</span>
                  {userProfile.role === role && (
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  )}
                </div>
                <span className={`text-[10px] block mt-1 ${userProfile.role === role ? 'text-indigo-100' : 'text-[#71717a]'}`}>{desc}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmitProfile} className="space-y-3.5 pt-2">
          <span className="text-xs font-bold text-[#71717a] block uppercase tracking-wide">Dados Gerais</span>
          <div>
            <label className="text-[10px] text-[#71717a] block mb-1">NOME CORPORATIVO</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs p-2.5 bg-[#09090b] border border-[#27272a] rounded-lg text-[#e4e4e7] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-[10px] text-[#71717a] block mb-1">EMAIL INSTITUCIONAL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs p-2.5 bg-[#09090b] border border-[#27272a] rounded-lg text-[#e4e4e7] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-[#71717a] block mb-1">CÓDIGO AGÊNCIA</label>
              <input
                type="text"
                value={agencyCode}
                onChange={(e) => setAgencyCode(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#09090b] border border-[#27272a] rounded-lg text-[#e4e4e7] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                id="btn-save-profile"
                className="w-full text-xs py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition-all shadow-xs cursor-pointer font-bold"
              >
                Salvar Cadastro
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Col 2: Relatórios Mensais de Conformidade Automática */}
      <div className="bg-[#121214] border border-[#27272a] rounded-2xl p-5 shadow-sm space-y-4 text-[#e4e4e7]">
        <div>
          <h3 className="text-sm font-display font-bold text-[#71717a] font-mono tracking-wider uppercase">Automatização</h3>
          <h2 className="text-lg font-display font-semibold text-white mt-1 flex items-center gap-1.5 font-sans">
            <FileText className="w-5 h-5 text-indigo-400" />
            Conformidade Mensal
          </h2>
        </div>

        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-450 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider">Relatório Prontamente Gerado</h4>
              <p className="text-[11px] text-emerald-500 mt-0.5">
                O motor secundário analisou {logsCount} logs de TI e compilou a integridade da Agência {userProfile.agencyCode} para o ciclo de conformidade do mês atual.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <span className="text-xs font-semibold text-[#a1a1aa] block">Status da Auditoria Preventiva:</span>
          
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs p-2.5 bg-[#09090b] border border-[#27272a] rounded-lg">
              <span className="text-[#a1a1aa]">Total de Entradas de TI:</span>
              <span className="font-mono font-bold text-white">{logsCount} logs</span>
            </div>
            
            <div className="flex items-center justify-between text-xs p-2.5 bg-[#09090b] border border-[#27272a] rounded-lg">
              <span className="text-[#a1a1aa]">Cadastros Pendentes no Funil:</span>
              <span className={`font-mono font-bold ${cadastrosPendingCount > 0 ? 'text-amber-400' : 'text-[#71717a]'}`}>
                {cadastrosPendingCount} ativos
              </span>
            </div>
 
            <div className="flex items-center justify-between text-xs p-2.5 bg-[#09090b] border border-[#27272a] rounded-lg">
              <span className="text-[#a1a1aa]">Vulnerabilidades de Banco:</span>
              <span className="font-mono text-xs font-bold text-emerald-400">0 detectadas</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#27272a]">
            <label className="flex items-center gap-3 p-3 bg-[#1a1a1d] hover:bg-[#27272a] border border-[#27272a] rounded-xl cursor-pointer transition-colors select-none">
              <input
                type="checkbox"
                checked={complianceChecked}
                onChange={onToggleCompliance}
                className="w-4 h-4 text-indigo-500 bg-[#09090b] border-[#27272a] rounded focus:ring-indigo-500 cursor-pointer"
              />
              <div>
                <span className="text-xs font-bold text-[#e4e4e7] block">Homologar Conformidade</span>
                <span className="text-[9px] text-[#71717a] block">Assinar termo digital automatizado de integridade deste mês.</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Col 3: Visual, Teste de Mensagens Push & Customização */}
      <div className="bg-[#121214] border border-[#27272a] rounded-2xl p-5 shadow-sm space-y-4 text-[#e4e4e7]">
        <div>
          <h3 className="text-sm font-display font-bold text-[#71717a] font-mono tracking-wider uppercase">Customização</h3>
          <h2 className="text-lg font-display font-semibold text-white mt-1 flex items-center gap-1.5 font-sans">
            <Settings2 className="w-5 h-5 text-indigo-400" />
            Tema & Notificações
          </h2>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] text-[#71717a] font-mono block">COLOR LAYOUT PRESET</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'env-standard', label: 'ENV Clássico (Escuro)', colors: 'from-[#050B14] to-[#0A1628]' },
              { id: 'crimson-business', label: 'Crimson Slate', colors: 'from-[#1A1A24] to-[#261E1E]' },
              { id: 'warm-sand', label: 'Areia Suave (Claro)', colors: 'from-neutral-50 to-neutral-100' },
              { id: 'cyberpunk-tech', label: 'Quantum Tech', colors: 'from-[#030712] to-[#1F2937]' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => {
                  onSetTheme(t.id);
                  onTriggerPushNotification('Tema Alterado', `O visual do dashboard mudou para ${t.label}`, 'SUCCESS');
                }}
                className={`p-2.5 border rounded-xl text-left cursor-pointer transition-all ${
                  currentTheme === t.id 
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-semibold shadow-md shadow-indigo-500/5' 
                    : 'border-[#27272a] hover:bg-[#1a1a1d] text-[#a1a1aa]'
                }`}
              >
                <div className={`w-full h-2 rounded bg-gradient-to-r mb-2.5 ${t.colors} border border-[#27272a]`} />
                <span className="text-[10px] block truncate font-medium">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Notifications Trigger */}
        <div className="space-y-3 pt-2.5 border-t border-[#27272a]">
          <span className="text-[10px] font-mono text-[#71717a] block tracking-wider uppercase">Simular Notificações Push</span>
          
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Título do Alerta"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="w-full text-xs p-2.5 bg-[#09090b] border border-[#27272a] rounded-lg text-[#e4e4e7] outline-none focus:border-indigo-500"
            />
            <textarea
              placeholder="Mensagem detalhada..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              rows={2}
              className="w-full text-xs p-2.5 bg-[#09090b] border border-[#27272a] rounded-lg text-[#e4e4e7] outline-none resize-none focus:border-indigo-500"
            />
            <button
              onClick={handleSendCustomNotify}
              id="btn-trigger-custom-push"
              className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-md shadow-indigo-500/10"
            >
              Emitir Alerta Push Imediato
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
