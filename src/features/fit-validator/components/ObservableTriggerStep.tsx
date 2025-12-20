import type { FC } from 'react';
import type { PcfResponses, PcfErrors } from '../types';

const DEFAULT_SIGNALS = [
  { id: 'newFunding', label: 'Announced new funding' },
  { id: 'leadershipChange', label: 'New GTM leadership hired' },
  { id: 'hiringSpree', label: 'Aggressive hiring for sales/CS roles' },
  { id: 'techStackShift', label: 'Changing core tools/stack' },
];

interface ObservableTriggerStepProps {
  responses: PcfResponses['observableTrigger'];
  errors: PcfErrors['observableTrigger'];
  onSignalsChange: (signals: string[]) => void;
  onOtherDetailsChange: (value: string) => void;
}

const ObservableTriggerStep: FC<ObservableTriggerStepProps> = ({
  responses,
  errors,
  onSignalsChange,
  onOtherDetailsChange,
}) => {
  const toggleSignal = (signalId: string) => () => {
    onSignalsChange(
      responses.signals.includes(signalId)
        ? responses.signals.filter((id) => id !== signalId)
        : [...responses.signals, signalId],
    );
  };

  const handleOtherToggle = () => {
    if (responses.signals.includes('other')) {
      onSignalsChange(responses.signals.filter((id) => id !== 'other'));
      onOtherDetailsChange('');
    } else {
      onSignalsChange([...responses.signals, 'other']);
    }
  };

  return (
    <div className="fit-validator__questions">
      <label className="fit-validator__field" htmlFor="pcf-observable-trigger">
        <span>
          1. What common signals tell you a company is likely to buy your product?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <div className="fit-validator__chip-group" id="pcf-observable-trigger">
          {DEFAULT_SIGNALS.map((signal) => {
            const isActive = responses.signals.includes(signal.id);

            return (
              <button
                key={signal.id}
                type="button"
                className={
                  isActive
                    ? 'fit-validator__chip fit-validator__chip--active'
                    : 'fit-validator__chip'
                }
                onClick={toggleSignal(signal.id)}
              >
                {signal.label}
              </button>
            );
          })}
          <div className="fit-validator__chip-with-input">
            <button
              type="button"
              className={
                responses.signals.includes('other')
                  ? 'fit-validator__chip fit-validator__chip--active'
                  : 'fit-validator__chip'
              }
              onClick={handleOtherToggle}
            >
              Other
            </button>
            {responses.signals.includes('other') && (
              <input
                type="text"
                className="fit-validator__input fit-validator__chip-input"
                value={responses.otherDetails}
                onChange={(event) => onOtherDetailsChange(event.target.value)}
                placeholder="Describe the other signal"
              />
            )}
          </div>
        </div>
      </label>
      {errors.signals && (
        <p className="fit-validator__error" role="alert">
          {errors.signals}
        </p>
      )}
      {errors.otherDetails && (
        <p className="fit-validator__error" role="alert">
          {errors.otherDetails}
        </p>
      )}
    </div>
  );
};

export default ObservableTriggerStep;
