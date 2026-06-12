import React, { useState, useEffect } from 'react';
import { Bell, ShieldAlert, Sparkles, User, LogOut, CheckCircle, Languages, Moon, Sun, AlertTriangle, Key } from 'lucide-react';
import { UserProfile, SystemNotification, LanguagePack } from '../types';

interface HeaderProps {
  lang: LanguagePack;
  currentLanguage: 'PT' | 'EN';
  onToggleLanguage: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  userProfile: UserProfile;
  notifications: SystemNotification[];
  onMarkNotificationRead: (id: string) => void;
  onMarkAllNotificationsRead: () => void;
  onSimulateOAuth: () => void;
  oauthAuthorized: boolean;
  timeString: string;
}

export default function Header({
  lang,
  currentLanguage,
  onToggleLanguage,
  darkMode,
  onToggleDarkMode,
  userProfile,
  notifications,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  onSimulateOAuth,
  oauthAuthorized,
  timeString
}: HeaderProps) {
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-[#09090b]/80 backdrop-blur-md border-b border-[#27272a] h-16 px-6 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Search status / live feed metadata */}
      <div className="hidden md:flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 py-1 px-2.5 rounded-full font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {oauthAuthorized ? 'OAUTH2 SECURE SESSION' : 'MOCK OAUTH2 CONVERTED'}
        </span>
        <span className="text-xs text-[#71717a] font-mono">
          {timeString}
        </span>
      </div>

      {/* Action triggers */}
      <div className="flex items-center gap-4 ml-auto">
        
        {/* OAuth Switcher indicator */}
        <button
          onClick={onSimulateOAuth}
          id="btn-oauth-toggle"
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            oauthAuthorized 
              ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
              : 'bg-[#1a1a1d] hover:bg-[#27272a] border border-[#27272a] text-[#a1a1aa]'
          }`}
          title="Simular Re-autenticação segura via OAuth2"
        >
          <Key className="w-3.5 h-3.5" />
          <span>{oauthAuthorized ? 'OAuth2 Ativo' : 'Conectar OAuth2'}</span>
        </button>

        {/* Language switcher */}
        <button
          onClick={onToggleLanguage}
          id="btn-lang-toggle"
          className="p-2 border border-[#27272a] rounded-xl hover:bg-[#1a1a1d] text-[#e4e4e7] transition-colors cursor-pointer flex items-center gap-1"
          title="Mudar Idioma / Switcn Language"
        >
          <Languages className="w-4 h-4 text-[#71717a]" />
          <span className="text-[10px] font-bold uppercase">{currentLanguage}</span>
        </button>

        {/* Dark Mode switcher */}
        <button
          onClick={onToggleDarkMode}
          id="btn-theme-toggle"
          className="p-2 border border-[#27272a] rounded-xl hover:bg-[#1a1a1d] text-[#e4e4e7] transition-colors cursor-pointer"
          title={darkMode ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" /> : <Moon className="w-4 h-4 text-[#71717a]" />}
        </button>

        {/* Notifications push feed */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifMenu(!showNotifMenu);
              setShowProfileMenu(false);
            }}
            id="btn-notification-bell"
            className="p-2 border border-[#27272a] rounded-xl hover:bg-[#1a1a1d] text-[#e4e4e7] transition-colors cursor-pointer relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-500 text-white font-mono text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-bounce shadow-md shadow-indigo-500/10">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2.5 w-80 bg-[#121214] border border-[#27272a] rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-[#27272a] animate-in fade-in slide-in-from-top-3 duration-150">
              <div className="p-3.5 bg-[#09090b] flex items-center justify-between">
                <span className="text-xs font-bold text-[#e4e4e7] flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-indigo-400" />
                  Logs de TI Críticos em Tempo Real
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllNotificationsRead}
                    className="text-[10px] text-indigo-400 hover:underline font-bold cursor-pointer"
                  >
                    Marcar tudo como visto
                  </button>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto divide-y divide-[#27272a]/40 bg-[#121214]">
                {notifications.length === 0 ? (
                  <p className="p-4 text-xs text-center text-[#71717a] select-none">Sem alertas críticos ativos.</p>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={`p-3 text-xs transition-colors flex gap-2.5 ${
                        n.read ? 'opacity-60' : 'bg-indigo-500/5'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        n.type === 'ERROR' ? 'bg-red-500' : n.type === 'WARNING' ? 'bg-amber-500' : 'bg-green-500'
                      }`} />
                      
                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-bold text-[#e4e4e7]">{n.title}</span>
                          {!n.read && (
                            <button
                              onClick={() => {
                                onMarkNotificationRead(n.id);
                              }}
                              className="text-[9px] text-[#71717a] hover:text-indigo-400 font-bold cursor-pointer"
                            >
                              Lida
                            </button>
                          )}
                        </div>
                        <p className="text-[11px] text-[#a1a1aa] leading-relaxed">{n.message}</p>
                        <span className="text-[9px] font-mono text-[#52525b] block pt-0.5">{n.timestamp.replace('T', ' ')}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Session Profile & Role Indicator */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifMenu(false);
            }}
            id="btn-user-profile-menu"
            className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 border border-[#27272a] rounded-xl hover:bg-[#1a1a1d] cursor-pointer transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xs">
              {userProfile.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-left text-xs line-clamp-1">
              <span className="block font-semibold text-[#e4e4e7] max-w-[90px] truncate">{userProfile.name}</span>
              <span className="text-[9px] font-mono text-[#71717a] uppercase tracking-widest">{userProfile.role}</span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2.5 w-56 bg-[#121214] border border-[#27272a] rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-[#27272a] animate-in fade-in slide-in-from-top-3 duration-150">
              <div className="p-3.5 text-xs text-[#e4e4e7]">
                <p className="font-semibold">{userProfile.name}</p>
                <p className="text-[10px] text-[#71717a] font-mono mt-0.5">{userProfile.email}</p>
                <div className="mt-2.5 space-y-1 font-mono text-[9px] tracking-wider text-[#71717a] uppercase">
                  <div>AGÊNCIA: {userProfile.agencyCode}</div>
                  <div>CÓDIGO: {userProfile.agency}</div>
                </div>
              </div>
              <div className="p-1">
                <button
                  onClick={() => {
                    onSimulateOAuth();
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#a1a1aa] hover:bg-[#1a1a1d] hover:text-white rounded-xl transition-colors cursor-pointer"
                >
                  <Key className="w-4 h-4 text-[#71717a]" />
                  <span>Configurar OAuth2</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
