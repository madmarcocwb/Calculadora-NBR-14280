
import React, { useState, useMemo, useEffect } from 'react';
import { HHTInputMode, CalculationInputs, CalculationResults, CalculationRecord } from './types';
import { Header } from './components/Header';
import { InputCard } from './components/InputCard';
import { ResultsDisplay } from './components/ResultsDisplay';
import { VisualizationCard } from './components/VisualizationCard';
import { HistoryList } from './components/HistoryList';
import { ComparisonView } from './components/ComparisonView';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationInputs>({
    referenceMonth: new Date().toISOString().slice(0, 7), // YYYY-MM
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

    if (effectiveHHT === 0) {
      return { tf: 0, tg: 0, effectiveHHT: 0 };
    }

    const tf = (inputs.numAccidents * 1000000) / effectiveHHT;
    const tg = ((inputs.lostDays + inputs.debitedDays) * 1000000) / effectiveHHT;

    return { 
      tf: Number(tf.toFixed(2)), 
      tg: Math.round(tg),
      effectiveHHT 
    };
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

  const selectedRecords = history.filter(h => selectedIds.includes(h.id));

  return (
    <div className="min-h-screen bg-slate-50 text-[#00008B] pb-12">
      <div className="no-print">
        <Header />
      </div>
      
      <main className="container mx-auto px-4 mt-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
          {/* Input Section */}
          <div className="lg:col-span-7 space-y-6">
            <InputCard 
              inputs={inputs} 
              onInputChange={handleInputChange} 
            />
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Parâmetros de Acidentalidade
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 uppercase tracking-wider text-slate-500">Nº de Acidentes (N)</label>
                  <input 
                    type="number" 
                    value={inputs.numAccidents} 
                    onChange={(e) => handleInputChange('numAccidents', Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-[#00008B] focus:outline-none transition-all text-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 uppercase tracking-wider text-slate-500">Dias Perdidos (Dp)</label>
                  <input 
                    type="number" 
                    value={inputs.lostDays} 
                    onChange={(e) => handleInputChange('lostDays', Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-[#00008B] focus:outline-none transition-all text-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 uppercase tracking-wider text-slate-500">Dias Debitados (Dd)</label>
                  <input 
                    type="number" 
                    value={inputs.debitedDays} 
                    onChange={(e) => handleInputChange('debitedDays', Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-[#00008B] focus:outline-none transition-all text-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                <div>
                  <label className="block text-sm font-semibold mb-1 uppercase tracking-wider text-slate-500">Meta TF</label>
                  <input 
                    type="number" 
                    value={inputs.goalTF} 
                    onChange={(e) => handleInputChange('goalTF', Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-[#00008B] focus:outline-none transition-all text-xl font-bold border-dashed"
                    placeholder="Meta de Frequência"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 uppercase tracking-wider text-slate-500">Meta TG</label>
                  <input 
                    type="number" 
                    value={inputs.goalTG} 
                    onChange={(e) => handleInputChange('goalTG', Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-[#00008B] focus:outline-none transition-all text-xl font-bold border-dashed"
                    placeholder="Meta de Gravidade"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-5 space-y-6">
            <ResultsDisplay results={results} onSave={handleSave} referenceMonth={inputs.referenceMonth} />
          </div>
        </div>

        {/* Visualization Card - Full Width */}
        <div className="w-full">
          <VisualizationCard results={results} goals={{ tf: inputs.goalTF, tg: inputs.goalTG }} referenceMonth={inputs.referenceMonth} />
        </div>

        {/* History & Comparison Section */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 no-print">
          <HistoryList 
            history={history} 
            onDelete={handleDelete} 
            onLoad={handleLoad} 
            onSelect={toggleSelection}
            selectedIds={selectedIds}
            onCompare={() => setShowComparison(true)}
          />
        </div>
      </main>

      {showComparison && (
        <ComparisonView 
          records={selectedRecords} 
          onClose={() => setShowComparison(false)} 
        />
      )}

      <footer className="mt-12 text-center text-sm text-slate-400 no-print">
        <p>Calculadora NBR 14280 v2.8 Pro • Gestão Avançada de Metas e Dados</p>
      </footer>
    </div>
  );
};

export default App;
