
import React from 'react';
import { CalculationRecord } from '../types';

interface Props {
  history: CalculationRecord[];
  onDelete: (id: string) => void;
  onLoad: (record: CalculationRecord) => void;
  onSelect: (id: string) => void;
  selectedIds: string[];
  onCompare: () => void;
}

export const HistoryList: React.FC<Props> = ({ history, onDelete, onLoad, onSelect, selectedIds, onCompare }) => {
  if (history.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Histórico de Cálculos
        </h2>
        {selectedIds.length > 1 && (
          <button 
            onClick={onCompare}
            className="bg-[#00008B] text-white px-6 py-2 rounded-full font-bold text-sm shadow-md hover:scale-105 transition-transform"
          >
            Comparar Selecionados ({selectedIds.length})
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="py-4 px-2 w-12 text-center">Sel.</th>
              <th className="py-4 px-4 text-xs font-black text-slate-400 uppercase tracking-widest">Referência / Etiqueta</th>
              <th className="py-4 px-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">TF</th>
              <th className="py-4 px-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">TG</th>
              <th className="py-4 px-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record) => {
              const refMonth = record.inputs.referenceMonth ? record.inputs.referenceMonth.split('-').reverse().join('/') : '-';
              return (
                <tr key={record.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(record.id)}
                      onChange={() => onSelect(record.id)}
                      disabled={!selectedIds.includes(record.id) && selectedIds.length >= 3}
                      className="w-4 h-4 rounded text-[#00008B] focus:ring-[#00008B]"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-100 text-[#00008B] px-2 py-0.5 rounded text-[10px] font-black">{refMonth}</span>
                      <span className="font-bold">{record.label}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Criado em {new Date(record.date).toLocaleDateString('pt-BR')}</div>
                  </td>
                  <td className="py-4 px-4 text-right font-black text-[#00008B]">
                    {record.results.tf.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-right font-black text-[#00008B]">
                    {record.results.tg}
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button 
                      onClick={() => onLoad(record)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Carregar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onDelete(record.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[10px] text-slate-400 text-center uppercase font-bold tracking-widest">Selecione até 3 itens para comparação</p>
    </div>
  );
};
