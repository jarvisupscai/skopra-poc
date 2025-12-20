import type { FitParticipant } from './types';

export type ValidationSectionId = 'pmf' | 'pcf' | 'cmf' | 'mmf';

const simulateNetworkLatency = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
};

export const saveParticipant = async (participant: FitParticipant) => {
  await simulateNetworkLatency();
  return participant;
};

export const saveSection = async (
  section: ValidationSectionId,
  payload: unknown,
) => {
  await simulateNetworkLatency();
  return { section, payload };
};
