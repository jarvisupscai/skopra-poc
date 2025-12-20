import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import {
  INITIAL_PARTICIPANT,
  createInitialResponses as createInitialPmfResponses,
  createInitialPcfResponses,
  createInitialCmfResponses,
  createInitialMmfResponses,
} from '../constants';
import type {
  FitParticipant,
  FitValidatorResponses,
  PcfResponses,
  CmfResponses,
  MmfResponses,
} from '../types';

const STORAGE_KEY = 'fit-validator-state';

interface FitValidatorContextValue {
  participant: FitParticipant | null;
  setParticipant: Dispatch<SetStateAction<FitParticipant | null>>;
  pmfResponses: FitValidatorResponses;
  setPmfResponses: Dispatch<SetStateAction<FitValidatorResponses>>;
  pcfResponses: PcfResponses;
  setPcfResponses: Dispatch<SetStateAction<PcfResponses>>;
  cmfResponses: CmfResponses;
  setCmfResponses: Dispatch<SetStateAction<CmfResponses>>;
  mmfResponses: MmfResponses;
  setMmfResponses: Dispatch<SetStateAction<MmfResponses>>;
  resetAll: () => void;
}

const FitValidatorContext = createContext<FitValidatorContextValue | undefined>(
  undefined,
);

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as {
      participant: FitParticipant | null;
      pmfResponses: FitValidatorResponses;
      pcfResponses: PcfResponses;
      cmfResponses: CmfResponses;
      mmfResponses: MmfResponses;
    };
  } catch (error) {
    console.warn('Failed to parse fit validator storage', error);
    return null;
  }
};

export const FitValidatorProvider = ({ children }: { children: ReactNode }) => {
  const storedState = loadFromStorage();
  const [participant, setParticipant] = useState<FitParticipant | null>(
    storedState?.participant ?? null,
  );
  const [pmfResponses, setPmfResponses] = useState<FitValidatorResponses>(
    storedState?.pmfResponses ?? createInitialPmfResponses(),
  );
  const [pcfResponses, setPcfResponses] = useState<PcfResponses>(
    storedState?.pcfResponses ?? createInitialPcfResponses(),
  );
  const [cmfResponses, setCmfResponses] = useState<CmfResponses>(
    storedState?.cmfResponses ?? createInitialCmfResponses(),
  );
  const [mmfResponses, setMmfResponses] = useState<MmfResponses>(
    storedState?.mmfResponses ?? createInitialMmfResponses(),
  );

  useEffect(() => {
    const payload = JSON.stringify({
      participant,
      pmfResponses,
      pcfResponses,
      cmfResponses,
      mmfResponses,
    });
    localStorage.setItem(STORAGE_KEY, payload);
  }, [participant, pmfResponses, pcfResponses, cmfResponses, mmfResponses]);

  const resetAll = () => {
    setParticipant(INITIAL_PARTICIPANT);
    setPmfResponses(createInitialPmfResponses());
    setPcfResponses(createInitialPcfResponses());
    setCmfResponses(createInitialCmfResponses());
    setMmfResponses(createInitialMmfResponses());
  };

  const value = useMemo(
    () => ({
      participant,
      setParticipant,
      pmfResponses,
      setPmfResponses,
      pcfResponses,
      setPcfResponses,
      cmfResponses,
      setCmfResponses,
      mmfResponses,
      setMmfResponses,
      resetAll,
    }),
    [participant, pmfResponses, pcfResponses, cmfResponses, mmfResponses],
  );

  return (
    <FitValidatorContext.Provider value={value}>
      {children}
    </FitValidatorContext.Provider>
  );
};

export const useFitValidator = () => {
  const context = useContext(FitValidatorContext);
  if (!context) {
    throw new Error('useFitValidator must be used within FitValidatorProvider');
  }
  return context;
};
