export type FitValidatorStepId =
  | 'retention'
  | 'usage'
  | 'revenueQuality'
  | 'sentiment'
  | 'marketPull';

export type ParticipantField = 'firstName' | 'lastName' | 'email' | 'company';

export interface FitParticipant {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
}

export type ParticipantErrors = Record<ParticipantField, string>;

export type RetentionResponses = {
  customerCount: string;
  totalContractValue: string;
  customersStillPaying: string;
  minLtv: string;
};

export type UsageResponses = {
  weeklyActiveCustomers: string;
};

export type RevenueQualityResponses = {
  currentArr: string;
  topTwoCustomersAcv: string;
};

export type SentimentResponses = {
  npsScore: string;
};

export type MarketPullResponses = {
  inboundOpportunities: string;
  comparisonTotal: string;
};

export type FitValidatorResponses = {
  retention: RetentionResponses;
  usage: UsageResponses;
  revenueQuality: RevenueQualityResponses;
  sentiment: SentimentResponses;
  marketPull: MarketPullResponses;
};

export type PcfResponses = {
  acv: {
    currentAverageContractValue: string;
  };
  persona: {
    decisionMakers: string;
    knowsJobTitles: string;
    canFindOnLinkedIn: string;
  };
  problemUrgency: {
    decisionTrigger: string;
    consequences: string;
  };
  observableTrigger: {
    signals: string[];
    otherDetails: string;
  };
};

export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export type RetentionErrors = PartialRecord<keyof RetentionResponses, string>;
export type UsageErrors = PartialRecord<keyof UsageResponses, string>;
export type RevenueQualityErrors = PartialRecord<keyof RevenueQualityResponses, string>;
export type SentimentErrors = PartialRecord<keyof SentimentResponses, string>;
export type MarketPullErrors = PartialRecord<keyof MarketPullResponses, string>;
export type AcvErrors = PartialRecord<'currentAverageContractValue', string>;

export type PcfErrors = {
  acv: AcvErrors;
  persona: PartialRecord<'decisionMakers' | 'knowsJobTitles' | 'canFindOnLinkedIn', string>;
  problemUrgency: PartialRecord<'decisionTrigger' | 'consequences', string>;
  observableTrigger: PartialRecord<'signals' | 'otherDetails', string>;
};

export type CmfResponses = {
  grossMargin: {
    retainedRevenuePercent: string;
    annualSalesCost: string;
  };
  salesCycle: {
    typicalLength: 'lt1' | '1-3' | '3-6' | 'gt6' | '';
  };
  winRate: {
    closesOutOfTen: string;
  };
};

export type CmfErrors = {
  grossMargin: PartialRecord<'retainedRevenuePercent' | 'annualSalesCost', string>;
  salesCycle: PartialRecord<'typicalLength', string>;
  winRate: PartialRecord<'closesOutOfTen', string>;
};

export type MmfScaleChoice = '1' | '2' | '3' | '4' | '5';
export type MmfScaleResponse = '' | MmfScaleChoice;

export type MmfResponses = {
  categoryAwareness: MmfScaleResponse;
  competitiveNarrative: MmfScaleResponse;
  buyerEducationEffort: MmfScaleResponse;
  urgencyDrivers: MmfScaleResponse;
  buyerResponsiveness: MmfScaleResponse;
  marketMaturity: MmfScaleResponse;
};

export type MmfErrors = PartialRecord<keyof MmfResponses, string>;

export interface FitValidatorStepErrors {
  retention: RetentionErrors;
  usage: UsageErrors;
  revenueQuality: RevenueQualityErrors;
  sentiment: SentimentErrors;
  marketPull: MarketPullErrors;
}

export interface FitValidatorErrors {
  participant: ParticipantErrors;
  pmf: FitValidatorStepErrors;
}

export interface FitValidatorStepDefinition {
  id: FitValidatorStepId;
  label: string;
}
