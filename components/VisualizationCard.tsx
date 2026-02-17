
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList } from 'recharts';
import { CalculationResults } from '../types.ts';

interface Props {
  results: CalculationResults;
  goals: { tf: number; tg: number; };
  referenceMonth: string;
}

export const VisualizationCard: React.FC<Props> = ({ results, goals, referenceMonth }) => {
  const data = [
    { name: 'TF (Frequência)', Real: results.tf, Meta: goals.tf },
    { name: 'TG (Gravidade)', Real: results.tg, Meta: goals.tg },
  ];

  const formattedMonth = referenceMonth.split('-').reverse().join('/');

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-[#00008B] tracking-tight flex items-center gap-3">
          Análise de Desempenho
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-blue-50 text-[#00008B] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
            {formattedMonth}
          </span>
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Metas vs. Resultados Reais</p>
        </div>
      </div>
      
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 60, left: 120, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#00008B', fontWeight: 900, fontSize: 13 }} width={120} />
            <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
            <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '20px', fontWeight: '900', fontSize: '11px', color: '#00008B' }} />
            <Bar name="Realizado" dataKey="Real" fill="#00008B" radius={[0, 8, 8, 0]} barSize={40}>
              <LabelList dataKey="Real" position="right" formatter={(v: number) => v.toLocaleString('pt-BR')} style={{ fill: '#00008B', fontWeight: '900', fontSize: '12px' }} />
            </Bar>
            <Bar name="Meta" dataKey="Meta" fill="#cbd5e1" radius={[0, 8, 8, 0]} barSize={40}>
              <LabelList dataKey="Meta" position="right" formatter={(v: number) => v.toLocaleString('pt-BR')} style={{ fill: '#64748b', fontWeight: '900', fontSize: '12px' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-50">
        {[ {label: 'TF', val: results.tf, goal: goals.tf}, {label: 'TG', val: results.tg, goal: goals.tg} ].map((item) => (
          <div key={item.label} className={`flex items-center gap-5 p-5 rounded-2xl border ${item.goal > 0 && item.val > item.goal ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
            <div className={`p-3 rounded-xl shadow-sm bg-white ${item.goal > 0 && item.val > item.goal ? 'text-red-600' : 'text-emerald-600'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status {item.label}</p>
              <p className={`text-xl font-black ${item.goal > 0 && item.val > item.goal ? 'text-red-600' : 'text-emerald-600'}`}>
                {item.goal > 0 ? (item.val <= item.goal ? 'DENTRO DA META' : 'META EXCEDIDA') : 'SEM META'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
