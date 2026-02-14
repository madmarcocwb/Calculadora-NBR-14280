
import React from 'react';
import { CalculationRecord } from '../types';

interface Props {
  records: CalculationRecord[];
  onClose: () => void;
}

export const ComparisonView: React.FC<Props> = ({ records, onClose }) => {
  if (records.length === 0) return null;

  const renderDelta = (current: number, base: number) => {
    if (base === 0) return null;
    const diff = ((current - base) / base) * 100;
    const isPos = diff > 0;
    return (
      <span className={`text-[10px] font-bold ${isPos ? 'text-red-500' : 'text-emerald-500'}`}>
        {isPos ? '↑' : '↓'} {Math.abs(diff).toFixed(1)}%
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-[#00008B] p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black">Comparativo de Indicadores</h2>
            <p className="text-blue-200 text-sm font-medium">Análise detalhada entre períodos selecionados</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="p-4 bg-slate-50 rounded-xl text-xs font-black text-slate-400 uppercase tracking-widest">Métrica</th>
                {records.map(r => (
                  <th key={r.id} className="p-4 bg-[#00008B] text-white rounded-xl text-center">
                    <div className="text-xs font-bold opacity-80">{r.inputs.referenceMonth.split('-').reverse().join('/')}</div>
                    <div className="text-sm font-black truncate max-w-[120px] mx-auto">{r.label}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[#00008B]">
              <tr className="group">
                <td className="p-4 font-bold border-b border-slate-100">HHT Total</td>
                {records.map(r => (
                  <td key={r.id} className="p-4 text-center border-b border-slate-100 font-medium">
                    {r.results.effectiveHHT.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold border-b border-slate-100">Acidentes (N)</td>
                {records.map(r => (
                  <td key={r.id} className="p-4 text-center border-b border-slate-100 font-medium">
                    {r.inputs.numAccidents}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold border-b border-slate-100">Dias Perdidos (Dp)</td>
                {records.map(r => (
                  <td key={r.id} className="p-4 text-center border-b border-slate-100 font-medium">
                    {r.inputs.lostDays}
                  </td>
                ))}
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-4 font-black uppercase text-xs tracking-widest">Taxa Freq. (TF)</td>
                {records.map((r, idx) => (
                  <td key={r.id} className="p-4 text-center">
                    <div className="text-xl font-black">{r.results.tf.toFixed(2)}</div>
                    {idx > 0 && renderDelta(r.results.tf, records[idx-1].results.tf)}
                  </td>
                ))}
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-4 font-black uppercase text-xs tracking-widest">Taxa Grav. (TG)</td>
                {records.map((r, idx) => (
                  <td key={r.id} className="p-4 text-center">
                    <div className="text-xl font-black">{r.results.tg}</div>
                    {idx > 0 && renderDelta(r.results.tg, records[idx-1].results.tg)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 p-6 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-2 bg-slate-200 text-[#00008B] font-bold rounded-xl hover:bg-slate-300 transition-colors"
          >
            Fechar Comparativo
          </button>
        </div>
      </div>
    </div>
  );
};
