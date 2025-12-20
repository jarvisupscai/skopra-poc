export type PcfStepId =
  | 'acv'
  | 'persona'
  | 'problemUrgency'
  | 'observableTrigger';

export interface PcfStepDefinition {
  id: PcfStepId;
  label: string;
}

export const PCF_STEPS: PcfStepDefinition[] = [
  { id: 'acv', label: 'ACV' },
  { id: 'persona', label: 'Persona Identifiability' },
  { id: 'problemUrgency', label: 'Problem Urgency' },
  { id: 'observableTrigger', label: 'Observable Trigger' },
];
