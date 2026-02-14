
import React, { useState } from 'react';
import { CalculationResults } from '../types';

interface Props {
  results: CalculationResults;
  onSave: (label: string) => void;
  referenceMonth: string;
}

export const ResultsDisplay: React.FC<Props> = ({ results, onSave, referenceMonth }) => {
  const [label, setLabel] = useState('');

  const handleSaveClick = () => {
    onSave(label);
    setLabel('');
  };

  const formattedMonth = referenceMonth.split('-').reverse().join('/');

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* TF Result */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border-l-[6px] border-[#00008B] border border-slate-200 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Taxa de Frequência (TF)</p>
          <div className="p-2 bg-blue-50 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00008B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-5xl font-black text-[#00008B] tracking-tighter">{results.tf.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <span className="text-slate-500 font-bold text-sm uppercase tracking-tighter">p/ milhão h/h</span>
        </div>
      </div>

      {/* TG Result */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border-l-[6px] border-[#00008B] border border-slate-200 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Taxa de Gravidade (TG)</p>
          <div className="p-2 bg-blue-50 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00008B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-5xl font-black text-[#00008B] tracking-tighter">{Math.floor(results.tg)}</h3>
          <span className="text-slate-500 font-bold text-sm uppercase tracking-tighter">unidades</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-[#00008B] p-5 rounded-2xl shadow-lg flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-black uppercase text-blue-200 tracking-widest">Controle de Histórico • {formattedMonth}</span>
        </div>
        <input 
          type="text" 
          placeholder="Etiqueta identificadora..." 
          className="bg-white border border-slate-200 rounded-xl p-3 text-sm text-[#00008B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all font-bold"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <button 
          onClick={handleSaveClick}
          disabled={results.effectiveHHT === 0}
          className="bg-white text-black py-3 rounded-xl font-black uppercase text-xs tracking-[0.1em] hover:bg-slate-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Arquivar Indicadores
        </button>
      </div>
    </div>
  );
};
