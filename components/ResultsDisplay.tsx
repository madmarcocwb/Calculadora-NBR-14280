
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
      <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#00008B] border border-slate-200">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Taxa de Frequência (TF)</p>
          <div className="p-1.5 bg-blue-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00008B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-4xl font-extrabold text-[#00008B]">{results.tf.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <span className="text-slate-400 font-semibold text-sm">por milhão h/h</span>
        </div>
      </div>

      {/* TG Result */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#00008B] border border-slate-200">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Taxa de Gravidade (TG)</p>
          <div className="p-1.5 bg-blue-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00008B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-4xl font-extrabold text-[#00008B]">{Math.floor(results.tg)}</h3>
          <span className="text-slate-400 font-semibold text-sm">inteiro arredondado</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-3">
        <div className="flex items-center gap-2 px-1">
          <span className="text-[10px] font-black uppercase text-slate-400">Referência:</span>
          <span className="text-xs font-bold text-[#00008B]">{formattedMonth}</span>
        </div>
        <input 
          type="text" 
          placeholder="Etiqueta opcional (ex: Unidade Sul)" 
          className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00008B]"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <button 
          onClick={handleSaveClick}
          disabled={results.effectiveHHT === 0}
          className="bg-[#00008B] text-white py-2 rounded-lg font-bold hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Salvar no Histórico
        </button>
      </div>
    </div>
  );
};
