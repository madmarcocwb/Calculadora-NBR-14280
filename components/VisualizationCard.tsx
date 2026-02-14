
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList } from 'recharts';
import { CalculationResults } from '../types';

interface Props {
  results: CalculationResults;
  goals: {
    tf: number;
    tg: number;
  };
  referenceMonth: string;
}

export const VisualizationCard: React.FC<Props> = ({ results, goals, referenceMonth }) => {
  const data = [
    { 
      name: 'Taxa de Frequência (TF)', 
      Real: results.tf, 
      Meta: goals.tf,
      unit: 'por milhão h/h'
    },
    { 
      name: 'Taxa de Gravidade (TG)', 
      Real: results.tg, 
      Meta: goals.tg,
      unit: 'inteiro arred.'
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-xl rounded-2xl border border-slate-200">
          <p className="text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">{label}</p>
          {payload.map((p: any, i: number) => (
            <div key={i} className="flex items-center justify-between gap-8 mb-1">
              <span className="text-sm font-semibold text-slate-600">{p.name}:</span>
              <span className="text-base font-black" style={{ color: p.color }}>
                {p.value.toLocaleString('pt-BR')}
              </span>
            </div>
          ))}
          <p className="mt-2 pt-2 border-t border-slate-50 text-[10px] text-slate-400 font-bold italic">
            {payload[0].payload.unit}
          </p>
        </div>
      );
    }
    return null;
  };

  const formattedMonth = referenceMonth.split('-').reverse().join('/');

  return (
    <div id="chart-section" className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 transition-all relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#00008B] flex items-center gap-3 tracking-tight">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#00008B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Análise de Desempenho
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-blue-50 text-[#00008B] px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100">
              {formattedMonth}
            </span>
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Monitoramento de metas corporativas</p>
          </div>
        </div>
      </div>
      
      {/* Combined Horizontal Chart */}
      <div className="h-[400px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical" 
            margin={{ top: 20, right: 80, left: 160, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#00008B', fontWeight: 900, fontSize: 14 }}
              width={160}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle" 
              wrapperStyle={{ paddingBottom: '30px', fontWeight: '900', fontSize: '12px', color: '#00008B' }} 
            />
            <Bar 
              name="Realizado" 
              dataKey="Real" 
              fill="#00008B" 
              radius={[0, 10, 10, 0]} 
              barSize={45} 
            >
              <LabelList 
                dataKey="Real" 
                position="right" 
                formatter={(v: number) => v.toLocaleString('pt-BR')} 
                style={{ fill: '#00008B', fontWeight: '900', fontSize: '12px' }} 
              />
            </Bar>
            <Bar 
              name="Meta Estabelecida" 
              dataKey="Meta" 
              fill="#cbd5e1" 
              radius={[0, 10, 10, 0]} 
              barSize={45} 
            >
              <LabelList 
                dataKey="Meta" 
                position="right" 
                formatter={(v: number) => v.toLocaleString('pt-BR')} 
                style={{ fill: '#64748b', fontWeight: '900', fontSize: '12px' }} 
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-50">
        <div className={`flex items-center gap-5 p-6 rounded-2xl border ${goals.tf > 0 && results.tf > goals.tf ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
          <div className={`p-4 rounded-xl shadow-sm ${goals.tf > 0 && results.tf > goals.tf ? 'bg-white text-red-600' : 'bg-white text-emerald-600'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status de Frequência (TF)</p>
            <p className={`text-2xl font-black ${goals.tf > 0 && results.tf > goals.tf ? 'text-red-600' : 'text-emerald-600'}`}>
              {goals.tf > 0 ? (results.tf <= goals.tf ? 'META ATINGIDA' : 'ACIMA DO LIMITE') : 'META NÃO DEFINIDA'}
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-5 p-6 rounded-2xl border ${goals.tg > 0 && results.tg > goals.tg ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
          <div className={`p-4 rounded-xl shadow-sm ${goals.tg > 0 && results.tg > goals.tg ? 'bg-white text-red-600' : 'bg-white text-emerald-600'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status de Gravidade (TG)</p>
            <p className={`text-2xl font-black ${goals.tg > 0 && results.tg > goals.tg ? 'text-red-600' : 'text-emerald-600'}`}>
              {goals.tg > 0 ? (results.tg <= goals.tg ? 'META ATINGIDA' : 'ACIMA DO LIMITE') : 'META NÃO DEFINIDA'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
