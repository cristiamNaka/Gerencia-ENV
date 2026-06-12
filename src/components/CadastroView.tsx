import React, { useState } from 'react';
import { Search, UserPlus, Phone, Mail, Calendar, CheckCircle2, XCircle, AlertCircle, ExternalLink, Check, Trash2 } from 'lucide-react';
import { ClientCadastro, LanguagePack } from '../types';

interface CadastroViewProps {
  lang: LanguagePack;
  cadastros: ClientCadastro[];
  onAddCadastro: (cadastro: ClientCadastro) => void;
  onUpdateStatus: (id: string, newStatus: 'APROVADO' | 'REJEITADO' | 'PENDENTE') => void;
  onDeleteCadastro: (id: string) => void;
  onToggleContacted: (id: string) => void;
  currentRole: string;
}

export default function CadastroView({
  lang,
  cadastros,
  onAddCadastro,
  onUpdateStatus,
  onDeleteCadastro,
  onToggleContacted,
  currentRole
}: CadastroViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('TODOS');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Client Form
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newCad: ClientCadastro = {
      id: `CAD-${Math.floor(100 + Math.random() * 900)}`,
      name: newName,
      phone: newPhone || '(11) 99999-0000',
      email: newEmail || 'cliente@exemplo.com',
      signupDate: new Date().toISOString().split('T')[0],
      status: 'PENDENTE',
      contacted: false
    };

    onAddCadastro(newCad);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setShowAddModal(false);
  };

  const filtered = cadastros.filter(cad => {
    const matchesSearch = cad.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cad.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cad.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'TODOS' || cad.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-[#121214] border border-[#27272a] rounded-2xl p-6 shadow-sm text-[#e4e4e7]">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-[#27272a] pb-5 mb-5">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <span>{lang.cadastros}</span>
            <span className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono py-1 px-2.5 rounded-full font-medium">
              CR-9543
            </span>
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-[#a1a1aa]">Ambiente de Operações Homologadas:</span>
            <a 
              href="https://env-sisteam.com/env-systemPro/menus/env_digital_gerencia_cadastros.php" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1 hover:underline cursor-pointer"
            >
              Link do Sistema Externo <ExternalLink className="w-3" />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="flex rounded-xl bg-[#1a1a1d] border border-[#27272a] p-1">
            {['TODOS', 'PENDENTE', 'APROVADO', 'REJEITADO'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                id={`btn-filter-st-${st.toLowerCase()}`}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  statusFilter === st 
                    ? 'bg-indigo-500 text-white shadow-sm font-bold' 
                    : 'text-[#71717a] hover:text-[#e4e4e7]'
                }`}
              >
                {st === 'TODOS' ? 'Todos' : st}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            id="btn-open-add-dialog"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-sm ml-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Adicionar Cadastro</span>
          </button>
        </div>
      </div>

      {/* Advanced Search inside Cadastro list */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#71717a]" />
        <input
          type="text"
          placeholder="Buscar cadastro por nome, e-mail ou telefone celular..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-sm pl-10 pr-4 py-2.5 bg-[#1a1a1d] border border-[#27272a] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-[#e4e4e7] outline-none transition-all placeholder-[#71717a]"
        />
      </div>

      {/* Main List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#27272a] text-xs font-mono text-[#71717a] select-none">
              <th className="py-3 px-4 font-normal">Identificador</th>
              <th className="py-3 px-4 font-normal">Nome do Cliente</th>
              <th className="py-3 px-4 font-normal">Contato</th>
              <th className="py-3 px-4 font-normal">Data Registro</th>
              <th className="py-3 px-4 font-normal text-center">Contato?</th>
              <th className="py-3 px-4 font-normal text-right">Status Regulatório</th>
              <th className="py-3 px-4 font-normal text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272a] text-sm text-[#e4e4e7]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-[#71717a] select-none">
                  Nenhum cadastro correspondente encontrado.
                </td>
              </tr>
            ) : (
              filtered.map((cad) => (
                <tr key={cad.id} className="hover:bg-[#1a1a1d]/40 transition-colors">
                  <td className="py-4 px-4 font-mono text-xs font-bold text-[#71717a]">
                    {cad.id}
                  </td>
                  <td className="py-4 px-4 font-medium text-white">
                    {cad.name}
                  </td>
                  <td className="py-4 px-4 text-xs">
                    <div className="flex flex-col gap-1.5">
                      <span className="flex items-center gap-1 text-[#a1a1aa]">
                        <Phone className="w-3 h-3 text-[#71717a]" /> {cad.phone}
                      </span>
                      <span className="flex items-center gap-1 text-[#71717a]">
                        <Mail className="w-3 h-3 text-[#71717a]" /> {cad.email}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs font-mono text-[#71717a]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#71717a]" />
                      {cad.signupDate}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => onToggleContacted(cad.id)}
                      className={`inline-flex items-center justify-center p-1.5 rounded-lg border cursor-pointer transition-colors ${
                        cad.contacted
                          ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                          : 'bg-[#1a1a1d] border border-[#27272a] text-[#71717a]'
                      }`}
                      title={cad.contacted ? "Contatado" : "Marcar como Contatado"}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      cad.status === 'APROVADO'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : cad.status === 'REJEITADO'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {cad.status === 'APROVADO' && <CheckCircle2 className="w-3" />}
                      {cad.status === 'REJEITADO' && <XCircle className="w-3" />}
                      {cad.status === 'PENDENTE' && <AlertCircle className="w-3" />}
                      {cad.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {currentRole === 'OPERADOR' ? (
                        <span className="text-[10px] text-[#71717a] font-mono">Somente Leitura</span>
                      ) : (
                        <>
                          <button
                            onClick={() => onUpdateStatus(cad.id, 'APROVADO')}
                            className="px-2 py-1 text-[10px] font-bold text-emerald-400 hover:bg-emerald-500/10 rounded cursor-pointer transition-all"
                            title="Aprovar"
                          >
                            Aprovar
                          </button>
                          <button
                            onClick={() => onUpdateStatus(cad.id, 'REJEITADO')}
                            className="px-2 py-1 text-[10px] font-bold text-red-400 hover:bg-red-505/10 rounded cursor-pointer transition-all"
                            title="Rejeitar"
                          >
                            Rejeitar
                          </button>
                          <button
                            onClick={() => onDeleteCadastro(cad.id)}
                            className="p-1 text-[#71717a] hover:text-red-400 rounded cursor-pointer transition-all"
                            title="Excluir"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#121214] rounded-2xl border border-[#27272a] p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-display font-semibold text-white mb-4">
              Registrar Novo Cliente
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[#a1a1aa] block mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Amanda Linhares"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-sm p-3 bg-[#09090b] border border-[#27272a] rounded-xl text-[#e4e4e7] focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#a1a1aa] block mb-1">
                  Telefone Celular
                </label>
                <input
                  type="text"
                  placeholder="(11) 98765-4321"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full text-sm p-3 bg-[#09090b] border border-[#27272a] rounded-xl text-[#e4e4e7] focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#a1a1aa] block mb-1">
                  E-mail Principal
                </label>
                <input
                  type="email"
                  placeholder="amanda@exemplo.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full text-sm p-3 bg-[#09090b] border border-[#27272a] rounded-xl text-[#e4e4e7] focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#a1a1aa] hover:bg-[#1a1a1d] rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl shadow-sm cursor-pointer font-bold transition-all"
                >
                  Salvar Cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
