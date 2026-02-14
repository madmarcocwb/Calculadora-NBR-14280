
export enum HHTInputMode {
  MANUAL = 'MANUAL',
  CALCULATED = 'CALCULATED'
}

export interface CalculationInputs {
  referenceMonth: string;
  hhtMode: HHTInputMode;
  manualHHT: number;
  numCollaborators: number;
  daysWorked: number;
  dailyShift: number;
  numAccidents: number;
  lostDays: number;
  debitedDays: number;
  goalTF: number;
  goalTG: number;
}

export interface CalculationResults {
  tf: number;
  tg: number;
  effectiveHHT: number;
}

export interface CalculationRecord {
  id: string;
  date: string;
  label?: string;
  inputs: CalculationInputs;
  results: CalculationResults;
}
