import { PMF_STEPS } from './constants';
import { PCF_STEPS } from './pcf';

export const CMF_STEPS = [
  { id: 'grossMargin', label: 'Gross Margin vs Sales Cost' },
  { id: 'salesCycle', label: 'Sales Cycle Length' },
  { id: 'winRate', label: 'Win Rate' },
] as const;

export const MMF_STEPS = [
  { id: 'marketAnalysis', label: 'Market Analysis' },
] as const;

export const VALIDATION_SECTIONS = [
  { id: 'pmf', label: 'PMF', steps: PMF_STEPS },
  { id: 'pcf', label: 'PCF', steps: PCF_STEPS },
  { id: 'cmf', label: 'CMF', steps: CMF_STEPS },
  { id: 'mmf', label: 'MMF', steps: MMF_STEPS },
] as const;

export type ValidationSectionId = (typeof VALIDATION_SECTIONS)[number]['id'];
