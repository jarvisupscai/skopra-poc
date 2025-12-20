import {
  MARKET_PULL_BASE_TOTAL,
  MMF_QUESTIONS,
} from './constants';
import type {
  FitParticipant,
  ParticipantErrors,
  RetentionResponses,
  RetentionErrors,
  UsageResponses,
  UsageErrors,
  RevenueQualityResponses,
  RevenueQualityErrors,
  SentimentResponses,
  SentimentErrors,
  MarketPullResponses,
  MarketPullErrors,
  AcvErrors,
  PcfResponses,
  PcfErrors,
  CmfResponses,
  CmfErrors,
  MmfResponses,
  MmfErrors,
} from './types';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isNonNegativeNumber = (value: string): boolean => {
  if (value.trim().length === 0) {
    return false;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0;
};

export const normalizeParticipant = (participant: FitParticipant): FitParticipant => ({
  firstName: participant.firstName.trim(),
  lastName: participant.lastName.trim(),
  email: participant.email.trim(),
  company: participant.company.trim(),
});

export const validateParticipant = (participant: FitParticipant): ParticipantErrors => {
  const errors: ParticipantErrors = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
  };

  if (participant.firstName.length === 0) {
    errors.firstName = 'Enter your first name.';
  } else if (participant.firstName.length > 50) {
    errors.firstName = 'First name cannot exceed 50 characters.';
  }

  if (participant.lastName.length === 0) {
    errors.lastName = 'Enter your last name.';
  } else if (participant.lastName.length > 50) {
    errors.lastName = 'Last name cannot exceed 50 characters.';
  }

  if (participant.company.length === 0) {
    errors.company = 'Enter your company name.';
  } else if (participant.company.length > 50) {
    errors.company = 'Company name cannot exceed 50 characters.';
  }

  if (participant.email.length === 0) {
    errors.email = 'Enter an email address to get started.';
  } else if (participant.email.length > 50) {
    errors.email = 'Email cannot exceed 50 characters.';
  } else if (!emailPattern.test(participant.email)) {
    errors.email = 'Enter a valid email address (for example, name@company.com).';
  }

  return errors;
};

export const validateRetention = (responses: RetentionResponses): RetentionErrors => {
  const errors: RetentionErrors = {};

  if (!isNonNegativeNumber(responses.customerCount)) {
    errors.customerCount = 'Enter the number of customers closed as a non-negative number.';
  }

  if (responses.totalContractValue.trim().length === 0) {
    errors.totalContractValue = 'Enter the total contract value.';
  }

  if (!isNonNegativeNumber(responses.customersStillPaying)) {
    errors.customersStillPaying = 'Enter how many customers are still paying as a non-negative number.';
  } else if (
    isNonNegativeNumber(responses.customerCount) &&
    Number(responses.customersStillPaying) > Number(responses.customerCount)
  ) {
    errors.customersStillPaying = 'Customers still paying cannot exceed the number of customers closed.';
  }

  if (responses.minLtv.trim().length === 0) {
    errors.minLtv = 'Select the minimum LTV.';
  }

  return errors;
};

export const validateUsage = (
  responses: UsageResponses,
  retention: RetentionResponses,
): UsageErrors => {
  const errors: UsageErrors = {};

  if (!isNonNegativeNumber(responses.weeklyActiveCustomers)) {
    errors.weeklyActiveCustomers = 'Enter the number of weekly active customers as a non-negative number.';
    return errors;
  }

  if (!isNonNegativeNumber(retention.customersStillPaying)) {
    errors.weeklyActiveCustomers = 'Complete the retention question about customers still paying before capturing usage.';
    return errors;
  }

  if (
    Number(responses.weeklyActiveCustomers) >
    Number(retention.customersStillPaying)
  ) {
    errors.weeklyActiveCustomers = 'Weekly active customers cannot exceed the customers still paying.';
  }

  return errors;
};

export const validateRevenueQuality = (
  responses: RevenueQualityResponses,
): RevenueQualityErrors => {
  const errors: RevenueQualityErrors = {};

  if (!isNonNegativeNumber(responses.currentArr)) {
    errors.currentArr = 'Enter the current ARR as a non-negative number.';
  }

  if (!isNonNegativeNumber(responses.topTwoCustomersAcv)) {
    errors.topTwoCustomersAcv = 'Enter the ACV of your top two customers as a non-negative number.';
  }

  return errors;
};

export const validateSentiment = (
  responses: SentimentResponses,
): SentimentErrors => {
  const errors: SentimentErrors = {};
  const trimmed = responses.npsScore.trim();

  if (trimmed.length === 0) {
    errors.npsScore = 'Enter the latest NPS score.';
    return errors;
  }

  const value = Number(trimmed);
  if (!Number.isFinite(value) || value < 0 || value > 100) {
    errors.npsScore = 'NPS must be between 0 and 100.';
  }

  return errors;
};

