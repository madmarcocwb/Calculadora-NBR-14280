
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CalculationResults } from '../types';

interface Props {
  results: CalculationResults;
}

export const VisualizationCard: React.FC<Props> = ({ results }) => {
  const data = [
    { name: 'TF', value: results.tf },
    { name: 'TG', value: results.tg },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-slate-200">
          <p className="text-xs font-bold text-slate-400 mb-1">{payload[0].payload.name}</p>
          <p className="text-lg font-black text-[#00008B]">{payload[0].value.toLocaleString('pt-BR')}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
        Análise Comparativa Visual
      </h2>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#00008B', fontWeight: 600 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={50}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#00008B' : '#1e3a8a'} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div className="p-3 bg-slate-50 rounded-lg">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Desempenho Freq.</p>
          <div className={`text-xs font-bold mt-1 ${results.tf > 20 ? 'text-red-500' : 'text-emerald-500'}`}>
            {results.tf > 20 ? 'Atenção' : 'Dentro do Esperado'}
          </div>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Impacto Grav.</p>
          <div className={`text-xs font-bold mt-1 ${results.tg > 500 ? 'text-red-500' : 'text-emerald-500'}`}>
            {results.tg > 500 ? 'Alta Gravidade' : 'Baixa Severidade'}
          </div>
        </div>
      </div>
    </div>
  );
};
