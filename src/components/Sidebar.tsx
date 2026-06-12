import React from 'react';
import { 
  Home, Users, Calendar, BarChart3, TrendingUp, HandCoins, Building2, Shield, Settings2, Terminal, LogOut, ExternalLink, HelpCircle 
} from 'lucide-react';
import { LanguagePack, UserProfile } from '../types';

interface SidebarProps {
  lang: LanguagePack;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  userProfile: UserProfile;
}

export default function Sidebar({
  lang,
  activeTab,
  onSelectTab,
  userProfile
}: SidebarProps) {
  
  const menuItems = [
    { id: 'home', label: lang.home, icon: Home },
    { id: 'cadastros', label: lang.cadastros, icon: Users },
    { id: 'lancamentos', label: lang.lancamentos, icon: Calendar },
    { id: 'movimentacao', label: lang.movimentacao, icon: BarChart3 },
    { id: 'credito', label: lang.credito, icon: HandCoins },
    { id: 'auditoria', label: lang.auditoria, icon: Shield },
    { id: 'admin', label: lang.painelAdmin, icon: Settings2 },
    { id: 'prompt_codex', label: lang.promptCodex, icon: Terminal },
  ];

  return (
    <aside className="w-64 bg-[#121214] text-[#e4e4e7] flex flex-col shrink-0 select-none border-r border-[#27272a]">
      {/* Brand Logo header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-[#27272a] bg-[#121214]">
        <div className="flex items-center gap-2.5">
          {/* Custom graphic inspired by the Elegant Dark Indigo chevron/box logotype */}
          <div className="relative flex items-center justify-center w-7 h-7 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20 overflow-hidden shrink-0">
            <span className="font-display font-black text-white text-base">E</span>
            <div className="absolute top-0 right-0 w-2 h-2 bg-white rotate-45 transform translate-x-1 -translate-y-1" />
          </div>
          <div>
            <span className="font-display font-black tracking-tight text-white text-base block">
              ENV <span className="text-indigo-400 font-medium text-xs">Digital</span>
            </span>
          </div>
        </div>

        <span className="text-[9px] font-mono tracking-wider bg-indigo-500/10 text-indigo-400 font-bold px-2 py-0.5 rounded border border-indigo-500/20">
          PRO
        </span>
      </div>

      {/* Profile Overview card inside sidebar */}
      <div className="p-4 mx-4 my-4 bg-[#1a1a1d] rounded-xl border border-[#27272a] select-none">
        <span className="text-[9px] font-mono text-[#71717a] block tracking-widest uppercase">OPERADOR ATIVO</span>
        <p className="text-xs font-semibold text-white mt-1 max-w-[200px] truncate">{userProfile.name}</p>
        
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#27272a] text-[10px] font-mono text-[#a1a1aa]">
          <div>
            <span className="block text-[#52525b] uppercase">AGÊNCIA</span>
            <span className="font-bold text-[#e4e4e7]">R7 COMERCIO</span>
          </div>
          <div>
            <span className="block text-[#52525b] uppercase">CÓDIGO</span>
            <span className="font-bold text-[#e4e4e7]">{userProfile.agencyCode}</span>
          </div>
        </div>
      </div>

      {/* Scrollable Navigation section */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              id={`sidebar-item-${item.id}`}
              className={`w-full flex items-center gap-3 px-3.5 py-3 text-xs font-semibold rounded-xl text-left transition-all tracking-wide cursor-pointer ${
                isSelected
                  ? 'bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/20'
                  : 'text-[#a1a1aa] hover:bg-[#1a1a1d] hover:text-white'
              }`}
            >
              <IconComponent className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-[#71717a]'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* External system help box */}
      <div className="p-4 mx-4 my-3 bg-[#1a1a1d] rounded-xl border border-[#27272a]">
        <div className="flex items-center gap-2 mb-1.5 text-xs text-[#e4e4e7] font-semibold uppercase">
          <HelpCircle className="w-3.5 h-3.5 text-[#71717a]" />
          Suporte Técnico
        </div>
        <p className="text-[10px] text-[#71717a] leading-relaxed">
          Para homologações de API, utilize as chaves geradas em seu painel corporativo.
        </p>
      </div>

      {/* Exit Button footer */}
      <div className="p-4 border-t border-[#27272a] bg-[#121214]">
        <button
          onClick={() => {
            alert('A sessão segura do ENV Digital foi encerrada. Para reiniciar, clique em Conectar OAuth2 no cabeçalho.');
            window.location.reload();
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1a1a1d] hover:bg-[#27272a] text-[#a1a1aa] text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-[#27272a]"
        >
          <LogOut className="w-4 h-4 text-[#71717a]" />
          <span>{lang.sair}</span>
        </button>
      </div>
    </aside>
  );
}
