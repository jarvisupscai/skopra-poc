import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createInitialStepErrors,
  createInitialPcfErrors,
  createInitialCmfErrors,
  createInitialMmfErrors,
} from "../features/fit-validator/constants";
import { VALIDATION_SECTIONS } from "../features/fit-validator/sections";
import {
  Stepper,
  RetentionStep,
  UsageStep,
  RevenueQualityStep,
  SentimentStep,
  MarketPullStep,
  AcvStep,
  PersonaStep,
  ProblemUrgencyStep,
  ObservableTriggerStep,
  SectionStepper,
  GrossMarginStep,
  SalesCycleStep,
  WinRateStep,
  MarketAnalysisStep,
} from "../features/fit-validator/components";
import {
  hasStepErrors,
  validateRetention,
  validateUsage,
  validateRevenueQuality,
  validateSentiment,
  validateMarketPull,
  validateAcv,
  validatePersonaIdentifiability,
  validateProblemUrgency,
  validateObservableTrigger,
  validateGrossMargin,
  validateSalesCycle,
  validateWinRate,
  validateMmfMarketAnalysis,
} from "../features/fit-validator/validation";
import { saveSection } from "../features/fit-validator/api";
import { useFitValidator } from "../features/fit-validator/context/FitValidatorContext";
import type {
  FitValidatorStepId,
  PcfResponses,
  CmfResponses,
  MmfResponses,
  MmfScaleResponse,
} from "../features/fit-validator/types";

