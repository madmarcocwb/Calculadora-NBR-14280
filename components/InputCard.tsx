
import React from 'react';
import { HHTInputMode, CalculationInputs } from '../types';

interface Props {
  inputs: CalculationInputs;
  onInputChange: (name: keyof CalculationInputs, value: any) => void;
}

export const InputCard: React.FC<Props> = ({ inputs, onInputChange }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      {/* Reference Month Selection */}
      <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Mês de Referência</label>
           <input 
            type="month" 
            value={inputs.referenceMonth}
            onChange={(e) => onInputChange('referenceMonth', e.target.value)}
            className="bg-transparent text-[#00008B] font-bold text-lg focus:outline-none focus:ring-0 cursor-pointer"
           />
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] font-black uppercase text-slate-300 tracking-tighter">Cálculo Ativo</p>
          <p className="text-sm font-bold text-[#00008B]">{inputs.referenceMonth.split('-').reverse().join('/')}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Horas Homem de Exposição (HHT)
        </h2>
        
        <div className="inline-flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => onInputChange('hhtMode', HHTInputMode.MANUAL)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              inputs.hhtMode === HHTInputMode.MANUAL 
                ? 'bg-white shadow-sm text-[#00008B]' 
                : 'text-slate-500 hover:text-[#00008B]'
            }`}
          >
            Manual
          </button>
          <button
            onClick={() => onInputChange('hhtMode', HHTInputMode.CALCULATED)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              inputs.hhtMode === HHTInputMode.CALCULATED 
                ? 'bg-white shadow-sm text-[#00008B]' 
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
            <label className="block text-sm font-semibold mb-1 uppercase tracking-wider text-slate-500">Total HHT Direto</label>
            <input 
              type="number" 
              value={inputs.manualHHT} 
              onChange={(e) => onInputChange('manualHHT', Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-[#00008B] focus:outline-none transition-all text-xl font-bold"
              placeholder="Digite o HHT acumulado..."
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 uppercase tracking-wider text-slate-500">Nº Colaboradores</label>
              <input 
                type="number" 
                value={inputs.numCollaborators} 
                onChange={(e) => onInputChange('numCollaborators', Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-[#00008B] focus:outline-none transition-all text-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 uppercase tracking-wider text-slate-500">Dias Trab./Mês</label>
              <input 
                type="number" 
                value={inputs.daysWorked} 
                onChange={(e) => onInputChange('daysWorked', Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-[#00008B] focus:outline-none transition-all text-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 uppercase tracking-wider text-slate-500">Jornada Diária (h)</label>
              <input 
                type="number" 
                value={inputs.dailyShift} 
                onChange={(e) => onInputChange('dailyShift', Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-[#00008B] focus:outline-none transition-all text-xl font-bold"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
