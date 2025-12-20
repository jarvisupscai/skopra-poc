import type {
  FitParticipant,
  FitValidatorResponses,
  FitValidatorStepDefinition,
  FitValidatorStepErrors,
  ParticipantErrors,
  PcfResponses,
  PcfErrors,
  CmfResponses,
  CmfErrors,
  MmfResponses,
  MmfErrors,
  MmfScaleChoice,
} from './types';

export const PMF_STEPS: FitValidatorStepDefinition[] = [
  { id: 'retention', label: 'Retention' },
  { id: 'usage', label: 'Usage' },
  { id: 'revenueQuality', label: 'Revenue Quality' },
  { id: 'sentiment', label: 'Sentiment' },
  { id: 'marketPull', label: 'Market Pull' },
];

export const MARKET_PULL_BASE_TOTAL = 20;

export interface MmfQuestionDefinition {
  id: keyof MmfResponses;
  title: string;
  question: string;
  options: Record<MmfScaleChoice, string>;
}

export const INITIAL_PARTICIPANT: FitParticipant = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
};

export const INITIAL_PARTICIPANT_ERRORS: ParticipantErrors = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
};

export const createInitialResponses = (): FitValidatorResponses => ({
  retention: {
    customerCount: '',
    totalContractValue: '',
    customersStillPaying: '',
    minLtv: '',
  },
  usage: {
    weeklyActiveCustomers: '',
  },
  revenueQuality: {
    currentArr: '',
    topTwoCustomersAcv: '',
  },
  sentiment: {
    npsScore: '30',
  },
  marketPull: {
    inboundOpportunities: '',
    comparisonTotal: MARKET_PULL_BASE_TOTAL.toString(),
  },
});

export const createInitialPcfResponses = (): PcfResponses => ({
  acv: {
    currentAverageContractValue: '',
  },
  persona: {
    decisionMakers: '',
    knowsJobTitles: '',
    canFindOnLinkedIn: '',
  },
  problemUrgency: {
    decisionTrigger: '',
    consequences: '',
  },
  observableTrigger: {
    signals: [],
    otherDetails: '',
  },
});

export const createInitialPcfErrors = (): PcfErrors => ({
  acv: {},
  persona: {},
  problemUrgency: {},
  observableTrigger: {},
});

export const createInitialCmfResponses = (): CmfResponses => ({
  grossMargin: {
    retainedRevenuePercent: '',
    annualSalesCost: '',
  },
  salesCycle: {
    typicalLength: '',
  },
  winRate: {
    closesOutOfTen: '',
  },
});

export const createInitialCmfErrors = (): CmfErrors => ({
  grossMargin: {},
  salesCycle: {},
  winRate: {},
});

export const MMF_QUESTIONS: MmfQuestionDefinition[] = [
  {
    id: 'categoryAwareness',
    title: 'Category Awareness',
    question: 'How aware is your target market of the problem you solve?',
    options: {
      '1': "They don't know this problem exists.",
      '2': 'We often need to convince them it is a problem.',
      '3': "Some understand it, others don't.",
      '4': 'Buyers recognize the problem when we describe it.',
      '5': 'Everyone in our market already feels this pain clearly.',
    },
  },
  {
    id: 'competitiveNarrative',
    title: 'Competitive Narrative',
    question: 'How many other companies are already selling or marketing similar solutions?',
    options: {
      '1': 'None - we are the first movers.',
      '2': 'Very few - 1-2 known players.',
      '3': 'Moderate - 3-5 known players.',
      '4': 'Crowded - several players actively selling.',
      '5': 'Highly competitive and well-defined category.',
    },
  },
  {
    id: 'buyerEducationEffort',
    title: 'Buyer Education Effort',
    question: 'How much explaining do you need to do before a buyer "gets" your product?',
    options: {
      '1': 'We need to educate from scratch.',
      '2': 'We need 2-3 conversations to explain value.',
      '3': 'Buyers understand once we show examples.',
      '4': 'Buyers grasp it quickly with one sentence or demo.',
      '5': 'Buyers immediately understand the value when they see it.',
    },
  },
  {
    id: 'urgencyDrivers',
    title: 'Urgency Drivers (Triggers)',
    question: 'How strong are the external events or triggers that make buyers act quickly?',
    options: {
      '1': 'There are no clear urgency triggers.',
      '2': 'We can think of one or two, but they are rare.',
      '3': 'Triggers exist, but only for some accounts.',
      '4': 'Triggers are common and visible in the market.',
      '5': 'Triggers are strong, frequent, and time-bound (for example, regulation, seasonality).',
    },
  },
  {
    id: 'buyerResponsiveness',
    title: 'Buyer Responsiveness',
    question: 'How open is your target persona to engaging via cold outreach?',
    options: {
      '1': 'They almost never respond to cold emails or calls.',
      '2': 'Occasionally respond after multiple attempts.',
      '3': 'Mixed results depending on persona.',
      '4': 'Usually open to discovery conversations.',
      '5': 'They often reply or engage with relevant cold outreach.',
    },
  },
  {
    id: 'marketMaturity',
    title: 'Market Maturity (Geo + Category)',
    question: 'How mature is your target geography or segment in adopting SaaS tools like yours?',
    options: {
      '1': 'Early or emerging market (still on spreadsheets).',
      '2': 'Low adoption - SaaS adoption under 30%.',
      '3': 'Growing - some SaaS tools used in category.',
      '4': 'Mature - SaaS adoption common, budgets allocated.',
      '5': 'Highly mature - buyers have dedicated budgets and clear buying cycles.',
    },
  },
];

export const createInitialMmfResponses = (): MmfResponses => ({
  categoryAwareness: '',
  competitiveNarrative: '',
  buyerEducationEffort: '',
  urgencyDrivers: '',
  buyerResponsiveness: '',
  marketMaturity: '',
});

export const createInitialMmfErrors = (): MmfErrors => ({});

export const createInitialStepErrors = (): FitValidatorStepErrors => ({
  retention: {},
  usage: {},
  revenueQuality: {},
  sentiment: {},
  marketPull: {},
});