const FitValidatorFlow: FC = () => {
  const navigate = useNavigate();
  const {
    participant,
    pmfResponses,
    setPmfResponses,
    pcfResponses,
    setPcfResponses,
    cmfResponses,
    setCmfResponses,
    mmfResponses,
    setMmfResponses,
  } = useFitValidator();

  const [pmfErrors, setPmfErrors] = useState(createInitialStepErrors());
  const [pcfErrors, setPcfErrors] = useState(createInitialPcfErrors());
  const [cmfErrors, setCmfErrors] = useState(createInitialCmfErrors());
  const [mmfErrors, setMmfErrors] = useState(createInitialMmfErrors());
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!participant || !participant.email) {
      navigate("/fit-validator/start");
    }
  }, [participant, navigate]);

  if (!participant) {
    return null;
  }

  const activeSection = VALIDATION_SECTIONS[activeSectionIndex];
  const activeSteps = activeSection.steps;
  const activeStep = activeSteps[activeStepIndex];
  const isLastStepInSection = activeStepIndex === activeSteps.length - 1;

  const retentionReviewMonth = useMemo(() => {
    const target = new Date();
    target.setMonth(target.getMonth() - 6);

    return target.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, []);

  const hasCustomersStillPayingValue =
    pmfResponses.retention.customersStillPaying.trim().length > 0;
  const customersStillPayingDisplay = hasCustomersStillPayingValue
    ? pmfResponses.retention.customersStillPaying
    : "___";

  const goToSection = (nextSectionIndex: number) => {
    setActiveSectionIndex(nextSectionIndex);
    setActiveStepIndex(0);
  };

  const clearPmfError = (stepId: FitValidatorStepId, field: string) => {
    setPmfErrors((current) => {
      const currentStepErrors = current[stepId] as Record<string, string>;
      if (!currentStepErrors?.[field as string]) {
        return current;
      }

      return {
        ...current,
        [stepId]: {
          ...currentStepErrors,
          [field]: "",
        },
      };
    });
  };

  const handlePmfChange = <T extends FitValidatorStepId>(
    stepId: T,
    field: keyof (typeof pmfResponses)[T],
    value: string
  ) => {
    setPmfResponses((current) => ({
      ...current,
      [stepId]: {
        ...current[stepId],
        [field]: value,
      },
    }));
    clearPmfError(stepId, field as string);
  };

  const clearPcfError = (section: keyof typeof pcfErrors, field: string) => {
    setPcfErrors((current) => {
      const sectionErrors = current[section] as Record<string, string>;
      if (!sectionErrors?.[field]) {
        return current;
      }

      return {
        ...current,
        [section]: {
          ...sectionErrors,
          [field]: "",
        },
      };
    });
  };

  const handlePersonaChange = (
    field: keyof PcfResponses["persona"],
    value: string
  ) => {
    setPcfResponses((current) => ({
      ...current,
      persona: {
        ...current.persona,
        [field]: value,
      },
    }));
    clearPcfError("persona", field);
  };

  const handleAcvChange = (value: string) => {
    setPcfResponses((current) => ({
      ...current,
      acv: {
        currentAverageContractValue: value,
      },
    }));
    clearPcfError("acv", "currentAverageContractValue");
  };

  const handleProblemUrgencyChange = (
    field: keyof PcfResponses["problemUrgency"],
    value: string
  ) => {
    setPcfResponses((current) => ({
      ...current,
      problemUrgency: {
        ...current.problemUrgency,
        [field]: value,
      },
    }));
    clearPcfError("problemUrgency", field);
  };

  const handleObservableSignalsChange = (signals: string[]) => {
    setPcfResponses((current) => ({
      ...current,
      observableTrigger: {
        ...current.observableTrigger,
        signals,
        otherDetails: signals.includes("other")
          ? current.observableTrigger.otherDetails
          : "",
      },
    }));
    clearPcfError("observableTrigger", "signals");
    if (!signals.includes("other")) {
      clearPcfError("observableTrigger", "otherDetails");
    }
  };

  const handleObservableOtherChange = (value: string) => {
    setPcfResponses((current) => ({
      ...current,
      observableTrigger: {
        ...current.observableTrigger,
        otherDetails: value,
      },
    }));
    clearPcfError("observableTrigger", "otherDetails");
  };

  const clearCmfError = (section: keyof typeof cmfErrors, field: string) => {
    setCmfErrors((current) => {
      const sectionErrors = current[section] as Record<string, string>;
      if (!sectionErrors?.[field]) {
        return current;
      }

      return {
        ...current,
        [section]: {
          ...sectionErrors,
          [field]: "",
        },
      };
    });
  };

  const handleGrossMarginChange = (
    field: keyof CmfResponses["grossMargin"],
    value: string
  ) => {
    setCmfResponses((current) => ({
      ...current,
      grossMargin: {
        ...current.grossMargin,
        [field]: value,
      },
    }));
    clearCmfError("grossMargin", field);
  };

  const handleSalesCycleChange = (
    value: CmfResponses["salesCycle"]["typicalLength"]
  ) => {
    setCmfResponses((current) => ({
      ...current,
      salesCycle: {
        typicalLength: value,
      },
    }));
    clearCmfError("salesCycle", "typicalLength");
  };

  const handleWinRateChange = (value: string) => {
    setCmfResponses((current) => ({
      ...current,
      winRate: {
        closesOutOfTen: value,
      },
    }));
    clearCmfError("winRate", "closesOutOfTen");
  };

  const clearMmfError = (field: keyof MmfResponses) => {
    setMmfErrors((current) => {
      if (!current[field]) {
        return current;
      }
      return {
        ...current,
        [field]: "",
      };
    });
  };

  const handleMmfChange = (
    field: keyof MmfResponses,
    value: MmfScaleResponse
  ) => {
    setMmfResponses((current) => ({
      ...current,
      [field]: value,
    }));
    clearMmfError(field);
  };

  const persistSection = async (sectionId: string) => {
    setIsSaving(true);
    try {
      await saveSection(sectionId as "pmf" | "pcf" | "cmf" | "mmf", {
        participant,
        pmfResponses,
        pcfResponses,
        cmfResponses,
        mmfResponses,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const validateCurrentStep = () => {
    if (activeSection.id === "pmf") {
      const currentStepId = activeSteps[activeStepIndex]
        .id as FitValidatorStepId;

      if (currentStepId === "retention") {
        const validation = validateRetention(pmfResponses.retention);
        if (hasStepErrors(validation)) {
          setPmfErrors((current) => ({
            ...current,
            retention: validation,
          }));
          return false;
        }
      }

      if (currentStepId === "usage") {
        const validation = validateUsage(
          pmfResponses.usage,
          pmfResponses.retention
        );
        if (hasStepErrors(validation)) {
          setPmfErrors((current) => ({
            ...current,
            usage: validation,
          }));
          return false;
        }
      }

      if (currentStepId === "revenueQuality") {
        const validation = validateRevenueQuality(pmfResponses.revenueQuality);
        if (hasStepErrors(validation)) {
          setPmfErrors((current) => ({
            ...current,
            revenueQuality: validation,
          }));
          return false;
        }
      }

      if (currentStepId === "sentiment") {
        const validation = validateSentiment(pmfResponses.sentiment);
        if (hasStepErrors(validation)) {
          setPmfErrors((current) => ({
            ...current,
            sentiment: validation,
          }));
          return false;
        }
      }

      if (currentStepId === "marketPull") {
        const validation = validateMarketPull(pmfResponses.marketPull);
        if (hasStepErrors(validation)) {
          setPmfErrors((current) => ({
            ...current,
            marketPull: validation,
          }));
          return false;
        }
      }
    }

    if (activeSection.id === "pcf") {
      const currentStepId = activeSteps[activeStepIndex].id;

      if (currentStepId === "acv") {
        const validation = validateAcv(
          pcfResponses.acv.currentAverageContractValue
        );
        if (hasStepErrors(validation)) {
          setPcfErrors((current) => ({
            ...current,
            acv: validation,
          }));
          return false;
        }
      }

      if (currentStepId === "persona") {
        const validation = validatePersonaIdentifiability(pcfResponses.persona);
        if (hasStepErrors(validation)) {
          setPcfErrors((current) => ({
            ...current,
            persona: validation,
          }));
          return false;
        }
      }

      if (currentStepId === "problemUrgency") {
        const validation = validateProblemUrgency(pcfResponses.problemUrgency);
        if (hasStepErrors(validation)) {
          setPcfErrors((current) => ({
            ...current,
            problemUrgency: validation,
          }));
          return false;
        }
      }

      if (currentStepId === "observableTrigger") {
        const validation = validateObservableTrigger(
          pcfResponses.observableTrigger
        );
        if (hasStepErrors(validation)) {
          setPcfErrors((current) => ({
            ...current,
            observableTrigger: validation,
          }));
          return false;
        }
      }
    }

    if (activeSection.id === "cmf") {
      const currentStepId = activeSteps[activeStepIndex].id;

      if (currentStepId === "grossMargin") {
        const validation = validateGrossMargin(cmfResponses.grossMargin);
        if (hasStepErrors(validation)) {
          setCmfErrors((current) => ({
            ...current,
            grossMargin: validation,
          }));
          return false;
        }
      }

      if (currentStepId === "salesCycle") {
        const validation = validateSalesCycle(cmfResponses.salesCycle);
        if (hasStepErrors(validation)) {
          setCmfErrors((current) => ({
            ...current,
            salesCycle: validation,
          }));
          return false;
        }
      }

      if (currentStepId === "winRate") {
        const validation = validateWinRate(cmfResponses.winRate);
        if (hasStepErrors(validation)) {
          setCmfErrors((current) => ({
            ...current,
            winRate: validation,
          }));
          return false;
        }
      }
    }

    if (activeSection.id === "mmf") {
      const validation = validateMmfMarketAnalysis(mmfResponses);
      if (hasStepErrors(validation)) {
        setMmfErrors(validation);
        return false;
      }
    }

    return true;
  };

  const handleNext = async () => {
    if (isSaving) return;

    if (!validateCurrentStep()) {
      return;
    }

    if (isLastStepInSection) {
      await persistSection(activeSection.id);

      if (activeSectionIndex === VALIDATION_SECTIONS.length - 1) {
        return;
      }

      goToSection(activeSectionIndex + 1);
      return;
    }

    setActiveStepIndex((index) => index + 1);
  };

  const handlePrevious = () => {
    if (isSaving) return;

    if (activeStepIndex > 0) {
      setActiveStepIndex((index) => index - 1);
      return;
    }

    if (activeSectionIndex > 0) {
      const previousSection = VALIDATION_SECTIONS[activeSectionIndex - 1];
      setActiveSectionIndex((index) => index - 1);
      setActiveStepIndex(previousSection.steps.length - 1);
    }
  };

  const actionButtonLabel = (() => {
    if (isSaving) return "Saving...";
    if (
      activeSectionIndex === VALIDATION_SECTIONS.length - 1 &&
      isLastStepInSection
    ) {
      return "Finish";
    }
    if (isLastStepInSection) {
      return "Next Section";
    }
    return "Next";
  })();

  return (
    <section className="page fit-validator">
      <header className="fit-validator__intro">
        <h1>Fit Validator</h1>
        <p>
          Complete each section to capture the data needed for your fit report.
        </p>
      </header>

      <div className="fit-validator__panel">
        <div className="fit-validator__stepper">
          <SectionStepper
            sections={VALIDATION_SECTIONS}
            activeIndex={activeSectionIndex}
          />
          <Stepper steps={activeSteps} activeIndex={activeStepIndex} />

          <section className="fit-validator__step-content">
            {activeSection.id === "pmf" && activeStep.id === "retention" && (
              <RetentionStep
                responses={pmfResponses.retention}
                errors={pmfErrors.retention}
                reviewMonthLabel={retentionReviewMonth}
                onChange={(field, value) =>
                  handlePmfChange("retention", field, value)
                }
              />
            )}

            {activeSection.id === "pmf" && activeStep.id === "usage" && (
              <UsageStep
                responses={pmfResponses.usage}
                errors={pmfErrors.usage}
                customersStillPayingLabel={customersStillPayingDisplay}
                inputDisabled={!hasCustomersStillPayingValue}
                onChange={(field, value) =>
                  handlePmfChange("usage", field, value)
                }
              />
            )}

            {activeSection.id === "pmf" &&
              activeStep.id === "revenueQuality" && (
                <RevenueQualityStep
                  responses={pmfResponses.revenueQuality}
                  errors={pmfErrors.revenueQuality}
                  onChange={(field, value) =>
                    handlePmfChange("revenueQuality", field, value)
                  }
                />
              )}

            {activeSection.id === "pmf" && activeStep.id === "sentiment" && (
              <SentimentStep
                responses={pmfResponses.sentiment}
                errors={pmfErrors.sentiment}
                onChange={(field, value) =>
                  handlePmfChange("sentiment", field, value)
                }
              />
            )}

            {activeSection.id === "pmf" && activeStep.id === "marketPull" && (
              <MarketPullStep
                responses={pmfResponses.marketPull}
                errors={pmfErrors.marketPull}
                onChange={(field, value) =>
                  handlePmfChange("marketPull", field, value)
                }
              />
            )}

            {activeSection.id === "pcf" && activeStep.id === "acv" && (
              <AcvStep
                value={pcfResponses.acv.currentAverageContractValue}
                errors={pcfErrors.acv}
                onChange={handleAcvChange}
              />
            )}

            {activeSection.id === "pcf" && activeStep.id === "persona" && (
              <PersonaStep
                responses={pcfResponses.persona}
                errors={pcfErrors.persona}
                onChange={handlePersonaChange}
              />
            )}

            {activeSection.id === "pcf" &&
              activeStep.id === "problemUrgency" && (
                <ProblemUrgencyStep
                  responses={pcfResponses.problemUrgency}
                  errors={pcfErrors.problemUrgency}
                  onChange={handleProblemUrgencyChange}
                />
              )}

            {activeSection.id === "pcf" &&
              activeStep.id === "observableTrigger" && (
                <ObservableTriggerStep
                  responses={pcfResponses.observableTrigger}
                  errors={pcfErrors.observableTrigger}
                  onSignalsChange={handleObservableSignalsChange}
                  onOtherDetailsChange={handleObservableOtherChange}
                />
              )}

            {activeSection.id === "cmf" && activeStep.id === "grossMargin" && (
              <GrossMarginStep
                responses={cmfResponses.grossMargin}
                errors={cmfErrors.grossMargin}
                onChange={handleGrossMarginChange}
              />
            )}

            {activeSection.id === "cmf" && activeStep.id === "salesCycle" && (
              <SalesCycleStep
                responses={cmfResponses.salesCycle}
                errors={cmfErrors.salesCycle}
                onChange={handleSalesCycleChange}
              />
            )}

            {activeSection.id === "cmf" && activeStep.id === "winRate" && (
              <WinRateStep
                responses={cmfResponses.winRate}
                errors={cmfErrors.winRate}
                onChange={handleWinRateChange}
              />
            )}

            {activeSection.id === "mmf" && (
              <MarketAnalysisStep
                responses={mmfResponses}
                errors={mmfErrors}
                onChange={handleMmfChange}
              />
            )}

            <footer className="fit-validator__actions">
              <button
                type="button"
                className="secondary-button"
                onClick={handlePrevious}
                disabled={
                  isSaving ||
                  (activeSectionIndex === 0 && activeStepIndex === 0)
                }
              >
                Previous
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={handleNext}
                disabled={isSaving}
              >
                {actionButtonLabel}
              </button>
            </footer>
          </section>
        </div>
      </div>
    </section>
  );
};

export default FitValidatorFlow;
