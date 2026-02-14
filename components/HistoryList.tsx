
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
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 text-[#00008B] tracking-tight">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#00008B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Histórico Corporativo
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Registros consolidados de segurança</p>
        </div>
        {selectedIds.length > 1 && (
          <button 
            onClick={onCompare}
            className="bg-[#00008B] text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
          >
            Executar Comparativo ({selectedIds.length})
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-100">
              <th className="py-4 px-2 w-12 text-center text-[#00008B]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </th>
              <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Referência / Identificação</th>
              <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Taxa Freq. (TF)</th>
              <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Taxa Grav. (TG)</th>
              <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record) => {
              const refMonth = record.inputs.referenceMonth ? record.inputs.referenceMonth.split('-').reverse().join('/') : '-';
              return (
                <tr key={record.id} className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors group">
                  <td className="py-5 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(record.id)}
                      onChange={() => onSelect(record.id)}
                      disabled={!selectedIds.includes(record.id) && selectedIds.length >= 3}
                      className="w-5 h-5 rounded-lg text-[#00008B] focus:ring-[#00008B] cursor-pointer border-slate-300"
                    />
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#00008B] text-white px-2.5 py-1 rounded-lg text-[10px] font-black tracking-widest">{refMonth}</span>
                      <span className="font-black text-[#00008B] text-sm tracking-tight">{record.label}</span>
                    </div>
                  </td>
                  <td className="py-5 px-4 text-right font-black text-[#00008B] text-lg">
                    {record.results.tf.toFixed(2)}
                  </td>
                  <td className="py-5 px-4 text-right font-black text-[#00008B] text-lg">
                    {record.results.tg}
                  </td>
                  <td className="py-5 px-4 text-right space-x-1">
                    <button 
                      onClick={() => onLoad(record)}
                      className="p-2.5 text-blue-600 hover:bg-blue-100 rounded-xl transition-all"
                      title="Restaurar Parâmetros"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onDelete(record.id)}
                      className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Excluir"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-center">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] flex items-center gap-2">
          Selecione múltiplos itens para análise cruzada
        </p>
      </div>
    </div>
  );
};
