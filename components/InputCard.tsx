
import React from 'react';
import { HHTInputMode, CalculationInputs } from '../types';

interface Props {
  inputs: CalculationInputs;
  onInputChange: (name: keyof CalculationInputs, value: any) => void;
}

export const InputCard: React.FC<Props> = ({ inputs, onInputChange }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
      {/* Reference Month Selection */}
      <div className="mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Período de Referência</label>
           <div className="relative group">
             <input 
              type="month" 
              value={inputs.referenceMonth}
              onChange={(e) => onInputChange('referenceMonth', e.target.value)}
              className="bg-white border border-slate-200 text-[#00008B] font-black text-xl p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00008B] cursor-pointer transition-all shadow-sm"
             />
           </div>
        </div>
        <div className="text-right hidden md:block border-l border-slate-200 pl-6">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Status de Cálculo</p>
          <p className="text-xl font-black text-[#00008B] leading-none uppercase">
            ATIVO ({inputs.referenceMonth.split('-').reverse().join('/')})
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-black flex items-center gap-3 text-[#00008B] tracking-tight">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#00008B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Horas Homem Exposição (HHT)
        </h2>
        
        <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => onInputChange('hhtMode', HHTInputMode.MANUAL)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              inputs.hhtMode === HHTInputMode.MANUAL 
                ? 'bg-[#00008B] shadow-md text-white' 
                : 'text-slate-500 hover:text-[#00008B]'
            }`}
          >
            Manual
          </button>
          <button
            onClick={() => onInputChange('hhtMode', HHTInputMode.CALCULATED)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              inputs.hhtMode === HHTInputMode.CALCULATED 
                ? 'bg-[#00008B] shadow-md text-white' 
                : 'text-slate-500 hover:text-[#00008B]'
            }`}
          >
            Composto
          </button>
        </div>
      </div>

      <div className="transition-all duration-300">
        {inputs.hhtMode === HHTInputMode.MANUAL ? (
          <div>
            <label className="block text-[10px] font-black mb-2 uppercase tracking-widest text-slate-400">Inserção Manual de Dados</label>
            <input 
              type="number" 
              value={inputs.manualHHT} 
              onChange={(e) => onInputChange('manualHHT', Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all text-2xl font-black text-[#00008B]"
              placeholder="0"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-black mb-2 uppercase tracking-widest text-slate-400">Total Colaboradores</label>
              <input 
                type="number" 
                value={inputs.numCollaborators} 
                onChange={(e) => onInputChange('numCollaborators', Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all text-2xl font-black text-[#00008B]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black mb-2 uppercase tracking-widest text-slate-400">Dias de Operação</label>
              <input 
                type="number" 
                value={inputs.daysWorked} 
                onChange={(e) => onInputChange('daysWorked', Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all text-2xl font-black text-[#00008B]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black mb-2 uppercase tracking-widest text-slate-400">Jornada Diária (h)</label>
              <input 
                type="number" 
                value={inputs.dailyShift} 
                onChange={(e) => onInputChange('dailyShift', Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all text-2xl font-black text-[#00008B]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
