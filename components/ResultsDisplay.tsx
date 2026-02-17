
import React, { useState } from 'react';
import { CalculationResults } from '../types.ts';

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
      <div className="bg-white p-6 rounded-2xl shadow-sm border-l-[6px] border-[#00008B] border border-slate-200">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Taxa de Frequência (TF)</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-5xl font-black text-[#00008B] tracking-tighter">{results.tf.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
          <span className="text-slate-500 font-bold text-xs uppercase">p/ milhão h/h</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border-l-[6px] border-[#00008B] border border-slate-200">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Taxa de Gravidade (TG)</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-5xl font-black text-[#00008B] tracking-tighter">{Math.floor(results.tg)}</h3>
          <span className="text-slate-500 font-bold text-xs uppercase">unidades</span>
        </div>
      </div>

      <div className="bg-[#00008B] p-5 rounded-2xl shadow-lg space-y-3">
        <span className="text-[10px] font-black uppercase text-blue-200 tracking-widest block px-1">Arquivamento Corporativo • {formattedMonth}</span>
        <input 
          type="text" 
          placeholder="Etiqueta identificadora..." 
          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm text-[#00008B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all font-black shadow-inner"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <button 
          onClick={handleSaveClick}
          disabled={results.effectiveHHT === 0}
          className="w-full bg-white text-black py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
          Salvar no Histórico
        </button>
      </div>
    </div>
  );
};
