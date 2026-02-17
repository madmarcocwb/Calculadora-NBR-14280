
import React, { useState, useMemo, useEffect } from 'react';
import { HHTInputMode, CalculationInputs, CalculationResults, CalculationRecord } from './types.ts';
import { Header } from './components/Header.tsx';
import { InputCard } from './components/InputCard.tsx';
import { ResultsDisplay } from './components/ResultsDisplay.tsx';
import { VisualizationCard } from './components/VisualizationCard.tsx';
import { HistoryList } from './components/HistoryList.tsx';
import { ComparisonView } from './components/ComparisonView.tsx';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationInputs>({
    referenceMonth: new Date().toISOString().slice(0, 7),
    hhtMode: HHTInputMode.MANUAL,
    manualHHT: 0,
    numCollaborators: 0,
    daysWorked: 0,
    dailyShift: 0,
    numAccidents: 0,
    lostDays: 0,
    debitedDays: 0,
    goalTF: 0,
    goalTG: 0,
  });

  const [history, setHistory] = useState<CalculationRecord[]>(() => {
    const saved = localStorage.getItem('nbr14280_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    localStorage.setItem('nbr14280_history', JSON.stringify(history));
  }, [history]);

  const handleInputChange = (name: keyof CalculationInputs, value: any) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const results = useMemo((): CalculationResults => {
    let effectiveHHT = 0;
    if (inputs.hhtMode === HHTInputMode.MANUAL) {
      effectiveHHT = inputs.manualHHT;
    } else {
      effectiveHHT = inputs.numCollaborators * inputs.daysWorked * inputs.dailyShift;
    }

    if (effectiveHHT === 0) return { tf: 0, tg: 0, effectiveHHT: 0 };

    const tf = (inputs.numAccidents * 1000000) / effectiveHHT;
    const tg = ((inputs.lostDays + inputs.debitedDays) * 1000000) / effectiveHHT;

    return { tf: Number(tf.toFixed(2)), tg: Math.round(tg), effectiveHHT };
  }, [inputs]);

  const handleSave = (label?: string) => {
    const [year, month] = inputs.referenceMonth.split('-');
    const monthYearLabel = `${month}/${year}`;
    const newRecord: CalculationRecord = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      label: label || monthYearLabel,
      inputs: { ...inputs },
      results: { ...results }
    };
    setHistory([newRecord, ...history]);
  };

  const handleDelete = (id: string) => {
    setHistory(history.filter(item => item.id !== id));
    setSelectedIds(selectedIds.filter(sid => sid !== id));
  };

  const handleLoad = (record: CalculationRecord) => {
    setInputs(record.inputs);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : (prev.length < 3 ? [...prev, id] : prev)
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#00008B] pb-12">
      <Header />
      <main className="container mx-auto px-4 mt-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
          <div className="lg:col-span-7 space-y-6">
            <InputCard inputs={inputs} onInputChange={handleInputChange} />
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">Parâmetros de Acidentalidade</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['numAccidents', 'lostDays', 'debitedDays'].map((field) => (
                  <div key={field}>
                    <label className="block text-xs font-black mb-1 uppercase tracking-widest text-slate-400">
                      {field === 'numAccidents' ? 'Nº Acidentes' : field === 'lostDays' ? 'Dias Perdidos' : 'Dias Debitados'}
                    </label>
                    <input 
                      type="number" 
                      value={(inputs as any)[field]} 
                      onChange={(e) => handleInputChange(field as any, Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-[#00008B] focus:outline-none font-bold text-xl"
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                {['goalTF', 'goalTG'].map(goal => (
                  <div key={goal}>
                    <label className="block text-xs font-black mb-1 uppercase tracking-widest text-slate-400">
                      {goal === 'goalTF' ? 'Meta Frequência' : 'Meta Gravidade'}
                    </label>
                    <input 
                      type="number" 
                      value={(inputs as any)[goal]} 
                      onChange={(e) => handleInputChange(goal as any, Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 border-dashed font-bold text-xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ResultsDisplay results={results} onSave={handleSave} referenceMonth={inputs.referenceMonth} />
          </div>
        </div>
        <VisualizationCard results={results} goals={{ tf: inputs.goalTF, tg: inputs.goalTG }} referenceMonth={inputs.referenceMonth} />
        <HistoryList 
          history={history} 
          onDelete={handleDelete} 
          onLoad={handleLoad} 
          onSelect={toggleSelection}
          selectedIds={selectedIds}
          onCompare={() => setShowComparison(true)}
        />
      </main>
      {showComparison && <ComparisonView records={history.filter(h => selectedIds.includes(h.id))} onClose={() => setShowComparison(false)} />}
    </div>
  );
};

export default App;