export const validateMarketPull = (
  responses: MarketPullResponses,
): MarketPullErrors => {
  const errors: MarketPullErrors = {};
  const inboundTrimmed = responses.inboundOpportunities.trim();

  if (!isNonNegativeNumber(inboundTrimmed)) {
    errors.inboundOpportunities = 'Enter the number of inbound or referral opportunities as a non-negative number.';
    return errors;
  }

  const inboundValue = Number(inboundTrimmed);
  if (inboundValue > MARKET_PULL_BASE_TOTAL) {
    errors.inboundOpportunities = `Inbound or referral opportunities cannot exceed ${MARKET_PULL_BASE_TOTAL}.`;
  }

  return errors;
};

export const validateAcv = (
  value: string,
): AcvErrors => {
  const errors: AcvErrors = {};

  if (!isNonNegativeNumber(value)) {
    errors.currentAverageContractValue = 'Enter the current ACV as a non-negative number.';
  }

  return errors;
};

export const validatePersonaIdentifiability = (
  responses: PcfResponses['persona'],
): PcfErrors['persona'] => {
  const errors: PcfErrors['persona'] = {};

  if (responses.decisionMakers.trim().length === 0) {
    errors.decisionMakers = 'Describe who your ICP decision-makers are.';
  }

  if (responses.knowsJobTitles.trim().length === 0) {
    errors.knowsJobTitles = 'Select Yes or No.';
  }

  if (responses.canFindOnLinkedIn.trim().length === 0) {
    errors.canFindOnLinkedIn = 'Select Yes or No.';
  }

  return errors;
};

export const validateProblemUrgency = (
  responses: PcfResponses['problemUrgency'],
): PcfErrors['problemUrgency'] => {
  const errors: PcfErrors['problemUrgency'] = {};

  if (responses.decisionTrigger.trim().length === 0) {
    errors.decisionTrigger = 'Describe the trigger or pain your buyers react to.';
  }

  if (responses.consequences.trim().length === 0) {
    errors.consequences = 'Explain what happens if the problem goes unsolved for six months.';
  }

  return errors;
};

export const validateObservableTrigger = (
  responses: PcfResponses['observableTrigger'],
): PcfErrors['observableTrigger'] => {
  const errors: PcfErrors['observableTrigger'] = {};

  if (responses.signals.length === 0) {
    errors.signals = 'Select at least one buying signal.';
  }

  if (
    responses.signals.includes('other') &&
    responses.otherDetails.trim().length === 0
  ) {
    errors.otherDetails = 'Describe the other signal you are observing.';
  }

  return errors;
};

export const validateGrossMargin = (
  responses: CmfResponses['grossMargin'],
): CmfErrors['grossMargin'] => {
  const errors: CmfErrors['grossMargin'] = {};

  const percent = Number(responses.retainedRevenuePercent);
  if (
    responses.retainedRevenuePercent.trim().length === 0 ||
    !Number.isFinite(percent) ||
    percent < 0 ||
    percent > 100
  ) {
    errors.retainedRevenuePercent = 'Enter a percentage between 0 and 100.';
  }

  if (!isNonNegativeNumber(responses.annualSalesCost)) {
    errors.annualSalesCost = 'Enter the annual cost as a non-negative number.';
  }

  return errors;
};

export const validateSalesCycle = (
  responses: CmfResponses['salesCycle'],
): CmfErrors['salesCycle'] => {
  const errors: CmfErrors['salesCycle'] = {};

  if (!responses.typicalLength) {
    errors.typicalLength = 'Select the typical sales cycle length.';
  }

  return errors;
};

export const validateWinRate = (
  responses: CmfResponses['winRate'],
): CmfErrors['winRate'] => {
  const errors: CmfErrors['winRate'] = {};
  const value = Number(responses.closesOutOfTen);

  if (
    responses.closesOutOfTen.trim().length === 0 ||
    !Number.isFinite(value) ||
    value < 0 ||
    value > 10
  ) {
    errors.closesOutOfTen = 'Enter a number between 0 and 10.';
  }

  return errors;
};

export const validateMmfMarketAnalysis = (
  responses: MmfResponses,
): MmfErrors => {
  const errors: MmfErrors = {};

  MMF_QUESTIONS.forEach((question) => {
    const value = responses[question.id];
    if (!value) {
      errors[question.id] = `Select an option for ${question.title}.`;
    } else if (!question.options[value]) {
      errors[question.id] = 'Select a valid option.';
    }
  });

  return errors;
};

export const hasStepErrors = <T extends Record<string, string>>(
  errors: T,
): boolean => Object.values(errors).some((message) => message.trim().length > 0);
